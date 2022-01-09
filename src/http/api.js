import http from "./index.js";

export const loginGet = (data) => {
  return http.get("/login/cellphone", {
    data: data,
  });
};

export const songListGet = (data) => {
  return http.get("/homepage/block/page", {
    data: data,
  });
};

export const lyricGet = (data) => {
  return http.get("/lyric", {
    data: data,
  });
};