const http = require('http')
const { addMovies, getMovies, updateMovie, deleteMovie } = require('./controllers/movieController')
const { getGanres, addGanres, updateGanre, deleteGanre } = require('./controllers/ganreController')

const server = http.createServer((req, res) => {
  const url = req.url
  const method = req.method
  const idValue = req.url.split('?')[1]

  switch (method) {
    case 'POST':
      if (url === '/api/movies') {
        addMovies(req, res)
      } else if (url === '/api/ganres') {
        addGanres(req, res)
      }
      break

    case 'GET':
      if (url === '/api/movies') {
        getMovies(req, res)
      } else if (url === '/api/ganres') {
        getGanres(req, res)
      }
      break

    case 'PATCH':
      if (url === `/api/movies?${idValue}`) {
        updateMovie(req, res)
      } else if (url === `/api/ganres?${idValue}`) {
        updateGanre(req, res)
      }
      break

    case 'DELETE':
      if (url === `/api/movies?${idValue}`) {
        deleteMovie(req, res)
      } else if (url === `/api/ganres?${idValue}`) {
        deleteGanre(req, res)
      }
      break

    default:
      res.writeHead(400, { 'Content-type': 'text/plain' })
      res.write('Invalid URL')
      res.end()
  }
})
server.listen(4000, () => {
  console.log(`Server running on Port 4000`)
})