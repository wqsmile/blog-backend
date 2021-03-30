const Choiceness = require('../model/choiceness')
const validate = require('validate.js')
const returnErr = require('../util/returnErr')
const { dChoiceRule, cChoiceRule } = require('./rules/choiceRule')

exports.getChoiceness = async function () {
  return await Choiceness.findAll({
    limit: 6
  })
}

exports.setChoiceness = async function (params) {
  return await validate.async(params, cChoiceRule).then(async () => {
    return await Choiceness.create(params) ? true : null
  }).catch(err => returnErr(err))
}

exports.delChoiceness = async function (id) {
  return await validate.async({ id }, dChoiceRule).then(async () => {
    return await Choiceness.destroy({
      where: {
        id
      }
    }) ? true : null
  }).catch(err => returnErr(err))
}