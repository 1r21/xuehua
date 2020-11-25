import parse from 'mini-html-parser2';
import { getAudios } from '/services/api'

Page({
  data: {
    list: [],
    audio: {},
    cover: '',
    nodes: [],
  },
  async onLoad() {
    const result = await getAudios()
    this.setData({ list: result.list })
  },
  playHandle(index) {
    const audio = this.data.list[index]
    parse(audio.transcript, (err, nodes) => {
      console.log(nodes)
      if (!err) {
        this.setData({
          cover: audio.cover,
          nodes,
        });
      }
    })
  }
})
