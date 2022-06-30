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

app.use('/sales', salesRoute);

// app.use((err, _req, res, _next) => {
//   const { name, message } = err;
//   switch (name) {
//     case '"name" is required':
//       res.status(400).json({ message });
//       break;
//     case '"name" length must be at least 5 characters long':
//       res.status(422).json({ message });
//       break;
//     default:
//       console.warn(err); res.status(500);
//   }
// })

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;