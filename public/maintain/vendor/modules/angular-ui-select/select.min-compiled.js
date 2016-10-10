/*!
 * ui-select
 * http://github.com/angular-ui/ui-select
 * Version: 0.8.3 - 2014-10-14T18:22:05.432Z
 * License: MIT
 */
!function () {
  "use strict";
  var e = { TAB: 9, ENTER: 13, ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, SHIFT: 16, CTRL: 17, ALT: 18, PAGE_UP: 33, PAGE_DOWN: 34, HOME: 36, END: 35, BACKSPACE: 8, DELETE: 46, COMMAND: 91, isControl: function (t) {
      var c = t.which;switch (c) {case e.COMMAND:case e.SHIFT:case e.CTRL:case e.ALT:
          return !0;}return t.metaKey ? !0 : !1;
    }, isFunctionKey: function (e) {
      return e = e.which ? e.which : e, e >= 112 && 123 >= e;
    }, isVerticalMovement: function (t) {
      return ~[e.UP, e.DOWN].indexOf(t);
    }, isHorizontalMovement: function (t) {
      return ~[e.LEFT, e.RIGHT, e.BACKSPACE, e.DELETE].indexOf(t);
    } };void 0 === angular.element.prototype.querySelectorAll && (angular.element.prototype.querySelectorAll = function (e) {
    return angular.element(this[0].querySelectorAll(e));
  }), angular.module("ui.select", []).constant("uiSelectConfig", { theme: "bootstrap", searchEnabled: !0, placeholder: "", refreshDelay: 1e3 }).service("uiSelectMinErr", function () {
    var e = angular.$$minErr("ui.select");return function () {
      var t = e.apply(this, arguments),
          c = t.message.replace(new RegExp("\nhttp://errors.angularjs.org/.*"), "");return new Error(c);
    };
  }).service("RepeatParser", ["uiSelectMinErr", "$parse", function (e, t) {
    var c = this;c.parse = function (c) {
      var l = c.match(/^\s*(?:([\s\S]+?)\s+as\s+)?([\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if (!l) throw e("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", c);return { itemName: l[2], source: t(l[3]), trackByExp: l[4], modelMapper: t(l[1] || l[2]) };
    }, c.getGroupNgRepeatExpression = function () {
      return "$group in $select.groups";
    }, c.getNgRepeatExpression = function (e, t, c, l) {
      var s = e + " in " + (l ? "$group.items" : t);return c && (s += " track by " + c), s;
    };
  }]).controller("uiSelectCtrl", ["$scope", "$element", "$timeout", "RepeatParser", "uiSelectMinErr", function (t, c, l, s, i) {
    function n() {
      p.resetSearchInput && (p.search = d, p.selected && p.items.length && !p.multiple && (p.activeIndex = p.items.indexOf(p.selected)));
    }function a(t) {
      var c = !0;switch (t) {case e.DOWN:
          !p.open && p.multiple ? p.activate(!1, !0) : p.activeIndex < p.items.length - 1 && p.activeIndex++;break;case e.UP:
          !p.open && p.multiple ? p.activate(!1, !0) : p.activeIndex > 0 && p.activeIndex--;break;case e.TAB:
          (!p.multiple || p.open) && p.select(p.items[p.activeIndex], !0);break;case e.ENTER:
          p.open ? p.select(p.items[p.activeIndex]) : p.activate(!1, !0);break;case e.ESC:
          p.close();break;default:
          c = !1;}return c;
    }function r(t) {
      function c() {
        switch (t) {case e.LEFT:
            return ~p.activeMatchIndex ? u : n;case e.RIGHT:
            return ~p.activeMatchIndex && a !== n ? r : (p.activate(), !1);case e.BACKSPACE:
            return ~p.activeMatchIndex ? (p.removeChoice(a), u) : n;case e.DELETE:
            return ~p.activeMatchIndex ? (p.removeChoice(p.activeMatchIndex), a) : !1;}
      }var l = o(h[0]),
          s = p.selected.length,
          i = 0,
          n = s - 1,
          a = p.activeMatchIndex,
          r = p.activeMatchIndex + 1,
          u = p.activeMatchIndex - 1,
          d = a;return l > 0 || p.search.length && t == e.RIGHT ? !1 : (p.close(), d = c(), p.activeMatchIndex = p.selected.length && d !== !1 ? Math.min(n, Math.max(i, d)) : -1, !0);
    }function o(e) {
      return angular.isNumber(e.selectionStart) ? e.selectionStart : e.value.length;
    }function u() {
      var e = c.querySelectorAll(".ui-select-choices-content"),
          t = e.querySelectorAll(".ui-select-choices-row");if (t.length < 1) throw i("choices", "Expected multiple .ui-select-choices-row but got '{0}'.", t.length);var l = t[p.activeIndex],
          s = l.offsetTop + l.clientHeight - e[0].scrollTop,
          n = e[0].offsetHeight;s > n ? e[0].scrollTop += s - n : s < l.clientHeight && (p.isGrouped && 0 === p.activeIndex ? e[0].scrollTop = 0 : e[0].scrollTop -= l.clientHeight - s);
    }var p = this,
        d = "";p.placeholder = void 0, p.search = d, p.activeIndex = 0, p.activeMatchIndex = -1, p.items = [], p.selected = void 0, p.open = !1, p.focus = !1, p.focusser = void 0, p.disabled = void 0, p.searchEnabled = void 0, p.resetSearchInput = void 0, p.refreshDelay = void 0, p.multiple = !1, p.disableChoiceExpression = void 0, p.isEmpty = function () {
      return angular.isUndefined(p.selected) || null === p.selected || "" === p.selected;
    };var h = c.querySelectorAll("input.ui-select-search");if (1 !== h.length) throw i("searchInput", "Expected 1 input.ui-select-search but got '{0}'.", h.length);p.activate = function (e, t) {
      p.disabled || p.open || (t || n(), p.focusser.prop("disabled", !0), p.open = !0, p.activeMatchIndex = -1, p.activeIndex = p.activeIndex >= p.items.length ? 0 : p.activeIndex, l(function () {
        p.search = e || p.search, h[0].focus();
      }));
    }, p.findGroupByName = function (e) {
      return p.groups && p.groups.filter(function (t) {
        return t.name === e;
      })[0];
    }, p.parseRepeatAttr = function (e, c) {
      function l(e) {
        p.groups = [], angular.forEach(e, function (e) {
          var l = t.$eval(c),
              s = angular.isFunction(l) ? l(e) : e[l],
              i = p.findGroupByName(s);i ? i.items.push(e) : p.groups.push({ name: s, items: [e] });
        }), p.items = [], p.groups.forEach(function (e) {
          p.items = p.items.concat(e.items);
        });
      }function n(e) {
        p.items = e;
      }var a = c ? l : n;p.parserResult = s.parse(e), p.isGrouped = !!c, p.itemProperty = p.parserResult.itemName, t.$watchCollection(p.parserResult.source, function (e) {
        if (void 0 === e || null === e) p.items = [];else {
          if (!angular.isArray(e)) throw i("items", "Expected an array but got '{0}'.", e);if (p.multiple) {
            var t = e.filter(function (e) {
              return p.selected.indexOf(e) < 0;
            });a(t);
          } else a(e);p.ngModel.$modelValue = null;
        }
      }), p.multiple && t.$watchCollection("$select.selected", function (e) {
        var c = p.parserResult.source(t);if (e.length) {
          var l = c.filter(function (t) {
            return e.indexOf(t) < 0;
          });a(l);
        } else a(c);p.sizeSearchInput();
      });
    };var v;p.refresh = function (e) {
      void 0 !== e && (v && l.cancel(v), v = l(function () {
        t.$eval(e);
      }, p.refreshDelay));
    }, p.setActiveItem = function (e) {
      p.activeIndex = p.items.indexOf(e);
    }, p.isActive = function (e) {
      return p.open && p.items.indexOf(e[p.itemProperty]) === p.activeIndex;
    }, p.isDisabled = function (e) {
      if (p.open) {
        var t,
            c = p.items.indexOf(e[p.itemProperty]),
            l = !1;return c >= 0 && !angular.isUndefined(p.disableChoiceExpression) && (t = p.items[c], l = !!e.$eval(p.disableChoiceExpression), t._uiSelectChoiceDisabled = l), l;
      }
    }, p.select = function (e, c) {
      if (void 0 === e || !e._uiSelectChoiceDisabled) {
        var l = {};l[p.parserResult.itemName] = e, p.onSelectCallback(t, { $item: e, $model: p.parserResult.modelMapper(t, l) }), p.multiple ? (p.selected.push(e), p.sizeSearchInput()) : p.selected = e, p.close(c);
      }
    }, p.close = function (e) {
      p.open && (n(), p.open = !1, p.multiple || l(function () {
        p.focusser.prop("disabled", !1), e || p.focusser[0].focus();
      }, 0, !1));
    }, p.toggle = function (e) {
      p.open ? p.close() : p.activate(), e.preventDefault(), e.stopPropagation();
    }, p.removeChoice = function (e) {
      var c = p.selected[e],
          l = {};l[p.parserResult.itemName] = c, p.selected.splice(e, 1), p.activeMatchIndex = -1, p.sizeSearchInput(), p.onRemoveCallback(t, { $item: c, $model: p.parserResult.modelMapper(t, l) });
    }, p.getPlaceholder = function () {
      return p.multiple && p.selected.length ? void 0 : p.placeholder;
    };var f;p.sizeSearchInput = function () {
      var e = h[0],
          c = h.parent().parent()[0];h.css("width", "10px");var s = function () {
        var t = c.clientWidth - e.offsetLeft - 10;50 > t && (t = c.clientWidth), h.css("width", t + "px");
      };l(function () {
        0 !== c.clientWidth || f ? f || s() : f = t.$watch(function () {
          return c.clientWidth;
        }, function (e) {
          0 !== e && (s(), f(), f = null);
        });
      }, 0, !1);
    }, h.on("keydown", function (c) {
      var l = c.which;t.$apply(function () {
        var t = !1;p.multiple && e.isHorizontalMovement(l) && (t = r(l)), !t && p.items.length > 0 && (t = a(l)), t && l != e.TAB && (c.preventDefault(), c.stopPropagation());
      }), e.isVerticalMovement(l) && p.items.length > 0 && u();
    }), h.on("blur", function () {
      l(function () {
        p.activeMatchIndex = -1;
      });
    }), t.$on("$destroy", function () {
      h.off("keydown blur");
    });
  }]).directive("uiSelect", ["$document", "uiSelectConfig", "uiSelectMinErr", "$compile", "$parse", function (t, c, l, s, i) {
    return { restrict: "EA", templateUrl: function (e, t) {
        var l = t.theme || c.theme;return l + (angular.isDefined(t.multiple) ? "/select-multiple.tpl.html" : "/select.tpl.html");
      }, replace: !0, transclude: !0, require: ["uiSelect", "ngModel"], scope: !0, controller: "uiSelectCtrl", controllerAs: "$select", link: function (c, n, a, r, o) {
        function u(e) {
          var t = !1;t = window.jQuery ? window.jQuery.contains(n[0], e.target) : n[0].contains(e.target), t || (p.close(), c.$digest());
        }var p = r[0],
            d = r[1],
            h = n.querySelectorAll("input.ui-select-search");p.multiple = angular.isDefined(a.multiple) ? "" === a.multiple ? !0 : "true" === a.multiple.toLowerCase() : !1, p.onSelectCallback = i(a.onSelect), p.onRemoveCallback = i(a.onRemove), d.$parsers.unshift(function (e) {
          var t,
              l = {};if (p.multiple) {
            for (var s = [], i = p.selected.length - 1; i >= 0; i--) l = {}, l[p.parserResult.itemName] = p.selected[i], t = p.parserResult.modelMapper(c, l), s.unshift(t);return s;
          }return l = {}, l[p.parserResult.itemName] = e, t = p.parserResult.modelMapper(c, l);
        }), d.$formatters.unshift(function (e) {
          var t,
              l = p.parserResult.source(c, { $select: { search: "" } }),
              s = {};if (l) {
            if (p.multiple) {
              var i = [],
                  n = function (e, l) {
                if (e && e.length) {
                  for (var n = e.length - 1; n >= 0; n--) if (s[p.parserResult.itemName] = e[n], t = p.parserResult.modelMapper(c, s), t == l) return i.unshift(e[n]), !0;return !1;
                }
              };if (!e) return i;for (var a = e.length - 1; a >= 0; a--) n(p.selected, e[a]) || n(l, e[a]);return i;
            }var r = function (l) {
              return s[p.parserResult.itemName] = l, t = p.parserResult.modelMapper(c, s), t == e;
            };if (p.selected && r(p.selected)) return p.selected;for (var o = l.length - 1; o >= 0; o--) if (r(l[o])) return l[o];
          }return e;
        }), p.ngModel = d;var v = angular.element("<input ng-disabled='$select.disabled' class='ui-select-focusser ui-select-offscreen' type='text' aria-haspopup='true' role='button' />");a.tabindex && a.$observe("tabindex", function (e) {
          p.multiple ? h.attr("tabindex", e) : v.attr("tabindex", e), n.removeAttr("tabindex");
        }), s(v)(c), p.focusser = v, p.multiple || (n.append(v), v.bind("focus", function () {
          c.$evalAsync(function () {
            p.focus = !0;
          });
        }), v.bind("blur", function () {
          c.$evalAsync(function () {
            p.focus = !1;
          });
        }), v.bind("keydown", function (t) {
          return t.which === e.BACKSPACE ? (t.preventDefault(), t.stopPropagation(), p.select(void 0), void c.$apply()) : void (t.which === e.TAB || e.isControl(t) || e.isFunctionKey(t) || t.which === e.ESC || ((t.which == e.DOWN || t.which == e.UP || t.which == e.ENTER || t.which == e.SPACE) && (t.preventDefault(), t.stopPropagation(), p.activate()), c.$digest()));
        }), v.bind("keyup input", function (t) {
          t.which === e.TAB || e.isControl(t) || e.isFunctionKey(t) || t.which === e.ESC || t.which == e.ENTER || t.which === e.BACKSPACE || (p.activate(v.val()), v.val(""), c.$digest());
        })), c.$watch("searchEnabled", function () {
          var e = c.$eval(a.searchEnabled);p.searchEnabled = void 0 !== e ? e : !0;
        }), a.$observe("disabled", function () {
          p.disabled = void 0 !== a.disabled ? a.disabled : !1;
        }), a.$observe("resetSearchInput", function () {
          var e = c.$eval(a.resetSearchInput);p.resetSearchInput = void 0 !== e ? e : !0;
        }), p.multiple ? (c.$watchCollection(function () {
          return d.$modelValue;
        }, function (e, t) {
          t != e && (d.$modelValue = null);
        }), c.$watchCollection("$select.selected", function () {
          d.$setViewValue(Date.now());
        }), v.prop("disabled", !0)) : c.$watch("$select.selected", function (e) {
          d.$viewValue !== e && d.$setViewValue(e);
        }), d.$render = function () {
          if (p.multiple && !angular.isArray(d.$viewValue)) {
            if (!angular.isUndefined(d.$viewValue) && null !== d.$viewValue) throw l("multiarr", "Expected model value to be array but got '{0}'", d.$viewValue);p.selected = [];
          }p.selected = d.$viewValue;
        }, t.on("click", u), c.$on("$destroy", function () {
          t.off("click", u);
        }), o(c, function (e) {
          var t = angular.element("<div>").append(e),
              c = t.querySelectorAll(".ui-select-match");if (c.removeAttr("ui-select-match"), 1 !== c.length) throw l("transcluded", "Expected 1 .ui-select-match but got '{0}'.", c.length);n.querySelectorAll(".ui-select-match").replaceWith(c);var s = t.querySelectorAll(".ui-select-choices");if (s.removeAttr("ui-select-choices"), 1 !== s.length) throw l("transcluded", "Expected 1 .ui-select-choices but got '{0}'.", s.length);n.querySelectorAll(".ui-select-choices").replaceWith(s);
        });
      } };
  }]).directive("uiSelectChoices", ["uiSelectConfig", "RepeatParser", "uiSelectMinErr", "$compile", function (e, t, c, l) {
    return { restrict: "EA", require: "^uiSelect", replace: !0, transclude: !0, templateUrl: function (t) {
        var c = t.parent().attr("theme") || e.theme;return c + "/choices.tpl.html";
      }, compile: function (s, i) {
        if (!i.repeat) throw c("repeat", "Expected 'repeat' expression.");return function (s, i, n, a, r) {
          var o = n.groupBy;if (a.parseRepeatAttr(n.repeat, o), a.disableChoiceExpression = n.uiDisableChoice, o) {
            var u = i.querySelectorAll(".ui-select-choices-group");if (1 !== u.length) throw c("rows", "Expected 1 .ui-select-choices-group but got '{0}'.", u.length);u.attr("ng-repeat", t.getGroupNgRepeatExpression());
          }var p = i.querySelectorAll(".ui-select-choices-row");if (1 !== p.length) throw c("rows", "Expected 1 .ui-select-choices-row but got '{0}'.", p.length);p.attr("ng-repeat", t.getNgRepeatExpression(a.parserResult.itemName, "$select.items", a.parserResult.trackByExp, o)).attr("ng-mouseenter", "$select.setActiveItem(" + a.parserResult.itemName + ")").attr("ng-click", "$select.select(" + a.parserResult.itemName + ")");var d = i.querySelectorAll(".ui-select-choices-row-inner");if (1 !== d.length) throw c("rows", "Expected 1 .ui-select-choices-row-inner but got '{0}'.", d.length);d.attr("uis-transclude-append", ""), l(i, r)(s), s.$watch("$select.search", function (e) {
            e && !a.open && a.multiple && a.activate(!1, !0), a.activeIndex = 0, a.refresh(n.refresh);
          }), n.$observe("refreshDelay", function () {
            var t = s.$eval(n.refreshDelay);a.refreshDelay = void 0 !== t ? t : e.refreshDelay;
          });
        };
      } };
  }]).directive("uisTranscludeAppend", function () {
    return { link: function (e, t, c, l, s) {
        s(e, function (e) {
          t.append(e);
        });
      } };
  }).directive("uiSelectMatch", ["uiSelectConfig", function (e) {
    return { restrict: "EA", require: "^uiSelect", replace: !0, transclude: !0, templateUrl: function (t) {
        var c = t.parent().attr("theme") || e.theme,
            l = t.parent().attr("multiple");return c + (l ? "/match-multiple.tpl.html" : "/match.tpl.html");
      }, link: function (t, c, l, s) {
        l.$observe("placeholder", function (t) {
          s.placeholder = void 0 !== t ? t : e.placeholder;
        }), s.multiple && s.sizeSearchInput();
      } };
  }]).filter("highlight", function () {
    function e(e) {
      return e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }return function (t, c) {
      return c && t ? t.replace(new RegExp(e(c), "gi"), '<span class="ui-select-highlight">$&</span>') : t;
    };
  });
}(), angular.module("ui.select").run(["$templateCache", function (e) {
  e.put("bootstrap/choices.tpl.html", '<ul class="ui-select-choices ui-select-choices-content dropdown-menu" role="menu" aria-labelledby="dLabel" ng-show="$select.items.length > 0"><li class="ui-select-choices-group"><div class="divider" ng-show="$select.isGrouped && $index > 0"></div><div ng-show="$select.isGrouped" class="ui-select-choices-group-label dropdown-header">{{$group.name}}</div><div class="ui-select-choices-row" ng-class="{active: $select.isActive(this), disabled: $select.isDisabled(this)}"><a href="javascript:void(0)" class="ui-select-choices-row-inner"></a></div></li></ul>'), e.put("bootstrap/match-multiple.tpl.html", '<span class="ui-select-match"><span ng-repeat="$item in $select.selected"><span style="margin-right: 3px;" class="ui-select-match-item btn btn-default btn-xs" tabindex="-1" type="button" ng-disabled="$select.disabled" ng-click="$select.activeMatchIndex = $index;" ng-class="{\'btn-primary\':$select.activeMatchIndex === $index}"><span class="close ui-select-match-close" ng-hide="$select.disabled" ng-click="$select.removeChoice($index)">&nbsp;&times;</span> <span uis-transclude-append=""></span></span></span></span>'), e.put("bootstrap/match.tpl.html", '<button type="button" class="btn btn-default form-control ui-select-match" tabindex="-1" ng-hide="$select.open" ng-disabled="$select.disabled" ng-class="{\'btn-default-focus\':$select.focus}" ;="" ng-click="$select.activate()"><span ng-show="$select.searchEnabled && $select.isEmpty()" class="text-muted">{{$select.placeholder}}</span> <span ng-hide="$select.isEmpty()" ng-transclude=""></span> <span class="caret ui-select-toggle" ng-click="$select.toggle($event)"></span></button>'), e.put("bootstrap/select-multiple.tpl.html", '<div class="ui-select-multiple ui-select-bootstrap dropdown form-control" ng-class="{open: $select.open}"><div><div class="ui-select-match"></div><input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="ui-select-search input-xs" placeholder="{{$select.getPlaceholder()}}" ng-disabled="$select.disabled" ng-hide="$select.disabled" ng-click="$select.activate()" ng-model="$select.search"></div><div class="ui-select-choices"></div></div>'), e.put("bootstrap/select.tpl.html", '<div class="ui-select-bootstrap dropdown" ng-class="{open: $select.open}"><div class="ui-select-match"></div><input type="text" autocomplete="off" tabindex="-1" class="form-control ui-select-search" placeholder="{{$select.placeholder}}" ng-model="$select.search" ng-show="$select.searchEnabled && $select.open"><div class="ui-select-choices"></div></div>'), e.put("select2/choices.tpl.html", '<ul class="ui-select-choices ui-select-choices-content select2-results"><li class="ui-select-choices-group" ng-class="{\'select2-result-with-children\': $select.isGrouped}"><div ng-show="$select.isGrouped" class="ui-select-choices-group-label select2-result-label">{{$group.name}}</div><ul ng-class="{\'select2-result-sub\': $select.isGrouped, \'select2-result-single\': !$select.isGrouped}"><li class="ui-select-choices-row" ng-class="{\'select2-highlighted\': $select.isActive(this), \'select2-disabled\': $select.isDisabled(this)}"><div class="select2-result-label ui-select-choices-row-inner"></div></li></ul></li></ul>'), e.put("select2/match-multiple.tpl.html", '<span class="ui-select-match"><li class="ui-select-match-item select2-search-choice" ng-repeat="$item in $select.selected" ng-class="{\'select2-search-choice-focus\':$select.activeMatchIndex === $index}"><span uis-transclude-append=""></span> <a href="javascript:;" class="ui-select-match-close select2-search-choice-close" ng-click="$select.removeChoice($index)" tabindex="-1"></a></li></span>'), e.put("select2/match.tpl.html", '<a class="select2-choice ui-select-match" ng-class="{\'select2-default\': $select.isEmpty()}" ng-click="$select.activate()"><span ng-show="$select.searchEnabled && $select.isEmpty()" class="select2-chosen">{{$select.placeholder}}</span> <span ng-hide="$select.isEmpty()" class="select2-chosen" ng-transclude=""></span> <span class="select2-arrow ui-select-toggle" ng-click="$select.toggle($event)"><b></b></span></a>'), e.put("select2/select-multiple.tpl.html", '<div class="ui-select-multiple select2 select2-container select2-container-multi" ng-class="{\'select2-container-active select2-dropdown-open\': $select.open,\n                \'select2-container-disabled\': $select.disabled}"><ul class="select2-choices"><span class="ui-select-match"></span><li class="select2-search-field"><input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="select2-input ui-select-search" placeholder="{{$select.getPlaceholder()}}" ng-disabled="$select.disabled" ng-hide="$select.disabled" ng-model="$select.search" ng-click="$select.activate()" style="width: 34px;"></li></ul><div class="select2-drop select2-with-searchbox select2-drop-active" ng-class="{\'select2-display-none\': !$select.open}"><div class="ui-select-choices"></div></div></div>'), e.put("select2/select.tpl.html", '<div class="select2 select2-container" ng-class="{\'select2-container-active select2-dropdown-open\': $select.open,\n                \'select2-container-disabled\': $select.disabled,\n                \'select2-container-active\': $select.focus }"><div class="ui-select-match"></div><div class="select2-drop select2-with-searchbox select2-drop-active" ng-class="{\'select2-display-none\': !$select.open}"><div class="select2-search" ng-show="$select.searchEnabled"><input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="ui-select-search select2-input" ng-model="$select.search"></div><div class="ui-select-choices"></div></div></div>'), e.put("selectize/choices.tpl.html", '<div ng-show="$select.open" class="ui-select-choices selectize-dropdown single"><div class="ui-select-choices-content selectize-dropdown-content"><div class="ui-select-choices-group optgroup"><div ng-show="$select.isGrouped" class="ui-select-choices-group-label optgroup-header">{{$group.name}}</div><div class="ui-select-choices-row" ng-class="{active: $select.isActive(this), disabled: $select.isDisabled(this)}"><div class="option ui-select-choices-row-inner" data-selectable=""></div></div></div></div></div>'), e.put("selectize/match.tpl.html", '<div ng-hide="$select.searchEnabled && ($select.open || $select.isEmpty())" class="ui-select-match" ng-transclude=""></div>'), e.put("selectize/select.tpl.html", '<div class="selectize-control single"><div class="selectize-input" ng-class="{\'focus\': $select.open, \'disabled\': $select.disabled, \'selectize-focus\' : $select.focus}" ng-click="$select.activate()"><div class="ui-select-match"></div><input type="text" autocomplete="off" tabindex="-1" class="ui-select-search ui-select-toggle" ng-click="$select.toggle($event)" placeholder="{{$select.placeholder}}" ng-model="$select.search" ng-hide="!$select.searchEnabled || ($select.selected && !$select.open)" ng-disabled="$select.disabled"></div><div class="ui-select-choices"></div></div>');
}]);

//# sourceMappingURL=select.min-compiled.js.map