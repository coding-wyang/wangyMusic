import http from './index';
/* 登录信息 */
export const loginGet = (data) => http.get('/login/cellphone', {
  data,
});

/* 发现页信息 */
export const discoveryInfoGet = (data) => http.get('/homepage/block/page', {
  data,
});
/* 发现页入口 */
export const discoveryBallIconGet = (data) => http.get('/homepage/dragon/ball', {
  data,
});
/* 歌词获取 */
export const lyricGet = (data) => http.get('/lyric', {
  data,
});
/* 默认搜索关键词 */
export const searchDefaultGet = (data) => http.get('/search/default', {
  data,
});
/* 搜索页信息获取 */
export const searchGet = (data) => http.get('/search', {
  data,
});
/* 热搜get */
export const searchHotGet = (data) => http.get('/search/hot/detail', {
  data,
});
/* 搜索建议get */
export const searchSugGet = (data) => http.get('/search/suggest', {
  data,
});
