const { numberRule, stringRule } = require('./rules')

exports.cChoiceRule = {
  blogId: numberRule,
  img: stringRule,
  title: stringRule,
  userId: numberRule
}

exports.dChoiceRule = {
  id: numberRule
}