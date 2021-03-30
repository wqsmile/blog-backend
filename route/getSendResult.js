exports.getErr = (err = 'server internal err', errCode = 500) => {
  return {
    code: errCode,
    msg: err
  }
}

exports.getRes = res => {
  if (res && res.errorCode || !res) {
    return {
      errorCode: 996,
      msg: res || '',
    }
  }
  return {
    code: 200,
    data: res || ''
  }
}

exports.asyncHandler = handler => {
  return async (ctx, next) => {
    try {
      const result = await handler(ctx, next)
      ctx.body = exports.getRes(result)
    } catch (err) {
      console.log(err);
      next(exports.getErr(err))
    }
  }
}