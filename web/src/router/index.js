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
        next(); // Allow access
      } else {
        // Redirect to a not authorized page or show an error message
        next("/"); // For example, redirect to the home page
      }
    } else {
      // Redirect to the login page if the user is not authenticated
      next("/"); // For example, redirect to the home page
    }
  } else if (to.path === "/") {
    // If the user is already authenticated, redirect them to their dashboard
    const userRole = localStorage.getItem("user_role");
    if (userRole) {
      if (parseInt(userRole) === 1) {
        next("/admin/dashboard");
      } else if (parseInt(userRole) === 2) {
        next("/voters");
      }
    } else {
      next(); // Allow access to the default path for non-authenticated users
    }
  } else {
    next(); // Allow access for routes that do not require authentication
  }
});

export default router;
