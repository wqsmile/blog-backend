exports.stringRule = {
  presence: {
    allowEmpty: false
  },
  type: 'string'
}

exports.numberRule = {
  presence: {
    allowEmpty: false
  },
  numericality: {
    onlyInteger: true,
    greaterThan: 0,
  }
}