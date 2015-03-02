(function() {
  var fn;
  var DebounceDecorator = function DebounceDecorator(validator) {
    if (!validator || !_.isFunction(validator.validate)) throw new Error("Not a validator class with a validate function to decorate");
    this._ids = [];
    this._callback;


    fn = _.debounce(_.bind(function() {
      var data = _.clone(this._ids);
      this._ids = [];
      validator.validate(data, this._callback);
    }, this), 1000);
  };



  DebounceDecorator.prototype.validate = function(id, callback) {

    this._ids.push(id);
    if (!this._callback) this._callback = callback;
    fn();
  };

  this.__DebounceDecorator = DebounceDecorator;
  return DebounceDecorator;
}());