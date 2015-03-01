(function(){
  var DebounceDecorator = function DebounceDecorator(validator) {
    this.validator = validator;

    this._ids = [];
    this._callback;
  };



  DebounceDecorator.prototype.validate = function(id, callback) {
    var fn = _.debounce(_.bind(function() {
      var data = _.clone(this._ids);
      this._ids = [];
      this.validator.validate(data, this._callback);
    }, this), 1000);

    this._ids.push(id);
    if (!this._callback) this._callback = callback;
    fn();
  };

  this.__DebounceDecorator = DebounceDecorator;
  return DebounceDecorator;
}());