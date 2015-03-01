(function() {
  var m = angular.module('app', []);

  m.controller('ctrl', function($scope) {
    var _t = this;
    var id = 0;
    var w = new Worker('validateWorker.js');
    w.onerror = function(e) { console.log('worker error: ', e); };
    w.onmessage = function(m) {
      var data = m.data;
//      console.log('client data', data, _t.data);
      _t.data.forEach(function(e) {
        var mat = _.find(data, function(p) { return p.id === e.id; });
        if (mat) {
          e.status = (mat.status == true) ? 'ok' : 'err';
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