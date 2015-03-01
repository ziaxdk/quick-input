(function(GlobalWorkerSpace){
  importScripts('bower_components/lodash/lodash.js');
  importScripts('ajaxValidator.js');
  importScripts('debounceDecorator.js');


  var validator = new __DebounceDecorator(new __AjaxValidator());
  //var validator = ;

  onmessage = function(e) {

    var data = e.data;
    validator.validate(data.id, function(err, resp) {
      postMessage(resp);
    });

  }
}(this)); 