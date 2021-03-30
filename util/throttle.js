let = last = 0
const cache = []

/**
 * 有id的话表示同一篇文章在delay时间内不管访问多少次，都只算一次浏览
 */
module.exports = function throttle(func, delay, id) {
  if (!id) {
    return (function (...args) {
      const now = Date.now()
      if (now - last > delay) {
        func.apply(null, args)
        last = now
      }
    })();
  } else {
    if (!cache.includes(id)) {
      cache.unshift(id)
      return (function (...args) {
        func.apply(null, args)
      })();
    }
    const now = Date.now()
    if (now - last > delay) {
      cache.splice(cache.indexOf(id), 1)
      last = now
    }
  }
}