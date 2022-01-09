import Vuex from 'vuex'
const store = new Vuex.Store({
	state: {
		playing: {
			songId: '',
			songList: [], //当前歌单列表
			songName: '', //歌曲
			songArtist: '', //歌手
			songLyric: '', //歌词
			nowTime: '',
		}
	},
	getters: {
		nowTime: state => state.playing.nowTime,
		songLyric: state => state.playing.songLyric,
		songId: state => state.playing.id,
		songList: state => state.playing.songList,
		songName: state => state.playing.songName,
		songArtist: state => state.playing.songArtist,
	},
	mutations: {
		setNowTime: ( state, nowTime) => { state.playing.nowTime = nowTime },
		setSongLyric: ( state, songLyric) => { state.playing.songLyric = songLyric },
		setSongId: ( state, songId ) => { state.playing.songId = songId },
		setSongList: ( state, songList ) => { state.playing.songList = songList},
		setSongName: ( state, songName ) => { state.playing.songName = songName},
		setSongArtist: ( state, songArtist ) => { state.playing.songArtist = songArtist},
	}
});

export default store;