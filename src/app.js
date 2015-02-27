(function() {
  var m = angular.module('app', []);

  m.controller('ctrl', function($scope) {
    var _t = this;
    var id = 0;
    var w = new Worker('validateWorker.js');
    w.onerror = function(e) { console.log('worker error: ', e); };
    w.onmessage = function(m) {
      var data = m.data;
      _t.data.forEach(function(e) {
        if (e.id === data.id) {
          e.status = (data.status == true) ? 'ok' : 'err';
          $scope.$digest();
        }
      });
    };

    this.data = [{ status: 'validated', id: id++, val: 'static' }];

    this.submit = function() {
      var data = { status: 'new', id: id++, val: this.input };
      this.data.push(data);
      this.input = null;
      w.postMessage(data);
    }
  });

}());