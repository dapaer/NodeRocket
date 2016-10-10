/*!
 * FooTable - Awesome Responsive Tables
 * Version : 2.0.1.4
 * http://fooplugins.com/plugins/footable-jquery/
 *
 * Requires jQuery - http://jquery.com/
 *
 * Copyright 2014 Steven Usher & Brad Vincent
 * Released under the MIT license
 * You are free to use FooTable in commercial projects as long as this copyright header is left intact.
 *
 * Date: 16 Feb 2014
 */
(function (e, t) {
    function a() {
        var e = this;
        e.id = null, e.busy = !1, e.start = function (t, a) {
            e.busy || (e.stop(), e.id = setTimeout(function () {
                t(), e.id = null, e.busy = !1;
            }, a), e.busy = !0);
        }, e.stop = function () {
            null !== e.id && (clearTimeout(e.id), e.id = null, e.busy = !1);
        };
    }

    function o(o, i, n) {
        var r = this;
        r.id = n, r.table = o, r.options = i, r.breakpoints = [], r.breakpointNames = "", r.columns = {}, r.plugins = t.footable.plugins.load(r);
        var l = r.options,
            d = l.classes,
            s = l.events,
            u = l.triggers,
            f = 0;
        return r.timers = {
            resize: new a(), register: function (e) {
                return r.timers[e] = new a(), r.timers[e];
            }
        }, r.init = function () {
            var a = e(t),
                o = e(r.table);
            if (t.footable.plugins.init(r), o.hasClass(d.loaded)) return r.raise(s.alreadyInitialized), undefined;
            r.raise(s.initializing), o.addClass(d.loading), o.find(l.columnDataSelector).each(function () {
                var e = r.getColumnData(this);
                r.columns[e.index] = e;
            });
            for (var i in l.breakpoints) r.breakpoints.push({
                name: i,
                width: l.breakpoints[i]
            }), r.breakpointNames += i + " ";
            r.breakpoints.sort(function (e, t) {
                return e.width - t.width;
            }), o.unbind(u.initialize).bind(u.initialize, function () {
                o.removeData("footable_info"), o.data("breakpoint", ""), o.trigger(u.resize), o.removeClass(d.loading), o.addClass(d.loaded).addClass(d.main), r.raise(s.initialized);
            }).unbind(u.redraw).bind(u.redraw, function () {
                r.redraw();
            }).unbind(u.resize).bind(u.resize, function () {
                r.resize();
            }).unbind(u.expandFirstRow).bind(u.expandFirstRow, function () {
                o.find(l.toggleSelector).first().not("." + d.detailShow).trigger(u.toggleRow);
            }).unbind(u.expandAll).bind(u.expandAll, function () {
                o.find(l.toggleSelector).not("." + d.detailShow).trigger(u.toggleRow);
            }).unbind(u.collapseAll).bind(u.collapseAll, function () {
                o.find("." + d.detailShow).trigger(u.toggleRow);
            }), o.trigger(u.initialize), a.bind("resize.footable", function () {
                r.timers.resize.stop(), r.timers.resize.start(function () {
                    r.raise(u.resize);
                }, l.delay);
            });
        }, r.addRowToggle = function () {
            if (l.addRowToggle) {
                var t = e(r.table),
                    a = !1;
                t.find("span." + d.toggle).remove();
                for (var o in r.columns) {
                    var i = r.columns[o];
                    if (i.toggle) {
                        a = !0;
                        var n = "> tbody > tr:not(." + d.detail + ",." + d.disabled + ") > td:nth-child(" + (parseInt(i.index, 10) + 1) + ")";
                        return t.find(n).not("." + d.detailCell).prepend(e(l.toggleHTMLElement).addClass(d.toggle)), undefined;
                    }
                }
                a || t.find("> tbody > tr:not(." + d.detail + ",." + d.disabled + ") > td:first-child").not("." + d.detailCell).prepend(e(l.toggleHTMLElement).addClass(d.toggle));
            }
        }, r.setColumnClasses = function () {
            $table = e(r.table);
            for (var t in r.columns) {
                var a = r.columns[t];
                if (null !== a.className) {
                    var o = "",
                        i = !0;
                    e.each(a.matches, function (e, t) {
                        i || (o += ", "), o += "> tbody > tr:not(." + d.detail + ") > td:nth-child(" + (parseInt(t, 10) + 1) + ")", i = !1;
                    }), $table.find(o).not("." + d.detailCell).addClass(a.className);
                }
            }
        }, r.bindToggleSelectors = function () {
            var t = e(r.table);
            r.hasAnyBreakpointColumn() && (t.find(l.toggleSelector).unbind(u.toggleRow).bind(u.toggleRow, function () {
                var t = e(this).is("tr") ? e(this) : e(this).parents("tr:first");
                r.toggleDetail(t);
            }), t.find(l.toggleSelector).unbind("click.footable").bind("click.footable", function (a) {
                t.is(".breakpoint") && e(a.target).is("td,." + d.toggle) && e(this).trigger(u.toggleRow);
            }));
        }, r.parse = function (e, t) {
            var a = l.parsers[t.type] || l.parsers.alpha;
            return a(e);
        }, r.getColumnData = function (t) {
            var a = e(t),
                o = a.data("hide"),
                i = a.index();
            o = o || "", o = jQuery.map(o.split(","), function (e) {
                return jQuery.trim(e);
            });
            var n = {
                index: i,
                hide: {},
                type: a.data("type") || "alpha",
                name: a.data("name") || e.trim(a.text()),
                ignore: a.data("ignore") || !1,
                toggle: a.data("toggle") || !1,
                className: a.data("class") || null,
                matches: [],
                names: {},
                group: a.data("group") || null,
                groupName: null
            };
            if (null !== n.group) {
                var d = e(r.table).find('> thead > tr.footable-group-row > th[data-group="' + n.group + '"], > thead > tr.footable-group-row > td[data-group="' + n.group + '"]').first();
                n.groupName = r.parse(d, { type: "alpha" });
            }
            var u = parseInt(a.prev().attr("colspan") || 0, 10);
            f += u > 1 ? u - 1 : 0;
            var p = parseInt(a.attr("colspan") || 0, 10),
                c = n.index + f;
            if (p > 1) {
                var g = a.data("names");
                g = g || "", g = g.split(",");
                for (var b = 0; p > b; b++) n.matches.push(b + c), g.length > b && (n.names[b + c] = g[b]);
            } else n.matches.push(c);
            n.hide["default"] = "all" === a.data("hide") || e.inArray("default", o) >= 0;
            var h = !1;
            for (var m in l.breakpoints) n.hide[m] = "all" === a.data("hide") || e.inArray(m, o) >= 0, h = h || n.hide[m];
            n.hasBreakpoint = h;
            var v = r.raise(s.columnData, { column: { data: n, th: t } });
            return v.column.data;
        }, r.getViewportWidth = function () {
            return window.innerWidth || (document.body ? document.body.offsetWidth : 0);
        }, r.calculateWidth = function (e, t) {
            return jQuery.isFunction(l.calculateWidthOverride) ? l.calculateWidthOverride(e, t) : (t.viewportWidth < t.width && (t.width = t.viewportWidth), t.parentWidth < t.width && (t.width = t.parentWidth), t);
        }, r.hasBreakpointColumn = function (e) {
            for (var t in r.columns) if (r.columns[t].hide[e]) {
                if (r.columns[t].ignore) continue;
                return !0;
            }
            return !1;
        }, r.hasAnyBreakpointColumn = function () {
            for (var e in r.columns) if (r.columns[e].hasBreakpoint) return !0;
            return !1;
        }, r.resize = function () {
            var t = e(r.table);
            if (t.is(":visible") && r.hasAnyBreakpointColumn()) {
                var a = { width: t.width(), viewportWidth: r.getViewportWidth(), parentWidth: t.parent().width() };
                a = r.calculateWidth(t, a);
                var o = t.data("footable_info");
                if (t.data("footable_info", a), r.raise(s.resizing, {
                    old: o,
                    info: a
                }), !o || o && o.width && o.width !== a.width) {
                    for (var i, n = null, l = 0; r.breakpoints.length > l; l++) if (i = r.breakpoints[l], i && i.width && a.width <= i.width) {
                        n = i;
                        break;
                    }
                    var d = null === n ? "default" : n.name,
                        f = r.hasBreakpointColumn(d),
                        p = t.data("breakpoint");
                    t.data("breakpoint", d).removeClass("default breakpoint").removeClass(r.breakpointNames).addClass(d + (f ? " breakpoint" : "")), d !== p && (t.trigger(u.redraw), r.raise(s.breakpoint, {
                        breakpoint: d,
                        info: a
                    }));
                }
                r.raise(s.resized, { old: o, info: a });
            }
        }, r.redraw = function () {
            r.addRowToggle(), r.bindToggleSelectors(), r.setColumnClasses();
            var t = e(r.table),
                a = t.data("breakpoint"),
                o = r.hasBreakpointColumn(a);
            t.find("> tbody > tr:not(." + d.detail + ")").data("detail_created", !1).end().find("> thead > tr:last-child > th").each(function () {
                var o = r.columns[e(this).index()],
                    i = "",
                    n = !0;
                e.each(o.matches, function (e, t) {
                    n || (i += ", ");
                    var a = t + 1;
                    i += "> tbody > tr:not(." + d.detail + ") > td:nth-child(" + a + ")", i += ", > tfoot > tr:not(." + d.detail + ") > td:nth-child(" + a + ")", i += ", > colgroup > col:nth-child(" + a + ")", n = !1;
                }), i += ', > thead > tr[data-group-row="true"] > th[data-group="' + o.group + '"]';
                var l = t.find(i).add(this);
                if ("" !== a && (o.hide[a] === !1 ? l.addClass("footable-visible").show() : l.removeClass("footable-visible").hide()), 1 === t.find("> thead > tr.footable-group-row").length) {
                    var s = t.find('> thead > tr:last-child > th[data-group="' + o.group + '"]:visible, > thead > tr:last-child > th[data-group="' + o.group + '"]:visible'),
                        u = t.find('> thead > tr.footable-group-row > th[data-group="' + o.group + '"], > thead > tr.footable-group-row > td[data-group="' + o.group + '"]'),
                        f = 0;
                    e.each(s, function () {
                        f += parseInt(e(this).attr("colspan") || 1, 10);
                    }), f > 0 ? u.attr("colspan", f).show() : u.hide();
                }
            }).end().find("> tbody > tr." + d.detailShow).each(function () {
                r.createOrUpdateDetailRow(this);
            }), t.find("> tbody > tr." + d.detailShow + ":visible").each(function () {
                var t = e(this).next();
                t.hasClass(d.detail) && (o ? t.show() : t.hide());
            }), t.find("> thead > tr > th.footable-last-column, > tbody > tr > td.footable-last-column").removeClass("footable-last-column"), t.find("> thead > tr > th.footable-first-column, > tbody > tr > td.footable-first-column").removeClass("footable-first-column"), t.find("> thead > tr, > tbody > tr").find("> th.footable-visible:last, > td.footable-visible:last").addClass("footable-last-column").end().find("> th.footable-visible:first, > td.footable-visible:first").addClass("footable-first-column"), r.raise(s.redrawn);
        }, r.toggleDetail = function (t) {
            var a = t.jquery ? t : e(t),
                o = a.next();
            a.hasClass(d.detailShow) ? (a.removeClass(d.detailShow), o.hasClass(d.detail) && o.hide(), r.raise(s.rowCollapsed, { row: a[0] })) : (r.createOrUpdateDetailRow(a[0]), a.addClass(d.detailShow).next().show(), r.raise(s.rowExpanded, { row: a[0] }));
        }, r.removeRow = function (t) {
            var a = t.jquery ? t : e(t);
            a.hasClass(d.detail) && (a = a.prev());
            var o = a.next();
            a.data("detail_created") === !0 && o.remove(), a.remove(), r.raise(s.rowRemoved);
        }, r.appendRow = function (t) {
            var a = t.jquery ? t : e(t);
            e(r.table).find("tbody").append(a), r.redraw();
        }, r.getColumnFromTdIndex = function (t) {
            var a = null;
            for (var o in r.columns) if (e.inArray(t, r.columns[o].matches) >= 0) {
                a = r.columns[o];
                break;
            }
            return a;
        }, r.createOrUpdateDetailRow = function (t) {
            var a,
                o = e(t),
                i = o.next(),
                n = [];
            if (o.data("detail_created") === !0) return !0;
            if (o.is(":hidden")) return !1;
            if (r.raise(s.rowDetailUpdating, { row: o, detail: i }), o.find("> td:hidden").each(function () {
                var t = e(this).index(),
                    a = r.getColumnFromTdIndex(t),
                    o = a.name;
                return a.ignore === !0 ? !0 : (t in a.names && (o = a.names[t]), n.push({
                    name: o,
                    value: r.parse(this, a),
                    display: e.trim(e(this).html()),
                    group: a.group,
                    groupName: a.groupName
                }), !0);
            }), 0 === n.length) return !1;
            var u = o.find("> td:visible").length,
                f = i.hasClass(d.detail);
            return f || (i = e('<tr class="' + d.detail + '"><td class="' + d.detailCell + '"><div class="' + d.detailInner + '"></div></td></tr>'), o.after(i)), i.find("> td:first").attr("colspan", u), a = i.find("." + d.detailInner).empty(), l.createDetail(a, n, l.createGroupedDetail, l.detailSeparator, d), o.data("detail_created", !0), r.raise(s.rowDetailUpdated, {
                row: o,
                detail: i
            }), !f;
        }, r.raise = function (t, a) {
            r.options.debug === !0 && e.isFunction(r.options.log) && r.options.log(t, "event"), a = a || {};
            var o = { ft: r };
            e.extend(!0, o, a);
            var i = e.Event(t, o);
            return i.ft || e.extend(!0, i, o), e(r.table).trigger(i), i;
        }, r.reset = function () {
            var t = e(r.table);
            t.removeData("footable_info").data("breakpoint", "").removeClass(d.loading).removeClass(d.loaded), t.find(l.toggleSelector).unbind(u.toggleRow).unbind("click.footable"), t.find("> tbody > tr").removeClass(d.detailShow), t.find("> tbody > tr." + d.detail).remove(), r.raise(s.reset);
        }, r.init(), r;
    }

    t.footable = {
        options: {
            delay: 100,
            breakpoints: { phone: 480, tablet: 1024 },
            parsers: {
                alpha: function (t) {
                    return e(t).data("value") || e.trim(e(t).text());
                }, numeric: function (t) {
                    var a = e(t).data("value") || e(t).text().replace(/[^0-9.\-]/g, "");
                    return a = parseFloat(a), isNaN(a) && (a = 0), a;
                }
            },
            addRowToggle: !0,
            calculateWidthOverride: null,
            toggleSelector: " > tbody > tr:not(.footable-row-detail)",
            columnDataSelector: "> thead > tr:last-child > th, > thead > tr:last-child > td",
            detailSeparator: ":",
            toggleHTMLElement: "<span />",
            createGroupedDetail: function (e) {
                for (var t = { _none: { name: null, data: [] } }, a = 0; e.length > a; a++) {
                    var o = e[a].group;
                    null !== o ? (o in t || (t[o] = {
                        name: e[a].groupName || e[a].group,
                        data: []
                    }), t[o].data.push(e[a])) : t._none.data.push(e[a]);
                }
                return t;
            },
            createDetail: function (e, t, a, o, i) {
                var n = a(t);
                for (var r in n) if (0 !== n[r].data.length) {
                    "_none" !== r && e.append('<div class="' + i.detailInnerGroup + '">' + n[r].name + "</div>");
                    for (var l = 0; n[r].data.length > l; l++) {
                        var d = n[r].data[l].name ? o : "";
                        e.append('<div class="' + i.detailInnerRow + '"><div class="' + i.detailInnerName + '">' + n[r].data[l].name + d + '</div><div class="' + i.detailInnerValue + '">' + n[r].data[l].display + "</div></div>");
                    }
                }
            },
            classes: {
                main: "footable",
                loading: "footable-loading",
                loaded: "footable-loaded",
                toggle: "footable-toggle",
                disabled: "footable-disabled",
                detail: "footable-row-detail",
                detailCell: "footable-row-detail-cell",
                detailInner: "footable-row-detail-inner",
                detailInnerRow: "footable-row-detail-row",
                detailInnerGroup: "footable-row-detail-group",
                detailInnerName: "footable-row-detail-name",
                detailInnerValue: "footable-row-detail-value",
                detailShow: "footable-detail-show"
            },
            triggers: {
                initialize: "footable_initialize",
                resize: "footable_resize",
                redraw: "footable_redraw",
                toggleRow: "footable_toggle_row",
                expandFirstRow: "footable_expand_first_row",
                expandAll: "footable_expand_all",
                collapseAll: "footable_collapse_all"
            },
            events: {
                alreadyInitialized: "footable_already_initialized",
                initializing: "footable_initializing",
                initialized: "footable_initialized",
                resizing: "footable_resizing",
                resized: "footable_resized",
                redrawn: "footable_redrawn",
                breakpoint: "footable_breakpoint",
                columnData: "footable_column_data",
                rowDetailUpdating: "footable_row_detail_updating",
                rowDetailUpdated: "footable_row_detail_updated",
                rowCollapsed: "footable_row_collapsed",
                rowExpanded: "footable_row_expanded",
                rowRemoved: "footable_row_removed",
                reset: "footable_reset"
            },
            debug: !1,
            log: null
        }, version: {
            major: 0, minor: 5, toString: function () {
                return t.footable.version.major + "." + t.footable.version.minor;
            }, parse: function (e) {
                return version = /(\d+)\.?(\d+)?\.?(\d+)?/.exec(e), {
                    major: parseInt(version[1], 10) || 0,
                    minor: parseInt(version[2], 10) || 0,
                    patch: parseInt(version[3], 10) || 0
                };
            }
        }, plugins: {
            _validate: function (a) {
                if (!e.isFunction(a)) return t.footable.options.debug === !0 && console.error('Validation failed, expected type "function", received type "{0}".', typeof a), !1;
                var o = new a();
                return "string" != typeof o.name ? (t.footable.options.debug === !0 && console.error('Validation failed, plugin does not implement a string property called "name".', o), !1) : e.isFunction(o.init) ? (t.footable.options.debug === !0 && console.log('Validation succeeded for plugin "' + o.name + '".', o), !0) : (t.footable.options.debug === !0 && console.error('Validation failed, plugin "' + o.name + '" does not implement a function called "init".', o), !1);
            }, registered: [], register: function (a, o) {
                t.footable.plugins._validate(a) && (t.footable.plugins.registered.push(a), "object" == typeof o && e.extend(!0, t.footable.options, o));
            }, load: function (e) {
                var a,
                    o,
                    i = [];
                for (o = 0; t.footable.plugins.registered.length > o; o++) try {
                    a = t.footable.plugins.registered[o], i.push(new a(e));
                } catch (n) {
                    t.footable.options.debug === !0 && console.error(n);
                }
                return i;
            }, init: function (e) {
                for (var a = 0; e.plugins.length > a; a++) try {
                    e.plugins[a].init(e);
                } catch (o) {
                    t.footable.options.debug === !0 && console.error(o);
                }
            }
        }
    };
    var i = 0;
    e.fn.footable = function (a) {
        a = a || {};
        var n = e.extend(!0, {}, t.footable.options, a);
        return this.each(function () {
            i++;
            var t = new o(this, n, i);
            e(this).data("footable", t);
        });
    };
})(jQuery, window);
;
(function (e, t, undefined) {
    function a() {
        var t = this;
        t.name = "Footable Filter", t.init = function (a) {
            if (t.footable = a, a.options.filter.enabled === !0) {
                if (e(a.table).data("filter") === !1) return;
                a.timers.register("filter"), e(a.table).unbind(".filtering").bind({
                    "footable_initialized.filtering": function () {
                        var i = e(a.table),
                            o = {
                            input: i.data("filter") || a.options.filter.input,
                            timeout: i.data("filter-timeout") || a.options.filter.timeout,
                            minimum: i.data("filter-minimum") || a.options.filter.minimum,
                            disableEnter: i.data("filter-disable-enter") || a.options.filter.disableEnter
                        };
                        o.disableEnter && e(o.input).keypress(function (e) {
                            return window.event ? 13 !== window.event.keyCode : 13 !== e.which;
                        }), i.bind("footable_clear_filter", function () {
                            e(o.input).val(""), t.clearFilter();
                        }), i.bind("footable_filter", function (e, a) {
                            t.filter(a.filter);
                        }), e(o.input).keyup(function (i) {
                            a.timers.filter.stop(), 27 === i.which && e(o.input).val(""), a.timers.filter.start(function () {
                                var a = e(o.input).val() || "";
                                t.filter(a);
                            }, o.timeout);
                        });
                    }, "footable_redrawn.filtering": function () {
                        var i = e(a.table),
                            o = i.data("filter-string");
                        o && t.filter(o);
                    }
                }).data("footable-filter", t);
            }
        }, t.filter = function (a) {
            var i = t.footable,
                o = e(i.table),
                n = o.data("filter-minimum") || i.options.filter.minimum,
                r = !a,
                l = i.raise("footable_filtering", {
                filter: a,
                clear: r
            });
            if (!(l && l.result === !1 || l.filter && n > l.filter.length)) if (l.clear) t.clearFilter();else {
                var d = l.filter.split(" ");
                o.find("> tbody > tr").hide().addClass("footable-filtered");
                var s = o.find("> tbody > tr:not(.footable-row-detail)");
                e.each(d, function (e, t) {
                    t && t.length > 0 && (o.data("current-filter", t), s = s.filter(i.options.filter.filterFunction));
                }), s.each(function () {
                    t.showRow(this, i), e(this).removeClass("footable-filtered");
                }), o.data("filter-string", l.filter), i.raise("footable_filtered", { filter: l.filter, clear: !1 });
            }
        }, t.clearFilter = function () {
            var a = t.footable,
                i = e(a.table);
            i.find("> tbody > tr:not(.footable-row-detail)").removeClass("footable-filtered").each(function () {
                t.showRow(this, a);
            }), i.removeData("filter-string"), a.raise("footable_filtered", { clear: !0 });
        }, t.showRow = function (t, a) {
            var i = e(t),
                o = i.next(),
                n = e(a.table);
            i.is(":visible") || (n.hasClass("breakpoint") && i.hasClass("footable-detail-show") && o.hasClass("footable-row-detail") ? (i.add(o).show(), a.createOrUpdateDetailRow(t)) : i.show());
        };
    }

    if (t.footable === undefined || null === t.footable) throw Error("Please check and make sure footable.js is included in the page and is loaded prior to this script.");
    var i = {
        filter: {
            enabled: !0,
            input: ".footable-filter",
            timeout: 300,
            minimum: 2,
            disableEnter: !1,
            filterFunction: function () {
                var t = e(this),
                    a = t.parents("table:first"),
                    i = a.data("current-filter").toUpperCase(),
                    o = t.find("td").text();
                return a.data("filter-text-only") || t.find("td[data-value]").each(function () {
                    o += e(this).data("value");
                }), o.toUpperCase().indexOf(i) >= 0;
            }
        }
    };
    t.footable.plugins.register(a, i);
})(jQuery, window);
;
(function (e, t, undefined) {
    function a(t) {
        var a = e(t.table),
            i = a.data();
        this.pageNavigation = i.pageNavigation || t.options.pageNavigation, this.pageSize = i.pageSize || t.options.pageSize, this.firstText = i.firstText || t.options.firstText, this.previousText = i.previousText || t.options.previousText, this.nextText = i.nextText || t.options.nextText, this.lastText = i.lastText || t.options.lastText, this.limitNavigation = parseInt(i.limitNavigation || t.options.limitNavigation || o.limitNavigation, 10), this.limitPreviousText = i.limitPreviousText || t.options.limitPreviousText, this.limitNextText = i.limitNextText || t.options.limitNextText, this.limit = this.limitNavigation > 0, this.currentPage = i.currentPage || 0, this.pages = [], this.control = !1;
    }

    function i() {
        var t = this;
        t.name = "Footable Paginate", t.init = function (a) {
            if (a.options.paginate === !0) {
                if (e(a.table).data("page") === !1) return;
                t.footable = a, e(a.table).unbind(".paging").bind({
                    "footable_initialized.paging footable_row_removed.paging footable_redrawn.paging footable_sorted.paging footable_filtered.paging": function () {
                        t.setupPaging();
                    }
                }).data("footable-paging", t);
            }
        }, t.setupPaging = function () {
            var i = t.footable,
                o = e(i.table).find("> tbody");
            i.pageInfo = new a(i), t.createPages(i, o), t.createNavigation(i, o), t.fillPage(i, o, i.pageInfo.currentPage);
        }, t.createPages = function (t, a) {
            var i = 1,
                o = t.pageInfo,
                n = i * o.pageSize,
                l = [],
                r = [];
            o.pages = [];
            var d = a.find("> tr:not(.footable-filtered,.footable-row-detail)");
            d.each(function (e, t) {
                l.push(t), e === n - 1 ? (o.pages.push(l), i++, n = i * o.pageSize, l = []) : e >= d.length - d.length % o.pageSize && r.push(t);
            }), r.length > 0 && o.pages.push(r), o.currentPage >= o.pages.length && (o.currentPage = o.pages.length - 1), 0 > o.currentPage && (o.currentPage = 0), 1 === o.pages.length ? e(t.table).addClass("no-paging") : e(t.table).removeClass("no-paging");
        }, t.createNavigation = function (a) {
            var i = e(a.table).find(a.pageInfo.pageNavigation);
            if (0 === i.length) {
                if (i = e(a.pageInfo.pageNavigation), i.parents("table:first").length > 0 && i.parents("table:first") !== e(a.table)) return;
                i.length > 1 && a.options.debug === !0 && console.error("More than one pagination control was found!");
            }
            if (0 !== i.length) {
                i.is("ul") || (0 === i.find("ul:first").length && i.append("<ul />"), i = i.find("ul")), i.find("li").remove();
                var o = a.pageInfo;
                o.control = i, o.pages.length > 0 && (i.append('<li class="footable-page-arrow"><a data-page="first" href="#first">' + a.pageInfo.firstText + "</a>"), i.append('<li class="footable-page-arrow"><a data-page="prev" href="#prev">' + a.pageInfo.previousText + "</a></li>"), o.limit && i.append('<li class="footable-page-arrow"><a data-page="limit-prev" href="#limit-prev">' + a.pageInfo.limitPreviousText + "</a></li>"), o.limit || e.each(o.pages, function (e, t) {
                    t.length > 0 && i.append('<li class="footable-page"><a data-page="' + e + '" href="#">' + (e + 1) + "</a></li>");
                }), o.limit && (i.append('<li class="footable-page-arrow"><a data-page="limit-next" href="#limit-next">' + a.pageInfo.limitNextText + "</a></li>"), t.createLimited(i, o, 0)), i.append('<li class="footable-page-arrow"><a data-page="next" href="#next">' + a.pageInfo.nextText + "</a></li>"), i.append('<li class="footable-page-arrow"><a data-page="last" href="#last">' + a.pageInfo.lastText + "</a></li>")), i.off("click", "a[data-page]").on("click", "a[data-page]", function (n) {
                    n.preventDefault();
                    var l = e(this).data("page"),
                        r = o.currentPage;
                    if ("first" === l) r = 0;else if ("prev" === l) r > 0 && r--;else if ("next" === l) o.pages.length - 1 > r && r++;else if ("last" === l) r = o.pages.length - 1;else if ("limit-prev" === l) {
                        r = -1;
                        var d = i.find(".footable-page:first a").data("page");
                        t.createLimited(i, o, d - o.limitNavigation), t.setPagingClasses(i, o.currentPage, o.pages.length);
                    } else if ("limit-next" === l) {
                        r = -1;
                        var s = i.find(".footable-page:last a").data("page");
                        t.createLimited(i, o, s + 1), t.setPagingClasses(i, o.currentPage, o.pages.length);
                    } else r = l;
                    if (r >= 0) {
                        if (o.limit && o.currentPage != r) {
                            for (var f = r; 0 !== f % o.limitNavigation;) f -= 1;
                            t.createLimited(i, o, f);
                        }
                        t.paginate(a, r);
                    }
                }), t.setPagingClasses(i, o.currentPage, o.pages.length);
            }
        }, t.createLimited = function (e, t, a) {
            a = a || 0, e.find("li.footable-page").remove();
            var i,
                o,
                n = e.find('li.footable-page-arrow > a[data-page="limit-prev"]').parent(),
                l = e.find('li.footable-page-arrow > a[data-page="limit-next"]').parent();
            for (i = t.pages.length - 1; i >= 0; i--) o = t.pages[i], i >= a && a + t.limitNavigation > i && o.length > 0 && n.after('<li class="footable-page"><a data-page="' + i + '" href="#">' + (i + 1) + "</a></li>");
            0 === a ? n.hide() : n.show(), a + t.limitNavigation >= t.pages.length ? l.hide() : l.show();
        }, t.paginate = function (a, i) {
            var o = a.pageInfo;
            if (o.currentPage !== i) {
                var n = e(a.table).find("> tbody"),
                    l = a.raise("footable_paging", { page: i, size: o.pageSize });
                if (l && l.result === !1) return;
                t.fillPage(a, n, i), o.control.find("li").removeClass("active disabled"), t.setPagingClasses(o.control, o.currentPage, o.pages.length);
            }
        }, t.setPagingClasses = function (e, t, a) {
            e.find("li.footable-page > a[data-page=" + t + "]").parent().addClass("active"), t >= a - 1 && (e.find('li.footable-page-arrow > a[data-page="next"]').parent().addClass("disabled"), e.find('li.footable-page-arrow > a[data-page="last"]').parent().addClass("disabled")), 1 > t && (e.find('li.footable-page-arrow > a[data-page="first"]').parent().addClass("disabled"), e.find('li.footable-page-arrow > a[data-page="prev"]').parent().addClass("disabled"));
        }, t.fillPage = function (a, i, o) {
            a.pageInfo.currentPage = o, e(a.table).data("currentPage", o), i.find("> tr").hide(), e(a.pageInfo.pages[o]).each(function () {
                t.showRow(this, a);
            }), a.raise("footable_page_filled");
        }, t.showRow = function (t, a) {
            var i = e(t),
                o = i.next(),
                n = e(a.table);
            n.hasClass("breakpoint") && i.hasClass("footable-detail-show") && o.hasClass("footable-row-detail") ? (i.add(o).show(), a.createOrUpdateDetailRow(t)) : i.show();
        };
    }

    if (t.footable === undefined || null === t.footable) throw Error("Please check and make sure footable.js is included in the page and is loaded prior to this script.");
    var o = {
        paginate: !0,
        pageSize: 10,
        pageNavigation: ".pagination",
        firstText: "&laquo;",
        previousText: "&lsaquo;",
        nextText: "&rsaquo;",
        lastText: "&raquo;",
        limitNavigation: 0,
        limitPreviousText: "...",
        limitNextText: "..."
    };
    t.footable.plugins.register(i, o);
})(jQuery, window);
;
(function (e, t, undefined) {
    function a() {
        var t = this;
        t.name = "Footable Sortable", t.init = function (a) {
            t.footable = a, a.options.sort === !0 && e(a.table).unbind(".sorting").bind({
                "footable_initialized.sorting": function () {
                    var i,
                        o,
                        n = e(a.table),
                        r = (n.find("> tbody"), a.options.classes.sort);
                    if (n.data("sort") !== !1) {
                        n.find("> thead > tr:last-child > th, > thead > tr:last-child > td").each(function () {
                            o = e(this), i = a.columns[o.index()], i.sort.ignore === !0 || o.hasClass(r.sortable) || (o.addClass(r.sortable), e("<span />").addClass(r.indicator).appendTo(o));
                        }), n.find("> thead > tr:last-child > th." + r.sortable + ", > thead > tr:last-child > td." + r.sortable).unbind("click.footable").bind("click.footable", function (a) {
                            a.preventDefault(), o = e(this);
                            var i = !o.hasClass(r.sorted);
                            return t.doSort(o.index(), i), !1;
                        });
                        var l = !1;
                        for (var s in a.columns) if (i = a.columns[s], i.sort.initial) {
                            var d = "descending" !== i.sort.initial;
                            t.doSort(i.index, d);
                            break;
                        }
                        l && a.bindToggleSelectors();
                    }
                }, "footable_redrawn.sorting": function () {
                    var i = e(a.table),
                        o = a.options.classes.sort;
                    i.data("sorted") >= 0 && i.find("> thead > tr:last-child > th").each(function (a) {
                        var i = e(this);
                        return i.hasClass(o.sorted) || i.hasClass(o.descending) ? (t.doSort(a), undefined) : undefined;
                    });
                }, "footable_column_data.sorting": function (t) {
                    var a = e(t.column.th);
                    t.column.data.sort = t.column.data.sort || {}, t.column.data.sort.initial = a.data("sort-initial") || !1, t.column.data.sort.ignore = a.data("sort-ignore") || !1, t.column.data.sort.selector = a.data("sort-selector") || null;
                    var i = a.data("sort-match") || 0;
                    i >= t.column.data.matches.length && (i = 0), t.column.data.sort.match = t.column.data.matches[i];
                }
            }).data("footable-sort", t);
        }, t.doSort = function (a, i) {
            var o = t.footable;
            if (e(o.table).data("sort") !== !1) {
                var n = e(o.table),
                    r = n.find("> tbody"),
                    l = o.columns[a],
                    s = n.find("> thead > tr:last-child > th:eq(" + a + ")"),
                    d = o.options.classes.sort,
                    f = o.options.events.sort;
                if (i = i === undefined ? s.hasClass(d.sorted) : "toggle" === i ? !s.hasClass(d.sorted) : i, l.sort.ignore === !0) return !0;
                var u = o.raise(f.sorting, { column: l, direction: i ? "ASC" : "DESC" });
                u && u.result === !1 || (n.data("sorted", l.index), n.find("> thead > tr:last-child > th, > thead > tr:last-child > td").not(s).removeClass(d.sorted + " " + d.descending), i === undefined && (i = s.hasClass(d.sorted)), i ? s.removeClass(d.descending).addClass(d.sorted) : s.removeClass(d.sorted).addClass(d.descending), t.sort(o, r, l, i), o.bindToggleSelectors(), o.raise(f.sorted, {
                    column: l,
                    direction: i ? "ASC" : "DESC"
                }));
            }
        }, t.rows = function (t, a, i) {
            var o = [];
            return a.find("> tr").each(function () {
                var a = e(this),
                    n = null;
                if (a.hasClass(t.options.classes.detail)) return !0;
                a.next().hasClass(t.options.classes.detail) && (n = a.next().get(0));
                var r = { row: a, detail: n };
                return i !== undefined && (r.value = t.parse(this.cells[i.sort.match], i)), o.push(r), !0;
            }).detach(), o;
        }, t.sort = function (e, a, i, o) {
            var n = t.rows(e, a, i),
                r = e.options.sorters[i.type] || e.options.sorters.alpha;
            n.sort(function (e, t) {
                return o ? r(e.value, t.value) : r(t.value, e.value);
            });
            for (var l = 0; n.length > l; l++) a.append(n[l].row), null !== n[l].detail && a.append(n[l].detail);
        };
    }

    if (t.footable === undefined || null === t.footable) throw Error("Please check and make sure footable.js is included in the page and is loaded prior to this script.");
    var i = {
        sort: !0,
        sorters: {
            alpha: function (e, t) {
                return "string" == typeof e && (e = e.toLowerCase()), "string" == typeof t && (t = t.toLowerCase()), e === t ? 0 : t > e ? -1 : 1;
            }, numeric: function (e, t) {
                return e - t;
            }
        },
        classes: {
            sort: {
                sortable: "footable-sortable",
                sorted: "footable-sorted",
                descending: "footable-sorted-desc",
                indicator: "footable-sort-indicator"
            }
        },
        events: { sort: { sorting: "footable_sorting", sorted: "footable_sorted" } }
    };
    t.footable.plugins.register(a, i);
})(jQuery, window);
;
(function (e, t, undefined) {
    function a() {
        var t = this;
        t.name = "Footable Striping", t.init = function (a) {
            t.footable = a, e(a.table).unbind("striping").bind({
                "footable_initialized.striping footable_row_removed.striping footable_redrawn.striping footable_sorted.striping footable_filtered.striping": function () {
                    e(this).data("striping") !== !1 && t.setupStriping(a);
                }
            });
        }, t.setupStriping = function (t) {
            var a = 0;
            e(t.table).find("> tbody > tr:not(.footable-row-detail)").each(function () {
                var i = e(this);
                i.removeClass(t.options.classes.striping.even).removeClass(t.options.classes.striping.odd), 0 === a % 2 ? i.addClass(t.options.classes.striping.even) : i.addClass(t.options.classes.striping.odd), a++;
            });
        };
    }

    if (t.footable === undefined || null === t.foobox) throw Error("Please check and make sure footable.js is included in the page and is loaded prior to this script.");
    var i = { striping: { enabled: !0 }, classes: { striping: { odd: "footable-odd", even: "footable-even" } } };
    t.footable.plugins.register(a, i);
})(jQuery, window);
;
(function (e, t, undefined) {
    function a(e, t) {
        t = t ? t : location.hash;
        var a = RegExp("&" + e + "(?:=([^&]*))?(?=&|$)", "i");
        return (t = t.replace(/^\#/, "&").match(a)) ? t[1] === undefined ? "" : decodeURIComponent(t[1]) : undefined;
    }

    function i(t, a) {
        var i = e(t.table).find("tbody").find("tr:not(.footable-row-detail, .footable-filtered)").length;
        e(t.table).data("status_num_total", i);
        var o = e(t.table).find("tbody").find("tr:not(.footable-row-detail)").filter(":visible").length;
        e(t.table).data("status_num_shown", o);
        var n = e(t.table).data("sorted"),
            r = e(t.table).find("th")[n],
            l = e(r).hasClass("footable-sorted-desc");
        if (e(t.table).data("status_descending", l), t.pageInfo) {
            var s = t.pageInfo.currentPage;
            e(t.table).data("status_pagenum", s);
        }
        var d = "",
            f = e(t.table).data("filter");
        e(f).length && (d = e(f).val()), e(t.table).data("status_filter_val", d);
        var p, u, g;
        if ("footable_row_expanded" == a.type && (p = a.row, p && (u = e(t.table).data("expanded_rows"), g = [], u && (g = u.split(",")), g.push(p.rowIndex), e(t.table).data("expanded_rows", g.join(",")))), "footable_row_collapsed" == a.type && (p = a.row)) {
            u = e(t.table).data("expanded_rows"), g = [], u && (g = u.split(",")), new_expanded_rows = [];
            for (var c in g) if (g[c] == p.rowIndex) {
                new_expanded_rows = g.splice(c, 1);
                break;
            }
            e(t.table).data("expanded_rows", new_expanded_rows.join(","));
        }
    }

    function o() {
        var t = this;
        t.name = "Footable LucidBookmarkable", t.init = function (t) {
            t.options.bookmarkable.enabled && e(t.table).bind({
                footable_initialized: function () {
                    var i = t.table.id,
                        o = a(i + "_f"),
                        n = a(i + "_p"),
                        r = a(i + "_s"),
                        l = a(i + "_d"),
                        s = a(i + "_e");
                    if (o) {
                        var d = e(t.table).data("filter");
                        e(d).val(o), e(t.table).trigger("footable_filter", { filter: o });
                    }
                    if (n && e(t.table).data("currentPage", n), r !== undefined) {
                        var f = e(t.table).data("footable-sort"),
                            p = !0;
                        "true" == l && (p = !1), f.doSort(r, p);
                    } else e(t.table).trigger("footable_setup_paging");
                    if (s) {
                        var u = s.split(",");
                        for (var g in u) row = e(t.table.rows[u[g]]), row.find("> td:first").trigger("footable_toggle_row");
                    }
                    t.lucid_bookmark_read = !0;
                },
                "footable_page_filled footable_redrawn footable_filtered footable_sorted footable_row_expanded footable_row_collapsed": function (a) {
                    if (i(t, a), t.lucid_bookmark_read) {
                        var o = t.table.id,
                            n = o + "_f",
                            r = o + "_p",
                            l = o + "_s",
                            s = o + "_d",
                            d = o + "_e",
                            f = location.hash.replace(/^\#/, "&"),
                            p = [n, r, l, s, d];
                        for (var u in p) {
                            var g = RegExp("&" + p[u] + "=([^&]*)", "g");
                            f = f.replace(g, "");
                        }
                        var c = {};
                        c[n] = e(t.table).data("status_filter_val"), c[r] = e(t.table).data("status_pagenum"), c[l] = e(t.table).data("sorted"), c[s] = e(t.table).data("status_descending"), c[d] = e(t.table).data("expanded_rows");
                        var b = [];
                        for (var h in c) c[h] !== undefined && b.push(h + "=" + encodeURIComponent(c[h]));
                        f.length && b.push(f), location.hash = b.join("&");
                    }
                }
            });
        };
    }

    if (t.footable === undefined || null === t.foobox) throw Error("Please check and make sure footable.js is included in the page and is loaded prior to this script.");
    var n = { bookmarkable: { enabled: !1 } };
    t.footable.plugins.register(o, n);
})(jQuery, window);

//# sourceMappingURL=footable.all.min-compiled.js.map