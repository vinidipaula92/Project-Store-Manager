const express = require('express');
const productRoute = require('./routes/productRoute');
const salesRoute = require('./routes/salesRoute');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoute);

// app.use('/sales', salesRoute);

// app.use((err, _req, res, _next) => {
//   switch (err.name) {
//     case 'ValidationError':
//       res.status(400).json({
//         error: err.message,
//       });
//       break;
//     case 'NotFoundError':
//       res.status(404).json({
//         error: err.message,
//       });
//       break;
//     default:
//       res.status(500);
//   }
// })

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;