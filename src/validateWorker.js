onmessage = function(e) {
//  console.log('Message received from main script');
//  var workerResult = 'Result';
//  console.log('Posting message back to main script');
//  postMessage(workerResult);
  var data = e.data;
  setTimeout(function() {
    postMessage({ id: data.id, status: Math.round( Math.random()) });
  }, 500);
}