import LoginView from "@/views/auth/login/index.vue";

// middleware
import GuestMiddleware from "@/middleware/guest.middleware.js";
import AuthLayout from "@/layouts/AuthLayout.vue";

export default [
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      title: "Login",
      layout: AuthLayout,
      middleware: [GuestMiddleware],
    },
  },
];
