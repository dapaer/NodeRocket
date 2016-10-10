(function (c) {
  var b = function (d, e) {
    this.options = e;this.$elementFilestyle = [];this.$element = c(d);
  };b.prototype = { clear: function () {
      this.$element.val("");this.$elementFilestyle.find(":text").val("");
    }, destroy: function () {
      this.$element.removeAttr("style").removeData("filestyle").val("");this.$elementFilestyle.remove();
    }, disabled: function (d) {
      if (d === true) {
        if (!this.options.disabled) {
          this.$element.attr("disabled", "true");this.$elementFilestyle.find("label").attr("disabled", "true");this.options.disabled = true;
        }
      } else {
        if (d === false) {
          if (this.options.disabled) {
            this.$element.removeAttr("disabled");this.$elementFilestyle.find("label").removeAttr("disabled");this.options.disabled = false;
          }
        } else {
          return this.options.disabled;
        }
      }
    }, buttonBefore: function (d) {
      if (d === true) {
        if (!this.options.buttonBefore) {
          this.options.buttonBefore = true;if (this.options.input) {
            this.$elementFilestyle.remove();this.constructor();this.pushNameFiles();
          }
        }
      } else {
        if (d === false) {
          if (this.options.buttonBefore) {
            this.options.buttonBefore = false;if (this.options.input) {
              this.$elementFilestyle.remove();this.constructor();this.pushNameFiles();
            }
          }
        } else {
          return this.options.buttonBefore;
        }
      }
    }, icon: function (d) {
      if (d === true) {
        if (!this.options.icon) {
          this.options.icon = true;this.$elementFilestyle.find("label").prepend(this.htmlIcon());
        }
      } else {
        if (d === false) {
          if (this.options.icon) {
            this.options.icon = false;this.$elementFilestyle.find(".glyphicon").remove();
          }
        } else {
          return this.options.icon;
        }
      }
    }, input: function (d) {
      if (d === true) {
        if (!this.options.input) {
          this.options.input = true;if (this.options.buttonBefore) {
            this.$elementFilestyle.append(this.htmlInput());
          } else {
            this.$elementFilestyle.prepend(this.htmlInput());
          }this.$elementFilestyle.find(".badge").remove();var e = "",
              g = [];if (this.$element[0].files === undefined) {
            g[0] = { name: this.$element[0].value };
          } else {
            g = this.$element[0].files;
          }for (var f = 0; f < g.length; f++) {
            e += g[f].name.split("\\").pop() + ", ";
          }if (e !== "") {
            this.$elementFilestyle.find(":text").val(e.replace(/\, $/g, ""));
          }this.$elementFilestyle.find(".group-span-filestyle").addClass("input-group-btn");
        }
      } else {
        if (d === false) {
          if (this.options.input) {
            this.options.input = false;this.$elementFilestyle.find(":text").remove();var g = [];if (this.$element[0].files === undefined) {
              g[0] = { name: this.$element[0].value };
            } else {
              g = this.$element[0].files;
            }if (g.length > 0) {
              this.$elementFilestyle.find("label").append(' <span class="badge">' + g.length + "</span>");
            }this.$elementFilestyle.find(".group-span-filestyle").removeClass("input-group-btn");
          }
        } else {
          return this.options.input;
        }
      }
    }, size: function (d) {
      if (d !== undefined) {
        var f = this.$elementFilestyle.find("label"),
            e = this.$elementFilestyle.find("input");f.removeClass("btn-lg btn-sm");e.removeClass("input-lg input-sm");if (d != "nr") {
          f.addClass("btn-" + d);e.addClass("input-" + d);
        }
      } else {
        return this.options.size;
      }
    }, buttonText: function (d) {
      if (d !== undefined) {
        this.options.buttonText = d;this.$elementFilestyle.find("label span").html(this.options.buttonText);
      } else {
        return this.options.buttonText;
      }
    }, buttonName: function (d) {
      if (d !== undefined) {
        this.options.buttonName = d;this.$elementFilestyle.find("label").attr({ "class": "btn " + this.options.buttonName });
      } else {
        return this.options.buttonName;
      }
    }, iconName: function (d) {
      if (d !== undefined) {
        this.$elementFilestyle.find(".glyphicon").attr({ "class": ".glyphicon " + this.options.iconName });
      } else {
        return this.options.iconName;
      }
    }, htmlIcon: function () {
      if (this.options.icon) {
        return '<span class="glyphicon ' + this.options.iconName + '"></span> ';
      } else {
        return "";
      }
    }, htmlInput: function () {
      if (this.options.input) {
        return '<input type="text" class="form-control ' + (this.options.size == "nr" ? "" : "input-" + this.options.size) + '" disabled> ';
      } else {
        return "";
      }
    }, pushNameFiles: function () {
      var d = "",
          f = [];if (this.$element[0].files === undefined) {
        f[0] = { name: this.$element.value };
      } else {
        f = this.$element[0].files;
      }for (var e = 0; e < f.length; e++) {
        d += f[e].name.split("\\").pop() + ", ";
      }if (d !== "") {
        this.$elementFilestyle.find(":text").val(d.replace(/\, $/g, ""));
      } else {
        this.$elementFilestyle.find(":text").val("");
      }
    }, constructor: function () {
      var i = this,
          g = "",
          h = this.$element.attr("id"),
          d = [],
          j = "",
          f,
          e;if (h === "" || !h) {
        h = "filestyle-" + c(".bootstrap-filestyle").length;this.$element.attr({ id: h });
      }j = '<span class="group-span-filestyle ' + (this.options.input ? "input-group-btn" : "") + '"><label for="' + h + '" class="btn ' + this.options.buttonName + " " + (this.options.size == "nr" ? "" : "btn-" + this.options.size) + '" ' + (this.options.disabled ? 'disabled="true"' : "") + ">" + this.htmlIcon() + this.options.buttonText + "</label></span>";g = this.options.buttonBefore ? j + this.htmlInput() : this.htmlInput() + j;this.$elementFilestyle = c('<div class="bootstrap-filestyle input-group">' + g + "</div>");f = this.$elementFilestyle.find("label");e = f.parent();e.attr("tabindex", "0").keypress(function (k) {
        if (k.keyCode === 13 || k.charCode === 32) {
          f.click();
        }
      });this.$element.css({ position: "absolute", clip: "rect(0,0,0,0)" }).attr("tabindex", "-1").after(this.$elementFilestyle);if (this.options.disabled) {
        this.$element.attr("disabled", "true");
      }this.$element.change(function () {
        var k = "";if (this.files === undefined) {
          d[0] = { name: this.value };
        } else {
          d = this.files;
        }for (var l = 0; l < d.length; l++) {
          k += d[l].name.split("\\").pop() + ", ";
        }if (k !== "") {
          i.$elementFilestyle.find(":text").val(k.replace(/\, $/g, ""));
        } else {
          i.$elementFilestyle.find(":text").val("");
        }if (i.options.input == false) {
          if (i.$elementFilestyle.find(".badge").length == 0) {
            i.$elementFilestyle.find("label").append(' <span class="badge">' + d.length + "</span>");
          } else {
            if (d.length == 0) {
              i.$elementFilestyle.find(".badge").remove();
            } else {
              i.$elementFilestyle.find(".badge").html(d.length);
            }
          }
        } else {
          i.$elementFilestyle.find(".badge").remove();
        }
      });if (window.navigator.userAgent.search(/firefox/i) > -1) {
        this.$elementFilestyle.find("label").click(function () {
          i.$element.click();return false;
        });
      }
    } };var a = c.fn.filestyle;c.fn.filestyle = function (e, d) {
    var f = "",
        g = this.each(function () {
      if (c(this).attr("type") === "file") {
        var j = c(this),
            h = j.data("filestyle"),
            i = c.extend({}, c.fn.filestyle.defaults, e, typeof e === "object" && e);if (!h) {
          j.data("filestyle", h = new b(this, i));h.constructor();
        }if (typeof e === "string") {
          f = h[e](d);
        }
      }
    });if (typeof f !== undefined) {
      return f;
    } else {
      return g;
    }
  };c.fn.filestyle.defaults = { buttonText: "Choose file", iconName: "glyphicon-folder-open", buttonName: "btn-default", size: "nr", input: true, icon: true, buttonBefore: false, disabled: false };c.fn.filestyle.noConflict = function () {
    c.fn.filestyle = a;return this;
  };c(function () {
    c(".filestyle").each(function () {
      var e = c(this),
          d = { input: e.attr("data-input") === "false" ? false : true, icon: e.attr("data-icon") === "false" ? false : true, buttonBefore: e.attr("data-buttonBefore") === "true" ? true : false, disabled: e.attr("data-disabled") === "true" ? true : false, size: e.attr("data-size"), buttonText: e.attr("data-buttonText"), buttonName: e.attr("data-buttonName"), iconName: e.attr("data-iconName") };e.filestyle(d);
    });
  });
})(window.jQuery);

//# sourceMappingURL=bootstrap-filestyle.min-compiled.js.map