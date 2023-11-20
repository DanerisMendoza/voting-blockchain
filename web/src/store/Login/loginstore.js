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
    // Logout() {
    //   const token = localStorage.getItem("token"); // Replace with your actual token getter
    //   api
    //     .post(
    //       "/api/Logout",
    //       {},
    //       {
    //         headers: {
    //           Authorization: "Bearer " + token,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       console.log(response);
    //       localStorage.removeItem("user_role");
    //       localStorage.removeItem("token");
    //       router.push({ path: "/" });
    //     })
    //     .catch((error) => {
    //       console.error("Logout error:", error);
    //     });
    // },

    Logout({ commit }) {
      const token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        api
          .post(
            "api/Logout",
            {},
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((response) => {
            if (response.data.message === "success") {
              localStorage.removeItem("user_role");
              localStorage.removeItem("token");
              router.push({ path: "/" });
              resolve(response.data);
            } else {
              reject(new Error("Logout failed"));
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
