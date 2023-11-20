import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminView from "../views/AdminView.vue";
import Dashboard from "../views/DashboardView.vue";
import VotersView from "../views/VotersView.vue";
import Positions from "../views/PositionsView.vue";
import Candidates from "../views/CandidatesView.vue";
import VoterList from "../views/VoterListView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    meta: { requiresAuth: true, role: 1 },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { requiresAuth: true, role: 1 },
      },
      {
        path: "/positions",
        name: "positions",
        component: Positions,
        meta: { requiresAuth: true, role: 1 },
      },
      {
        path: "/candidates",
        name: "candidates",
        component: Candidates,
        meta: { requiresAuth: true, role: 1 },
      },
      {
        path: "/voterlist",
        name: "voterlist",
        component: VoterList,
        meta: { requiresAuth: true, role: 1 },
      },
    ],
  },
  {
    path: "/voters",
    name: "voters",
    component: VotersView,
    meta: { requiresAuth: true, role: 2 },
  },

  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if the user is authenticated
    const userRole = localStorage.getItem("user_role");
    if (userRole) {
      // Check if the user has the required role
      const requiredRole = to.meta.role;
      if (parseInt(userRole) === requiredRole) {
        next();
      } else {
        next("/");
      }
    } else {
      next("/");
    }
  } else if (to.path === "/") {
    const userRole = localStorage.getItem("user_role");
    if (userRole) {
      if (parseInt(userRole) === 1) {
        // Redirect to /admin/dashboard for user with role 1
        next("/dashboard");
      } else if (parseInt(userRole) === 2) {
        // Redirect to /voters for user with role 2
        next("/voters");
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
