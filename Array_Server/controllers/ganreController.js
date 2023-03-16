const { pool } = require('../db')
const { bodyParser } = require('../utils')

exports.addGanres = async (req, res) => {
  try {
    await bodyParser(req)

    const { title } = req.body

    const query = `INSERT INTO ganre (title) VALUES ($1) RETURNING *`
    const row = await pool.query(query, [title]);

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(row.rows))
    res.end()
  } catch (err) {
    res.writeHead(400, { 'Content-type': 'text/plain' })
    res.write('Invalid body data was provided', err.message)
    res.end()
  }
}

exports.getGanres = async (req, res) => {

  const row = await pool.query('SELECT id, title  FROM ganre'
  )
  const data = {
    status: 200,
    item: row.rowCount,
    data: row.rows
  }

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify(data))
  res.end()
}

exports.updateGanre = async (req, res) => {

  try {
    let url = req.url

    let idQuery = url.split('?')[1]
    let idKey = idQuery.split('=')[0]
    let idValue = idQuery.split('=')[1]

    if (idKey === 'id') {
      await bodyParser(req)
      const { title } = req.body
      const row = await pool.query(
        'UPDATE ganre SET title = $1 WHERE id = $2 RETURNING *', [title, idValue]
      );

      const data = {
        status: 200,
        data: row.rows
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.write(JSON.stringify(data))
      res.end()
    } else {
      res.writeHead(400, { 'Content-type': 'text/plain' })
      res.write('Invalid Query')
      res.end()
    }
  } catch (err) {
    res.writeHead(400, { 'Content-type': 'text/plain' })
    res.write('Invalid body data was provided', err.message)
    res.end()
  }
}
exports.deleteGanre = async (req, res) => {
  let url = req.url

  let idQuery = url.split('?')[1]
  let idKey = idQuery.split('=')[0]
  let idValue = idQuery.split('=')[1]

  if (idKey === 'id') {
    await pool.query(
      'DELETE FROM ganre WHERE id = $1 RETURNING *', [idValue]
    )

    res.writeHead(200, { 'Content-type': 'application/json' })
    res.write(JSON.stringify({
      status: 201,
      message: 'Delete Success'
    }))
    res.end()
  } else {
    res.writeHead(400, { 'Content-type': 'application/json' })
    res.write(JSON.stringify({
      status: 400,
      message: 'Invalid Query'
    }))
    res.end()
  }
}