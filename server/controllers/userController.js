const prisma = require('../prismaClient');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { deletedat: null },
      orderBy: { createdAt: 'desc' }
    });
    
    // Formatear createdAt para que coincida con el frontend (ej. "15 Jan 2025")
    const formattedUsers = users.map(user => ({
      ...user,
      createdAt: user.createdAt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    }));

    res.json(formattedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Crear un usuario
const createUser = async (req, res) => {
  try {
    const { name, username, email, role, password } = req.body;
    
    // Validación básica
    if (!name || !username || !email || !role || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Comprobar si ya existe el usuario o el email
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { name, username, email, role, password: hashedPassword }
    });

    // Formatear fecha
    newUser.createdAt = newUser.createdAt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, email, role, password } = req.body;

    // Construir objeto de datos a actualizar
    const updateData = { name, username, email, role };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData
    });

    updatedUser.createdAt = updatedUser.createdAt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Eliminar un usuario (Soft Delete)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.update({
      where: { id },
      data: { deletedat: new Date() }
    });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
