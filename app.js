const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const logger = require('morgan')
const router = require('./router')
const app = express()

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', router)
/*
app.use((req, res, next)=>{
	res.sendFile(path.resolve(__dirname, 'dist/index.html'));	
})
*/
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(err.message);
});


module.exports = app;