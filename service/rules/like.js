const { numberRule } = require('./rules')

exports.cLikeRule = {
  id: numberRule,
  userId: numberRule,
  isLike: {
    presence: {
      allowEmpty: false
    },
    type: 'boolean'
  }
}