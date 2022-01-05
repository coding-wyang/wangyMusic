import http from "./index.js";

export const loginGet = (data) => {
  return http.get("/login/cellphone", {
    data: data,
  });
};
