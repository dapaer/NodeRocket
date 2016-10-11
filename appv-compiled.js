var a = function* () {
   var a = yield 1;
   var b = yield 2;
   console.log(a, b);
};

var ab = a();
console.info(ab.next());
console.info(ab.next(1));
console.info(ab.next(2));

//# sourceMappingURL=appv-compiled.js.map