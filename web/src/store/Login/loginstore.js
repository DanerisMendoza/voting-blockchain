import api from "@/api/index.js";
import router from "@/router/index";

export default {
  state: {},

  getters: {},

  mutations: {},

  actions: {
    Login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api
          .post("api/Login", payload)
          .then((response) => {
            if (response.data.message == "success") {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("user_role", response.data.user_role);

              const checkrole = localStorage.getItem("user_role");

              if (checkrole == 1) {
                router.push({ path: "/admin" });
              } else if (checkrole == 2) {
                router.push({ path: "/voters" });
              } else {
                router.push({ path: "/" });
              }
            }

            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
