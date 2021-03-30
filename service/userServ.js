const md5 = require('md5')
const validate = require('validate.js')
const { cUserRule, rUserRule, rInfoRule, uInfoRule } = require('./rules/userRule')
const User = require('../model/user')
const returnErr = require('../util/returnErr')

// 注册
exports.register = async function (username, password) {
  return await validate.async({ username, password }, cUserRule).then(async function () {
    const res = await User.create({
      username,
      password: md5(password)
    })
    return res ? res.toJSON().username : null
  }).catch(err => returnErr(err))
}

// 登录
exports.login = async function (username, password) {
  return await validate.async({ username, password }, rUserRule).then(async () => {
    const res = await User.findOne({
      where: {
        username,
        password: md5(password)
      }
    })
    if (res) {
      const { username, id, profile } = res.toJSON()
      return {
        username, id, profile
      }
    }
    return null
  }).catch(err => returnErr(err))
}

exports.getInfo = async function (id) {
  return await validate.async({ id }, rInfoRule).then(async () => {
    const res = await User.findByPk(id, {
      attributes: ['username', 'desc', 'profile', 'tag']
    })
    if (res) {
      return res.toJSON()
    }
  })
}

exports.setInfo = async function (params) {
  return await validate.async({ username: '1234', password: '11111111', profile: '', desc: '', tag: [], ...params }, uInfoRule).then(async () => {
    if (params.password) {
      params.password = md5(params.password)
    }
    return await User.update({ ...params }, {
      where: {
        id: params.userId
      }
    }) ? true : null
  }).catch(err => returnErr(err))
}