<template>
  <AdminLayout>
    <!-- Header unificado -->
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
      <div>
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">Usuarios</h2>
        <nav class="mt-1">
          <ol class="flex items-center gap-1.5">
            <li>
              <router-link class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400" to="/">
                Home
                <svg class="stroke-current" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366" stroke="" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </router-link>
            </li>
            <li class="text-sm text-gray-800 dark:text-white/90">Usuarios</li>
          </ol>
        </nav>
      </div>
      <div class="flex items-center gap-3">
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por nombre o usuario"
            class="w-64 rounded-lg border border-gray-300 bg-transparent py-2.5 pl-10 pr-4 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-brand-500 transition-colors"
          />
        </div>
        <button
          @click="openAddModal"
          class="flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors whitespace-nowrap"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Nuevo
        </button>
      </div>
    </div>

    <div class="space-y-5 sm:space-y-6">
      <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <!-- Table -->
        <div>
          <UsersTable
            :searchQuery="searchQuery"
            :users="users"
            @view="openViewModal"
            @edit="openEditModal"
            @delete="openDeleteConfirm"
          />
        </div>
      </div>

    </div>

    <!-- ===== MODAL: Agregar / Editar ===== -->
    <Teleport to="body">
      <Modal v-if="isFormOpen" :fullScreenBackdrop="true" @close="closeFormModal">
        <template #body>
          <div class="no-scrollbar relative w-full max-w-[560px] overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-10">
            <button
              @click="closeFormModal"
              class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <h5 class="mb-1 text-xl font-semibold text-gray-800 dark:text-white/90">
              {{ formMode === 'add' ? 'Nuevo Usuario' : 'Editar Usuario' }}
            </h5>
            <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
              {{ formMode === 'add' ? 'Completa los datos para registrar un nuevo usuario.' : 'Modifica los datos del usuario.' }}
            </p>

            <form @submit.prevent="handleFormSubmit" class="space-y-5">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre completo</label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  required
                  class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-brand-500 transition-colors"
                />
              </div>

              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre de usuario</label>
                <input
                  v-model="form.username"
                  type="text"
                  placeholder="Ej. jperez"
                  required
                  class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-brand-500 transition-colors"
                />
              </div>

              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Correo electrónico</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="Ej. jperez@correo.com"
                  required
                  class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-brand-500 transition-colors"
                />
              </div>

              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Rol</label>
                <select
                  v-model="form.role"
                  required
                  class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-brand-500 transition-colors"
                >
                  <option value="" disabled>Selecciona un rol</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Editor">Editor</option>
                  <option value="Usuario">Usuario</option>
                </select>
              </div>

              <div v-if="formMode === 'add'">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
                <input
                  v-model="form.password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  required
                  minlength="8"
                  class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-brand-500 transition-colors"
                />
              </div>

              <div v-if="formMode === 'add'">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar contraseña</label>
                <input
                  v-model="form.confirmPassword"
                  type="password"
                  placeholder="Repite la contraseña"
                  required
                  :class="[
                    'w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm focus:outline-none transition-colors',
                    passwordMismatch
                      ? 'border-error-400 focus:border-error-500 text-gray-800 dark:text-white dark:border-error-500'
                      : 'border-gray-300 focus:border-brand-500 text-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-brand-500'
                  ]"
                />
                <p v-if="passwordMismatch" class="mt-1.5 text-xs text-error-500">
                  Las contraseñas no coinciden.
                </p>
              </div>

              <div class="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  @click="closeFormModal"
                  class="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
                >
                  {{ formMode === 'add' ? 'Guardar usuario' : 'Actualizar usuario' }}
                </button>
              </div>
            </form>
          </div>
        </template>
      </Modal>
    </Teleport>

    <!-- ===== MODAL: Ver Usuario ===== -->
    <Teleport to="body">
      <Modal v-if="isViewOpen" :fullScreenBackdrop="true" @close="isViewOpen = false">
        <template #body>
          <div class="no-scrollbar relative w-full max-w-[480px] overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-10">
            <button
              @click="isViewOpen = false"
              class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <h5 class="mb-6 text-xl font-semibold text-gray-800 dark:text-white/90">Detalle de Usuario</h5>

            <div v-if="selectedUser" class="space-y-4">
              <div class="flex items-center justify-center mb-6">
                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 text-2xl font-bold">
                  {{ selectedUser.name.charAt(0).toUpperCase() }}
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Nombre</p>
                  <p class="text-sm font-medium text-gray-800 dark:text-white/90">{{ selectedUser.name }}</p>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Usuario</p>
                  <p class="text-sm font-medium text-gray-800 dark:text-white/90">{{ selectedUser.username }}</p>
                </div>
                <div class="col-span-2">
                  <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Correo</p>
                  <p class="text-sm font-medium text-gray-800 dark:text-white/90">{{ selectedUser.email }}</p>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Rol</p>
                  <span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                    {{ selectedUser.role }}
                  </span>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Fecha de alta</p>
                  <p class="text-sm font-medium text-gray-800 dark:text-white/90">{{ selectedUser.createdAt }}</p>
                </div>
              </div>

              <div class="flex justify-end gap-3 pt-4">
                <button
                  @click="isViewOpen = false"
                  class="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                >
                  Cerrar
                </button>
                <button
                  @click="isViewOpen = false; openEditModal(selectedUser)"
                  class="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        </template>
      </Modal>
    </Teleport>

    <!-- ===== MODAL: Confirmar Borrar ===== -->
    <Teleport to="body">
      <Modal v-if="isDeleteOpen" :fullScreenBackdrop="true" @close="isDeleteOpen = false">
        <template #body>
          <div class="relative w-full max-w-[420px] rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-8">
            <div class="flex flex-col items-center text-center">
              <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error-50 dark:bg-error-500/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-error-500">
                  <path d="M12 9V13M12 17H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0377 2.66667 10.2679 4L3.33975 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h5 class="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">¿Eliminar usuario?</h5>
              <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
                Estás a punto de eliminar a <span class="font-medium text-gray-800 dark:text-white/90">{{ selectedUser?.name }}</span>. Esta acción no se puede deshacer.
              </p>
              <div class="flex w-full gap-3">
                <button
                  @click="isDeleteOpen = false"
                  class="flex-1 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  @click="confirmDelete"
                  class="flex-1 rounded-lg bg-error-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-error-600 transition-colors"
                >
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        </template>
      </Modal>
    </Teleport>

  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import UsersTable from "@/components/tables/UsersTable.vue";
import Modal from "@/components/ui/Modal.vue";
import { useAuth } from "@/composables/useAuth";

const searchQuery = ref("");
const apiUrl = import.meta.env.PROD ? '/api/users' : 'http://localhost:4000/api/users';
const { getAuthHeaders } = useAuth();

// ── Estado de usuarios ──────────────────────────────────────────
const users = ref([]);

const fetchUsers = async () => {
  try {
    const res = await fetch(apiUrl, {
      headers: { ...getAuthHeaders() }
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    users.value = data;
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  fetchUsers();
});

const selectedUser = ref(null);

// ── Modal: Agregar / Editar ──────────────────────────────────────
const isFormOpen = ref(false);
const formMode = ref('add'); // 'add' | 'edit'

const form = ref({ name: '', username: '', email: '', role: '', password: '', confirmPassword: '' });
const passwordMismatch = computed(() =>
  formMode.value === 'add' && form.value.confirmPassword !== '' && form.value.password !== form.value.confirmPassword
);

function openAddModal() {
  formMode.value = 'add';
  form.value = { name: '', username: '', email: '', role: '', password: '', confirmPassword: '' };
  isFormOpen.value = true;
}

function openEditModal(user) {
  formMode.value = 'edit';
  selectedUser.value = user;
  form.value = { name: user.name, username: user.username, email: user.email, role: user.role, password: '', confirmPassword: '' };
  isFormOpen.value = true;
}

function closeFormModal() {
  isFormOpen.value = false;
}

async function handleFormSubmit() {
  if (formMode.value === 'add' && form.value.password !== form.value.confirmPassword) {
    return; // bloquea si las contraseñas no coinciden
  }

  try {
    if (formMode.value === 'add') {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(form.value)
      });
      if (res.ok) {
        await fetchUsers();
      } else {
        const error = await res.json();
        alert(error.error || "Error creando usuario");
      }
    } else {
      const res = await fetch(`${apiUrl}/${selectedUser.value.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(form.value)
      });
      if (res.ok) {
        await fetchUsers();
      } else {
        const error = await res.json();
        alert(error.error || "Error actualizando usuario");
      }
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }

  closeFormModal();
}

// ── Modal: Ver ───────────────────────────────────────────────────
const isViewOpen = ref(false);

function openViewModal(user) {
  selectedUser.value = user;
  isViewOpen.value = true;
}

// ── Modal: Borrar ────────────────────────────────────────────────
const isDeleteOpen = ref(false);

function openDeleteConfirm(user) {
  selectedUser.value = user;
  isDeleteOpen.value = true;
}

async function confirmDelete() {
  try {
    const res = await fetch(`${apiUrl}/${selectedUser.value.id}`, {
      method: "DELETE",
      headers: { ...getAuthHeaders() }
    });
    if (res.ok) {
      await fetchUsers();
    } else {
      alert("Error eliminando usuario");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
  
  isDeleteOpen.value = false;
  selectedUser.value = null;
}
</script>
