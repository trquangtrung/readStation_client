export default defineNuxtRouteMiddleware((to, from) => {
  let layout = "";
  // console.log("🚀 ~ defineNuxtRouteMiddleware ~ to:", to)
  if (to.fullPath.startsWith("/admin")) {
    layout = "admin-default";
  } else if (
    to.fullPath.startsWith("/login") ||
    to.fullPath.startsWith("/register") ||
    to.name === "404" ||
    to.fullPath.startsWith("/reset-password") ||
    to.fullPath.startsWith("/forgot-password") ||
    to.fullPath.startsWith("/verify-email") ||
    to.fullPath.startsWith("/verify-code") ||
    to.fullPath.startsWith("/send-email") ||
    to.fullPath.startsWith("/account/wallet/transaction-success") ||
    to.fullPath.startsWith("/account/wallet/transaction-error")
  ) {
    layout = "none-default";
  } else if (to.fullPath.startsWith("/account/order/checkout")) {
    layout = "client-default";
  } else if (to.fullPath.startsWith("/account")) {
    layout = "account-default";
  } else {
    layout = "client-default";
  }

  to.meta.layout = layout as any;
});
