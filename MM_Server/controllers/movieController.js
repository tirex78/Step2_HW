const { pool } = require('../db')
const { bodyParser } = require('../utils')

exports.addMovies = async (req, res) => {
  try {
    await bodyParser(req)

    const { title, year, ganres } = req.body

    const query = 'INSERT INTO movie (title, year_release) VALUES ($1, $2) RETURNING *'
    const { rows } = await pool.query(query, [title, year]);

    if (ganres) {
      const ganre = ganres.split(',')
      const [{ id: movie_id }] = Object.values(rows)
      for (id in ganre) {
        await pool.query(`INSERT INTO movie_ganre (movie_id, ganre_id) VALUES ($1, $2)`, [movie_id, ganre[id]]);
      }
    }
    const data = {
      status: 200,
      data: rows
    }
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(data))
    res.end()
  } catch (err) {
    res.writeHead(400, { 'Content-type': 'text/plain' })
    res.write('Invalid body data was provided', err.message)
    res.end()
  }
}

exports.getMovies = async (req, res) => {

  const query = `SELECT
  m.id,
  m.title,
  m.year_release,
  g.title as ganre
  FROM movie m 
  INNER JOIN movie_ganre mg ON m.id = mg.movie_id
  INNER JOIN ganre g ON mg.ganre_id = g.id`

  const { rows } = await pool.query(query);
  const result = [];

  for (let data of rows) {
    let row = result.find(item => item.title == data.title);

    if (!row) row = { id: data.id, title: data.title, year: data.year_release, ganres: [] }, result.push(row);
    row.ganres.push(data.ganre);
  }

  const data = {
    status: 200,
    items: result.length,
    data: result
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
      const { rows } = await pool.query(
        'UPDATE movie SET title = $1, year_release = $2 WHERE id = $3 RETURNING *', [title, year, idValue]
      );
      if (ganres) {
        const ganre = ganres.split(',')
        const [{ id: movie_id }] = Object.values(rows)
        await pool.query('DELETE FROM movie_ganre WHERE movie_id = $1', [idValue])
        for (id in ganre) {
          await pool.query(`INSERT INTO movie_ganre (movie_id, ganre_id) VALUES ($1, $2)`, [movie_id, ganre[id]]);
        }
      }

      const data = {
        status: 200,
        data: rows
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
      'DELETE FROM movie WHERE id = $1', [idValue]
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
