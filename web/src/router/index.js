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
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "/positions",
        name: "positions",
        component: Positions,
      },
      {
        path: "/candidates",
        name: "candidates",
        component: Candidates,
      },
      {
        path: "/voterlist",
        name: "voterlist",
        component: VoterList,
      },
    ],
  },
  {
    path: "/voters",
    name: "voters",
    component: VotersView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
