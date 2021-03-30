const fs = require('fs')
module.exports = function blobToFile(blob) {
  return new Promise((resolve, rejects) => {
    fs.readFile(blob, function (err, data) {
      resolve(data)
      rejects(err)
    })
  })
}