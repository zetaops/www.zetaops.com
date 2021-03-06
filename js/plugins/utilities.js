// Utilities
/*!
 * jQuery spriteOnHover Plugin 
 * Examples and documentation at: http://apolinariopassos.com.br/dev/spriteonhover
 * Copyright (c) 2012
 * Author: João Paulo Apolinário Passos	
 * Version: 0.2.5
 * Licenced under the DWTFYWT public license.
 * http://apolinariopassos.com.br/dev/license
 */

(function ($) {
    "use strict"
    $.fn.spriteOnHover = function (args) {
        var args = $.extend({
            fps: 30,
            orientation: "horizontal",
            rewind: true,
            loop: false,
            autostart: false,
            repeat: true
        }, args);
        var fps = args.fps;
        var sprite_orientation = args.orientation;
        var rewind = args.rewind;
        var loop = args.loop;
        var autostart = args.autostart;
        var repeat = args.repeat;
        if (rewind != false && rewind != "unanimate") {
            rewind = true
        }
        if (sprite_orientation != "vertical" || sprite_orientation === undefined) {
            sprite_orientation = "horizontal"
        }
        var looper_in;
        var looper_out;
        var path = $(this).css("background-image").replace("url", "").replace("(", "").replace(")", "").replace('"', "").replace('"', "");
        var count = $('img[id^="tempImg"]').length + 1;
        var tempImg = '<img style="max-width: none !important;width: auto!important;min-width: none!important;max-height:none !important;height: auto !important;min-height:none !important" id="tempImg' + count + '" src="' + path + ' "/>';
        $("body").append(tempImg);
        $("#tempImg" + count).hide();
        var frame_width = $(this).width();
        var frame_height = $(this).height();
        var this_parent = $(this);
        $("#tempImg" + count).load(function () {
            function g() {
                if (!a) {
                    e = b;
                    var g = 0;
                    var h = false;
                    var i = false;
                    looper_in = setInterval(function () {
                        g++;
                        f = true;
                        $(this_parent).mouseleave(function () {
                            if (loop != "infinite") {
                                g = d;
                                h = true;
                                if (!i) {
                                    if (!repeat)a = true
                                }
                            }
                        });
                        if (repeat) {
                            var j = $(this_parent).css("background-position").split(" ");
                            if (sprite_orientation == "horizontal")var k = j[0]; else var k = j[1];
                            if (parseInt(k) * -1 == b * (d - 1) && h) {
                                clearInterval(looper_in);
                                f = false;
                                a = false;
                                i = true
                            }
                        }
                        if (g == d) {
                            if (loop == true || loop == "infinite") {
                                $(this_parent).css("background-position", "0px 0px");
                                e = b;
                                g = 0
                            } else {
                                clearInterval(looper_in);
                                f = false
                            }
                            if (!repeat)a = true
                        } else {
                            if (e <= c - b)if (sprite_orientation == "horizontal") {
                                $(this_parent).css("background-position", "-" + e + "px 0px")
                            } else {
                                $(this_parent).css("background-position", "0px -" + e + "px")
                            }
                            e = e + b
                        }
                    }, parseInt(1e3 / fps))
                }
            }

            function h() {
                if (rewind == true) {
                    var g = 0;
                    looper_out = setInterval(function () {
                        g++;
                        var h = $(this_parent).css("background-position").split(" ");
                        if (sprite_orientation == "horizontal")var i = h[0]; else var i = h[1];
                        if (g == d || parseInt(i) == 0) {
                            f = false;
                            if (repeat)a = false;
                            $(this_parent).css("background-position", "0px 0px");
                            clearInterval(looper_out)
                        }
                        e = e - b;
                        if (e <= c - b) {
                            if (sprite_orientation == "horizontal")$(this_parent).css("background-position", "-" + e + "px 0px"); else $(this_parent).css("background-position", "0px -" + e + "px")
                        }
                    }, parseInt(1e3 / fps))
                } else {
                    a = true;
                    f = false
                }
            }

            var a = false;
            if (sprite_orientation == "horizontal") {
                var b = $(this_parent).width();
                var c = $(this).width()
            } else {
                var c = $(this).height();
                var b = $(this_parent).height()
            }
            var d = c / b;
            var e = b;
            var f = false;
            var a = false;
            if (autostart == true) {
                g();
                if (loop != "infinite") {
                    autostart = false
                }
            }
            $(this_parent).hover(function () {
                if (looper_out != undefined) {
                    clearInterval(looper_out)
                }
                if (!autostart) {
                    if (!f)g()
                }
            }, function () {
                if (loop == false && rewind == true) {
                    h();
                    if (repeat)a = false;
                    clearInterval(looper_in)
                } else if (loop != "infinite") {
                    if (rewind == "unanimate") {
                        $(this_parent).css("background-position", "0px 0px");
                        clearInterval(looper_in);
                        if (repeat)a = false;
                        f = false
                    } else if (!autostart) {
                        if (rewind == true && loop != "infinite") {
                            h();
                            if (repeat)a = false;
                            clearInterval(looper_in)
                        } else if (rewind == false && loop != "infinite") {
                            if (repeat)a = false
                        }
                    }
                }
            });
            $(this).remove()
        })
    }
})(jQuery);

/* Breakpoints JS */
!function (n) {
    "use strict"
    function t(n) {
        if (!n.condition()) {
            if (c("Exiting breakpoint: " + n), "function" == typeof n.exit)try {
                n.exit.apply(n)
            } catch (t) {
            }
            n.is_active = !1
        }
    }

    function i(n) {
        if (n.condition()) {
            if ("function" == typeof n.first_enter) {
                c("Entering breakpoint for the first time: " + n)
                try {
                    n.first_enter.apply(n)
                } catch (t) {
                }
                delete n.first_enter
            }
            if ("function" == typeof n.enter) {
                c("Entering breakpoint: " + n)
                try {
                    n.enter.apply(n)
                } catch (t) {
                }
            }
            n.is_active = !0
        }
    }

    function e(n) {
        n.is_active ? t(n) : i(n)
    }

    function o() {
        var e = n.grep(r, function (n) {
            return n.is_active
        }), o = n.grep(r, function (n) {
            return !n.is_active
        })
        n.each(e, function (n, i) {
            t(i)
        }), n.each(o, function (n, t) {
            i(t)
        })
    }

    function c() {
        n.breakpoint.debug && console && console.info && console.info.apply(console, arguments)
    }

    var r = []
    n.breakpoint = function (t, i) {
        i = n.extend(!0, {}, n.breakpoint.defaults, i), r.push(t), 1 === r.length && n(window).on("resize orientationchange", function () {
            o()
        }), e(t)
    }, n.breakpoint.breakpoints = r, n.breakpoint.check = function (n) {
        e(n)
    }, n.breakpoint.defaults = {}, n.breakpoint.debug = !1
}(jQuery)