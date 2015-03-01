(function(){
  var ThrottleDecorator = function ThrottleDecorator(validator) {
    this.validator = validator;
  };


  var throttle = function throttle(id, callback) {
    this.validator.validate(id, callback);
  };

  var fn = _.debounce(function() {
    console.log('fn', ids);

  }, 1000);

  var ids = [];


  ThrottleDecorator.prototype.validate = function(id, callback) {
    console.log('forward', id);
    ids.push(id);
    fn();

  };

  this.__ThrottleDecorator = ThrottleDecorator;
  return ThrottleDecorator;
}());