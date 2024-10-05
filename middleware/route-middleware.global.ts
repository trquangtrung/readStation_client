export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  
  if (authStore.isLogged) {
    if (to.fullPath.startsWith("/login") || to.fullPath.startsWith("/register")) {
      return navigateTo('/account')
    } else if (to.fullPath.startsWith("/admin") && (authStore?.authUser?.user?.role?.name !== 'admin' && authStore?.authUser?.user?.role?.name !== 'manager')) {
      return navigateTo('/404')
    }
  } else {
    if (to.fullPath.startsWith("/account")) {
      return navigateTo("/login")
    } else if (to.fullPath.startsWith("/admin")) {
      return navigateTo("/404")
    }
  }
});
