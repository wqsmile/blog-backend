const { numberRule, stringRule } = require('./rules')

exports.cComRule = {
  blogId: numberRule,
  username: stringRule,
  profile: stringRule,
  time: {
    presence: {
      allowEmpty: false
    },
    // type: 'number'
  },
  comment: stringRule
}

exports.rComRule = {
  id: numberRule,
}