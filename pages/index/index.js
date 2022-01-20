import { getTexts } from '../../services/api'

Page({
  data: {
    list: [],
  },
  async onLoad() {
    // wx.setNavigationBarTitle({
    //   title: 'I Believe'
    // })
    const { list } = await getTexts()
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
