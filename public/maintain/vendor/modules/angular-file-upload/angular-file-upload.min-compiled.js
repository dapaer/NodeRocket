/*
 angular-file-upload v1.1.1
 https://github.com/nervgh/angular-file-upload
*/
!function (a, b) {
  return "function" == typeof define && define.amd ? (define("angular-file-upload", ["angular"], function (a) {
    return b(a);
  }), void 0) : b(a);
}("undefined" == typeof angular ? null : angular, function (a) {
  var b = a.module("angularFileUpload", []);return b.value("fileUploaderOptions", { url: "/", alias: "file", headers: {}, queue: [], progress: 0, autoUpload: !1, removeAfterUpload: !1, method: "POST", filters: [], formData: [], queueLimit: Number.MAX_VALUE, withCredentials: !1 }).factory("FileUploader", ["fileUploaderOptions", "$rootScope", "$http", "$window", "$compile", function (b, c, d, e, f) {
    function g(c) {
      var d = a.copy(b);a.extend(this, d, c, { isUploading: !1, _nextIndex: 0, _failFilterIndex: -1, _directives: { select: [], drop: [], over: [] } }), this.filters.unshift({ name: "queueLimit", fn: this._queueLimitFilter }), this.filters.unshift({ name: "folder", fn: this._folderFilter });
    }function h(b) {
      var c = a.isElement(b),
          d = c ? b.value : b,
          e = a.isString(d) ? "FakePath" : "Object",
          f = "_createFrom" + e;this[f](d);
    }function i(b, c, d) {
      var e = a.isElement(c),
          f = e ? a.element(c) : null,
          h = e ? null : c;a.extend(this, { url: b.url, alias: b.alias, headers: a.copy(b.headers), formData: a.copy(b.formData), removeAfterUpload: b.removeAfterUpload, withCredentials: b.withCredentials, method: b.method }, d, { uploader: b, file: new g.FileLikeObject(c), isReady: !1, isUploading: !1, isUploaded: !1, isSuccess: !1, isCancel: !1, isError: !1, progress: 0, index: null, _file: h, _input: f }), f && this._replaceNode(f);
    }function j(b) {
      a.extend(this, b), this.uploader._directives[this.prop].push(this), this._saveLinks(), this.bind();
    }function k() {
      k.super_.apply(this, arguments), this.uploader.isHTML5 || this.element.removeAttr("multiple"), this.element.prop("value", null);
    }function l() {
      l.super_.apply(this, arguments);
    }function m() {
      m.super_.apply(this, arguments);
    }return g.prototype.isHTML5 = !(!e.File || !e.FormData), g.prototype.addToQueue = function (b, c, d) {
      var e = this.isArrayLikeObject(b) ? b : [b],
          f = this._getFilters(d),
          h = this.queue.length,
          i = [];a.forEach(e, function (a) {
        var b = new g.FileLikeObject(a);if (this._isValidFile(b, f, c)) {
          var d = new g.FileItem(this, a, c);i.push(d), this.queue.push(d), this._onAfterAddingFile(d);
        } else {
          var e = this.filters[this._failFilterIndex];this._onWhenAddingFileFailed(b, e, c);
        }
      }, this), this.queue.length !== h && (this._onAfterAddingAll(i), this.progress = this._getTotalProgress()), this._render(), this.autoUpload && this.uploadAll();
    }, g.prototype.removeFromQueue = function (a) {
      var b = this.getIndexOfItem(a),
          c = this.queue[b];c.isUploading && c.cancel(), this.queue.splice(b, 1), c._destroy(), this.progress = this._getTotalProgress();
    }, g.prototype.clearQueue = function () {
      for (; this.queue.length;) this.queue[0].remove();this.progress = 0;
    }, g.prototype.uploadItem = function (a) {
      var b = this.getIndexOfItem(a),
          c = this.queue[b],
          d = this.isHTML5 ? "_xhrTransport" : "_iframeTransport";c._prepareToUploading(), this.isUploading || (this.isUploading = !0, this[d](c));
    }, g.prototype.cancelItem = function (a) {
      var b = this.getIndexOfItem(a),
          c = this.queue[b],
          d = this.isHTML5 ? "_xhr" : "_form";c && c.isUploading && c[d].abort();
    }, g.prototype.uploadAll = function () {
      var b = this.getNotUploadedItems().filter(function (a) {
        return !a.isUploading;
      });b.length && (a.forEach(b, function (a) {
        a._prepareToUploading();
      }), b[0].upload());
    }, g.prototype.cancelAll = function () {
      var b = this.getNotUploadedItems();a.forEach(b, function (a) {
        a.cancel();
      });
    }, g.prototype.isFile = function (a) {
      var b = e.File;return b && a instanceof b;
    }, g.prototype.isFileLikeObject = function (a) {
      return a instanceof g.FileLikeObject;
    }, g.prototype.isArrayLikeObject = function (b) {
      return a.isObject(b) && "length" in b;
    }, g.prototype.getIndexOfItem = function (b) {
      return a.isNumber(b) ? b : this.queue.indexOf(b);
    }, g.prototype.getNotUploadedItems = function () {
      return this.queue.filter(function (a) {
        return !a.isUploaded;
      });
    }, g.prototype.getReadyItems = function () {
      return this.queue.filter(function (a) {
        return a.isReady && !a.isUploading;
      }).sort(function (a, b) {
        return a.index - b.index;
      });
    }, g.prototype.destroy = function () {
      a.forEach(this._directives, function (b) {
        a.forEach(this._directives[b], function (a) {
          a.destroy();
        }, this);
      }, this);
    }, g.prototype.onAfterAddingAll = function () {}, g.prototype.onAfterAddingFile = function () {}, g.prototype.onWhenAddingFileFailed = function () {}, g.prototype.onBeforeUploadItem = function () {}, g.prototype.onProgressItem = function () {}, g.prototype.onProgressAll = function () {}, g.prototype.onSuccessItem = function () {}, g.prototype.onErrorItem = function () {}, g.prototype.onCancelItem = function () {}, g.prototype.onCompleteItem = function () {}, g.prototype.onCompleteAll = function () {}, g.prototype._getTotalProgress = function (a) {
      if (this.removeAfterUpload) return a || 0;var b = this.getNotUploadedItems().length,
          c = b ? this.queue.length - b : this.queue.length,
          d = 100 / this.queue.length,
          e = (a || 0) * d / 100;return Math.round(c * d + e);
    }, g.prototype._getFilters = function (b) {
      if (a.isUndefined(b)) return this.filters;if (a.isArray(b)) return b;var c = b.split(/\s*,/);return this.filters.filter(function (a) {
        return -1 !== c.indexOf(a.name);
      }, this);
    }, g.prototype._render = function () {
      c.$$phase || c.$apply();
    }, g.prototype._folderFilter = function (a) {
      return !(!a.size && !a.type);
    }, g.prototype._queueLimitFilter = function () {
      return this.queue.length < this.queueLimit;
    }, g.prototype._isValidFile = function (a, b, c) {
      return this._failFilterIndex = -1, b.length ? b.every(function (b) {
        return this._failFilterIndex++, b.fn.call(this, a, c);
      }, this) : !0;
    }, g.prototype._isSuccessCode = function (a) {
      return a >= 200 && 300 > a || 304 === a;
    }, g.prototype._transformResponse = function (b) {
      return a.forEach(d.defaults.transformResponse, function (a) {
        b = a(b);
      }), b;
    }, g.prototype._parseHeaders = function (b) {
      function c(a) {
        return a.replace(/^\s+/, "").replace(/\s+$/, "");
      }function d(a) {
        return a.toLowerCase();
      }var e,
          f,
          g,
          h = {};return b ? (a.forEach(b.split("\n"), function (a) {
        g = a.indexOf(":"), e = d(c(a.substr(0, g))), f = c(a.substr(g + 1)), e && (h[e] = h[e] ? h[e] + ", " + f : f);
      }), h) : h;
    }, g.prototype._xhrTransport = function (b) {
      var c = b._xhr = new XMLHttpRequest(),
          d = new FormData(),
          e = this;e._onBeforeUploadItem(b), a.forEach(b.formData, function (b) {
        a.forEach(b, function (a, b) {
          d.append(b, a);
        });
      }), d.append(b.alias, b._file, b.file.name), c.upload.onprogress = function (a) {
        var c = Math.round(a.lengthComputable ? 100 * a.loaded / a.total : 0);e._onProgressItem(b, c);
      }, c.onload = function () {
        var a = e._parseHeaders(c.getAllResponseHeaders()),
            d = e._transformResponse(c.response),
            f = e._isSuccessCode(c.status) ? "Success" : "Error",
            g = "_on" + f + "Item";e[g](b, d, c.status, a), e._onCompleteItem(b, d, c.status, a);
      }, c.onerror = function () {
        var a = e._parseHeaders(c.getAllResponseHeaders()),
            d = e._transformResponse(c.response);e._onErrorItem(b, d, c.status, a), e._onCompleteItem(b, d, c.status, a);
      }, c.onabort = function () {
        var a = e._parseHeaders(c.getAllResponseHeaders()),
            d = e._transformResponse(c.response);e._onCancelItem(b, d, c.status, a), e._onCompleteItem(b, d, c.status, a);
      }, c.open(b.method, b.url, !0), c.withCredentials = b.withCredentials, a.forEach(b.headers, function (a, b) {
        c.setRequestHeader(b, a);
      }), c.send(d), this._render();
    }, g.prototype._iframeTransport = function (b) {
      var c = a.element('<form style="display: none;" />'),
          d = a.element('<iframe name="iframeTransport' + Date.now() + '">'),
          e = b._input,
          f = this;b._form && b._form.replaceWith(e), b._form = c, f._onBeforeUploadItem(b), e.prop("name", b.alias), a.forEach(b.formData, function (b) {
        a.forEach(b, function (b, d) {
          c.append(a.element('<input type="hidden" name="' + d + '" value="' + b + '" />'));
        });
      }), c.prop({ action: b.url, method: "POST", target: d.prop("name"), enctype: "multipart/form-data", encoding: "multipart/form-data" }), d.bind("load", function () {
        try {
          var a = d[0].contentDocument.body.innerHTML;
        } catch (c) {}var e = { response: a, status: 200, dummy: !0 },
            g = f._transformResponse(e.response),
            h = {};f._onSuccessItem(b, g, e.status, h), f._onCompleteItem(b, g, e.status, h);
      }), c.abort = function () {
        var a,
            g = { status: 0, dummy: !0 },
            h = {};d.unbind("load").prop("src", "javascript:false;"), c.replaceWith(e), f._onCancelItem(b, a, g.status, h), f._onCompleteItem(b, a, g.status, h);
      }, e.after(c), c.append(e).append(d), c[0].submit(), this._render();
    }, g.prototype._onWhenAddingFileFailed = function (a, b, c) {
      this.onWhenAddingFileFailed(a, b, c);
    }, g.prototype._onAfterAddingFile = function (a) {
      this.onAfterAddingFile(a);
    }, g.prototype._onAfterAddingAll = function (a) {
      this.onAfterAddingAll(a);
    }, g.prototype._onBeforeUploadItem = function (a) {
      a._onBeforeUpload(), this.onBeforeUploadItem(a);
    }, g.prototype._onProgressItem = function (a, b) {
      var c = this._getTotalProgress(b);this.progress = c, a._onProgress(b), this.onProgressItem(a, b), this.onProgressAll(c), this._render();
    }, g.prototype._onSuccessItem = function (a, b, c, d) {
      a._onSuccess(b, c, d), this.onSuccessItem(a, b, c, d);
    }, g.prototype._onErrorItem = function (a, b, c, d) {
      a._onError(b, c, d), this.onErrorItem(a, b, c, d);
    }, g.prototype._onCancelItem = function (a, b, c, d) {
      a._onCancel(b, c, d), this.onCancelItem(a, b, c, d);
    }, g.prototype._onCompleteItem = function (b, c, d, e) {
      b._onComplete(c, d, e), this.onCompleteItem(b, c, d, e);var f = this.getReadyItems()[0];return this.isUploading = !1, a.isDefined(f) ? (f.upload(), void 0) : (this.onCompleteAll(), this.progress = this._getTotalProgress(), this._render(), void 0);
    }, g.isFile = g.prototype.isFile, g.isFileLikeObject = g.prototype.isFileLikeObject, g.isArrayLikeObject = g.prototype.isArrayLikeObject, g.isHTML5 = g.prototype.isHTML5, g.inherit = function (a, b) {
      a.prototype = Object.create(b.prototype), a.prototype.constructor = a, a.super_ = b;
    }, g.FileLikeObject = h, g.FileItem = i, g.FileDirective = j, g.FileSelect = k, g.FileDrop = l, g.FileOver = m, h.prototype._createFromFakePath = function (a) {
      this.lastModifiedDate = null, this.size = null, this.type = "like/" + a.slice(a.lastIndexOf(".") + 1).toLowerCase(), this.name = a.slice(a.lastIndexOf("/") + a.lastIndexOf("\\") + 2);
    }, h.prototype._createFromObject = function (b) {
      this.lastModifiedDate = a.copy(b.lastModifiedDate), this.size = b.size, this.type = b.type, this.name = b.name;
    }, i.prototype.upload = function () {
      this.uploader.uploadItem(this);
    }, i.prototype.cancel = function () {
      this.uploader.cancelItem(this);
    }, i.prototype.remove = function () {
      this.uploader.removeFromQueue(this);
    }, i.prototype.onBeforeUpload = function () {}, i.prototype.onProgress = function () {}, i.prototype.onSuccess = function () {}, i.prototype.onError = function () {}, i.prototype.onCancel = function () {}, i.prototype.onComplete = function () {}, i.prototype._onBeforeUpload = function () {
      this.isReady = !0, this.isUploading = !0, this.isUploaded = !1, this.isSuccess = !1, this.isCancel = !1, this.isError = !1, this.progress = 0, this.onBeforeUpload();
    }, i.prototype._onProgress = function (a) {
      this.progress = a, this.onProgress(a);
    }, i.prototype._onSuccess = function (a, b, c) {
      this.isReady = !1, this.isUploading = !1, this.isUploaded = !0, this.isSuccess = !0, this.isCancel = !1, this.isError = !1, this.progress = 100, this.index = null, this.onSuccess(a, b, c);
    }, i.prototype._onError = function (a, b, c) {
      this.isReady = !1, this.isUploading = !1, this.isUploaded = !0, this.isSuccess = !1, this.isCancel = !1, this.isError = !0, this.progress = 0, this.index = null, this.onError(a, b, c);
    }, i.prototype._onCancel = function (a, b, c) {
      this.isReady = !1, this.isUploading = !1, this.isUploaded = !1, this.isSuccess = !1, this.isCancel = !0, this.isError = !1, this.progress = 0, this.index = null, this.onCancel(a, b, c);
    }, i.prototype._onComplete = function (a, b, c) {
      this.onComplete(a, b, c), this.removeAfterUpload && this.remove();
    }, i.prototype._destroy = function () {
      this._input && this._input.remove(), this._form && this._form.remove(), delete this._form, delete this._input;
    }, i.prototype._prepareToUploading = function () {
      this.index = this.index || ++this.uploader._nextIndex, this.isReady = !0;
    }, i.prototype._replaceNode = function (a) {
      var b = f(a.clone())(a.scope());b.prop("value", null), a.css("display", "none"), a.after(b);
    }, j.prototype.events = {}, j.prototype.bind = function () {
      for (var a in this.events) {
        var b = this.events[a];this.element.bind(a, this[b]);
      }
    }, j.prototype.unbind = function () {
      for (var a in this.events) this.element.unbind(a, this.events[a]);
    }, j.prototype.destroy = function () {
      var a = this.uploader._directives[this.prop].indexOf(this);this.uploader._directives[this.prop].splice(a, 1), this.unbind();
    }, j.prototype._saveLinks = function () {
      for (var a in this.events) {
        var b = this.events[a];this[b] = this[b].bind(this);
      }
    }, g.inherit(k, j), k.prototype.events = { $destroy: "destroy", change: "onChange" }, k.prototype.prop = "select", k.prototype.getOptions = function () {}, k.prototype.getFilters = function () {}, k.prototype.isEmptyAfterSelection = function () {
      return !!this.element.attr("multiple");
    }, k.prototype.onChange = function () {
      var a = this.uploader.isHTML5 ? this.element[0].files : this.element[0],
          b = this.getOptions(),
          c = this.getFilters();this.uploader.isHTML5 || this.destroy(), this.uploader.addToQueue(a, b, c), this.isEmptyAfterSelection() && this.element.prop("value", null);
    }, g.inherit(l, j), l.prototype.events = { $destroy: "destroy", drop: "onDrop", dragover: "onDragOver", dragleave: "onDragLeave" }, l.prototype.prop = "drop", l.prototype.getOptions = function () {}, l.prototype.getFilters = function () {}, l.prototype.onDrop = function (b) {
      var c = this._getTransfer(b);if (c) {
        var d = this.getOptions(),
            e = this.getFilters();this._preventAndStop(b), a.forEach(this.uploader._directives.over, this._removeOverClass, this), this.uploader.addToQueue(c.files, d, e);
      }
    }, l.prototype.onDragOver = function (b) {
      var c = this._getTransfer(b);this._haveFiles(c.types) && (c.dropEffect = "copy", this._preventAndStop(b), a.forEach(this.uploader._directives.over, this._addOverClass, this));
    }, l.prototype.onDragLeave = function (b) {
      b.target === this.element[0] && (this._preventAndStop(b), a.forEach(this.uploader._directives.over, this._removeOverClass, this));
    }, l.prototype._getTransfer = function (a) {
      return a.dataTransfer ? a.dataTransfer : a.originalEvent.dataTransfer;
    }, l.prototype._preventAndStop = function (a) {
      a.preventDefault(), a.stopPropagation();
    }, l.prototype._haveFiles = function (a) {
      return a ? a.indexOf ? -1 !== a.indexOf("Files") : a.contains ? a.contains("Files") : !1 : !1;
    }, l.prototype._addOverClass = function (a) {
      a.addOverClass();
    }, l.prototype._removeOverClass = function (a) {
      a.removeOverClass();
    }, g.inherit(m, j), m.prototype.events = { $destroy: "destroy" }, m.prototype.prop = "over", m.prototype.overClass = "nv-file-over", m.prototype.addOverClass = function () {
      this.element.addClass(this.getOverClass());
    }, m.prototype.removeOverClass = function () {
      this.element.removeClass(this.getOverClass());
    }, m.prototype.getOverClass = function () {
      return this.overClass;
    }, g;
  }]).directive("nvFileSelect", ["$parse", "FileUploader", function (a, b) {
    return { link: function (c, d, e) {
        var f = c.$eval(e.uploader);if (!(f instanceof b)) throw new TypeError('"Uploader" must be an instance of FileUploader');var g = new b.FileSelect({ uploader: f, element: d });g.getOptions = a(e.options).bind(g, c), g.getFilters = function () {
          return e.filters;
        };
      } };
  }]).directive("nvFileDrop", ["$parse", "FileUploader", function (a, b) {
    return { link: function (c, d, e) {
        var f = c.$eval(e.uploader);if (!(f instanceof b)) throw new TypeError('"Uploader" must be an instance of FileUploader');if (f.isHTML5) {
          var g = new b.FileDrop({ uploader: f, element: d });g.getOptions = a(e.options).bind(g, c), g.getFilters = function () {
            return e.filters;
          };
        }
      } };
  }]).directive("nvFileOver", ["FileUploader", function (a) {
    return { link: function (b, c, d) {
        var e = b.$eval(d.uploader);if (!(e instanceof a)) throw new TypeError('"Uploader" must be an instance of FileUploader');var f = new a.FileOver({ uploader: e, element: c });f.getOverClass = function () {
          return d.overClass || this.overClass;
        };
      } };
  }]), b;
});
//# sourceMappingURL=angular-file-upload.min.map

//# sourceMappingURL=angular-file-upload.min-compiled.js.map