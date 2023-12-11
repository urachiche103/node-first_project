const http = require('http');
const port = 3000;

function response(req, res) {
  console.log(req.url)

  res.setHeader('Content-Type', 'text/json')
    if (req.url === '/author') {
      res.end(JSON.stringify({nombre: 'Miguel', apellido: 'Torres', NIE: '123456789Z', email: 'miguel.torres@micorreo.com'}))
    } else if (req.url === '/books') {
      res.end(JSON.stringify([
        {
          id: 1,
        nombre: 'El Principito'
        },
        {
          id: 2,
          nombre: 'Algebra de Baldor'
        }
      ]))
    } else {
      res.end(JSON.stringify({msg: 'Error - route not found'}))
    }
}

const server = http.createServer(response);

server.listen(port, () => {
  console.log(`Server starter in http://localhost:${port}`);
});