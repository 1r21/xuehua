Component({
  data: {
    listVisible: false,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    currentIndex: 0,
    progress: 0, // percent
    progressWidth: 0,
  },
  props: {
    list: [],
    // 当前的audio
    current: {},
    onPlay: null,
  },
  didUpdate(prevProps, prevData) {
    const { current, list } = this.props;
    if (prevProps.current.src !== current.src) {
      if (list.lenght <= 0) return;
      const currentIndex = list.findIndex(item => item.src === current.src)
      this.setData({
        currentIndex
      })
      this.playAudio(list[currentIndex])
    }

    if (prevProps.list.length !== list.length) {
      const { src } = this.manager;
      const currentIndex = list.findIndex(item => item.src === src);
      if (currentIndex > 0) {
        this.props.onPlay(currentIndex)
        this.setData({
          currentIndex
        })
      }
    }
  },
  didMount() {
    dd.createSelectorQuery().select('#progress').boundingClientRect().exec(result => {
      const [rect] = result;
      const { width } = rect;
      this.setData({
        progressWidth: width
      })
    })

    this.manager = dd.getBackgroundAudioManager();

    // 初始化播放状态
    if (!this.manager.paused) {
      this.setData({
        isPlaying: true
      })
    }

    this.manager.onPlay = () => {
      this.setData({
        isPlaying: true
      })
    }

    this.manager.onPause = () => {
      this.setData({
        isPlaying: false
      })
    }

    this.manager.onEnded = () => {
      this.setData({
        isPlaying: false
      })
    }

    this.manager.onTimeUpdate = event => {
      const { currentTime } = event;
      const { duration } = this.manager;
      // 开始播放时可能获取不到总时长
      if (this.data.duration === 0) {
        console.log('duration', duration)
        this.setData({ duration })
      }
      this.setData({
        currentTime,
        progress: ((currentTime / this.manager.duration) * 100).toFixed(4)
      })
    }


  },
  methods: {
    playAudio(audio) {
      const { src, title, cover } = audio
      this.manager.title = title;
      this.manager.coverImgUrl = cover;
      this.manager.src = src;
      this.manager.seek(0);
      this.props.onPlay(this.data.currentIndex)
      this.setData({
        duration: this.manager.duration
      })
    },
    playItem(e) {
      const { current } = e.target.dataset;
      const { list } = this.props;
      const currentIndex = list.findIndex(item => item.src === current.src)
      this.setData({
        currentIndex
      })
      this.playAudio(current);
      this.closeList();
    },
    seek(e) {
      const { offsetLeft } = e.currentTarget;
      const { clientX } = e.detail;
      const { duration, progressWidth } = this.data
      const progress = (clientX - offsetLeft) / progressWidth;
      const currentTime = duration * progress;
      this.manager.seek(currentTime)
    },
    play() {
      if (this.manager.paused) {
        this.manager.play();
      }
    },
    pause() {
      if (!this.manager.paused) {
        this.manager.pause();
      }
    },
    prev() {
      const { list } = this.props
      let { currentIndex } = this.data;
      currentIndex--
      if (currentIndex >= 0) {
        this.setData({
          currentIndex
        })
        this.playAudio(list[currentIndex])
      }
    },
    next() {
      const { list } = this.props
      let { currentIndex } = this.data;
      currentIndex++;
      if (currentIndex < list.length) {

        this.setData({
          currentIndex
        })
        this.playAudio(list[currentIndex])
      }
    },
    showList() {
      this.setData({
        listVisible: true,
      })
    },
    closeList() {
      this.setData({
        listVisible: false,
      })
    }
  },
});
