const { pool } = require('../db')
const { bodyParser } = require('../utils')

exports.addMovies = async (req, res) => {
  try {
    await bodyParser(req)

    const { title, year, ganres } = req.body
    console.log(title)
    console.log(year)
    console.log(ganres)
    const query = `INSERT INTO movie (title, year, ganres) VALUES ($1, $2, $3) RETURNING *`
    const row = await pool.query(query, [title, year, ganres]);

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(row.rows))
    res.end()
  } catch (err) {
    res.writeHead(400, { 'Content-type': 'text/plain' })
    res.write('Invalid body data was provided', err.message)
    res.end()
  }
}

exports.getMovies = async (req, res) => {

  const query = `SELECT m.id, m.title, m.year
                , ARRAY(SELECT g.title
                FROM   unnest(m.ganres) WITH ORDINALITY AS a(id, ord)
                JOIN   ganre g USING (id)
                ORDER  BY a.ord) AS ganres
                FROM   movie m;`
  const row = await pool.query(query);
  const data = {
    status: 200,
    item: row.rowCount,
    data: row.rows
  }

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify(data))
  res.end()
}

exports.updateMovie = async (req, res) => {
  try {
    let url = req.url

    let idQuery = url.split('?')[1]
    let idKey = idQuery.split('=')[0]
    let idValue = idQuery.split('=')[1]

    if (idKey === 'id') {
      await bodyParser(req)
      const { title, year, ganres } = req.body
      const row = await pool.query(
        'UPDATE movie SET title = $1, year = $2, ganres = $3 WHERE id = $4 RETURNING *', [title, year, ganres, idValue]
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
exports.deleteMovie = async (req, res) => {
  let url = req.url

  let idQuery = url.split('?')[1]
  let idKey = idQuery.split('=')[0]
  let idValue = idQuery.split('=')[1]

  if (idKey === 'id') {
    await pool.query(
      'DELETE FROM movie WHERE id = $1 RETURNING *', [idValue]
    );
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
