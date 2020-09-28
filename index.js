const express = require('express');
const morgan = require('morgan');

var winston = require('./winston');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('combined', { stream: winston.stream }));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500).send('Server Error');
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/api', routes);


app.get('*', function(req, res){
  winston.error(`404 - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(404).send('Page Not Found');
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});