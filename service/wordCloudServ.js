const WordCloud = require('../model/wordCloud');
const validate = require('validate.js');
const { cRule, dRule } = require('./rules/wordCloudRule');
const returnErr = require('../util/returnErr')

const WCLength = 20

exports.getWordCloud = async function (flag) {
  const res = await WordCloud.findAll({
    attributes: ['id', 'title', 'num'],
    limit: flag ? null : WCLength,
    order: [['num', 'desc']]
  })
  if (res) {
    return JSON.parse(JSON.stringify(res))
  }
  return []
}

exports.setWordCloud = async function (title) {
  return await validate.async({ title }, cRule).then(async () => {
    const res = await exports.getWordCloud(true)
    if (res) {
      let lock = false
      let num = 0
      let newTitle = ''
      let id = 0
      for (const i in res) {
        const item = res[i]
        if (item.title.includes(title) || title.includes(item.title)) {
          num = item.num + 1
          newTitle = title.length > item.title.length ? title : item.title
          lock = true
          id = item.id
          break
        }
      }
      if (lock) {
        WordCloud.update({ title: newTitle, num }, {
          where: {
            id
          }
        })
      } else {
        WordCloud.create({
          title: title,
          num: 1
        })
      }
    }
  }).catch(err => returnErr(err))
}

exports.delWordCloud = async function (id) {
  return await validate.async({ id }, dRule).then(async () => {
    return await WordCloud.destroy({
      where: {
        id
      }
    }) ? true : null
  })
}