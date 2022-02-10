import { getNewsById, parseText } from "@1r21/youyihe";
Page({
  data: {
    nodes: [],
  },
  async onLoad(option) {
    const { id } = option || {};
    const { transcript, date } = await getNewsById(id)
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