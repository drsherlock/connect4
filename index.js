const app = require('./app');
var winston = require('./winston');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  winston.info(`App listening at http://localhost:${port}`)
});