const validate = require('validate.js')
const User = require('../../model/user')
const { numberRule, stringRule } = require('./rules')

exports.cUserRule = {
  username: {
    presence: {
      allowEmpty: false
    },
    length: {
      minimum: 4,
      maximum: 20,
    },
    isUserExist: true
  },
  password: {
    presence: {
      allowEmpty: false
    },
    length: {
      minimum: 8,
      maximum: 16
    },
  }
}

exports.rUserRule = {
  username: {
    presence: {
      allowEmpty: false
    }
  },
  password: {
    presence: {
      allowEmpty: false
    }
  }
}

exports.rInfoRule = {
  id: numberRule
}

exports.uInfoRule = {
  userId: numberRule,
  username: {
    presence: {
      allowEmpty: true
    },
    length: {
      minimum: 4,
      maximum: 20,
    },
    isUserExist: true
  },
  password: {
    presence: undefined,
    length: {
      minimum: 8,
      maximum: 16
    },
  },
  profile: {
    presence: undefined,
    type: 'string'
  },
  desc: {
    presence: undefined,
    type: 'string'
  },
  tag: {
    presence: undefined,
  }
}


validate.validators.isUserExist = async function (username) {
  const isExist = await User.findOne({
    where: {
      username
    }
  })
  if (isExist) {
    return 'is already exist!'
  }
}

