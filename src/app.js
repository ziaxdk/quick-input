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

    this.data = [];

    this.submit = function() {
      var data = { status: 'new', id: id++, val: this.input };
      this.data.push(data);
      this.input = null;
      w.postMessage(data);
    };
  });

  m.controller('ctrl2', function($scope) {
    var _t = this;
    var id = 0;
    var validator = new __DebounceDecorator(new __AjaxValidator());


    this.data = [];

    this.submit = function() {
      var data = { status: 'new', id: id++, val: this.input };
      this.data.push(data);
      this.input = null;
      validator.validate(data.id, function(err, data) {
        //console.log('client data', data, _t.data);
        //return;        
        _t.data.forEach(function(e) {
          var mat = _.find(data, function(p) { return p.id === e.id; });
          if (mat) {
            e.status = (mat.status == true) ? 'ok' : 'err';
            $scope.$digest();
          }
        });
      });
    };
  });
}());