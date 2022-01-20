import http from "./index.js";
/* 登录信息 */
export const loginGet = (data) => {
  return http.get("/login/cellphone", {
    data: data,
  });
};

/* 发现页信息 */
export const discoveryInfoGet = (data) => {
  return http.get("/homepage/block/page", {
    data: data,
  });
};
/* 发现页入口 */
export const discoveryBallIconGet = (data) => {
  return http.get("/homepage/dragon/ball", {
    data: data,
  });
};
/* 歌词获取 */
export const lyricGet = (data) => {
  return http.get("/lyric", {
    data: data,
  });
};
/* 默认搜索关键词 */
export const searchDefaultGet = (data) => {
	return http.get("/search/default",{
		data: data,
	});
}
/* 搜索页信息获取 */
export const searchGet = (data) => {
	return http.get("/search",{
		data: data,
	});
}
/* 热搜get */
export const searchHotGet = (data) => {
	return http.get("/search/hot/detail",{
		data: data,
	});
}
/* 搜索建议get */
export const searchSugGet = (data) => {
	return http.get("/search/suggest",{
		data: data,
	});
}