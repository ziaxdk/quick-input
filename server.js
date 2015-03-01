var express = require('express'),
    _ = require('lodash'),
    app = express()
 
// app.use(bundle);
app.use(express.static('./src'));

app.get('/api/validate', function(req, res) {
  var validate = function(id) {
    return { id: parseInt(id), status: Math.round( Math.random()) };
  };

  var ids = _.uniq(_.compact((req.query.ids || '').split(',')));
  res.json( _.map(ids, validate) );

});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
});