const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Home.vue") },
      {
        path: "/moviePage/:id",
        component: () => import("pages/MoviePage.vue")
      },
      {
        path: "/genrePage/:id",
        component: () => import("pages/GenrePage.vue")
      },
      {
        path: "/searchPage/:query",
        component: () => import("pages/SearchPage.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
