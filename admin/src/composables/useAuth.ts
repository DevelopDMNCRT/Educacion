import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const token = ref<string | null>(localStorage.getItem('token'));
const user = ref<any>(JSON.parse(localStorage.getItem('user') || 'null'));

export function useAuth() {
  const router = useRouter();

  const isAuthenticated = computed(() => !!token.value);
  const currentUser = computed(() => user.value);

  const setAuth = (newToken: string, newUser: any) => {
    token.value = newToken;
    user.value = newUser;
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (router) {
      router.push('/signin');
    }
  };

  const getAuthHeaders = () => {
    return token.value ? { 'Authorization': `Bearer ${token.value}` } : {};
  };

  return {
    isAuthenticated,
    currentUser,
    setAuth,
    logout,
    getAuthHeaders
  };
}
