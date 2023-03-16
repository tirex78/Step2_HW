exports.bodyParser = async (req) => {
  return new Promise((resolve, reject) => {
    let data = ''
    req
      .on('error', err => {
        console.error(err)
        reject()
      })
      .on('data', chunk => {
        data += chunk
      })
      .on('end', () => {
        req.body = JSON.parse(data)
        resolve()
      })
  })
}