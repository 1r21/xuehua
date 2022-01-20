import { getTextById } from '../../services/api'
import { parseText } from '../../utils/index'
Page({
  data: {
    nodes: [],
  },
  async onLoad(option) {
    const { id = 317 } = option || {};
    const { transcript, title, date } = await getTextById(id)
    const nodes = parseText(transcript)
    this.setData({
      nodes
    });
    wx.setNavigationBarTitle({
      title: date
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  playHandle() {

  },
})