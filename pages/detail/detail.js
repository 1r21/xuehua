import { getNewsById, translate as t } from "@1r21/api-wx";
import { parseText, Translation } from "@1r21/util";


Page({
  data: {
    nodes: [],
    paused: true,
  },
  async onLoad(option) {
    const { id = 410 } = option || {};
    const { transcript, date, src, cover } = await getNewsById(id);
    const nodes = parseText(transcript);
    this.setData({
      nodes,
      cover,
    });
    wx.setNavigationBarTitle({
      title: date,
    });
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = src;

    innerAudioContext.onPlay(() => {
      console.log("start play");
    });

    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    });

    this.innerAudioContext = innerAudioContext;
  },
  onUnload() {
    this.innerAudioContext.stop()
  },
  play() {
    this.setData({
      paused: false,
    });
    this.innerAudioContext.play();
  },
  pause() {
    this.setData({
      paused: true,
    });
    this.innerAudioContext.pause();
  },
  goBack() {
    wx.navigateTo({
      url: `/pages/index/index`,
    });
  },
  async doTranslate(event) {
    const { dataset } = event.currentTarget
    const { text } = dataset
    const texts = this.data.nodes;
    if (!text.trans) {
      const { list = [] } = await t(text.value);
      if (list && list.length) {
        const [first] = list
        const updateNodes = texts.map(v => ({
          ...v,
          trans: v.type === 'text' && v.value === first.src ? first.dst : ''
        }))
        this.setData({
          nodes: updateNodes
        })
      }
    }
  },
});
