require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const authenticateToken = require('./middleware/authMiddleware');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Auth Routes
app.post('/api/auth/login', authController.login);

// User Routes (Protected)
app.get('/api/users', authenticateToken, userController.getUsers);
app.post('/api/users', authenticateToken, userController.createUser);
app.put('/api/users/:id', authenticateToken, userController.updateUser);
app.delete('/api/users/:id', authenticateToken, userController.deleteUser);

// Basic health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
