<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <table class="min-w-full">
      <thead>
        <tr class="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/20">
          <th class="px-5 py-4 text-left w-2/12 sm:px-6">
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 uppercase tracking-wider">Nombre</p>
          </th>
          <th class="px-5 py-4 text-left w-2/12 sm:px-6">
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 uppercase tracking-wider">Usuario</p>
          </th>
          <th class="px-5 py-4 text-left w-2/12 sm:px-6">
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 uppercase tracking-wider">Correo</p>
          </th>
          <th class="px-5 py-4 text-left w-2/12 sm:px-6">
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 uppercase tracking-wider">Rol</p>
          </th>
          <th class="px-5 py-4 text-left w-2/12 sm:px-6">
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 uppercase tracking-wider">Fecha de alta</p>
          </th>
          <th class="px-5 py-4 text-right w-2/12 sm:px-6">
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 uppercase tracking-wider">Acciones</p>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
        <tr
          v-for="user in filteredUsers"
          :key="user.id"
          class="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors"
        >
          <td class="px-5 py-4 sm:px-6">
            <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
              {{ user.name }}
            </span>
          </td>
          <td class="px-5 py-4 sm:px-6">
            <span class="text-gray-500 text-theme-sm dark:text-gray-400">{{ user.username }}</span>
          </td>
          <td class="px-5 py-4 sm:px-6">
            <span class="text-gray-500 text-theme-sm dark:text-gray-400">{{ user.email }}</span>
          </td>
          <td class="px-5 py-4 sm:px-6">
            <span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
              {{ user.role }}
            </span>
          </td>
          <td class="px-5 py-4 sm:px-6">
            <span class="text-gray-500 text-theme-sm dark:text-gray-400">{{ user.createdAt }}</span>
          </td>
          <td class="px-5 py-4 sm:px-6 text-right">
            <div class="flex items-center justify-end gap-3">
              <button
                @click="$emit('view', user)"
                class="p-1.5 text-gray-500 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg transition-colors"
                title="Ver"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2.45801 12C3.73228 7.94288 7.52257 5 12.0002 5C16.4778 5 20.2681 7.94291 21.5424 12C20.2681 16.0571 16.4778 19 12.0002 19C7.52256 19 3.73226 16.0571 2.45801 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button
                @click="$emit('edit', user)"
                class="p-1.5 text-gray-500 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg transition-colors"
                title="Editar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button
                @click="$emit('delete', user)"
                class="p-1.5 text-gray-500 hover:text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10 rounded-lg transition-colors"
                title="Borrar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="filteredUsers.length === 0">
          <td colspan="6" class="px-5 py-12 text-center text-gray-500 dark:text-gray-400">
            <div class="flex flex-col items-center justify-center">
              <svg class="w-12 h-12 mb-3 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              <p>No se encontraron usuarios.</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
  users: {
    type: Array,
    default: () => []
  }
})

defineEmits(['view', 'edit', 'delete'])

const filteredUsers = computed(() => {
  if (!props.searchQuery) return props.users

  const query = props.searchQuery.toLowerCase()
  return props.users.filter(user =>
    user.name.toLowerCase().includes(query) ||
    user.username.toLowerCase().includes(query)
  )
})
</script>
