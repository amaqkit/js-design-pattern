/**
 * 表单验证
 */

var Validator = function() {
    this.cache = [];
}

Validator.prototype.add = function(value, rule, errorMsg) {
    var ary = rule.split(':');
    this.cache.push(function() {
        var strategy = ary.shift();
        ary.unshift(value);
        ary.push(errorMsg);
        return strategies[strategy].apply(value, ary);
    });
}

Validator.prototype.valid = function(success, failed) {
    for (var i = 0, toValid; toValid = this.cache[i++];) {
        var msg = toValid();
        if (msg) {
            return failed(msg);
        }
    }
    success();
}

var strategies = {
    isNotEmpty: function(value, errorMsg) {
        if (value === '') {
            return errorMsg;
        }
    },
    minLength: function(value, length, errorMsg) {
        if (value.length < length) {
            return errorMsg;
        }
    }
};

var validator = new Validator();
validator.add('amakqit', 'isNotEmpty', 'user name can not be empty');
validator.add('12356', 'minLength:6', 'password length should be more than six');
var result = validator.valid(function() {
    console.log('valid success');
}, function(msg) {
    console.log(msg);
});