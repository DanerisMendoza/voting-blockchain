import api from "@/api/index.js";
import router from "@/router/index";

export default {
  state: {
    userdetails: {},
  },

  getters: {
    GET_USER_DETAILS: (state) => state.userdetails,
  },

  mutations: {
    SET_USER_DETAILS: (state, data) => {
      state.userdetails = data;
    },
  },

  actions: {
    Login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api
          .post("api/Login", payload)
          .then((response) => {
            if (response.data.message == "Login Successfully!") {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("user_role", response.data.user_role);

              const checkrole = localStorage.getItem("user_role");

              if (checkrole == 1) {
                router.push({ path: "/dashboard" });
              } else if (checkrole == 2) {
                router.push({ path: "/votersdashboard" });
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

    UpdateLastVoteDate({ commit, payload }) {
      return new Promise((resolve, reject) => {
        api
          .patch("api/UpdateLastVoteDate", payload)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    GetUserDetails({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get("api/GetUserDetails")
          .then((response) => {
            commit("SET_USER_DETAILS", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
