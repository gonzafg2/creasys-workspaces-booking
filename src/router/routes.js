const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Busqueda",
        component: () => import("pages/Busqueda.vue")
      },
      {
        path: "",
        name: "Reservar",
        component: () => import("pages/Reservar.vue")
      },
      {
        path: "",
        name: "Calendario",
        component: () => import("pages/Calendario.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("pages/Login.vue")
  },
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
