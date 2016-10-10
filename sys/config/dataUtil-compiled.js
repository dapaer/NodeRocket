var staticNum = 1;
var dataUtil = {
    /**
     * 判断数据是否为空
     * @param data 数据
     * @author dapaer
     * @returns {boolean}
     */
    isEmpty: function (data) {
        if (!data || data == "" || data.length == 0) {
            return true;
        }
        return false;
    },
    isFunction: function (func) {
        return func instanceof Function;
    },
    generateID: function () {
        staticNum++;
        return new Date().getTime() + staticNum;
    }
};
module.exports = dataUtil;

//# sourceMappingURL=dataUtil-compiled.js.map