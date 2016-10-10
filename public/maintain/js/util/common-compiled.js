/**
 * Created by Administrator on 2015/3/1.
 */
var allen = {};
allen.status = false;
allen.appId = "wx1c87db5c8d789b2f";
allen.debug = function (content) {
    if (app.status) {
        alert(content);
    }
};

allen.alert = function (content) {
    alert(content);
};

allen.toArray = function (list, field) {
    var resultArr = [];
    for (var i = 0; i < list.length; i++) {
        resultArr.push(list[i][field]);
    }
    return resultArr;
};

allen.console = function (content) {
    for (var arg in arguments) {
        console.info(arg);
    }
};
/**
 * 扩展Date对象的解析字符串方法
 * @param format 要过滤的格式
 * @author dapaer
 * @returns
 */
Date.prototype.parseStr = function (format) {
    var mths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var WEEKs = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var WEKs = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var YYYY = this.getFullYear() + ""; //2011 

    var YY = YYYY.substr(2); // 11 
    format = format.replaceAll("YYYY", YYYY);
    format = format.replaceAll("YY", YY);

    var M = this.getMonth() + 1;
    var MM = M < 10 ? "0" + M : M;
    var MMM = mths[M - 1];
    format = format.replaceAll("MMM", MMM);
    format = format.replaceAll("MM", MM);
    format = format.replaceAll("M", M);

    var D = this.getDate();
    var DD = D < 10 ? "0" + D : D;
    console.info(DD);
    format = format.replaceAll("DD", DD);
    format = format.replaceAll("D", D);

    var h = this.getHours();
    var hh = h < 10 ? "0" + h : h;
    format = format.replaceAll("hh", hh);
    format = format.replaceAll("h", h);
    var m = this.getMinutes();
    var mm = m < 10 ? "0" + m : m;
    format = format.replaceAll("mm", mm);
    format = format.replaceAll("m", m);
    var s = this.getSeconds();
    var ss = s < 10 ? "0" + s : s;
    format = format.replaceAll("ss", ss);
    format = format.replaceAll("s", s);
    var dayOfWeek = this.getDay();
    format = format.replaceAll("WEEK", WEEKs[dayOfWeek]);
    format = format.replaceAll("WEK", WEKs[dayOfWeek]);
    return format;
};

/**
 * 扩展Sting的转换Date方法
 * @author dapaer
 * @returns {Date} 返回的日期对象
 */
String.prototype.parseToDate = function () {
    console.info(this.value);
    if (this.length > 19) {
        this.value = this.substr(0, 19);
    }
    return new Date(this.replace(/-/g, "/").substr(0, 19));
};

/**
 * 扩展字符串的替换所有方法
 * @param src 原字符
 * @param dest 替换后字符
 * @author dapaer
 */
String.prototype.replaceAll = function (src, dest) {
    return this.replace(new RegExp(src, "gm"), dest);
};

String.prototype.parseStr = function () {
    return this;
};

//# sourceMappingURL=common-compiled.js.map