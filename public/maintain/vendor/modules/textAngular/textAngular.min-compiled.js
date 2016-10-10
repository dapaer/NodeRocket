!function (a, b) {
  b["true"] = a, angular.module("textAngularSetup", []).value("taOptions", { toolbar: [["h1", "h2", "h3", "h4", "h5", "h6", "p", "pre", "quote"], ["bold", "italics", "underline", "ul", "ol", "redo", "undo", "clear"], ["justifyLeft", "justifyCenter", "justifyRight", "indent", "outdent"], ["html", "insertImage", "insertLink", "insertVideo"]], classes: { focussed: "focussed", toolbar: "btn-toolbar", toolbarGroup: "btn-group", toolbarButton: "btn btn-default", toolbarButtonActive: "active", disabled: "disabled", textEditor: "form-control", htmlEditor: "form-control" }, setup: { textEditorSetup: function () {}, htmlEditorSetup: function () {} }, defaultFileDropHandler: function (a, b) {
      var c = new FileReader();return "image" === a.type.substring(0, 5) ? (c.onload = function () {
        "" !== c.result && b("insertImage", c.result, !0);
      }, c.readAsDataURL(a), !0) : !1;
    } }).value("taSelectableElements", ["a", "img"]).value("taCustomRenderers", [{ selector: "img", customAttribute: "ta-insert-video", renderLogic: function (a) {
      var b = angular.element("<iframe></iframe>"),
          c = a.prop("attributes");angular.forEach(c, function (a) {
        b.attr(a.name, a.value);
      }), b.attr("src", b.attr("ta-insert-video")), a.replaceWith(b);
    } }]).constant("taTranslations", { html: { buttontext: "Toggle HTML", tooltip: "Toggle html / Rich Text" }, heading: { tooltip: "Heading " }, p: { tooltip: "Paragraph" }, pre: { tooltip: "Preformatted text" }, ul: { tooltip: "Unordered List" }, ol: { tooltip: "Ordered List" }, quote: { tooltip: "Quote/unqoute selection or paragraph" }, undo: { tooltip: "Undo" }, redo: { tooltip: "Redo" }, bold: { tooltip: "Bold" }, italic: { tooltip: "Italic" }, underline: { tooltip: "Underline" }, justifyLeft: { tooltip: "Align text left" }, justifyRight: { tooltip: "Align text right" }, justifyCenter: { tooltip: "Center" }, indent: { tooltip: "Increase indent" }, outdent: { tooltip: "Decrease indent" }, clear: { tooltip: "Clear formatting" }, insertImage: { dialogPrompt: "Please enter an image URL to insert", tooltip: "Insert image", hotkey: "the - possibly language dependent hotkey ... for some future implementation" }, insertVideo: { tooltip: "Insert video", dialogPrompt: "Please enter a youtube URL to embed" }, insertLink: { tooltip: "Insert / edit link", dialogPrompt: "Please enter a URL to insert" } }).run(["taRegisterTool", "$window", "taTranslations", "taSelection", function (a, b, c, d) {
    a("html", { buttontext: c.html.buttontext, tooltiptext: c.html.tooltip, action: function () {
        this.$editor().switchView();
      }, activeState: function () {
        return this.$editor().showHtml;
      } });var e = function (a) {
      return function () {
        return this.$editor().queryFormatBlockState(a);
      };
    },
        f = function () {
      return this.$editor().wrapSelection("formatBlock", "<" + this.name.toUpperCase() + ">");
    };angular.forEach(["h1", "h2", "h3", "h4", "h5", "h6"], function (b) {
      a(b.toLowerCase(), { buttontext: b.toUpperCase(), tooltiptext: c.heading.tooltip + b.charAt(1), action: f, activeState: e(b.toLowerCase()) });
    }), a("p", { buttontext: "P", tooltiptext: c.p.tooltip, action: function () {
        return this.$editor().wrapSelection("formatBlock", "<P>");
      }, activeState: function () {
        return this.$editor().queryFormatBlockState("p");
      } }), a("pre", { buttontext: "pre", tooltiptext: c.pre.tooltip, action: function () {
        return this.$editor().wrapSelection("formatBlock", "<PRE>");
      }, activeState: function () {
        return this.$editor().queryFormatBlockState("pre");
      } }), a("ul", { iconclass: "fa fa-list-ul", tooltiptext: c.ul.tooltip, action: function () {
        return this.$editor().wrapSelection("insertUnorderedList", null);
      }, activeState: function () {
        return this.$editor().queryCommandState("insertUnorderedList");
      } }), a("ol", { iconclass: "fa fa-list-ol", tooltiptext: c.ol.tooltip, action: function () {
        return this.$editor().wrapSelection("insertOrderedList", null);
      }, activeState: function () {
        return this.$editor().queryCommandState("insertOrderedList");
      } }), a("quote", { iconclass: "fa fa-quote-right", tooltiptext: c.quote.tooltip, action: function () {
        return this.$editor().wrapSelection("formatBlock", "<BLOCKQUOTE>");
      }, activeState: function () {
        return this.$editor().queryFormatBlockState("blockquote");
      } }), a("undo", { iconclass: "fa fa-undo", tooltiptext: c.undo.tooltip, action: function () {
        return this.$editor().wrapSelection("undo", null);
      } }), a("redo", { iconclass: "fa fa-repeat", tooltiptext: c.redo.tooltip, action: function () {
        return this.$editor().wrapSelection("redo", null);
      } }), a("bold", { iconclass: "fa fa-bold", tooltiptext: c.bold.tooltip, action: function () {
        return this.$editor().wrapSelection("bold", null);
      }, activeState: function () {
        return this.$editor().queryCommandState("bold");
      }, commandKeyCode: 98 }), a("justifyLeft", { iconclass: "fa fa-align-left", tooltiptext: c.justifyLeft.tooltip, action: function () {
        return this.$editor().wrapSelection("justifyLeft", null);
      }, activeState: function (a) {
        var b = !1;return a && (b = "left" === a.css("text-align") || "left" === a.attr("align") || "right" !== a.css("text-align") && "center" !== a.css("text-align") && !this.$editor().queryCommandState("justifyRight") && !this.$editor().queryCommandState("justifyCenter")), b = b || this.$editor().queryCommandState("justifyLeft");
      } }), a("justifyRight", { iconclass: "fa fa-align-right", tooltiptext: c.justifyRight.tooltip, action: function () {
        return this.$editor().wrapSelection("justifyRight", null);
      }, activeState: function (a) {
        var b = !1;return a && (b = "right" === a.css("text-align")), b = b || this.$editor().queryCommandState("justifyRight");
      } }), a("justifyCenter", { iconclass: "fa fa-align-center", tooltiptext: c.justifyCenter.tooltip, action: function () {
        return this.$editor().wrapSelection("justifyCenter", null);
      }, activeState: function (a) {
        var b = !1;return a && (b = "center" === a.css("text-align")), b = b || this.$editor().queryCommandState("justifyCenter");
      } }), a("indent", { iconclass: "fa fa-indent", tooltiptext: c.indent.tooltip, action: function () {
        return this.$editor().wrapSelection("indent", null);
      }, activeState: function () {
        return this.$editor().queryFormatBlockState("blockquote");
      } }), a("outdent", { iconclass: "fa fa-outdent", tooltiptext: c.outdent.tooltip, action: function () {
        return this.$editor().wrapSelection("outdent", null);
      }, activeState: function () {
        return !1;
      } }), a("italics", { iconclass: "fa fa-italic", tooltiptext: c.italic.tooltip, action: function () {
        return this.$editor().wrapSelection("italic", null);
      }, activeState: function () {
        return this.$editor().queryCommandState("italic");
      }, commandKeyCode: 105 }), a("underline", { iconclass: "fa fa-underline", tooltiptext: c.underline.tooltip, action: function () {
        return this.$editor().wrapSelection("underline", null);
      }, activeState: function () {
        return this.$editor().queryCommandState("underline");
      }, commandKeyCode: 117 }), a("clear", { iconclass: "fa fa-ban", tooltiptext: c.clear.tooltip, action: function (a, b) {
        this.$editor().wrapSelection("removeFormat", null);var c = angular.element(d.getSelectionElement()),
            e = function (a) {
          a = angular.element(a);var b = a;angular.forEach(a.children(), function (a) {
            var c = angular.element("<p></p>");c.html(angular.element(a).html()), b.after(c), b = c;
          }), a.remove();
        };angular.forEach(c.find("ul"), e), angular.forEach(c.find("ol"), e);var f = this.$editor(),
            g = function (a) {
          a = angular.element(a), a[0] !== f.displayElements.text[0] && a.removeAttr("class"), angular.forEach(a.children(), g);
        };angular.forEach(c, g), "li" !== c[0].tagName.toLowerCase() && "ol" !== c[0].tagName.toLowerCase() && "ul" !== c[0].tagName.toLowerCase() && this.$editor().wrapSelection("formatBlock", "<p>"), b();
      } });var g = function (a, b, c) {
      var d = function () {
        c.updateTaBindtaTextElement(), c.hidePopover();
      };a.preventDefault(), c.displayElements.popover.css("width", "375px");var e = c.displayElements.popoverContainer;e.empty();var f = angular.element('<div class="btn-group" style="padding-right: 6px;">'),
          g = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">100% </button>');g.on("click", function (a) {
        a.preventDefault(), b.css({ width: "100%", height: "" }), d();
      });var h = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">50% </button>');h.on("click", function (a) {
        a.preventDefault(), b.css({ width: "50%", height: "" }), d();
      });var i = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">25% </button>');i.on("click", function (a) {
        a.preventDefault(), b.css({ width: "25%", height: "" }), d();
      });var j = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">Reset</button>');j.on("click", function (a) {
        a.preventDefault(), b.css({ width: "", height: "" }), d();
      }), f.append(g), f.append(h), f.append(i), f.append(j), e.append(f), f = angular.element('<div class="btn-group" style="padding-right: 6px;">');var k = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-left"></i></button>');k.on("click", function (a) {
        a.preventDefault(), b.css("float", "left"), d();
      });var l = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-right"></i></button>');l.on("click", function (a) {
        a.preventDefault(), b.css("float", "right"), d();
      });var m = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-justify"></i></button>');m.on("click", function (a) {
        a.preventDefault(), b.css("float", ""), d();
      }), f.append(k), f.append(m), f.append(l), e.append(f), f = angular.element('<div class="btn-group">');var n = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-trash-o"></i></button>');n.on("click", function (a) {
        a.preventDefault(), b.remove(), d();
      }), f.append(n), e.append(f), c.showPopover(b), c.showResizeOverlay(b);
    };a("insertImage", { iconclass: "fa fa-picture-o", tooltiptext: c.insertImage.tooltip, action: function () {
        var a;return a = b.prompt(c.insertImage.dialogPrompt, "http://"), a && "" !== a && "http://" !== a ? this.$editor().wrapSelection("insertImage", a, !0) : void 0;
      }, onElementSelect: { element: "img", action: g } }), a("insertVideo", { iconclass: "fa fa-youtube-play", tooltiptext: c.insertVideo.tooltip, action: function () {
        var a;if (a = b.prompt(c.insertVideo.dialogPrompt, "http://"), a && "" !== a && "http://" !== a) {
          var d = a.match(/(\?|&)v=[^&]*/);if (d.length > 0) {
            var e = "http://www.youtube.com/embed/" + d[0].substring(3),
                f = '<img class="ta-insert-video" ta-insert-video="' + e + '" contenteditable="false" src="" allowfullscreen="true" width="300" frameborder="0" height="250"/>';return this.$editor().wrapSelection("insertHTML", f, !0);
          }
        }
      }, onElementSelect: { element: "img", onlyWithAttrs: ["ta-insert-video"], action: g } }), a("insertLink", { tooltiptext: c.insertLink.tooltip, iconclass: "fa fa-link", action: function () {
        var a;return a = b.prompt(c.insertLink.dialogPrompt, "http://"), a && "" !== a && "http://" !== a ? this.$editor().wrapSelection("createLink", a, !0) : void 0;
      }, activeState: function (a) {
        return a ? "A" === a[0].tagName : !1;
      }, onElementSelect: { element: "a", action: function (a, d, e) {
          a.preventDefault(), e.displayElements.popover.css("width", "435px");var f = e.displayElements.popoverContainer;f.empty(), f.css("line-height", "28px");var g = angular.element('<a href="' + d.attr("href") + '" target="_blank">' + d.attr("href") + "</a>");g.css({ display: "inline-block", "max-width": "200px", overflow: "hidden", "text-overflow": "ellipsis", "white-space": "nowrap", "vertical-align": "middle" }), f.append(g);var h = angular.element('<div class="btn-group pull-right">'),
              i = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on"><i class="fa fa-edit icon-edit"></i></button>');i.on("click", function (a) {
            a.preventDefault();var f = b.prompt(c.insertLink.dialogPrompt, d.attr("href"));f && "" !== f && "http://" !== f && (d.attr("href", f), e.updateTaBindtaTextElement()), e.hidePopover();
          }), h.append(i);var j = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on"><i class="fa fa-unlink icon-unlink"></i></button>');j.on("click", function (a) {
            a.preventDefault(), d.replaceWith(d.contents()), e.updateTaBindtaTextElement(), e.hidePopover();
          }), h.append(j);var k = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on">Open in New Window</button>');"_blank" === d.attr("target") && k.addClass("active"), k.on("click", function (a) {
            a.preventDefault(), d.attr("target", "_blank" === d.attr("target") ? "" : "_blank"), k.toggleClass("active"), e.updateTaBindtaTextElement();
          }), h.append(k), f.append(h), e.showPopover(d);
        } } });
  }]), function () {
    "Use Strict";
    function a(a) {
      try {
        return 0 !== angular.element(a).length;
      } catch (b) {
        return !1;
      }
    }function b(a, c) {
      var d = [],
          e = a.children();return e.length && angular.forEach(e, function (a) {
        d = d.concat(b(angular.element(a), c));
      }), void 0 !== a.attr(c) && d.push(a), d;
    }function c(b, c) {
      if (!b || "" === b || n.hasOwnProperty(b)) throw "textAngular Error: A unique name is required for a Tool Definition";if (c.display && ("" === c.display || !a(c.display)) || !c.display && !c.buttontext && !c.iconclass) throw 'textAngular Error: Tool Definition for "' + b + '" does not have a valid display/iconclass/buttontext value';n[b] = c;
    }var d = !1;/AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && (document.addEventListener("click", function () {
      var a = window.event.target;if (d && null !== a) {
        for (var b = !1, c = a; null !== c && "html" !== c.tagName.toLowerCase() && !b;) b = "true" === c.contentEditable, c = c.parentNode;b || (document.getElementById("textAngular-editableFix-010203040506070809").setSelectionRange(0, 0), a.focus());
      }d = !1;
    }, !1), angular.element(document).ready(function () {
      angular.element(document.body).append(angular.element('<input id="textAngular-editableFix-010203040506070809" style="width:1px;height:1px;border:none;margin:0;padding:0;position:absolute; top: -10000; left: -10000;" unselectable="on" tabIndex="-1">'));
    }));var e = function () {
      var a,
          b = -1,
          c = window.navigator.userAgent,
          d = c.indexOf("MSIE "),
          e = c.indexOf("Trident/");if (d > 0) b = parseInt(c.substring(d + 5, c.indexOf(".", d)), 10);else if (e > 0) {
        var f = c.indexOf("rv:");b = parseInt(c.substring(f + 3, c.indexOf(".", f)), 10);
      }return b > -1 ? b : a;
    }();"function" != typeof String.prototype.trim && (String.prototype.trim = function () {
      return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
    });var f, g, h, i, j;if (e > 8 || void 0 === e) {
      var k = function () {
        var a = document.createElement("style");return (/AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && a.appendChild(document.createTextNode("")), document.head.insertBefore(a, document.head.firstChild), a.sheet
        );
      }();f = function () {
        var a = document.createElement("style");return (/AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && a.appendChild(document.createTextNode("")), document.head.appendChild(a), a.sheet
        );
      }(), g = function (a, b) {
        i(f, a, b);
      }, i = function (a, b, c) {
        var d;return a.rules ? d = Math.max(a.rules.length - 1, 0) : a.cssRules && (d = Math.max(a.cssRules.length - 1, 0)), a.insertRule ? a.insertRule(b + "{" + c + "}", d) : a.addRule(b, c, d), d;
      }, h = function (a) {
        j(f, a);
      }, j = function (a, b) {
        a.removeRule ? a.removeRule(b) : a.deleteRule(b);
      }, i(k, ".ta-scroll-window.form-control", "height: auto; min-height: 300px; overflow: auto; font-family: inherit; font-size: 100%; position: relative; padding: 0;"), i(k, ".ta-root.focussed .ta-scroll-window.form-control", "border-color: #66afe9; outline: 0; -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);"), i(k, ".ta-editor.ta-html", "min-height: 300px; height: auto; overflow: auto; font-family: inherit; font-size: 100%;"), i(k, ".ta-scroll-window > .ta-bind", "height: auto; min-height: 300px; padding: 6px 12px;"), i(k, ".ta-root .ta-resizer-handle-overlay", "z-index: 100; position: absolute; display: none;"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-info", "position: absolute; bottom: 16px; right: 16px; border: 1px solid black; background-color: #FFF; padding: 0 4px; opacity: 0.7;"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-background", "position: absolute; bottom: 5px; right: 5px; left: 5px; top: 5px; border: 1px solid black; background-color: rgba(0, 0, 0, 0.2);"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner", "width: 10px; height: 10px; position: absolute;"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-tl", "top: 0; left: 0; border-left: 1px solid black; border-top: 1px solid black;"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-tr", "top: 0; right: 0; border-right: 1px solid black; border-top: 1px solid black;"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-bl", "bottom: 0; left: 0; border-left: 1px solid black; border-bottom: 1px solid black;"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-br", "bottom: 0; right: 0; border: 1px solid black; cursor: se-resize; background-color: white;");
    }var l = !1,
        m = angular.module("textAngular", ["ngSanitize", "textAngularSetup"]),
        n = {};m.constant("taRegisterTool", c), m.value("taTools", n), m.config([function () {
      angular.forEach(n, function (a, b) {
        delete n[b];
      });
    }]), m.directive("textAngular", ["$compile", "$timeout", "taOptions", "taSelection", "taExecCommand", "textAngularManager", "$window", "$document", "$animate", "$log", function (a, b, c, d, e, f, g, h, i, j) {
      return { require: "?ngModel", scope: {}, restrict: "EA", link: function (k, l, m, n) {
          var o,
              p,
              q,
              r,
              s,
              t,
              u,
              v,
              w,
              x = m.serial ? m.serial : Math.floor(1e16 * Math.random()),
              y = m.name ? m.name : "textAngularEditor" + x,
              z = function (a, c, d) {
            b(function () {
              var b = function () {
                a.off(c, b), d();
              };a.on(c, b);
            }, 100);
          };w = e(m.taDefaultWrap), angular.extend(k, angular.copy(c), { wrapSelection: function (a, b, c) {
              w(a, !1, b), c && k["reApplyOnSelectorHandlerstaTextElement" + x](), k.displayElements.text[0].focus();
            }, showHtml: !1 }), m.taFocussedClass && (k.classes.focussed = m.taFocussedClass), m.taTextEditorClass && (k.classes.textEditor = m.taTextEditorClass), m.taHtmlEditorClass && (k.classes.htmlEditor = m.taHtmlEditorClass), m.taTextEditorSetup && (k.setup.textEditorSetup = k.$parent.$eval(m.taTextEditorSetup)), m.taHtmlEditorSetup && (k.setup.htmlEditorSetup = k.$parent.$eval(m.taHtmlEditorSetup)), k.fileDropHandler = m.taFileDrop ? k.$parent.$eval(m.taFileDrop) : k.defaultFileDropHandler, u = l[0].innerHTML, l[0].innerHTML = "", k.displayElements = { forminput: angular.element("<input type='hidden' tabindex='-1' style='display: none;'>"), html: angular.element("<textarea></textarea>"), text: angular.element("<div></div>"), scrollWindow: angular.element("<div class='ta-scroll-window'></div>"), popover: angular.element('<div class="popover fade bottom" style="max-width: none; width: 305px;"></div>'), popoverArrow: angular.element('<div class="arrow"></div>'), popoverContainer: angular.element('<div class="popover-content"></div>'), resize: { overlay: angular.element('<div class="ta-resizer-handle-overlay"></div>'), background: angular.element('<div class="ta-resizer-handle-background"></div>'), anchors: [angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tl"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tr"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-bl"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-br"></div>')], info: angular.element('<div class="ta-resizer-handle-info"></div>') } }, k.displayElements.popover.append(k.displayElements.popoverArrow), k.displayElements.popover.append(k.displayElements.popoverContainer), k.displayElements.scrollWindow.append(k.displayElements.popover), k.displayElements.popover.on("mousedown", function (a, b) {
            return b && angular.extend(a, b), a.preventDefault(), !1;
          }), k.showPopover = function (a) {
            k.displayElements.popover.css("display", "block"), k.reflowPopover(a), i.addClass(k.displayElements.popover, "in"), z(l, "click keyup", function () {
              k.hidePopover();
            });
          }, k.reflowPopover = function (a) {
            k.displayElements.text[0].offsetHeight - 51 > a[0].offsetTop ? (k.displayElements.popover.css("top", a[0].offsetTop + a[0].offsetHeight + "px"), k.displayElements.popover.removeClass("top").addClass("bottom")) : (k.displayElements.popover.css("top", a[0].offsetTop - 54 + "px"), k.displayElements.popover.removeClass("bottom").addClass("top"));var b = k.displayElements.text[0].offsetWidth - k.displayElements.popover[0].offsetWidth,
                c = a[0].offsetLeft + a[0].offsetWidth / 2 - k.displayElements.popover[0].offsetWidth / 2;k.displayElements.popover.css("left", Math.max(0, Math.min(b, c)) + "px"), k.displayElements.popoverArrow.css("margin-left", Math.min(c, Math.max(0, c - b)) - 11 + "px");
          }, k.hidePopover = function () {
            i.removeClass(k.displayElements.popover, "in", function () {
              k.displayElements.popover.css("display", ""), k.displayElements.popoverContainer.attr("style", ""), k.displayElements.popoverContainer.attr("class", "popover-content");
            });
          }, k.displayElements.resize.overlay.append(k.displayElements.resize.background), angular.forEach(k.displayElements.resize.anchors, function (a) {
            k.displayElements.resize.overlay.append(a);
          }), k.displayElements.resize.overlay.append(k.displayElements.resize.info), k.displayElements.scrollWindow.append(k.displayElements.resize.overlay), k.reflowResizeOverlay = function (a) {
            a = angular.element(a)[0], k.displayElements.resize.overlay.css({ display: "block", left: a.offsetLeft - 5 + "px", top: a.offsetTop - 5 + "px", width: a.offsetWidth + 10 + "px", height: a.offsetHeight + 10 + "px" }), k.displayElements.resize.info.text(a.offsetWidth + " x " + a.offsetHeight);
          }, k.showResizeOverlay = function (a) {
            var b = function (b) {
              var c = { width: parseInt(a.attr("width")), height: parseInt(a.attr("height")), x: b.clientX, y: b.clientY };void 0 === c.width && (c.width = a[0].offsetWidth), void 0 === c.height && (c.height = a[0].offsetHeight), k.hidePopover();var d = c.height / c.width,
                  e = function (b) {
                var e = { x: Math.max(0, c.width + (b.clientX - c.x)), y: Math.max(0, c.height + (b.clientY - c.y)) },
                    f = function (a, b) {
                  a = angular.element(a), "img" === a[0].tagName.toLowerCase() && (b.height && (a.attr("height", b.height), delete b.height), b.width && (a.attr("width", b.width), delete b.width)), a.css(b);
                };if (b.shiftKey) {
                  var g = e.y / e.x;f(a, { width: d > g ? e.x : e.y / d, height: d > g ? e.x * d : e.y });
                } else f(a, { width: e.x, height: e.y });k.reflowResizeOverlay(a);
              };h.find("body").on("mousemove", e), z(k.displayElements.resize.overlay, "mouseup", function () {
                h.find("body").off("mousemove", e), k.showPopover(a);
              }), b.stopPropagation(), b.preventDefault();
            };k.displayElements.resize.anchors[3].on("mousedown", b), k.reflowResizeOverlay(a), z(l, "click", function () {
              k.hideResizeOverlay();
            });
          }, k.hideResizeOverlay = function () {
            k.displayElements.resize.overlay.css("display", "");
          }, k.setup.htmlEditorSetup(k.displayElements.html), k.setup.textEditorSetup(k.displayElements.text), k.displayElements.html.attr({ id: "taHtmlElement" + x, "ng-show": "showHtml", "ta-bind": "ta-bind", "ng-model": "html" }), k.displayElements.text.attr({ id: "taTextElement" + x, contentEditable: "true", "ta-bind": "ta-bind", "ng-model": "html" }), k.displayElements.scrollWindow.attr({ "ng-hide": "showHtml" }), m.taDefaultWrap && k.displayElements.text.attr("ta-default-wrap", m.taDefaultWrap), m.taUnsafeSanitizer && (k.displayElements.text.attr("ta-unsafe-sanitizer", m.taUnsafeSanitizer), k.displayElements.html.attr("ta-unsafe-sanitizer", m.taUnsafeSanitizer)), k.displayElements.scrollWindow.append(k.displayElements.text), l.append(k.displayElements.scrollWindow), l.append(k.displayElements.html), k.displayElements.forminput.attr("name", y), l.append(k.displayElements.forminput), m.tabindex && (l.removeAttr("tabindex"), k.displayElements.text.attr("tabindex", m.tabindex), k.displayElements.html.attr("tabindex", m.tabindex)), m.placeholder && (k.displayElements.text.attr("placeholder", m.placeholder), k.displayElements.html.attr("placeholder", m.placeholder)), m.taDisabled && (k.displayElements.text.attr("ta-readonly", "disabled"), k.displayElements.html.attr("ta-readonly", "disabled"), k.disabled = k.$parent.$eval(m.taDisabled), k.$parent.$watch(m.taDisabled, function (a) {
            k.disabled = a, k.disabled ? l.addClass(k.classes.disabled) : l.removeClass(k.classes.disabled);
          })), a(k.displayElements.scrollWindow)(k), a(k.displayElements.html)(k), k.updateTaBindtaTextElement = k["updateTaBindtaTextElement" + x], k.updateTaBindtaHtmlElement = k["updateTaBindtaHtmlElement" + x], l.addClass("ta-root"), k.displayElements.scrollWindow.addClass("ta-text ta-editor " + k.classes.textEditor), k.displayElements.html.addClass("ta-html ta-editor " + k.classes.htmlEditor), k._actionRunning = !1;var A = !1;if (k.startAction = function () {
            return k._actionRunning = !0, g.rangy && g.rangy.saveSelection ? (A = g.rangy.saveSelection(), function () {
              A && g.rangy.restoreSelection(A);
            }) : void 0;
          }, k.endAction = function () {
            k._actionRunning = !1, A && g.rangy.removeMarkers(A), A = !1, k.updateSelectedStyles(), k.showHtml || k["updateTaBindtaTextElement" + x]();
          }, s = function () {
            l.addClass(k.classes.focussed), v.focus();
          }, k.displayElements.html.on("focus", s), k.displayElements.text.on("focus", s), t = function (a) {
            return k._actionRunning || h[0].activeElement === k.displayElements.html[0] || h[0].activeElement === k.displayElements.text[0] || (l.removeClass(k.classes.focussed), v.unfocus(), b(function () {
              l.triggerHandler("blur");
            }, 0)), a.preventDefault(), !1;
          }, k.displayElements.html.on("blur", t), k.displayElements.text.on("blur", t), k.queryFormatBlockState = function (a) {
            return !k.showHtml && a.toLowerCase() === h[0].queryCommandValue("formatBlock").toLowerCase();
          }, k.queryCommandState = function (a) {
            return k.showHtml ? "" : h[0].queryCommandState(a);
          }, k.switchView = function () {
            k.showHtml = !k.showHtml, k.showHtml ? b(function () {
              return k.displayElements.html[0].focus();
            }, 100) : b(function () {
              return k.displayElements.text[0].focus();
            }, 100);
          }, m.ngModel) {
            var B = !0;n.$render = function () {
              if (B) {
                B = !1;var a = k.$parent.$eval(m.ngModel);void 0 !== a && null !== a || !u || "" === u || n.$setViewValue(u);
              }k.displayElements.forminput.val(n.$viewValue), k._elementSelectTriggered || h[0].activeElement === k.displayElements.html[0] || h[0].activeElement === k.displayElements.text[0] || (k.html = n.$viewValue || "");
            };var C = function (a) {
              return m.required && n.$setValidity("required", !(!a || "" === a.trim())), a;
            };n.$parsers.push(C), n.$formatters.push(C);
          } else k.displayElements.forminput.val(u), k.html = u;if (k.$watch("html", function (a, b) {
            a !== b && (m.ngModel && n.$viewValue !== a && n.$setViewValue(a), k.displayElements.forminput.val(a));
          }), m.taTargetToolbars) v = f.registerEditor(y, k, m.taTargetToolbars.split(","));else {
            var D = angular.element('<div text-angular-toolbar name="textAngularToolbar' + x + '">');m.taToolbar && D.attr("ta-toolbar", m.taToolbar), m.taToolbarClass && D.attr("ta-toolbar-class", m.taToolbarClass), m.taToolbarGroupClass && D.attr("ta-toolbar-group-class", m.taToolbarGroupClass), m.taToolbarButtonClass && D.attr("ta-toolbar-button-class", m.taToolbarButtonClass), m.taToolbarActiveButtonClass && D.attr("ta-toolbar-active-button-class", m.taToolbarActiveButtonClass), m.taFocussedClass && D.attr("ta-focussed-class", m.taFocussedClass), l.prepend(D), a(D)(k.$parent), v = f.registerEditor(y, k, ["textAngularToolbar" + x]);
          }k.$on("$destroy", function () {
            f.unregisterEditor(y);
          }), k.$on("ta-element-select", function (a, b) {
            v.triggerElementSelect(a, b);
          }), k.$on("ta-drop-event", function (a, b, c, d) {
            k.displayElements.text[0].focus(), d && d.files && d.files.length > 0 && (angular.forEach(d.files, function (a) {
              try {
                return k.fileDropHandler(a, k.wrapSelection) || k.fileDropHandler !== k.defaultFileDropHandler && k.defaultFileDropHandler(a, k.wrapSelection);
              } catch (b) {
                j.error(b);
              }
            }), c.preventDefault(), c.stopPropagation());
          }), k._bUpdateSelectedStyles = !1, k.updateSelectedStyles = function () {
            var a;void 0 !== (a = d.getSelectionElement()) && a.parentNode !== k.displayElements.text[0] ? v.updateSelectedStyles(angular.element(a)) : v.updateSelectedStyles(), k._bUpdateSelectedStyles && b(k.updateSelectedStyles, 200);
          }, o = function () {
            k._bUpdateSelectedStyles || (k._bUpdateSelectedStyles = !0, k.$apply(function () {
              k.updateSelectedStyles();
            }));
          }, k.displayElements.html.on("keydown", o), k.displayElements.text.on("keydown", o), p = function () {
            k._bUpdateSelectedStyles = !1;
          }, k.displayElements.html.on("keyup", p), k.displayElements.text.on("keyup", p), q = function (a, b) {
            b && angular.extend(a, b), k.$apply(function () {
              return v.sendKeyCommand(a) ? (k._bUpdateSelectedStyles || k.updateSelectedStyles(), a.preventDefault(), !1) : void 0;
            });
          }, k.displayElements.html.on("keypress", q), k.displayElements.text.on("keypress", q), r = function () {
            k._bUpdateSelectedStyles = !1, k.$apply(function () {
              k.updateSelectedStyles();
            });
          }, k.displayElements.html.on("mouseup", r), k.displayElements.text.on("mouseup", r);
        } };
    }]).factory("taBrowserTag", [function () {
      return function (a) {
        return a ? "" === a ? void 0 === e ? "div" : 8 >= e ? "P" : "p" : 8 >= e ? a.toUpperCase() : a : 8 >= e ? "P" : "p";
      };
    }]).factory("taExecCommand", ["taSelection", "taBrowserTag", "$document", function (a, b, c) {
      var d = /^(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video)$/gi,
          e = /^(ul|li|ol)$/gi,
          f = function (b, c) {
        var d,
            e,
            f = b.find("li");for (e = f.length - 1; e >= 0; e--) d = angular.element("<" + c + ">" + f[e].innerHTML + "</" + c + ">"), b.after(d);b.remove(), a.setSelectionToElementEnd(d[0]);
      },
          g = function (b, c) {
        var d = angular.element("<" + c + ">" + b[0].innerHTML + "</" + c + ">");b.after(d), b.remove(), a.setSelectionToElementEnd(d.find("li")[0]);
      },
          h = function (c, d, e) {
        for (var f = "", g = 0; g < c.length; g++) f += "<" + b("li") + ">" + c[g].innerHTML + "</" + b("li") + ">";var h = angular.element("<" + e + ">" + f + "</" + e + ">");d.after(h), d.remove(), a.setSelectionToElementEnd(h.find("li")[0]);
      };return function (i) {
        return i = b(i), function (j, k, l) {
          var m,
              n,
              o,
              p,
              q,
              r = angular.element("<" + i + ">"),
              s = a.getSelectionElement(),
              t = angular.element(s);if (void 0 !== s) {
            var u = s.tagName.toLowerCase();if ("insertorderedlist" === j.toLowerCase() || "insertunorderedlist" === j.toLowerCase()) {
              var v = b("insertorderedlist" === j.toLowerCase() ? "ol" : "ul");if (u === v) return f(t, i);if ("li" === u && t.parent()[0].tagName.toLowerCase() === v && 1 === t.parent().children().length) return f(t.parent(), i);if ("li" === u && t.parent()[0].tagName.toLowerCase() !== v && 1 === t.parent().children().length) return g(t.parent(), v);if (u.match(d) && !t.hasClass("ta-bind")) {
                if ("ol" === u || "ul" === u) return g(t, v);var w = !1;return angular.forEach(t.children(), function (a) {
                  a.tagName.match(d) && (w = !0);
                }), w ? h(t.children(), t, v) : h([angular.element("<div>" + s.innerHTML + "</div>")[0]], t, v);
              }if (u.match(d)) {
                if (p = a.getOnlySelectedElements(), 1 === p.length && ("ol" === p[0].tagName.toLowerCase() || "ul" === p[0].tagName.toLowerCase())) return p[0].tagName.toLowerCase() === v ? f(angular.element(p[0]), i) : g(angular.element(p[0]), v);o = "";var x = [];for (m = 0; m < p.length; m++) if (3 !== p[m].nodeType) {
                  var y = angular.element(p[m]);o += "<" + b("li") + ">" + y[0].innerHTML + "</" + b("li") + ">", x.unshift(y);
                }return n = angular.element("<" + v + ">" + o + "</" + v + ">"), x.pop().replaceWith(n), angular.forEach(x, function (a) {
                  a.remove();
                }), void a.setSelectionToElementEnd(n[0]);
              }
            } else if ("formatblock" === j.toLowerCase()) {
              var z = l.toLowerCase().replace(/[<>]/gi, "");for (n = "li" === u ? t.parent() : t; !n[0].tagName.match(d);) n = n.parent(), u = n[0].tagName.toLowerCase();if (u === z) {
                p = n.children();var A = !1;for (m = 0; m < p.length; m++) A = A || p[m].tagName.match(d);A ? (n.after(p), q = n.next(), n.remove(), n = q) : (r.append(n[0].childNodes), n.after(r), n.remove(), n = r);
              } else if (n.parent()[0].tagName.toLowerCase() !== z || n.parent().hasClass("ta-bind")) {
                if (u.match(e)) n.wrap(l);else {
                  p = a.getOnlySelectedElements(), 0 === p.length && (p = [n[0]]);var B = !1;if (angular.forEach(p, function (a) {
                    3 !== a.nodeType && a.tagName.match(d) || (B = !0);
                  }), B) for (; 3 === p[0].nodeType || !p[0].tagName.match(d);) p = [p[0].parentNode];if (angular.element(p[0]).hasClass("ta-bind")) n = angular.element(l), n[0].innerHTML = p[0].innerHTML, p[0].innerHTML = n[0].outerHTML;else if ("blockquote" === z) {
                    for (o = "", m = 0; m < p.length; m++) o += p[m].outerHTML;n = angular.element(l), n[0].innerHTML = o, p[0].parentNode.insertBefore(n[0], p[0]), angular.forEach(p, function (a) {
                      a.parentNode.removeChild(a);
                    });
                  } else for (m = 0; m < p.length; m++) n = angular.element(l), n[0].innerHTML = p[m].innerHTML, p[m].parentNode.insertBefore(n[0], p[m]), p[m].parentNode.removeChild(p[m]);
                }
              } else {
                var C = n.parent(),
                    D = C.contents();for (m = 0; m < D.length; m++) C.parent().hasClass("ta-bind") && 3 === D[m].nodeType && (r = angular.element("<" + i + ">"), r[0].innerHTML = D[m].outerHTML, D[m] = r[0]), C.parent()[0].insertBefore(D[m], C[0]);C.remove();
              }return void a.setSelectionToElementEnd(n[0]);
            }
          }try {
            c[0].execCommand(j, k, l);
          } catch (E) {}
        };
      };
    }]).directive("taBind", ["taSanitize", "$timeout", "$window", "$document", "taFixChrome", "taBrowserTag", "taSelection", "taSelectableElements", "taApplyCustomRenderers", "taOptions", function (a, b, c, f, i, j, k, m, n, o) {
      return { require: "ngModel", scope: {}, link: function (j, p, q, r) {
          var s,
              t,
              u = void 0 !== p.attr("contenteditable") && p.attr("contenteditable"),
              v = u || "textarea" === p[0].tagName.toLowerCase() || "input" === p[0].tagName.toLowerCase(),
              w = !1,
              x = !1,
              y = q.taUnsafeSanitizer || o.disableSanitizer;void 0 === q.taDefaultWrap && (q.taDefaultWrap = "p"), "" === q.taDefaultWrap ? (s = "", t = void 0 === e ? "<div><br></div>" : e >= 11 ? "<p><br></p>" : 8 >= e ? "<P>&nbsp;</P>" : "<p>&nbsp;</p>") : (s = void 0 === e || e >= 11 ? "<" + q.taDefaultWrap + "><br></" + q.taDefaultWrap + ">" : 8 >= e ? "<" + q.taDefaultWrap.toUpperCase() + "></" + q.taDefaultWrap.toUpperCase() + ">" : "<" + q.taDefaultWrap + "></" + q.taDefaultWrap + ">", t = void 0 === e || e >= 11 ? "<" + q.taDefaultWrap + "><br></" + q.taDefaultWrap + ">" : 8 >= e ? "<" + q.taDefaultWrap.toUpperCase() + ">&nbsp;</" + q.taDefaultWrap.toUpperCase() + ">" : "<" + q.taDefaultWrap + ">&nbsp;</" + q.taDefaultWrap + ">"), p.addClass("ta-bind");
          var z = function () {
            if (u) return p[0].innerHTML;if (v) return p.val();throw "textAngular Error: attempting to update non-editable taBind";
          },
              A = function (a) {
            a || (a = z()), a === t ? "" !== r.$viewValue && r.$setViewValue("") : r.$viewValue !== a && r.$setViewValue(a);
          };if (j.$parent["updateTaBind" + (q.id || "")] = function () {
            w || A();
          }, v) if (u) {
            if (p.on("cut", function (a) {
              w ? a.preventDefault() : b(function () {
                A();
              }, 0);
            }), p.on("paste", function (a, b) {
              b && angular.extend(a, b);var d;if (a.clipboardData || a.originalEvent && a.originalEvent.clipboardData ? d = (a.originalEvent || a).clipboardData.getData("text/plain") : c.clipboardData && (d = c.clipboardData.getData("Text")), !d && !w) return !0;if (a.preventDefault(), !w) {
                var e = angular.element("<div></div>");if (e[0].innerHTML = d, d = e.text(), f[0].selection) {
                  var g = f[0].selection.createRange();g.pasteHTML(d);
                } else f[0].execCommand("insertText", !1, d);A();
              }
            }), p.on("keyup", function (a, b) {
              if (b && angular.extend(a, b), !w) {
                if ("" !== s && 13 === a.keyCode && !a.shiftKey) {
                  var c = k.getSelectionElement();if (c.tagName.toLowerCase() !== q.taDefaultWrap && "li" !== c.tagName.toLowerCase() && ("" === c.innerHTML.trim() || "<br>" === c.innerHTML.trim())) {
                    var d = angular.element(s);angular.element(c).replaceWith(d), k.setSelectionToElementStart(d[0]);
                  }
                }var e = z();"" !== s && "" === e.trim() && (p[0].innerHTML = s, k.setSelectionToElementStart(p.children()[0])), A(e);
              }
            }), p.on("blur", function () {
              x = !1, w || A(), r.$render();
            }), q.placeholder && (e > 8 || void 0 === e)) {
              var B;if (!q.id) throw "textAngular Error: An unique ID is required for placeholders to work";B = g("#" + q.id + ".placeholder-text:before", 'content: "' + q.placeholder + '"'), j.$on("$destroy", function () {
                h(B);
              });
            }p.on("focus", function () {
              x = !0, r.$render();
            }), p.on("mousedown", function (a, b) {
              b && angular.extend(a, b), a.stopPropagation();
            });
          } else p.on("paste cut", function () {
            w || b(function () {
              r.$setViewValue(z());
            }, 0);
          }), p.on("change blur", function () {
            w || r.$setViewValue(z());
          });var C = function (b) {
            return r.$oldViewValue = a(i(b), r.$oldViewValue, y);
          },
              D = function (a) {
            return q.required && r.$setValidity("required", !(!a || a.trim() === t || "" === a.trim())), a;
          };r.$parsers.push(C), r.$parsers.push(D), r.$formatters.push(C), r.$formatters.push(D);var E = function (a) {
            return j.$emit("ta-element-select", this), a.preventDefault(), !1;
          },
              F = function (a, c) {
            if (c && angular.extend(a, c), !l && !w) {
              l = !0;var d;d = a.originalEvent ? a.originalEvent.dataTransfer : a.dataTransfer, j.$emit("ta-drop-event", this, a, d), b(function () {
                l = !1;
              }, 100);
            }
          };j.$parent["reApplyOnSelectorHandlers" + (q.id || "")] = function () {
            w || angular.forEach(m, function (a) {
              p.find(a).off("click", E).on("click", E);
            });
          };var G = function (a) {
            p[0].innerHTML = a;
          };r.$render = function () {
            var a = r.$viewValue || "";f[0].activeElement !== p[0] ? u ? (q.placeholder ? "" === a ? (x ? p.removeClass("placeholder-text") : p.addClass("placeholder-text"), G(s)) : (p.removeClass("placeholder-text"), G(a)) : G("" === a ? s : a), w ? p.off("drop", F) : (angular.forEach(m, function (a) {
              p.find(a).on("click", E);
            }), p.on("drop", F))) : "textarea" !== p[0].tagName.toLowerCase() && "input" !== p[0].tagName.toLowerCase() ? G(n(a)) : p.val(a) : u && p.removeClass("placeholder-text");
          }, q.taReadonly && (w = j.$parent.$eval(q.taReadonly), w ? (p.addClass("ta-readonly"), ("textarea" === p[0].tagName.toLowerCase() || "input" === p[0].tagName.toLowerCase()) && p.attr("disabled", "disabled"), void 0 !== p.attr("contenteditable") && p.attr("contenteditable") && p.removeAttr("contenteditable")) : (p.removeClass("ta-readonly"), "textarea" === p[0].tagName.toLowerCase() || "input" === p[0].tagName.toLowerCase() ? p.removeAttr("disabled") : u && p.attr("contenteditable", "true")), j.$parent.$watch(q.taReadonly, function (a, b) {
            b !== a && (a ? (p.addClass("ta-readonly"), ("textarea" === p[0].tagName.toLowerCase() || "input" === p[0].tagName.toLowerCase()) && p.attr("disabled", "disabled"), void 0 !== p.attr("contenteditable") && p.attr("contenteditable") && p.removeAttr("contenteditable"), angular.forEach(m, function (a) {
              p.find(a).on("click", E);
            }), p.off("drop", F)) : (p.removeClass("ta-readonly"), "textarea" === p[0].tagName.toLowerCase() || "input" === p[0].tagName.toLowerCase() ? p.removeAttr("disabled") : u && p.attr("contenteditable", "true"), angular.forEach(m, function (a) {
              p.find(a).off("click", E);
            }), p.on("drop", F)), w = a);
          })), u && !w && (angular.forEach(m, function (a) {
            p.find(a).on("click", E);
          }), p.on("drop", F), p.on("blur", function () {
            /AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && (d = !0);
          }));
        } };
    }]).factory("taApplyCustomRenderers", ["taCustomRenderers", function (a) {
      return function (c) {
        var d = angular.element("<div></div>");return d[0].innerHTML = c, angular.forEach(a, function (a) {
          var c = [];a.selector && "" !== a.selector ? c = d.find(a.selector) : a.customAttribute && "" !== a.customAttribute && (c = b(d, a.customAttribute)), angular.forEach(c, function (b) {
            b = angular.element(b), a.selector && "" !== a.selector && a.customAttribute && "" !== a.customAttribute ? void 0 !== b.attr(a.customAttribute) && a.renderLogic(b) : a.renderLogic(b);
          });
        }), d[0].innerHTML;
      };
    }]).directive("taMaxText", function () {
      return { restrict: "A", require: "ngModel", link: function (a, b, c, d) {
          function e(a) {
            var b = angular.element("<div/>");b.html(a);var c = b.text().length;return f >= c ? (d.$setValidity("taMaxText", !0), a) : void d.$setValidity("taMaxText", !1);
          }var f = parseInt(a.$eval(c.taMaxText));if (isNaN(f)) throw "Max text must be an integer";c.$observe("taMaxText", function (a) {
            if (f = parseInt(a), isNaN(f)) throw "Max text must be an integer";d.$dirty && d.$setViewValue(d.$viewValue);
          }), d.$parsers.unshift(e);
        } };
    }).directive("taMinText", function () {
      return { restrict: "A", require: "ngModel", link: function (a, b, c, d) {
          function e(a) {
            var b = angular.element("<div/>");b.html(a);var c = b.text().length;return !c || c >= f ? (d.$setValidity("taMinText", !0), a) : void d.$setValidity("taMinText", !1);
          }var f = parseInt(a.$eval(c.taMinText));if (isNaN(f)) throw "Min text must be an integer";c.$observe("taMinText", function (a) {
            if (f = parseInt(a), isNaN(f)) throw "Min text must be an integer";d.$dirty && d.$setViewValue(d.$viewValue);
          }), d.$parsers.unshift(e);
        } };
    }).factory("taFixChrome", function () {
      var a = function (a) {
        for (var b = angular.element("<div>" + a + "</div>"), c = angular.element(b).find("span"), d = 0; d < c.length; d++) {
          var e = angular.element(c[d]);e.attr("style") && e.attr("style").match(/line-height: 1.428571429;|color: inherit; line-height: 1.1;/i) && (e.attr("style", e.attr("style").replace(/( |)font-family: inherit;|( |)line-height: 1.428571429;|( |)line-height:1.1;|( |)color: inherit;/gi, "")), e.attr("style") && "" !== e.attr("style") || (e.next().length > 0 && "BR" === e.next()[0].tagName && e.next().remove(), e.replaceWith(e[0].innerHTML)));
        }var f = b[0].innerHTML.replace(/style="[^"]*?(line-height: 1.428571429;|color: inherit; line-height: 1.1;)[^"]*"/gi, "");return f !== b[0].innerHTML && (b[0].innerHTML = f), b[0].innerHTML;
      };return a;
    }).factory("taSanitize", ["$sanitize", function (a) {
      return function (c, d, e) {
        var f = angular.element("<div>" + c + "</div>");angular.forEach(b(f, "align"), function (a) {
          a.css("text-align", a.attr("align")), a.removeAttr("align");
        });var g;c = f[0].innerHTML;try {
          g = a(c), e && (g = c);
        } catch (h) {
          g = d || "";
        }return g;
      };
    }]).directive("textAngularToolbar", ["$compile", "textAngularManager", "taOptions", "taTools", "taToolExecuteAction", "$window", function (a, b, c, d, e, f) {
      return { scope: { name: "@" }, restrict: "EA", link: function (g, h, i) {
          if (!g.name || "" === g.name) throw "textAngular Error: A toolbar requires a name";angular.extend(g, angular.copy(c)), i.taToolbar && (g.toolbar = g.$parent.$eval(i.taToolbar)), i.taToolbarClass && (g.classes.toolbar = i.taToolbarClass), i.taToolbarGroupClass && (g.classes.toolbarGroup = i.taToolbarGroupClass), i.taToolbarButtonClass && (g.classes.toolbarButton = i.taToolbarButtonClass), i.taToolbarActiveButtonClass && (g.classes.toolbarButtonActive = i.taToolbarActiveButtonClass), i.taFocussedClass && (g.classes.focussed = i.taFocussedClass), g.disabled = !0, g.focussed = !1, g._$element = h, h[0].innerHTML = "", h.addClass("ta-toolbar " + g.classes.toolbar), g.$watch("focussed", function () {
            g.focussed ? h.addClass(g.classes.focussed) : h.removeClass(g.classes.focussed);
          });var j = function (b, c) {
            var d;if (d = angular.element(b && b.display ? b.display : "<button type='button'>"), d.addClass(g.classes.toolbarButton), d.attr("name", c.name), d.attr("unselectable", "on"), d.attr("ng-disabled", "isDisabled()"), d.attr("tabindex", "-1"), d.attr("ng-click", "executeAction()"), d.attr("ng-class", "displayActiveToolClass(active)"), b && b.tooltiptext && d.attr("title", b.tooltiptext), d.on("mousedown", function (a, b) {
              return b && angular.extend(a, b), a.preventDefault(), !1;
            }), b && !b.display && !c._display && (d[0].innerHTML = "", b.buttontext && (d[0].innerHTML = b.buttontext), b.iconclass)) {
              var e = angular.element("<i>"),
                  f = d[0].innerHTML;e.addClass(b.iconclass), d[0].innerHTML = "", d.append(e), f && "" !== f && d.append("&nbsp;" + f);
            }return c._lastToolDefinition = angular.copy(b), a(d)(c);
          };g.tools = {}, g._parent = { disabled: !0, showHtml: !1, queryFormatBlockState: function () {
              return !1;
            }, queryCommandState: function () {
              return !1;
            } };var k = { $window: f, $editor: function () {
              return g._parent;
            }, isDisabled: function () {
              return this.$eval("disabled") || this.$eval("disabled()") || "html" !== this.name && this.$editor().showHtml || this.$parent.disabled || this.$editor().disabled;
            }, displayActiveToolClass: function (a) {
              return a ? g.classes.toolbarButtonActive : "";
            }, executeAction: e };angular.forEach(g.toolbar, function (a) {
            var b = angular.element("<div>");b.addClass(g.classes.toolbarGroup), angular.forEach(a, function (a) {
              g.tools[a] = angular.extend(g.$new(!0), d[a], k, { name: a }), g.tools[a].$element = j(d[a], g.tools[a]), b.append(g.tools[a].$element);
            }), h.append(b);
          }), g.updateToolDisplay = function (a, b, c) {
            var d = g.tools[a];if (d) {
              if (d._lastToolDefinition && !c && (b = angular.extend({}, d._lastToolDefinition, b)), null === b.buttontext && null === b.iconclass && null === b.display) throw 'textAngular Error: Tool Definition for updating "' + a + '" does not have a valid display/iconclass/buttontext value';null === b.buttontext && delete b.buttontext, null === b.iconclass && delete b.iconclass, null === b.display && delete b.display;var e = j(b, d);d.$element.replaceWith(e), d.$element = e;
            }
          }, g.addTool = function (a, b, c, e) {
            g.tools[a] = angular.extend(g.$new(!0), d[a], k, { name: a }), g.tools[a].$element = j(d[a], g.tools[a]);var f;void 0 === c && (c = g.toolbar.length - 1), f = angular.element(h.children()[c]), void 0 === e ? (f.append(g.tools[a].$element), g.toolbar[c][g.toolbar[c].length - 1] = a) : (f.children().eq(e).after(g.tools[a].$element), g.toolbar[c][e] = a);
          }, b.registerToolbar(g), g.$on("$destroy", function () {
            b.unregisterToolbar(g.name);
          });
        } };
    }]).service("taToolExecuteAction", ["$q", function (a) {
      return function (b) {
        void 0 !== b && (this.$editor = function () {
          return b;
        });var c = a.defer(),
            d = c.promise,
            e = this.$editor();d["finally"](function () {
          e.endAction.call(e);
        });var f;try {
          f = this.action(c, e.startAction());
        } catch (g) {}(f || void 0 === f) && c.resolve();
      };
    }]).service("textAngularManager", ["taToolExecuteAction", "taTools", "taRegisterTool", function (a, b, c) {
      var d = {},
          e = {};return { registerEditor: function (c, f, g) {
          if (!c || "" === c) throw "textAngular Error: An editor requires a name";if (!f) throw "textAngular Error: An editor requires a scope";if (e[c]) throw 'textAngular Error: An Editor with name "' + c + '" already exists';var h = [];return angular.forEach(g, function (a) {
            d[a] && h.push(d[a]);
          }), e[c] = { scope: f, toolbars: g, _registerToolbar: function (a) {
              this.toolbars.indexOf(a.name) >= 0 && h.push(a);
            }, editorFunctions: { disable: function () {
                angular.forEach(h, function (a) {
                  a.disabled = !0;
                });
              }, enable: function () {
                angular.forEach(h, function (a) {
                  a.disabled = !1;
                });
              }, focus: function () {
                angular.forEach(h, function (a) {
                  a._parent = f, a.disabled = !1, a.focussed = !0;
                });
              }, unfocus: function () {
                angular.forEach(h, function (a) {
                  a.disabled = !0, a.focussed = !1;
                });
              }, updateSelectedStyles: function (a) {
                angular.forEach(h, function (b) {
                  angular.forEach(b.tools, function (b) {
                    b.activeState && (b.active = b.activeState(a));
                  });
                });
              }, sendKeyCommand: function (c) {
                var d = !1;return (c.ctrlKey || c.metaKey) && angular.forEach(b, function (b, e) {
                  if (b.commandKeyCode && b.commandKeyCode === c.which) for (var g = 0; g < h.length; g++) if (void 0 !== h[g].tools[e]) {
                    a.call(h[g].tools[e], f), d = !0;break;
                  }
                }), d;
              }, triggerElementSelect: function (a, c) {
                var d = function (a, b) {
                  for (var c = !0, d = 0; d < b.length; d++) c = c && a.attr(b[d]);return c;
                },
                    e = [],
                    g = {},
                    i = !1;c = angular.element(c);var j = !1;if (angular.forEach(b, function (a, b) {
                  a.onElementSelect && a.onElementSelect.element && a.onElementSelect.element.toLowerCase() === c[0].tagName.toLowerCase() && (!a.onElementSelect.filter || a.onElementSelect.filter(c)) && (j = j || angular.isArray(a.onElementSelect.onlyWithAttrs) && d(c, a.onElementSelect.onlyWithAttrs), (!a.onElementSelect.onlyWithAttrs || d(c, a.onElementSelect.onlyWithAttrs)) && (g[b] = a));
                }), j ? (angular.forEach(g, function (a, b) {
                  a.onElementSelect.onlyWithAttrs && d(c, a.onElementSelect.onlyWithAttrs) && e.push({ name: b, tool: a });
                }), e.sort(function (a, b) {
                  return b.tool.onElementSelect.onlyWithAttrs.length - a.tool.onElementSelect.onlyWithAttrs.length;
                })) : angular.forEach(g, function (a, b) {
                  e.push({ name: b, tool: a });
                }), e.length > 0) for (var k = 0; k < e.length; k++) {
                  for (var l = e[k].tool, m = e[k].name, n = 0; n < h.length; n++) if (void 0 !== h[n].tools[m]) {
                    l.onElementSelect.action.call(h[n].tools[m], a, c, f), i = !0;break;
                  }if (i) break;
                }return i;
              } } }, e[c].editorFunctions;
        }, retrieveEditor: function (a) {
          return e[a];
        }, unregisterEditor: function (a) {
          delete e[a];
        }, registerToolbar: function (a) {
          if (!a) throw "textAngular Error: A toolbar requires a scope";if (!a.name || "" === a.name) throw "textAngular Error: A toolbar requires a name";if (d[a.name]) throw 'textAngular Error: A toolbar with name "' + a.name + '" already exists';d[a.name] = a, angular.forEach(e, function (b) {
            b._registerToolbar(a);
          });
        }, retrieveToolbar: function (a) {
          return d[a];
        }, retrieveToolbarsViaEditor: function (a) {
          var b = [],
              c = this;return angular.forEach(this.retrieveEditor(a).toolbars, function (a) {
            b.push(c.retrieveToolbar(a));
          }), b;
        }, unregisterToolbar: function (a) {
          delete d[a];
        }, updateToolsDisplay: function (a) {
          var b = this;angular.forEach(a, function (a, c) {
            b.updateToolDisplay(c, a);
          });
        }, resetToolsDisplay: function () {
          var a = this;angular.forEach(b, function (b, c) {
            a.resetToolDisplay(c);
          });
        }, updateToolDisplay: function (a, b) {
          var c = this;angular.forEach(d, function (d, e) {
            c.updateToolbarToolDisplay(e, a, b);
          });
        }, resetToolDisplay: function (a) {
          var b = this;angular.forEach(d, function (c, d) {
            b.resetToolbarToolDisplay(d, a);
          });
        }, updateToolbarToolDisplay: function (a, b, c) {
          if (!d[a]) throw 'textAngular Error: No Toolbar with name "' + a + '" exists';d[a].updateToolDisplay(b, c);
        }, resetToolbarToolDisplay: function (a, c) {
          if (!d[a]) throw 'textAngular Error: No Toolbar with name "' + a + '" exists';d[a].updateToolDisplay(c, b[c], !0);
        }, removeTool: function (a) {
          delete b[a], angular.forEach(d, function (b) {
            delete b.tools[a];for (var c = 0; c < b.toolbar.length; c++) {
              for (var d, e = 0; e < b.toolbar[c].length; e++) {
                if (b.toolbar[c][e] === a) {
                  d = { group: c, index: e };break;
                }if (void 0 !== d) break;
              }void 0 !== d && (b.toolbar[d.group].slice(d.index, 1), b._$element.children().eq(d.group).children().eq(d.index).remove());
            }
          });
        }, addTool: function (a, b, e, f) {
          c(a, b), angular.forEach(d, function (c) {
            c.addTool(a, b, e, f);
          });
        }, addToolToToolbar: function (a, b, e, f, g) {
          c(a, b), d[e].addTool(a, b, f, g);
        }, refreshEditor: function (a) {
          if (!e[a]) throw 'textAngular Error: No Editor with name "' + a + '" exists';e[a].scope.updateTaBindtaTextElement(), e[a].scope.$$phase || e[a].scope.$digest();
        } };
    }]).service("taSelection", ["$window", "$document", function (a, b) {
      var c = b[0],
          d = function (a) {
        if (a.hasChildNodes()) return a.firstChild;for (; a && !a.nextSibling;) a = a.parentNode;return a ? a.nextSibling : null;
      },
          e = function (a) {
        var b = a.startContainer,
            c = a.endContainer;if (b === c) return [b];for (var e = []; b && b !== c;) b = d(b), b.parentNode === a.commonAncestorContainer && e.push(b);for (b = a.startContainer; b && b !== a.commonAncestorContainer;) b.parentNode === a.commonAncestorContainer && e.unshift(b), b = b.parentNode;return e;
      };return { getOnlySelectedElements: function () {
          if (window.getSelection) {
            var b = a.getSelection();if (!b.isCollapsed) return e(b.getRangeAt(0));
          }return [];
        }, getSelectionElement: function () {
          var b, d, e;return c.selection && c.selection.createRange ? (b = c.selection.createRange(), b.parentElement()) : a.getSelection && (d = a.getSelection(), d.getRangeAt ? d.rangeCount > 0 && (b = d.getRangeAt(0)) : (b = c.createRange(), b.setStart(d.anchorNode, d.anchorOffset), b.setEnd(d.focusNode, d.focusOffset), b.collapsed !== d.isCollapsed && (b.setStart(d.focusNode, d.focusOffset), b.setEnd(d.anchorNode, d.anchorOffset))), b) ? (e = b.commonAncestorContainer, 3 === e.nodeType ? e.parentNode : e) : void 0;
        }, setSelectionToElementStart: function (b) {
          if (c.createRange && a.getSelection) {
            var d = c.createRange();d.selectNodeContents(b), d.setStart(b, 0), d.setEnd(b, 0);var e = a.getSelection();e.removeAllRanges(), e.addRange(d);
          } else if (c.selection && c.body.createTextRange) {
            var f = c.body.createTextRange();f.moveToElementText(b), f.collapse(!0), f.moveEnd("character", 0), f.moveStart("character", 0), f.select();
          }
        }, setSelectionToElementEnd: function (b) {
          if (c.createRange && a.getSelection) {
            var d = c.createRange();d.selectNodeContents(b), d.collapse(!1);var e = a.getSelection();e.removeAllRanges(), e.addRange(d);
          } else if (c.selection && c.body.createTextRange) {
            var f = c.body.createTextRange();f.moveToElementText(b), f.collapse(!1), f.select();
          }
        } };
    }]);
  }();
}({}, function () {
  return this;
}());

//# sourceMappingURL=textAngular.min-compiled.js.map