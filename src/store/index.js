import Vuex from 'vuex'
const store = new Vuex.Store({
	state: {
		playing: {
			songId: '',
			songList: [], //当前歌单列表
			songName: '', //歌曲
			songArtist: '', //歌手
			songLyric: '', //歌词
			playIcon:'',//播放切换
			isShowAudio: '',
			isShowFooter: '',
			songUrl: '',
			maxTime: '',
			currentTime: 0,
			isPlaying: '',
			nowTime: '',
			keyWord: '',
			playingList:[],
		}
	},
	getters: {
		playingList: state => state.playing.playingList,
		keyWord: state => state.playing.keyWord,
		isShowFooter: state => state.playing.isShowFooter,
		isPlaying: state => state.playing.isPlaying,
		currentTime: state => state.playing.currentTime,
		maxTime: state => state.playing.maxTime,
		songUrl: state => state.playing.songUrl,
		isShowAudio: state => state.playing.isShowAudio,
		playIcon: state => state.playing.playIcon,
		nowTime: state => state.playing.nowTime,
		songLyric: state => state.playing.songLyric,
		songId: state => state.playing.id,
		songList: state => state.playing.songList,
		songName: state => state.playing.songName,
		songArtist: state => state.playing.songArtist,
	},
	mutations: {
		setPlayingList: ( state, playingList ) => { state.playing.playingList = playingList},
		setKeyWord: ( state, keyWord ) => { state.playing.keyWord = keyWord},
		setIsShowFooter: ( state, isShowFooter ) => { state.playing.isShowFooter = isShowFooter},
		setIsPlaying: ( state, isPlaying ) => { state.playing.isPlaying = isPlaying},
		setCurrentTime: ( state, currentTime ) => { state.playing.currentTime = currentTime},
		setMaxTime: ( state, maxTime ) => { state.playing.maxTime = maxTime},
		setSongUrl: ( state, songUrl ) => { state.playing.songUrl = songUrl},
		setIsShowAudio: ( state, isShowAudio ) => { state.playing.isShowAudio = isShowAudio },
		setPlayIcon: ( state, playIcon ) => { state.playing.playIcon = playIcon },
		setNowTime: ( state, nowTime) => { state.playing.nowTime = nowTime },
		setSongLyric: ( state, songLyric) => { state.playing.songLyric = songLyric },
		setSongId: ( state, songId ) => { state.playing.songId = songId },
		setSongList: ( state, songList ) => { state.playing.songList = songList},
		setSongName: ( state, songName ) => { state.playing.songName = songName},
		setSongArtist: ( state, songArtist ) => { state.playing.songArtist = songArtist},
	}
});

export default store;