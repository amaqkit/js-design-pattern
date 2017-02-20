/**
 * 单例模式
 */
var getSingle = function(fn) {
    var instance;
    return function() {
        console.log('instance', instance);
        if (!instance) {
            instance = fn.apply(this, arguments);
        }
        return instance || (instance = fn.apply(this, arguments));
    }
};

var getManager = function() {
    console.log('manager create');
    return 'Manager';
}

var createSingleManager = getSingle(getManager);
var createSingleManager = getSingle(getManager);
createSingleManager();
createSingleManager();

/**
 * this is wrong
 */
// var createSingleManager = getSingle(getManager);
// var createSingleManager2 = getSingle(getManager);
// createSingleManager();
// createSingleManager2();