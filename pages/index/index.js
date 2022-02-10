import { getNews } from '@1r21/youyihe'

Page({
  data: {
    list: [],
  },
  async onLoad() {
    const { list } = await getNews()
    this.setData({ list })
  },
  goDetail(event) {
    const { dataset } = event.currentTarget
    const { id } = dataset
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },
})
