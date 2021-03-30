module.exports = function returnErr(err) {
  console.log('err', err);
  return err ? {
    ...err,
    errorCode: 996
  } : null
}