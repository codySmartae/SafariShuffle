/**
 * @license almond 0.3.3 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/almond/LICENSE
 */

!(function () {
    var t, e, i;
    !(function (n) {
        function s(t, e) {
            return E.call(t, e);
        }
        function o(t, e) {
            var i,
                n,
                s,
                o,
                r,
                a,
                c,
                h,
                l,
                u,
                d,
                p,
                f = e && e.split("/"),
                m = w.map,
                g = (m && m["*"]) || {};
            if (t) {
                for (t = t.split("/"), r = t.length - 1, w.nodeIdCompat && T.test(t[r]) && (t[r] = t[r].replace(T, "")), "." === t[0].charAt(0) && f && ((p = f.slice(0, f.length - 1)), (t = p.concat(t))), l = 0; l < t.length; l++)
                    if ("." === (d = t[l])) t.splice(l, 1), (l -= 1);
                    else if (".." === d) {
                        if (0 === l || (1 === l && ".." === t[2]) || ".." === t[l - 1]) continue;
                        l > 0 && (t.splice(l - 1, 2), (l -= 2));
                    }
                t = t.join("/");
            }
            if ((f || g) && m) {
                for (i = t.split("/"), l = i.length; l > 0; l -= 1) {
                    if (((n = i.slice(0, l).join("/")), f))
                        for (u = f.length; u > 0; u -= 1)
                            if ((s = m[f.slice(0, u).join("/")]) && (s = s[n])) {
                                (o = s), (a = l);
                                break;
                            }
                    if (o) break;
                    !c && g && g[n] && ((c = g[n]), (h = l));
                }
                !o && c && ((o = c), (a = h)), o && (i.splice(0, a, o), (t = i.join("/")));
            }
            return t;
        }
        function r(t, e) {
            return function () {
                var i = C.call(arguments, 0);
                return "string" != typeof i[0] && 1 === i.length && i.push(null), f.apply(n, i.concat([t, e]));
            };
        }
        function a(t) {
            return function (e) {
                return o(e, t);
            };
        }
        function c(t) {
            return function (e) {
                v[t] = e;
            };
        }
        function h(t) {
            if (s(y, t)) {
                var e = y[t];
                delete y[t], (b[t] = !0), p.apply(n, e);
            }
            if (!s(v, t) && !s(b, t)) throw new Error("No " + t);
            return v[t];
        }
        function l(t) {
            var e,
                i = t ? t.indexOf("!") : -1;
            return i > -1 && ((e = t.substring(0, i)), (t = t.substring(i + 1, t.length))), [e, t];
        }
        function u(t) {
            return t ? l(t) : [];
        }
        function d(t) {
            return function () {
                return (w && w.config && w.config[t]) || {};
            };
        }
        var p,
            f,
            m,
            g,
            v = {},
            y = {},
            w = {},
            b = {},
            E = Object.prototype.hasOwnProperty,
            C = [].slice,
            T = /\.js$/;
        (m = function (t, e) {
            var i,
                n = l(t),
                s = n[0],
                r = e[1];
            return (
                (t = n[1]), s && ((s = o(s, r)), (i = h(s))), s ? (t = i && i.normalize ? i.normalize(t, a(r)) : o(t, r)) : ((t = o(t, r)), (n = l(t)), (s = n[0]), (t = n[1]), s && (i = h(s))), { f: s ? s + "!" + t : t, n: t, pr: s, p: i }
            );
        }),
            (g = {
                require: function (t) {
                    return r(t);
                },
                exports: function (t) {
                    var e = v[t];
                    return void 0 !== e ? e : (v[t] = {});
                },
                module: function (t) {
                    return { id: t, uri: "", exports: v[t], config: d(t) };
                },
            }),
            (p = function (t, e, i, o) {
                var a,
                    l,
                    d,
                    p,
                    f,
                    w,
                    E,
                    C = [],
                    T = typeof i;
                if (((o = o || t), (w = u(o)), "undefined" === T || "function" === T)) {
                    for (e = !e.length && i.length ? ["require", "exports", "module"] : e, f = 0; f < e.length; f += 1)
                        if (((p = m(e[f], w)), "require" === (l = p.f))) C[f] = g.require(t);
                        else if ("exports" === l) (C[f] = g.exports(t)), (E = !0);
                        else if ("module" === l) a = C[f] = g.module(t);
                        else if (s(v, l) || s(y, l) || s(b, l)) C[f] = h(l);
                        else {
                            if (!p.p) throw new Error(t + " missing " + l);
                            p.p.load(p.n, r(o, !0), c(l), {}), (C[f] = v[l]);
                        }
                    (d = i ? i.apply(v[t], C) : void 0), t && (a && a.exports !== n && a.exports !== v[t] ? (v[t] = a.exports) : (d === n && E) || (v[t] = d));
                } else t && (v[t] = i);
            }),
            (t = e = f = function (t, e, i, s, o) {
                if ("string" == typeof t) return g[t] ? g[t](e) : h(m(t, u(e)).f);
                if (!t.splice) {
                    if (((w = t), w.deps && f(w.deps, w.callback), !e)) return;
                    e.splice ? ((t = e), (e = i), (i = null)) : (t = n);
                }
                return (
                    (e = e || function () { }),
                    "function" == typeof i && ((i = s), (s = o)),
                    s
                        ? p(n, t, e, i)
                        : setTimeout(function () {
                            p(n, t, e, i);
                        }, 4),
                    f
                );
            }),
            (f.config = function (t) {
                return f(t);
            }),
            (t._defined = v),
            (i = function (t, e, i) {
                if ("string" != typeof t) throw new Error("See almond README: incorrect module build, no module name");
                e.splice || ((i = e), (e = [])), s(v, t) || s(y, t) || (y[t] = [t, e, i]);
            }),
            (i.amd = { jQuery: !0 });
    })(),
        i("libs/almond", function () { }),
        i("rs/three/BaseApp", [], function () {
            "use strict";
            function t(t, e, i) {
                (this.width = t || 1e3), (this.height = e || 600), (this.fov = i || 60), this.init();
            }
            return (
                (t.prototype.init = function () {
                    (this.scene = new THREE.Scene()), (this.camera = new THREE.PerspectiveCamera(this.fov, this.width / this.height, 100, 3e4));
                    var t = (this.renderer = new THREE.WebGLRenderer({ alpha: !0, antialias: !0 }));
                    t.setSize(this.width, this.height), t.setPixelRatio(window.devicePixelRatio), this.camera.lookAt(new THREE.Vector3(0, 0, 0)), (this.el = t.domElement), (this.raycaster = new THREE.Raycaster());
                }),
                (t.prototype._renderRequest = function (t) {
                    this.renderer.render(this.scene, this.camera), (this.rId = requestAnimationFrame(this._renderRequest.bind(this)));
                }),
                (t.prototype.startRendering = function () {
                    this.stopRendering(), (this.rId = requestAnimationFrame(this._renderRequest.bind(this)));
                }),
                (t.prototype.stopRendering = function () {
                    cancelAnimationFrame(this.rId);
                }),
                (t.prototype.resizeHandler = function () {
                    this.thfov = Math.tan((this.camera.fov * Math.PI) / 360);
                }),
                (t.prototype.setCameraMatchProjection = function (t) {
                    t = t || 1;
                    var e = this.camera,
                        i = (0.5 * this.height) / Math.tan((e.fov * Math.PI) / 360);
                    (e.position.x = e.position.y = 0), (e.position.z = i / t), e.lookAt(new THREE.Vector3(0, 0, 0));
                }),
                (t.prototype._getScaleFitRatio = function (t, e, i) {
                    i = i || 0.75;
                    var n = t / e;
                    return this.width / n > this.height ? (this.height * i) / e : (this.width * i) / t;
                }),
                (t.prototype.getScaleFitPositionZ = function (t, e, i) {
                    this.setCameraMatchProjection();
                    var n = this._getScaleFitRatio(t, e, i),
                        s = this.camera.position.z;
                    return s - s / n;
                }),
                t
            );
        }),
        i("rs/fc3d/Preferences", [], function () {
            "use strict";
            function t(t, e) {
                (this.dataString = e), (this.config = t), this.init(e);
            }
            return (
                (t.prototype.init = function (t) {
                    null == t ? ((this.data = { name: "fc3d", category: 0, grid: "3x4" }), this.save()) : (this.data = JSON.parse(t));
                }),
                (t.prototype.save = function () {
                    null != this.data && localStorage.setItem("fc3d", JSON.stringify(this.data));
                }),
                (t.prototype.saveCategory = function (t) {
                    (this.data.category = t), this.save();
                }),
                t
            );
        }),
        i("rs/fc3d/AssetManager", [], function () {
            "use strict";
            function t(t) {
                (this.fc3d = t), this.init();
            }
            var e = "assets/graphics";
            return (
                (t.prototype.init = function () {
                    var t = (this.loadingManager = new THREE.LoadingManager()),
                        e = this;
                    (t.onLoad = function () {
                        (e.loaded = !0), console.log("Assets loaded"), e.onLoad && e.onLoad.call(e);
                    }),
                        (t.onProgress = function (t, i, n) {
                            e.onProgress && e.onProgress.call(e, t, i, n);
                        }),
                        (this.soundOn = !0);
                }),
                (t.prototype.load = function () {
                    this.loadAudio(), this.loadTextures();
                }),
                (t.prototype.loadAudio = function () {
                    function t(t, i) {
                        var s = new THREE.Audio(n);
                        return (
                            new THREE.AudioLoader(e.loadingManager).load(t, function (t) {
                                s.setBuffer(t), i && i.call(e);
                            }),
                            s
                        );
                    }
                    var e = this,
                        i = this.fc3d.config,
                        n = new THREE.AudioListener();
                    i.general.useBackgroundMusic &&
                        (this.bgSound = t("assets/sounds/bg.mp3", function () {
                            this.bgSound.setVolume(0.5), this.bgSound.setLoop(!0);
                        })),
                        (this.btnClick = t("assets/sounds/btnClick.mp3")),
                        (this.firework = t("assets/sounds/firework.mp3")),
                        (this.wintune = t("assets/sounds/wintune.mp3")),
                        (this.shufflestart = t("assets/sounds/shufflestart.mp3")),
                        (this.shuffleend = t("assets/sounds/shuffleend.mp3"));
                }),
                (t.prototype.loadTextures = function () {
                    var t = (this.fc3d.defaultOptions, this),
                        i = this.fc3d.config.general.cardTextures;
                    this.cardTextures = [];
                    for (var n = 0; n < i.length; n++)
                        !(function (i) {
                            new THREE.TextureLoader(t.loadingManager).load(e + "/" + i, function (e) {
                                t.cardTextures.push(e);
                            });
                        })(i[n]);
                    new THREE.TextureLoader(t.loadingManager).load(e + "/lensflare.png", function (e) {
                        t.fwTexture = e;
                    });
                }),
                (t.prototype.toggleSound = function () {
                    (this.soundOn = !this.soundOn),
                        this.soundOn
                            ? (this.bgSound && this.bgSound.setVolume(0.8), this.btnClick.setVolume(0.8), this.firework.setVolume(1), this.wintune.setVolume(1), this.shufflestart.setVolume(1), this.shuffleend.setVolume(1))
                            : (this.bgSound && this.bgSound.setVolume(0), this.btnClick.setVolume(0), this.firework.setVolume(0), this.wintune.setVolume(0), this.shufflestart.setVolume(0), this.shuffleend.setVolume(0));
                }),
                t
            );
        }),
        i("rs/fc3d/ui/HomeScreenHeader", [], function () {
            "use strict";
            function t(t) {
                (this.hs = t), this.init();
            }
            return (
                (t.prototype.init = function () {
                    var t = (this.el = document.createElement("div"));
                    t.className = "rs-hscreen-header";
                    var e = this.hs.config;
                    (this.title = document.createElement("h1")),
                        (this.title.className = "app-title"),
                        (this.title.innerHTML = e.strings.APP_TITLE),
                        t.appendChild(this.title),
                        (this.info = document.createElement("span")),
                        (this.info.className = "app-info"),
                        (this.info.innerHTML = e.strings.APP_INFO),
                        t.appendChild(this.info),
                        (this.progress = document.createElement("div")),
                        (this.progress.className = "app-progress"),
                        (this.progressInner = document.createElement("div")),
                        (this.progressInner.className = "app-progress-inner"),
                        t.appendChild(this.progress),
                        this.progress.appendChild(this.progressInner),
                        this.setProgress(0),
                        (this.logo = document.createElement("img")),
                        (this.logo.className = "app-logo"),
                        (this.logo.src = "assets/graphics/logo.png"),
                        (this.logo.onmousedown = function (t) {
                            t.preventDefault();
                        }),
                        t.appendChild(this.logo);
                }),
                (t.prototype.hideProgress = function () {
                    var t = this.progress;
                    anime({
                        targets: t,
                        opacity: 0,
                        easing: "easeOutQuint",
                        complete: function () {
                            t.style.display = "none";
                        },
                    });
                }),
                (t.prototype.hideLogo = function () {
                    var t = this.logo,
                        e = this.hs.fc3d.isMobile;
                    anime({
                        targets: t,
                        opacity: 0,
                        easing: "easeOutQuint",
                        complete: function () {
                            if (e) return void (t.style.display = "none");
                            anime.remove(t), anime({ targets: t, width: 32, marginTop: 20, opacity: 1 });
                        },
                    });
                }),
                (t.prototype.setProgress = function (t) {
                    this.progressInner.style.width = t + "%";
                }),
                (t.prototype.moveTop = function () {
                    this.hideProgress(), this.hideLogo(), anime({ targets: this.el, top: 0, translateY: 0, easing: "easeOutQuint", duration: 1200 });
                }),
                (t.prototype.center = function () {
                    var t = this.hs.fc3d.assetManager,
                        e = this.el;
                    anime({
                        targets: this.el,
                        top: "50%",
                        translateY: "-50%",
                        duration: 1400,
                        update: function () {
                            t.showDelay && (anime.remove(e), anime({ targets: e, top: 0, translateY: 0, duration: 0 }));
                        },
                    });
                }),
                t
            );
        }),
        i("rs/fc3d/ui/HomeScreenMenu", [], function () {
            "use strict";
            function t(t) {
                (this.hs = t), this.init();
            }
            return (
                (t.prototype.init = function () {
                    var t = (this.el = document.createElement("div"));
                    (t.className = "rs-hscreenmenu"), (this.con = document.createElement("div")), (this.con.className = "menu-list"), t.appendChild(this.con);
                    var e = this.hs.config,
                        i = this.hs;
                    if (e.general.useName) {
                        this.addItem(e.strings.NAME, null, true, "text");
                    }
                    if (e.general.useAge) {
                        this.addItem(e.strings.AGE, null, true, "number");
                    }
                    this.addItem(e.strings.NEW_GAME, function () {
                        i.startNewGame();
                    }),
                        e.general.useHelpPanel &&
                        this.addItem(e.strings.HELP, function () {
                            i.showHelp();
                        }),
                        e.general.useCreditPanel &&
                        this.addItem(e.strings.CREDIT, function () {
                            i.showCredit();
                        });
                    e.general.useScoreboardpanel &&
                        this.addItem(e.strings.SCOREBOARD, function () {
                            i.showScoreboard(); // Correctly reference the HomeScreen instance
                        });


                }),
                // Updated addItem method
                (t.prototype.addItem = function (label, callback, isInput = false, inputType = "text") {
                    var item = document.createElement("div");

                    // Remove class if rendering an input
                    if (!isInput) {
                        item.className = "menu-item";
                    }
                    item.style.opacity = 1;

                    if (isInput) {
                        // Render input field
                        const inputElement = document.createElement("input");
                        inputElement.type = inputType;
                        inputElement.placeholder = `Enter your ${label.toLowerCase()}`;
                        inputElement.style = "width: -webkit-fill-available;border:none !important;"
                        inputElement.className = "menu-item"; // Assign class only to input
                        // Assign specific IDs for "Name" and "Age"
                        if (label == "Name") {
                            inputElement.id = "name"; // Set id for the Name field
                        } else if (label == "Age") {
                            inputElement.id = "age"; // Set id for the Age field
                        }
                        // Append input to container
                        item.innerHTML = ""; // Clear any existing content
                        item.appendChild(inputElement);

                        // Optional: Capture input value
                        inputElement.addEventListener("change", function () {
                            console.log(`${label}:`, inputElement.value);
                        });
                    } else {
                        // Render regular menu item
                        item.innerHTML = label;

                        // Add click event
                        var assetManager = this.hs.fc3d.assetManager;
                        item.addEventListener("click", function () {
                            if (callback) callback.call(this);
                            assetManager.btnClick.play();
                        });
                    }

                    // Append to menu list
                    this.con.appendChild(item);
                }),
                (t.prototype.populateScores = function (scoreList) {
                    // Fetch scores from localStorage
                    const scores = JSON.parse(localStorage.getItem("scores")) || {};

                    // Debugging: Log retrieved scores
                    console.log("Retrieved Scores:", scores);

                    // Clear previous entries
                    scoreList.innerHTML = "";

                    // Display scores
                    Object.values(scores).forEach(({ name, age, totalScore }, index) => {
                        const scoreItem = document.createElement("li");
                        scoreItem.innerText = `${index + 1}. ${name} (Age: ${age}): ${totalScore} points`;
                        scoreList.appendChild(scoreItem);
                    });

                    // Handle case when no scores are available
                    if (Object.keys(scores).length === 0) {
                        const noScores = document.createElement("li");
                        noScores.innerText = "No scores available";
                        scoreList.appendChild(noScores);
                    }
                }),

                // Show menu with animation
                (t.prototype.show = function () {
                    anime({
                        targets: ".rs-hscreenmenu .menu-item",
                        opacity: 1,
                        easing: "easeOutQuad",
                        delay: anime.stagger(150, { start: 500 })
                    });
                }),
                t
            );
        }),
        i("rs/utils/BrowserUtil", [], function () {
            "use strict";
            var t = {
                bp: { XS: 0, SM: 576, MD: 768, LG: 992, XL: 1200, XXL: 1500, X3L: 1900, X4L: 2e3, X5L: 3e3 },
                computeStyle: function (t, e, i) {
                    return void 0 === i && (i = "px"), parseFloat(getComputedStyle(t)[e].replace(i, ""));
                },
                css: function (t, e) {
                    for (var i in e) t.style[i] = e[i];
                },
                getPrefix: function () {
                    return (
                        t.pf ||
                        (window.opera || navigator.userAgent.indexOf(" OPR/") >= 0
                            ? ((t.pf = "Webkit"), (t.browserName = "Opera"))
                            : "undefined" != typeof InstallTrigger
                                ? ((t.pf = "Moz"), (t.browserName = "Firefox"))
                                : window.safari
                                    ? ((t.pf = "Webkit"), (t.browserName = "Safari"))
                                    : window.chrome
                                        ? ((t.pf = "Webkit"), (t.browserName = "Chrome"))
                                        : document.documentMode
                                            ? ((t.pf = "ms"), (t.browserName = "MSIE"))
                                            : /Edge/.test(navigator.userAgent)
                                                ? ((t.pf = "ms"), (t.browserName = "MSIE"))
                                                : ((t.pf = "Webkit"), (t.browserName = "Safari")),
                            "Webkit" === t.pf ? (t.ps = "") : (t.ps = "px"),
                            "" !== t.pf ? (t.csspf = "-" + t.pf.toLowerCase() + "-") : (t.csspf = ""),
                            console.log(t.pf)),
                        t.pf
                    );
                },
                getMouseTouchEvents: function () {
                    return this.isMobile() ? { mdown: "touchstart", mmove: "touchmove", mup: "touchend" } : { mdown: "mousedown", mmove: "mousemove", mup: "mouseup" };
                },
                isMobile: function () {
                    return void 0 === t.imb && (t.imb = null === document.createElement("span").ontouchstart), t.imb;
                },
                goFullscreen: function (e) {
                    var i = t.isFullscreenSupported();
                    return !!i && ("" === i ? e.requestFullScreen() : e[i + "RequestFullScreen"]());
                },
                exitFullscreen: function (e) {
                    var i = t.isFullscreenSupported();
                    return !!i && !!t.isFullscreen() && ("" === i ? document.cancelFullScreen() : document[i + "CancelFullScreen"]());
                },
                fullScreenCallback: function (e, i, n) {
                    var s = t.isFullscreenSupported();
                    if (!s) return !1;
                    var o = s + "fullscreenchange";
                    document.addEventListener(o, i);
                },
                isFullscreen: function () {
                    var e = t.isFullscreenSupported();
                    if (!e) return !1;
                    switch (e) {
                        case "":
                            return document.fullScreen;
                        case "webkit":
                            return document.webkitIsFullScreen;
                        default:
                            return document[e + "FullScreen"];
                    }
                },
                isFullscreenSupported: function () {
                    var e = t.pf.toLowerCase();
                    return void 0 !== document.cancelFullScreen ? "" : void 0 !== document[e + "CancelFullScreen"] && e;
                },
            };
            return t;
        }),
        i("rs/game/Scroller", ["rs/utils/BrowserUtil"], function (t) {
            "use strict";
            function e(e) {
                t.isMobile() ? ((i = "touchstart"), (n = "touchend"), (s = "touchmove")) : ((i = "mousedown"), (n = "mouseup"), (s = "mousemove")), (this.el = e), (this.el.style.overflow = "hidden"), this.init();
            }
            var i, n, s;
            return (
                (e.prototype.init = function () {
                    function t() {
                        (u.scrollTop += 0.075 * (h - u.scrollTop)), (d.scrollId = requestAnimationFrame(t));
                    }
                    function e(e) {
                        (l = e.touches ? e.touches[0].clientY : e.clientY),
                            (a = l),
                            (c = h = u.scrollTop),
                            u.addEventListener(s, o),
                            u.addEventListener(n, r),
                            window.addEventListener(s, o),
                            window.addEventListener(n, r),
                            cancelAnimationFrame(d.scrollId),
                            (d.scrollId = requestAnimationFrame(t)),
                            (u.style.cursor = "grab");
                    }
                    function o(t) {
                        t.preventDefault(), (l = t.changedTouches ? t.changedTouches[0].clientY : t.clientY);
                        var e = 2.5 * (l - a),
                            i = u.scrollHeight - d.el.clientHeight,
                            n = c - e;
                        n > i && (n = i), n < 0 && (n = 0), (h = n), (u.style.cursor = "grabbing");
                    }
                    function r(t) {
                        u.removeEventListener(s, o), u.removeEventListener(n, r), window.removeEventListener(s, o), window.removeEventListener(n, r), cancelAnimationFrame(d.scrollId), (u.style.cursor = "grab");
                    }
                    var a,
                        c,
                        h,
                        l,
                        u = this.el,
                        d = this;
                    u.addEventListener(i, e),
                        u.addEventListener("mouseover", function (t) {
                            u.style.cursor = "grab";
                        });
                }),
                e
            );
        }),
        i("rs/game/BasePanel", [], function () {
            "use strict";
            function t(t, e) {
                (this.width = t || 300), (this.height = e || 300), this.init();
            }
            return (
                (t.prototype.init = function () {
                    (this.ol = document.createElement("div")).className = "rs-game-overlay";
                    var t = (this.el = document.createElement("div"));
                    (t.className = "rs-game-panel"), (t.style.width = this.width + "px"), (t.style.height = this.height + "px");
                    var e = (this.closeBtn = document.createElement("span"));
                    (e.className = "rs-closebtn"), (e.innerHTML = "&times"), t.appendChild(e), e.addEventListener("click", this.hide.bind(this));
                }),
                (t.prototype.show = function () {
                    document.body.appendChild(this.ol), document.body.appendChild(this.el), anime.remove(this.el), anime({ targets: this.el, opacity: [0, 1], duration: 800, easing: "easeOutQuint" });
                }),
                (t.prototype.hide = function () {
                    document.body.contains(this.ol) && document.body.removeChild(this.ol), document.body.contains(this.el) && document.body.removeChild(this.el);
                }),
                (t.prototype.resize = function (t, e) { }),
                t
            );
        }),
        i("rs/fc3d/ui/HelpPanel", ["rs/game/Scroller", "rs/game/BasePanel"], function (t, e) {
            "use strict";
            function i() {
                e.prototype.constructor.call(this);
            }
            (i.prototype = Object.create(e.prototype)), (i.prototype.constructor = i);
            return (
                (i.prototype.init = function () {
                    e.prototype.init.call(this);
                    var i = this.el;
                    i.classList.add("rs-fc3d-helppanel"), (i.style.width = i.style.height = "90%");
                    var n = (this.container = document.createElement("div"));
                    (n.className = "rs-helpcontainer"), i.appendChild(n), (this.scroller = new t(this.container));
                    var s = new XMLHttpRequest();
                    s.addEventListener("load", function (t) {
                        var e = this.responseText;
                        n.innerHTML = e;
                    }),
                        s.open("GET", "assets/text/helpcontentcopy.html"),
                        s.send();
                }),
                i
            );
        }),
        i("rs/fc3d/ui/ScoreBoard", ["rs/game/Scroller", "rs/game/BasePanel"], function (t, e) {
            "use strict";
            function i() {
                e.prototype.constructor.call(this);
            }

            (i.prototype = Object.create(e.prototype)), (i.prototype.constructor = i);
            return (
                (i.prototype.init = function () {
                    e.prototype.init.call(this);
                    var i = this.el;
                    i.classList.add("rs-fc3d-helppanel"), (i.style.width = i.style.height = "90%");
                    var n = (this.container = document.createElement("div"));
                    (n.className = "rs-helpcontainer"), i.appendChild(n), (this.scroller = new t(this.container));
                    var s = new XMLHttpRequest();
                    s.addEventListener("load", function (t) {
                        var e = this.responseText;
                        n.innerHTML = e;
                    }),

                        s.open("GET", "assets/text/helpcontentcopy.html"),

                        s.send();

                }),
                i
            );
        }),
        i("rs/fc3d/ui/CreditPanel", ["rs/game/BasePanel"], function (t) {
            "use strict";
            function e(e) {
                (this.fc3d = e), t.prototype.constructor.call(this);
            }
            return (
                (e.prototype = Object.create(t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype.init = function () {
                    t.prototype.init.call(this);
                    var e = this.el;
                    e.classList.add("rs-fc3d-cpanel"), (e.style.width = "90%"), (e.style.height = "auto");
                    var i = (this.content = document.createElement("div")),
                        n = this.fc3d.config.strings;
                    (i.innerHTML = "<h3>" + n.APP_TITLE + "</h3>"), (i.innerHTML += "<p>" + n.CREDIT_TEXT + "</p>"), e.appendChild(i);
                }),
                e
            );
        }),
        i("rs/fc3d/screen/HomeScreen", ["rs/fc3d/ui/HomeScreenHeader", "rs/fc3d/ui/HomeScreenMenu", "rs/fc3d/ui/HelpPanel", "rs/fc3d/ui/CreditPanel", "rs/fc3d/screen/ScoreScreen"], function (t, e, i, n, o) {
            "use strict";
            function s(t) {
                (this.fc3d = t), (this.loaded = !1), (this.config = t.config), this.init();
            }
            return (
                (s.prototype.init = function () {
                    var s = (this.el = document.createElement("div"));
                    (s.className = "rs-hscreen"), (s.style.width = s.style.height = "100%"), (s.style.display = "none"), (this.header = new t(this)), (this.menu = new e(this)), (this.hpanel = new i()), (this.cpanel = new n(this.fc3d)), (this.spanel = new o());
                }),
                (s.prototype.load = function () {
                    (this.el.style.display = "block"), this.el.appendChild(this.header.el), this.header.center();
                    var t = this.fc3d.assetManager,
                        e = this,
                        i = this.header,
                        n = this.menu;
                    (t.onLoad = function () {
                        setTimeout(function () {
                            (t.showDelay = !0), i.moveTop(), e.el.appendChild(n.el), n.show();
                        }, 1500);
                    }),
                        (t.onProgress = function (t, i, n) {
                            e.header.setProgress((i / n) * 100);
                        }),
                        this.fc3d.assetManager.load();
                }),
                (s.prototype.transitionIn = function () {
                    (this.el.style.display = "block"), anime({ targets: this.el, translateY: 0, easing: "easeOutQuint", opacity: 1, duration: 1200 });
                }),
                (s.prototype.transitionOut = function () {
                    var t = this.el;
                    anime({
                        targets: this.el,
                        translateY: -400,
                        easing: "easeOutQuint",
                        opacity: 0,
                        duration: 1200,
                        complete: function () {
                            t.style.display = "none";
                        },
                    });
                }),
                (s.prototype.show = function () {
                    if ((this.fc3d.root.appendChild(this.el), !this.fc3d.assetManager.loaded)) return void this.load();
                    this.transitionIn();
                }),
                (s.prototype.hide = function () {
                    this.fc3d.root.removeChild(this.el), this.transitionOut();
                }),
                (s.prototype.startNewGame = function () {
                    const nameInput = document.getElementById("name");
                    const ageInput = document.getElementById("age");

                    const playerName = nameInput ? nameInput.value.trim() : "Anonymous";
                    const playerAge = ageInput ? ageInput.value.trim() : "Unknown";

                    // Save player info
                    savePlayerInfo(playerName, playerAge);

                    // Proceed to start the game
                    this.fc3d.setGameScreen();
                }),
                (s.prototype.showScoreboard = function () {
                    this.fc3d.setScoreScreen();
                }),
                (s.prototype.showHelp = function () {
                    this.hpanel.show();
                }),
                /*(s.prototype.showScore = function () {
                    this.spanel.show();
                }),*/
                (s.prototype.showCredit = function () {
                    this.cpanel.show();
                }),

                (s.prototype.resize = function (t, e) { }),
                s
            );

        }),
        i("rs/game/CategoryPanel", ["rs/game/BasePanel"], function (t) {
            "use strict";
            function e(e) {
                (this.gs = e), t.prototype.constructor.call(this);
            }
            return (
                (e.prototype = Object.create(t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype.init = function () {
                    function e(t) {
                        n.category !== t.currentTarget.index && (n.fc3d.assetManager.btnClick.play(), n.fc3d.pref.saveCategory(t.currentTarget.index), n.newGame());
                    }
                    t.prototype.init.call(this);
                    var i = this.el;
                    i.classList.add("rs-sp3d-categorypanel"), (i.style.width = i.style.height = "auto"), (this.title = document.createElement("h1")), (this.title.className = "trophy-level-title"), (this.title.innerHTML = "Category");
                    var n = this.gs,
                        s = ["NUMBERS", "IMAGES"];
                    this.list = [];
                    for (var o = 0; o < s.length; o++) {
                        var r = document.createElement("div");
                        (r.className = "rs-categoryitem"), (r.innerHTML = s[o]), (r.index = o), r.addEventListener("click", e), this.list.push(r), i.appendChild(r);
                    }
                }),
                (e.prototype.show = function () {
                    t.prototype.show.call(this), document.body.appendChild(this.title);
                    for (var e = this.gs.category, i = 0; i < this.list.length; i++) this.list[i].classList.remove("selected-item");
                    this.list[e].classList.add("selected-item");
                }),
                (e.prototype.hide = function () {
                    t.prototype.hide.call(this), document.body.contains(this.title) && document.body.removeChild(this.title);
                }),
                e
            );
        }),
        i("rs/game/IconButton", ["rs/utils/BrowserUtil"], function (t) {
            "use strict";
            function e(t, e) {
                this.init(t, e);
            }
            return (
                (e.prototype.init = function (e, i) {
                    var n = (this.el = document.createElement("span"));
                    (n.className = e), t.css(n, { display: "block", cursor: "pointer", borderRadius: "50%", textAlign: "center" });
                    var s = this;
                    i &&
                        n.addEventListener("click", function (t) {
                            i.call(s);
                        });
                }),
                e
            );
        }),
        i("rs/fc3d/ui/GameButton", ["rs/game/IconButton"], function (t) {
            "use strict";
            function e(t, e) {
                this.init(t, e);
            }
            return (
                (e.prototype = Object.create(t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype.init = function (e, i) {
                    t.prototype.init.call(this, e, i), this.el.classList.add("rs-fc3d-mainbutton");
                }),
                (e.prototype.addClass = function (t) {
                    this.el.classList.add(t);
                }),
                (e.prototype.removeClass = function (t) {
                    this.el.classList.remove(t);
                }),
                e
            );
        }),
        i("rs/fc3d/ui/TrophyPanel", ["rs/game/BasePanel", "rs/fc3d/ui/GameButton"], function (t, e) {
            "use strict";
            function i(e) {
                (this.gs = e), (this.am = e.fc3d.assetManager), t.prototype.constructor.call(this);
            }
            return (
                (i.prototype = Object.create(t.prototype)),
                (i.prototype.constructor = i),
                (i.prototype.init = function () {
                    t.prototype.init.call(this);
                    var i = this.el;
                    i.classList.add("rs-trophy-panel"),
                        (i.style.width = i.style.height = "90%"),
                        (this.closeBtn.style.display = "none"),
                        (this.title = document.createElement("h1")),
                        (this.title.className = "trophy-level-title"),
                        (this.title.innerHTML = "");
                    var n = (this.meta = document.createElement("div"));
                    (n.className = "meta-container"), i.appendChild(n);
                    var s = (this.timespan = document.createElement("span"));
                    (s.innerHTML = "Time: 323s"), n.appendChild(s);
                    var o = (this.movespan = document.createElement("span"));
                    (o.innerHTML = "Moves Count: 232"), n.appendChild(o);
                    var r = document.createElement("div");
                    r.className = "trophy-container";
                    var a = document.createElement("img");
                    (a.src = "assets/graphics/trophy.png"), r.appendChild(a), i.appendChild(r);
                    var c = document.createElement("span");
                    (c.className = "level-label"), (c.innerHTML = 23), (this.lvl = c);
                    var h = (this.btnContainer = document.createElement("div"));
                    (h.className = "trophy-button-container"),
                        i.appendChild(h),
                        (this.replayBtn = new e("icon-undo", this.doReplay.bind(this))),
                        this.replayBtn.addClass("rs-fc3d-mainbutton-extra"),
                        h.appendChild(this.replayBtn.el),
                        (this.nextBtn = new e("icon-nextlevel", this.doNext.bind(this))),
                        this.nextBtn.addClass("rs-fc3d-mainbutton-extra"),
                        h.appendChild(this.nextBtn.el);
                }),
                (i.prototype.show = function () {
                    t.prototype.show.call(this), document.body.appendChild(this.title), this.setValues(this.gs.getPlayingTime(), this.gs.getMoveCount(), this.gs.levelIndex + 1);
                }),
                (i.prototype.hide = function () {
                    t.prototype.hide.call(this), document.body.contains(this.title) && document.body.removeChild(this.title);
                }),
                (i.prototype.doReplay = function () {
                    this.am.btnClick.play(), this.gs.replayLevel();
                }),
                (i.prototype.doNext = function () {
                    // Get the current level (replace with your level tracking logic)
                    const currentLevel = this.gs.levelIndex; // Replace `this.gs.level` with the correct property or method
                    // Check if it's the last level
                    if (currentLevel == 5) {
                        console.log("Last level completed. Redirecting to home screen...");

                        // Redirect to home screen
                        setTimeout(() => {
                            this.am.btnClick.play(), this.gs.nextLevel();
                            this.gs.fc3d.setHomeScreen();
                        }, 3000); // Delay to allow any animations or final actions
                        return;
                    }
                    this.am.btnClick.play(), this.gs.nextLevel();
                }),
                (i.prototype.setValues = function (t, e, i) {
                    (this.timespan.innerHTML = "Times: " + t + "s"), (this.lvl.innerHTML = i), (this.movespan.innerHTML = "Moves Count: " + e);
                }),
                i
            );
        }),
        i("rs/fc3d/ui/GameScreenButtonBar", ["rs/fc3d/ui/GameButton"], function (t) {
            "use strict";
            function e(t) {
                (this.gs = t), this.init();
            }
            return (
                (e.prototype.init = function () {
                    var e = (this.el = document.createElement("div"));
                    e.className = "rs-fc3d-gamebuttonbar";
                    this.gs.fc3d.assetManager;
                    (this.infoBtn = new t("icon-info", this.showHelp.bind(this))),
                        e.appendChild(this.infoBtn.el),
                        (this.homeBtn = new t("icon-home", this.showHome.bind(this))),
                        e.appendChild(this.homeBtn.el),
                        (this.soundBtn = new t("icon-sound-on", this.toggleSound.bind(this))),
                        (this.soundBtn.isOn = !0),
                        e.appendChild(this.soundBtn.el);
                }),
                (e.prototype.show = function () {
                    anime({ targets: this.el, bottom: 8, easing: "easeOutQuint", duration: 800 });
                }),
                (e.prototype.hide = function () {
                    anime({ targets: this.el, bottom: -60, easing: "easeOutQuint", duration: 800 });
                }),
                (e.prototype.showHome = function (t) {
                    this.gs.fc3d.assetManager.btnClick.play(), this.gs.fc3d.setHomeScreen();
                }),
                (e.prototype.showHelp = function (t) {
                    this.gs.fc3d.assetManager.btnClick.play(), this.gs.hpanel.show();
                }),
                (e.prototype.showScore = function (t) {
                    this.gs.fc3d.assetManager.btnClick.play(), this.gs.spanel.show();
                }),
                (e.prototype.toggleSound = function () {
                    var t = this.gs.fc3d.assetManager,
                        e = this.soundBtn;
                    (e.isOn = !this.soundBtn.isOn), e.isOn ? (e.removeClass("icon-sound-off"), e.addClass("icon-sound-on"), t.btnClick.play()) : (e.removeClass("icon-sound-on"), e.addClass("icon-sound-off")), t.toggleSound();
                }),
                (e.prototype.getClientSize = function () {
                    return [this.el.clientWidth, this.el.clientHeight];
                }),
                e
            );
        }),
        i("rs/fc3d/ui/GameScreenWonBar", ["rs/fc3d/ui/GameButton"], function (t) {
            "use strict";
            function e(t) {
                (this.gs = t), this.init();
            }
            return (
                (e.prototype.init = function () {
                    var e = (this.el = document.createElement("div"));
                    (e.className = "rs-fc3d-gamewonbar"),
                        (e.style.bottom = "-85px"),
                        (this.status = document.createElement("h1")),
                        (this.status.className = "trophy-level-title"),
                        (this.status.innerHTML = "DRAW"),
                        (this.replayBtn = new t("icon-nextlevel", this.doNewGame.bind(this))),
                        this.replayBtn.addClass("rs-fc3d-mainbutton-extra"),
                        this.replayBtn.addClass("newgame-button");
                    var i = this.replayBtn;
                    (i.width = i.height = i.lineHeight = "48px"), (i.fontSize = "28px"), e.appendChild(this.replayBtn.el);
                }),
                (e.prototype.setStatus = function (t) {
                    this.status.innerHTML = t;
                }),
                (e.prototype.doNewGame = function () {
                    this.gs.fc3d.assetManager.btnClick.play(), this.gs.newGame();
                }),
                (e.prototype.show = function (t) {
                    anime({ targets: this.el, bottom: 12, easing: "easeOutQuint", duration: 800 }), this.setStatus(t), this.gs.trophyPanel.show(), document.body.appendChild(this.status);
                    var level = this.gs.levelIndex;
                    // Retrieve time and moves for the current level
                    const time = this.gs.getPlayingTime();
                    const moves = this.gs.getMoveCount();

                    // Retrieve current player info
                    const currentPlayer = JSON.parse(localStorage.getItem("currentPlayer")) || {};
                    const playerName = currentPlayer.playerName || "Anonymous";
                    const playerId = currentPlayer.playerId || "unknown";

                    // Calculate score based on time and moves
                    const score = calculateScore(time, moves);

                    // Save the score
                    saveScore(score);

                    console.log(`Level completed. Score saved for ${playerName}: ${score}`);
                    // const trophyPanel = document.createElement("div");
                    // trophyPanel.className = "rs-trophy-panel";

                    // // Example of retrieving level completion time and moves
                    // const time = this.gs.getPlayingTime(); // Replace with actual time property
                    // const moves = this.gs.getMoveCount(); // Replace with actual moves property

                    // // Add details to the panel
                    // const timeElement = document.createElement("span");
                    // timeElement.innerText = `Time: ${time} seconds`;
                    // trophyPanel.appendChild(timeElement);

                    // const movesElement = document.createElement("span");
                    // movesElement.innerText = `Moves: ${moves}`;
                    // trophyPanel.appendChild(movesElement);

                    // // Save the score after showing the trophy panel
                    // const playerName = localStorage.getItem("playerName") || "Anonymous";
                    // const score = calculateScore(time, moves); // Implement this based on your scoring logic

                    // saveScore(playerName, score); // Save the score

                    // console.log(`Score saved for ${playerName}: ${score}`);
                    //document.body.appendChild(trophyPanel);
                }),
                (e.prototype.hide = function () {
                    anime({ targets: this.el, bottom: -85, easing: "easeOutQuint", duration: 800 }), document.body.contains(this.status) && document.body.removeChild(this.status);
                }),
                e
            );
        }),
        i("rs/fc3d/ui/HeaderTimeButton", [], function () {
            "use strict";
            function t(t) {
                (this.gh = t), this.init();
            }
            return (
                (t.prototype.init = function () {
                    var t = (this.el = document.createElement("div"));
                    (t.className = "rs-fc3d-timebtn"), (this.isPlaying = !1), (this.currentTime = 0);
                    var e = (this.gh, (this.ticon = document.createElement("span")));
                    t.appendChild(e), (e.className = "icon-timer");
                    var i = (this.tval = document.createElement("span"));
                    (i.className = "timebtn-value"), t.appendChild(i), (i.innerHTML = "00:00:00");
                }),
                (t.prototype.resume = function () {
                    clearInterval(this.timeId), (this.timeId = setInterval(this.timeTick.bind(this), 1e3)), (this.isPlaying = !0);
                }),
                (t.prototype.pause = function () {
                    clearInterval(this.timeId), (this.isPlaying = !1);
                }),
                (t.prototype.reset = function () {
                    (this.currentTime = 0), (this.tval.innerHTML = "00:00:00");
                }),
                (t.prototype.timeTick = function () {
                    function t(t) {
                        return t < 10 ? "0" + t : t;
                    }
                    this.currentTime += 1;
                    var e = this.currentTime,
                        i = Math.floor(e / 3600),
                        n = Math.floor((e - 3600 * i) / 60),
                        s = (e - 3600 * i) % 60;

                   
                    // Amado Timer 30 sec then redirect
                    if(s > 30) {
                       looseGame(this);
                    } else {
                        this.tval.innerHTML = t(i) + ":" + t(n) + ":" + t(s);
                    }  
                }),
                (t.prototype.toggleTime = function () {
                    this.gh.gs.game3d.isRunningState() && ((this.isPlaying = !this.isPlaying), this.isPlaying ? this.resume() : this.pause());
                }),
                t
            );
        }),
        i("rs/fc3d/ui/HeaderLevelButton", [], function () {
            "use strict";
            function t(t) {
                (this.gh = t), this.init();
            }
            return (
                (t.prototype.init = function () {
                    var t = (this.el = document.createElement("div"));
                    t.className = "rs-fc3d-levelbtn";
                    var e = this.gh;
                    e.gs;
                    (this.label = document.createElement("span")), (this.label.className = "levelbtn-label"), t.appendChild(this.label);
                }),
                (t.prototype.setLevel = function (t) {
                    function e() {
                        return Math.floor(150 * Math.random());
                    }
                    var i = t.split("x"),
                        n = parseInt(i[0]),
                        s = parseInt(i[1]);
                    (this.label.innerHTML = n + " &times; " + s), (this.el.style.backgroundColor = "rgba(" + e() + ", " + e() + ", " + e() + ", 1)");
                }),
                t
            );
        }),
        i("rs/fc3d/ui/HeaderMoveButton", [], function () {
            "use strict";
            function t(t) {
                (this.gh = t), this.init();
            }
            return (
                (t.prototype.init = function () {
                    var t = (this.el = document.createElement("div"));
                    (t.className = "rs-fc3d-movebtn"), (this.count = 0);
                    var e = (this.gh, (this.micon = document.createElement("span")));
                    t.appendChild(e), (e.className = "icon-magic");
                    var i = (this.mval = document.createElement("span"));
                    (i.className = "movebtn-value"), t.appendChild(i), (i.innerHTML = "0000"), (this.count = 0);
                }),
                (t.prototype.doCount = function () {
                    this.count++, this.format();
                }),
                (t.prototype.format = function () {
                    for (var t = this.count, e = 0, i = ""; t >= 10;) e++, (t /= 10);
                    e = 4 - e - 1;
                    for (var n = 0; n < e; n++) i += "0";
                    this.mval.innerHTML = i + this.count;
                }),
                (t.prototype.reset = function () {
                    (this.count = 0), this.format();
                }),
                t
            );
        }),
        i("rs/fc3d/ui/GameScreenHeader", ["rs/fc3d/ui/HeaderTimeButton", "rs/fc3d/ui/HeaderLevelButton", "rs/fc3d/ui/HeaderMoveButton"], function (t, e, i) {
            "use strict";
            function n(t) {
                (this.gs = t), this.init();
            }
            return (
                (n.prototype.init = function () {
                    var n = (this.el = document.createElement("div"));
                    (n.className = "rs-fc3d-gameheader"),
                        (this.timeBtn = new t(this)),
                        n.appendChild(this.timeBtn.el),
                        (this.levelBtn = new e(this)),
                        n.appendChild(this.levelBtn.el),
                        (this.moveBtn = new i(this)),
                        n.appendChild(this.moveBtn.el);
                }),
                (n.prototype.getClientSize = function () {
                    return [this.el.clientWidth, this.el.clientHeight];
                }),
                (n.prototype.show = function () {
                    anime({ targets: this.el, top: 4, easing: "easeOutQuint", duration: 800 });
                }),
                (n.prototype.hide = function () {
                    anime({ targets: this.el, top: -60, easing: "easeOutQuint", duration: 800 });
                }),
                n
            );
        }),
        i("rs/utils/ObjectUtil", [], function () {
            "use strict";
            var t = {
                merge: function (t, e, i) {
                    for (var n in t) "[object Object]" === Object.prototype.toString.call(t[n]) ? (void 0 === e[n] && (e[n] = {}), this.merge(t[n], e[n])) : (e[n] = t[n]);
                    return e;
                },
                clone: function (e, i) {
                    var n = {};
                    return t.merge(e, n, i), n;
                },
                shuffleArray: function (t) {
                    for (var e = t.length - 1; e > 0; e--) {
                        var i = Math.floor(Math.random() * (e + 1)),
                            n = t[e];
                        (t[e] = t[i]), (t[i] = n);
                    }
                },
            };
            return t;
        }),
        i("rs/game3d/Firework3DState", [], function () {
            "use strict";
            return { EXPLODED: 0, FALLING: 1, EXPIRED: 2 };
        }),
        i("rs/game3d/Firework3D", ["rs/utils/ObjectUtil", "rs/game3d/Firework3DState"], function (t, e) {
            "use strict";
            function i(i) {
                (this.config = { launchHeight: 300, sphereRadius: 200, color: 16763904, size: 72, numParticles: 24 }), (i = i || {}), t.merge(i, this.config), (this.state = e.EXPLODED), this.init();
            }
            var n = [16777215, 16776960, 14352128, 16711844, 15990528];
            return (
                (i.prototype = Object.create(THREE.Points.prototype)),
                (i.prototype.constructor = i),
                (i.prototype.init = function () {
                    THREE.Points.prototype.constructor.call(this);
                    var t = this.config;
                    this.geometry = new THREE.Geometry();
                    for (var e = this.geometry.vertices, i = 0; i < t.numParticles; i++) {
                        var s = new THREE.Vector3();
                        (s.tX = 2 * Math.random() * t.sphereRadius - t.sphereRadius + 50), (s.tY = 2 * Math.random() * t.sphereRadius - t.sphereRadius + 50), (s.tZ = 2 * Math.random() * t.sphereRadius - t.sphereRadius + 50), e.push(s);
                    }
                    this.geometry.verticesNeedUpdate = !0;
                    var o = n[Math.floor(Math.random() * n.length)];
                    (this.material = new THREE.PointsMaterial({ size: t.size, color: o, opacity: 1, transparent: !0, blending: THREE.AdditiveBlending, depthTest: !1, map: t.map })), (this.material.needsUpdate = !0);
                }),
                (i.prototype.setRegion = function (t, e) {
                    (this.regionWidth = t), (this.regionHeight = e);
                }),
                (i.prototype.update = function (t) {
                    var i = this.geometry.vertices;
                    if (this.state == e.EXPLODED) {
                        for (var n = 0; n < i.length; n++) {
                            var s = i[n];
                            (s.x += 0.1 * (s.tX - s.x)), (s.y += 0.1 * (s.tY - s.y)), (s.z += 0.1 * (s.tZ - s.z));
                        }
                        Math.abs(s.tX - s.x) < 5 && (this.state = e.FALLING);
                    } else {
                        for (var o = -80 * t, n = 0; n < i.length; n++) {
                            var s = i[n];
                            (s.vy += o), (s.y += s.vy);
                        }
                        (this.material.opacity += 0.025 * (0 - this.material.opacity)), this.material.opacity <= 0.05 && this.reset();
                    }
                    this.geometry.verticesNeedUpdate = !0;
                }),
                (i.prototype.reset = function () {
                    if (this.regionWidth) {
                        this.position.x = Math.random() * this.regionWidth - 0.5 * this.regionWidth;
                        var t = this.regionHeight - this.config.launchHeight;
                        this.position.y = Math.random() * t - 0.5 * t;
                    }
                    (this.state = e.EXPLODED), (this.material.opacity = 1), this.material.color.set(n[Math.floor(Math.random() * n.length)]), (this.rotation.z = 0);
                    for (var i = this.geometry.vertices, s = this.config, o = 0; o < i.length; o++) {
                        var r = i[o];
                        (r.x = r.y = r.z = r.vy = 0),
                            (r.tX = 2 * Math.random() * s.sphereRadius - s.sphereRadius + 50),
                            (r.tY = 2 * Math.random() * s.sphereRadius - s.sphereRadius + 50),
                            (r.tZ = 2 * Math.random() * s.sphereRadius - s.sphereRadius + 50);
                    }
                    (this.geometry.verticesNeedUpdate = !0), (this.material.needsUpdate = !0), s.callback && s.callback.call(this);
                }),
                i
            );
        }),
        i("rs/game3d/Firework3DSet", ["rs/utils/ObjectUtil", "rs/game3d/Firework3D", "rs/game3d/Firework3DState"], function (t, e, i) {
            "use strict";
            function n(e, i) {
                (this.g3d = e), (this.config = { numFireworks: 3, interval: 500 }), (i = i || {}), t.merge(i, this.config), this.init();
            }
            return (
                (n.prototype = Object.create(THREE.Group.prototype)),
                (n.prototype.constructor = n),
                (n.prototype.init = function () {
                    THREE.Group.prototype.constructor.call(this);
                    for (var t = this.config, i = this.g3d.gs.fc3d.assetManager.fwTexture, n = 0; n < t.numFireworks; n++) {
                        var s = new e({ map: i, callback: t.callback });
                        this.add(s);
                    }
                }),
                (n.prototype.update = function (t) {
                    for (var e = 0; e < this.children.length; e++) {
                        this.children[e].update(t);
                    }
                }),
                (n.prototype.changeRegion = function (t, e) {
                    this.children.forEach(function (i) {
                        i.setRegion(t, e);
                    });
                }),
                (n.prototype.reset = function () {
                    this.children.forEach(function (t) {
                        t.reset();
                    });
                }),
                n
            );
        }),
        i("rs/fc3d/Game3dState", [], function () {
            "use strict";
            return { RUNNING: 0, WON: 1, LOSE: 2, DRAW: 3, SOLVED: 4 };
        }),
        i("rs/fc3d/GameLight", [], function () {
            "use strict";
            function t(t) {
                (this.g3d = t), (this.dopt = t.dopt), (this.speed = this.dopt.lightMovingSpeed), this.init();
            }
            (t.prototype = Object.create(THREE.Group.prototype)), (t.prototype.constructor = t);
            return (
                (t.prototype.init = function () {
                    THREE.Group.prototype.constructor.call(this), (this.bound = [300, 400, 10]), (this.dirX = 1);
                    var t = (this.lights = []);
                    (t[0] = new THREE.PointLight(16777215, 0.1, 0)), (t[1] = new THREE.PointLight(16777215, 0.1, 0)), t[1].position.set(150, 200, 300), (t[1].oZ = 800), this.add(t[1]);
                    var e = (this.g3d.scene, new THREE.PointLightHelper(t[1], 20), new THREE.AmbientLight(this.dopt.ambientLight, 0.8));
                    this.add(e);
                }),
                (t.prototype.animate = function () {
                    this.lights[1].position.x += this.dirX * this.speed;
                    var t = this.lights[1].position.x;
                    (t > 0.5 * this.bound[0] || t < 0.5 * -this.bound[0]) && (this.dirX = -this.dirX);
                }),
                (t.prototype.transition = function () { }),
                (t.prototype.setBound = function (t, e) {
                    this.bound = t;
                    var i = this.lights[1];
                    i.position.set(0.5 * t[0], 0, i.oZ);
                }),
                t
            );
        }),
        i("rs/utils/ImageUtil", ["rs/utils/ObjectUtil"], function (t) {
            "use strict";
            return {
                createReflection: function (t, e) {
                    if (void 0 === t) throw "Invalid input image";
                    void 0 === e && (e = [0, 0.5, 0.4, 0.25, 1, 0]);
                    var i = t.width,
                        n = t.height,
                        s = document.createElement("canvas");
                    (s.width = i), (s.height = n);
                    for (var o = s.getContext("2d"), r = o.createLinearGradient(0, 0, 0, n), a = 0.5 * e.length, c = 0; c < a; c++) r.addColorStop(e[2 * c], "rgba(0, 0, 0, " + e[2 * c + 1] + ")");
                    (o.fillStyle = r), o.fillRect(0, 0, i, n), (o.globalCompositeOperation = "source-in"), o.translate(0, t.height), o.scale(1, -1), o.drawImage(t, 0, 0);
                    var h = document.createElement("img");
                    return (h.src = s.toDataURL()), h;
                },
            };
        }),
        i("rs/fc3d/entity/CardPiece", [], function () {
            "use strict";
            function t(t) {
                (this.pb = t), this.init();
            }
            (t.prototype = Object.create(THREE.Group.prototype)), (t.prototype.constructor = t);
            return (
                (t.prototype.init = function () {
                    THREE.Group.prototype.constructor.call(this);
                    var t,
                        e = (this.pb.g3d.fc3d.assetManager, this.pb.dopt),
                        i = e.cardWidth,
                        n = e.cardHeight,
                        s = new THREE.MeshPhongMaterial({ specular: 1118481, color: 16777215, emissive: 1118481, side: THREE.FrontSide }),
                        o = new THREE.MeshPhongMaterial({ specular: 657930, color: 16777215, emissive: 3355443, side: THREE.FrontSide });
                    (t = [s, s, s, s, o, s]),
                        (this.frontMat = o),
                        (this.backMat = s),
                        (this.mesh = new THREE.Mesh()),
                        (this.mesh.material = t),
                        (this.mesh.geometry = new THREE.BoxBufferGeometry(e.cardWidth, e.cardHeight, 4)),
                        this.add(this.mesh);
                    var r = new THREE.TextureLoader().load("assets/textures/shadow1.png"),
                        a = e.borderScale,
                        c = new THREE.Mesh(new THREE.PlaneGeometry(i * a, n * a), new THREE.MeshBasicMaterial({ map: r, side: THREE.DoubleSide, transparent: !0 }));
                    this.add(c), (this.side = 0);
                }),
                (t.prototype.setBackTexture = function (t) {
                    for (var e = 0; e < 5; e++) 4 !== e && ((this.mesh.material[e].map = t), (this.mesh.material[e].needsUpdate = !0));
                }),
                (t.prototype.setFrontTexture = function (t) {
                    (this.mesh.material[4].map = t), (this.mesh.material[4].needsUpdate = !0);
                }),
                (t.prototype.resetColor = function () { }),
                (t.prototype.transitionIn = function (t) {
                    anime.remove(this.position), (this.position.z = 500 * Math.random() + 800), anime({ targets: this.position, z: 20, duration: 800, easing: "easeOutQuad", delay: t / 3.5 });
                }),
                (t.prototype.flip = function () {
                    (this.side = 1 - this.side), anime.remove(this.rotation), anime({ targets: this.rotation, y: Math.PI * this.side, easing: "easeOutQuint", duration: 800 });
                }),
                (t.prototype.flipBack = function (t) {
                    (this.side = 1), (t = t || 0), anime.remove(this.rotation), anime({ targets: this.rotation, y: Math.PI, easing: "easeOutQuint", delay: t, duration: 800 });
                }),
                (t.prototype.flipFront = function (t) {
                    (this.side = 0), (t = t || 0), anime.remove(this.rotation), anime({ targets: this.rotation, y: 0, easing: "easeOutQuint", duration: 800 });
                }),
                (t.prototype.matchTransition = function () {
                    anime.remove(this.position), anime({ targets: this.position, y: 1400, easing: "easeOutQuint", duration: 1200 });
                }),
                (t.prototype.reset = function () {
                    anime.remove(this.position), anime.remove(this.rotation), (this.rotation.y = 0), this.position.set(0, 0, 0);
                }),
                t
            );
        }),
        i("rs/fc3d/entity/CardPiecePool", ["rs/fc3d/entity/CardPiece"], function (t) {
            "use strict";
            function e(t) {
                (this.pb = t), this.init();
            }
            return (
                (e.prototype.init = function () {
                    this.pool = [];
                    for (var e = this.pb, i = 0; i < 9; i++) {
                        var n = new t(e);
                        this.pool.push(n);
                    }
                }),
                (e.prototype.obtain = function (e) {
                    if (this.pool.length > 0) {
                        var i = this.pool.pop();
                        return (i.index = e), i.reset(), i;
                    }
                    var i = new t(this.pb);
                    return (i.index = e), i;
                }),
                (e.prototype.free = function (t) {
                    this.pool.push(t);
                }),
                e
            );
        }),
        i("rs/fc3d/CardBoard", ["rs/utils/ObjectUtil", "rs/fc3d/entity/CardPiecePool"], function (t, e) {
            "use strict";
            function i(t) {
                (this.g3d = t), (this.dopt = t.dopt), (this.config = t.fc3d.config), this.init();
            }
            return (
                (i.prototype = Object.create(THREE.Group.prototype)),
                (i.prototype.constructor = i),
                (i.prototype.init = function () {
                    THREE.Group.prototype.constructor.call(this), (this.cpool = new e(this)), (this.cpieces = []);
                }),
                (i.prototype.newGame = function (t, e, i) {
                    function n(t) {
                        for (var e = t.length - 1; e > 0; e--) {
                            var i = Math.floor(Math.random() * (e + 1)),
                                n = t[e];
                            (t[e] = t[i]), (t[i] = n);
                        }
                    }
                    (t = t || 0), (e = e || "2x3");
                    for (var s = this.config, o = this.g3d.fc3d.assetManager, r = this.g3d, a = this.dopt, c = this.g3d.container.glight, h = 0; h < this.cpieces.length; h++) {
                        var l = this.cpieces[h];
                        this.remove(l), this.cpool.free(l);
                    }
                    this.cpieces.splice(0);
                    for (
                        var u = this.config.data,
                        d = Object.keys(u),
                        p = d[t],
                        f = Math.floor(Math.random() * o.cardTextures.length),
                        m = o.cardTextures[f],
                        g = e.split("x"),
                        v = parseInt(g[0]),
                        s = parseInt(g[1]),
                        y = (this.total = v * s),
                        w = 0,
                        b = [],
                        E = [],
                        h = 0;
                        h < u[p];
                        h++
                    )
                        E[h] = h + 1;
                    n(E);
                    for (var h = 0; h < this.total; h += 2) (b[h] = b[h + 1] = E[w++]), w == u[p] && (w = 0);
                    for (var C = 0; C < 10; C++) n(b);
                    var T = (a.cardDistance + a.cardWidth) * (s - 1),
                        M = (a.cardDistance + a.cardHeight) * (v - 1);
                    (this.galWidth = a.cardWidth * s + a.cardDistance * (s - 1)), (this.galHeight = a.cardHeight * v + a.cardDistance * (v - 1));
                    for (var L = 0.5 * -T, S = 0.5 * -M, H = 0, B = 0, h = 0; h < v; h++)
                        for (var R = 0; R < s; R++) {
                            var P = this.cpool.obtain(H);
                            this.cpieces.push(P), (P.cardIndex = b[H]), H++, (P.position.x = L + R * (a.cardWidth + a.cardDistance)), (P.position.y = S + h * (a.cardHeight + a.cardDistance)), (P.position.z = 0), P.setBackTexture(m);
                            var x = new THREE.TextureLoader().load("data/" + p + "/" + P.cardIndex + ".png", function () {
                                ++B == y && i.call(r);
                            });
                            P.setFrontTexture(x), this.add(P);
                        }
                    c.setBound([T, M], 0), this.g3d.container.fitGameBoard(), (this.cycleCount = 0), (this.matchCount = this.total);
                }),
                (i.prototype.shuffle = function () { }),
                (i.prototype.getScaleFitPosition = function (t, e) {
                    var i,
                        n = this.dopt,
                        s = this.getBound(),
                        o = s[0],
                        r = s[1],
                        a = s[2],
                        c = n.fitFactor || 0.96,
                        h = o / r;
                    i = t / h > e ? (e * c) / r : (t * c) / o;
                    var l = this.g3d.camera.position.z;
                    return l - l / i - 0.5 * a;
                }),
                (i.prototype.getBound = function () {
                    this.dopt;
                    return [this.galWidth, this.galHeight, 10];
                }),
                (i.prototype.flipBack = function () {
                    for (var t = 0; t < this.cpieces.length; t++) {
                        this.cpieces[t].flipBack(40 * t);
                    }
                }),
                (i.prototype.checkMatchCount = function () {
                    (this.matchCount -= 2), 0 == this.matchCount && this.g3d.setWonState();
                }),
                i
            );
        }),
        i("rs/fc3d/Game3dContainer", ["rs/utils/ImageUtil", "rs/fc3d/CardBoard", "rs/fc3d/GameLight"], function (t, e, i) {
            "use strict";
            function n(t) {
                (this.g3d = t), this.init();
            }
            (n.prototype = Object.create(THREE.Group.prototype)), (n.prototype.constructor = n);
            return (
                (n.prototype.init = function () {
                    THREE.Group.prototype.constructor.call(this), (this.cardBoard = new e(this.g3d)), this.add(this.cardBoard);
                    var t = (this.glight = new i(this.g3d));
                    this.add(t);
                }),
                (n.prototype.fitGameBoard = function () {
                    var t = this.g3d.gs,
                        e = (this.g3d.dopt, t.header.getClientSize()),
                        i = t.bbar.getClientSize(),
                        n = this.g3d.el.clientHeight,
                        s = this.g3d.el.clientWidth,
                        o = s,
                        r = n - e[1] - i[1] - 10;
                    this.g3d.setCameraMatchProjection();
                    var a = this.cardBoard.getScaleFitPosition(o, r);
                    (this.position.z = a), (this.scaleFitZ = a), this.glight.setBound(this.cardBoard.getBound());
                }),
                (n.prototype.show = function () {
                    (this.visible = !0), (this.visible = !1), (this.inFlatView = !0), (this.inTransition = !0), this.fitGameBoard();
                    var t = this;
                    (this.rotation.x = -Math.PI),
                        anime.remove(this.scale),
                        anime({ targets: this.scale, x: [0.1, 1], y: [0.1, 1], z: [0.1, 1], easing: "easeOutQuad", duration: 1800 }),
                        anime.remove(this.rotation),
                        anime({
                            targets: this.rotation,
                            x: 0,
                            easing: "easeOutQuad",
                            duration: 1800,
                            complete: function () {
                                t.inTransition = !1;
                            },
                        }),
                        setTimeout(function () {
                            t.visible = !0;
                        }, 140),
                        setTimeout(function () {
                            t.cardBoard.flipBack();
                        }, 2e3);
                }),
                n
            );
        }),
        i("rs/fc3d/Game3d", ["rs/three/BaseApp", "rs/utils/ObjectUtil", "rs/utils/BrowserUtil", "rs/game3d/Firework3DSet", "rs/fc3d/Game3dState", "rs/fc3d/GameLight", "rs/fc3d/Game3dContainer"], function (t, e, i, n, s, o, r) {
            "use strict";
            function a(e) {
                (this.gs = e), (this.config = e.config), (this.fc3d = e.fc3d), (this.dopt = this.fc3d.defaultOptions), (this.am = this.fc3d.assetManager);
                t.prototype.constructor.call(this, 500, 300), this.setCameraMatchProjection(), (this.defaultCursor = "auto"), this.buildScene();
            }
            return (
                (a.prototype = Object.create(t.prototype)),
                (a.prototype.constructor = a),
                (a.prototype.enableOrbitControl = function () {
                    (this.controls = new OrbitControls(this.camera, this.el)), (this.controls.enableDamping = !0);
                }),
                (a.prototype.buildScene = function () {
                    (this.container = new r(this)), (this.clock = new THREE.Clock());
                    var t = this.scene;
                    t.add(this.container);
                    var e = this.am;
                    (this.f3ds = new n(this, {
                        numParticles: 3,
                        callback: function () {
                            e.firework.play();
                        },
                    })),
                        t.add(this.f3ds),
                        this.setRunningState(),
                        this._setUpRaycaster(),
                        this.resizeHandler();
                }),
                (a.prototype._setUpRaycaster = function () {
                    function t(t) {
                        var h = { x: (t.offsetX / r.width) * 2 - 1, y: (-t.offsetY / r.height) * 2 + 1 };
                        i.setFromCamera(h, e);
                        for (var l = i.intersectObjects(n.children, !0), u = 0; u < l.length; u++) {
                            var d = l[u].object;
                            if ("mousedown" == t.type && void 0 !== d.parent.index && a.cycleCount < 2) {
                                if (0 == d.parent.side) return;
                                o.shuffleend.play(),
                                    d.parent.flip(),
                                    c.header.moveBtn.doCount(),
                                    1 == a.cycleCount
                                        ? ((a.cycleCount = 2),
                                            a.currentItem.cardIndex !== d.parent.cardIndex
                                                ? setTimeout(function () {
                                                    (a.cycleCount = 0), a.currentItem.flipBack(), d.parent.flipBack();
                                                }, 1e3)
                                                : setTimeout(function () {
                                                    o.wintune.play(), (a.cycleCount = 0), a.currentItem.matchTransition(), d.parent.matchTransition(), a.checkMatchCount();
                                                }, 300))
                                        : (a.cycleCount++, (a.currentItem = d.parent));
                            }
                            "mousemove" == t.type && (s.style.cursor = "pointer");
                            break;
                        }
                        0 == l.length && "mousemove" == t.type && (s.style.cursor = r.defaultCursor);
                    }
                    var e = this.camera,
                        i = this.raycaster,
                        n = this.container,
                        s = this.el,
                        o = this.fc3d.assetManager,
                        r = this,
                        a = this.container.cardBoard,
                        c = this.gs;
                    s.addEventListener("mousedown", t), s.addEventListener("mousemove", t);
                }),
                (a.prototype.newGame = function (t, e, i) {
                    this.setRunningState();
                    var n = this;
                    (this.container.visible = !1),
                        this.container.cardBoard.newGame(t, e, function () {
                            n.container.show(), i.call(n);
                        });
                }),
                (a.prototype._renderRequest = function () {
                    t.prototype._renderRequest.call(this);
                    var e = this.clock.getDelta();
                    this.controls && this.controls.update(), this.container.glight.animate(), this.state == s.WON && this.f3ds.update(e);
                }),
                (a.prototype.setRunningState = function () {
                    (this.state = s.RUNNING), (this.f3ds.visible = !1);
                }),
                (a.prototype.isRunningState = function () {
                    return this.state == s.RUNNING;
                }),
                (a.prototype.setWonState = function () {
                    (this.state = s.WON), (this.f3ds.visible = !0), this.f3ds.reset(), this.gs.header.timeBtn.pause(), this.gs.header.hide(), this.gs.showWonBar("LEVEL PASSED"), this.am.wintune.play();
                }),
                (a.prototype.resize = function (t, e) {
                    (this.width = t), (this.height = e), (this.camera.aspect = t / e), this.camera.updateProjectionMatrix(), this.renderer.setSize(t, e), this.resizeHandler(), this.container.fitGameBoard(), this.f3ds.changeRegion(t, e);
                }),
                (a.prototype.getResponsiveZPosition = function () {
                    for (var t = window.innerWidth, e = (window.innerHeight, this.dopt), n = i.bp, s = ["XS", "SM", "MD", "LG", "XL"], o = s.length - 1; o >= 0 && !(t >= n[s[o]]); o--);
                    return e.responsive[s[o]];
                }),
                (a.prototype.resizeHandler = function (e) {
                    t.prototype.resizeHandler.call(this), this.setCameraMatchProjection();
                }),
                (a.prototype.show = function () {
                    this.el.style.display = "block";
                }),
                (a.prototype.hide = function () {
                    this.el.style.display = "none";
                }),
                (a.prototype.destroy = function () { }),
                a
            );
        }),
        i("rs/fc3d/screen/GameScreen", ["rs/game/CategoryPanel", "rs/fc3d/ui/TrophyPanel", "rs/fc3d/ui/HelpPanel", "rs/fc3d/ui/GameScreenButtonBar", "rs/fc3d/ui/GameScreenWonBar", "rs/fc3d/ui/GameScreenHeader", "rs/fc3d/Game3d"], function (
            t,
            e,
            i,
            n,
            s,
            o,
            r
        ) {
            "use strict";
            function a(t, e) {
                (this.fc3d = t), (this.config = t.config), this.init();
            }
            return (
                (a.prototype.init = function () {
                    var t = (this.el = document.createElement("div"));
                    (t.className = "rs-gscreen"),
                        (t.style.width = t.style.height = "100%"),
                        (t.style.display = "none"),
                        this.initPanel(),
                        (this.header = new o(this)),
                        t.appendChild(this.header.el),
                        (this.bbar = new n(this)),
                        t.appendChild(this.bbar.el),
                        (this.wbar = new s(this)),
                        t.appendChild(this.wbar.el),
                        (this.game3d = new r(this)),
                        t.appendChild(this.game3d.el);
                }),
                (a.prototype.initPanel = function () {
                    (this.trophyPanel = new e(this)), this.fc3d.homeScreen ? (this.hpanel = this.fc3d.homeScreen.hpanel) : (this.hpanel = new i());
                }),
                (a.prototype.newGame = function (t, e) {
                    function i() {
                        n.fc3d.hidePreloader(), n.reset(), n.header.levelBtn.setLevel(e), n.header.timeBtn.resume(), n.header.show();
                    }
                    var n = this;
                    void 0 == t && (t = this.fc3d.pref.data.category),
                        void 0 == e && (e = this.fc3d.pref.data.grid),
                        (this.category = t),
                        (this.grid = e),
                        this.trophyPanel.hide(),
                        this.showButtonBar(),
                        this.fc3d.showPreloader(),
                        this.game3d.newGame(t, e, i);
                }),
                (a.prototype.reset = function () {
                    this.header.timeBtn.reset(), this.header.moveBtn.reset();
                }),
                (a.prototype.show = function () {
                    (this.currentCategory = this.fc3d.pref.data.defaultCategory), this.fc3d.root.appendChild(this.el), this.transitionIn();
                    var t = this.fc3d.getAppDimension();
                    this.game3d.resize(t[0], t[1]), this.game3d.startRendering(), (this.levelIndex = 0);
                    var e = this.config.level;
                    this.newGame(e[0].category, e[0].grid);
                }),
                (a.prototype.hide = function () {
                    this.fc3d.root.removeChild(this.el), this.game3d.stopRendering();
                }),
                (a.prototype.showWonBar = function (t) {
                    this.bbar.hide();
                    var e = this.wbar;
                    setTimeout(function () {
                        e.show(t);
                    }, 400);
                }),
                (a.prototype.showButtonBar = function () {
                    this.wbar.hide();
                    var t = this.bbar;
                    setTimeout(function () {
                        t.show();
                    }, 400);
                }),
                (a.prototype.transitionIn = function () {
                    this.el.style.display = "block";
                }),
                (a.prototype.transitionOut = function () { }),
                (a.prototype.getPlayingTime = function () {
                    return this.header.timeBtn.currentTime;
                }),
                (a.prototype.resize = function (t, e) {
                    this.game3d.resize(t, e);
                }),
                (a.prototype.getMoveCount = function () {
                    return this.header.moveBtn.count;
                }),
                (a.prototype.nextLevel = function () {
                    var t = this.config.level;
                    this.levelIndex++, this.levelIndex == t.length && (this.levelIndex = 0), this.newGame(t[this.levelIndex].category, t[this.levelIndex].grid);
                }),
                (a.prototype.replayLevel = function () {
                    var t = this.config.level;
                    this.newGame(t[this.levelIndex].category, t[this.levelIndex].grid);
                }),
                (a.prototype.dispose = function () { }),
                a
            );
        }),
        i("rs/fc3d/screen/ScoreScreen", ["rs/game/CategoryPanel", "rs/fc3d/ui/HelpPanel", /*"rs/fc3d/ui/GameScreenButtonBar",*/ "rs/fc3d/ui/GameScreenWonBar", "rs/fc3d/ui/GameScreenHeader"], function (
            t,
            i,
            //n,
            s,
            o,

        ) {
            "use strict";
            function a(t, e) {
                console.log(t);
                (this.fc3d = t), this.init();

            }
            return (
                (a.prototype.init = function () {

                    var t = (this.el = document.createElement("div"));
                    (t.className = "rs-gscreen-zakaria"),
                        (t.style.width = t.style.height = "100%"),
                        (t.style.display = "none"),
                        this.initPanel();
                    /*(this.header = new o(this)),
                    t.appendChild(this.header.el);*/

                    /*(this.bbar = new n(this)),
                    t.appendChild(this.bbar.el),*/
                    /*(this.wbar = new s(this)),
                    t.appendChild(this.wbar.el);*/
                }),
                (a.prototype.initPanel = function () {
                    // this.fc3d.homeScreen ? (this.hpanel = this.fc3d.homeScreen.hpanel) : (this.hpanel = new i());
                }),
                (a.prototype.newGame = function (t, e) {
                    function i() {
                        n.fc3d.hidePreloader(), n.reset(), n.header.levelBtn.setLevel(e), n.header.timeBtn.resume(), n.header.show();
                    }
                    var n = this;
                    void 0 == t && (t = this.fc3d.pref.data.category),
                        void 0 == e && (e = this.fc3d.pref.data.grid),
                        (this.category = t),
                        (this.grid = e),
                        this.trophyPanel.hide(),
                        this.showButtonBar(),
                        this.fc3d.showPreloader(),
                        this.game3d.newGame(t, e, i);
                }),
                (a.prototype.reset = function () {
                    this.header.timeBtn.reset(), this.header.moveBtn.reset();
                }),
                (a.prototype.show = function () {
                    (this.currentCategory = this.fc3d.pref.data.defaultCategory), this.fc3d.root.appendChild(this.el), this.transitionIn();
                    this.loadAndDisplayTable();
                    //this.fc3d.root.appendChild(this.el)
                }),
                (a.prototype.hide = function () {
                    this.fc3d.root.removeChild(this.el), this.transitionOut();
                }),
                (a.prototype.showButtonBar = function () {
                    this.wbar.hide();
                    var t = this.bbar;
                    setTimeout(function () {
                        t.show();
                    }, 400);
                }),
                (a.prototype.fetchData = function () {
                    return fetch('https://safarishuffleapi.codysmart.ae/api/ScoreboardApi/TopThree') // Replace with your API endpoint
                        .then(response => response.json())
                        .catch(error => console.error('Error fetching data:', error));
                }),

                (a.prototype.createTable = function (data) {
                    const container = document.createElement('div');
                    container.className = 'leaderboard-container';
                    container.style.cssText = `
                       width: 41vw;
                        height: 70vh;
                        background: url(assets/graphics/ScoreBoard-BG.png) center center / contain no-repeat;
                        position: relative;
                        left: 42%;
                        top: 20%;

                    `;
                    const homebtn = document.createElement('a');
                    homebtn.className = 'homebtn';

                    // Add refresh functionality
                    homebtn.href = 'javascript:void(0)'; // Prevent navigation
                    homebtn.addEventListener('click', () => {
                        location.reload(); // Reload the current page
                    });
                    
                    const table = document.createElement('table');
                    table.className = 'rs-dynamic-table';

                    // Create table header
                    //const header = table.createTHead();
                    //const headerRow = header.insertRow(0);
                    /*Object.keys(data[0]).forEach(key => {
                        const th = document.createElement('th');
                        th.innerText = key;
                        headerRow.appendChild(th);
                    });*/

                    // Create table body
                    const tbody = table.createTBody();     
                   data.forEach((item) => {
                      const row = tbody.insertRow();
                      Object.entries(item).forEach(([key, value]) => {
                        const cell = row.insertCell();
                        if (key === "playerId") {
                           try {
                              const [name, timestampStr] = value.split("-");
                              const timeStamp = Number(timestampStr);
                              const uniqueTimeStamp = timeStamp % 10000;
                              cell.innerText = name + "-" + uniqueTimeStamp;
                           } catch (e) {
                              cell.innerText = value;
                           }
                        } else {
                           cell.innerText = value;
                        }
                      });
                   });
                    // Append the table to the container
                    container.appendChild(table);
                    container.appendChild(homebtn);
                    // Append the container to the document body (or another element)
                    document.body.appendChild(container);

                    return container;
                    //return table;
                }),

                (a.prototype.loadAndDisplayTable = function () {
                    const self = this; // Store reference to the current instance
                    this.fetchData().then(data => {
                        const table = self.createTable(data);
                        self.el.appendChild(table); // Append the table to the main element
                    });
                }),
                (a.prototype.transitionIn = function () {
                    this.el.style.display = "block";
                }),
                (a.prototype.transitionOut = function () { }),
                (a.prototype.getPlayingTime = function () {
                    return this.header.timeBtn.currentTime;
                }),
                (a.prototype.resize = function (t, e) {
                    this.game3d.resize(t, e);
                }),
                (a.prototype.dispose = function () { }),
                a
            );
        }),
        i("rs/utils/MouseUtil", ["rs/utils/BrowserUtil"], function (t) {
            "use strict";
            function e(t) {
                t.preventDefault(), t.currentTarget.mouseWheelCallback.call(t.currentTarget.mousewheelContext, Math.max(-1, Math.min(1, t.wheelDelta || -t.detail)));
            }
            return {
                touchClick: function (e, i) {
                    t.isMobile() ? e.addEventListener("touchstart", i) : e.addEventListener("click", i);
                },
                removeTouchClick: function (e, i) {
                    t.isMobile() ? e.removeEventListener("touchstart", i) : e.removeEventListener("click", i);
                },
                startMouseWheel: function (t, i, n) {
                    (t.mouseWheelCallback = i), (t.mousewheelContext = n), t.addEventListener("DOMMouseScroll", e, !1), t.addEventListener("mousewheel", e, !1);
                },
                stopMouseWheel: function (t) {
                    t.removeEventListener("DOMMouseScroll", e), t.removeEventListener("mousewheel", e);
                },
                swipeStart: function (e, i, n, s, o) {
                    function r(t) {
                        (p = t.clientX), (f = t.clientY), (m = new Date().getTime()), e.addEventListener("mousemove", c), window.addEventListener("mouseup", h);
                    }
                    function a(t) {
                        e.removeEventListener("mousemove", c), window.removeEventListener("mouseup", h), e.removeEventListener("mouseout", a);
                    }
                    function c(e) {
                        var i = e.clientX - p,
                            r = e.clientY - f;
                        (t.swipeState = "move"), Math.abs(i) > Math.abs(r) ? s(i * n) : o(r * n);
                    }
                    function h(t) {
                        e.removeEventListener("mousemove", c), window.removeEventListener("mouseup", h);
                    }
                    function l(t) {
                        (p = t.touches[0].clientX), (f = t.touches[0].clientY), (m = new Date().getTime()), e.addEventListener("touchmove", u), window.addEventListener("touchend", d);
                    }
                    function u(e) {
                        e.preventDefault();
                        var i = e.changedTouches[0].clientX - p,
                            r = e.changedTouches[0].clientY - f;
                        (t.swipeState = "move"), Math.abs(i) > Math.abs(r) ? s(i * n) : o(r * n);
                    }
                    function d(t) {
                        e.removeEventListener("touchmove", u), window.removeEventListener("touchend", d);
                    }
                    var p, f, m;
                    (e.style[t.getPrefix() + "UserSelect"] = "none"),
                        (e.removeTracking = function () {
                            e.removeEventListener("mousedown", r),
                                window.removeEventListener("mouseup", h),
                                e.removeEventListener("mousemove", c),
                                e.removeEventListener("mouseout", a),
                                e.removeEventListener("touchstart", l),
                                e.removeEventListener("touchend", d),
                                e.removeEventListener("touchmove", u),
                                (e.removeTracking = null);
                        }),
                        t.isMobile() ? e.addEventListener("touchstart", l) : e.addEventListener("mousedown", r);
                },
                swipeStop: function (e) {
                    (e.style[t.getPrefix() + "UserSelect"] = "all"), e.removeTracking && e.removeTracking();
                },
            };
        }),
        i("rs/fc3d/FullscreenButton", ["rs/utils/BrowserUtil", "rs/utils/MouseUtil"], function (t, e) {
            "use strict";
            function i(t, e) {
                (this.targetEl = t), this.build("icon-screen-full", e);
            }
            return (
                (i.prototype.build = function (i, n) {
                    var s = this,
                        o = this.targetEl,
                        r = (this.el = document.createElement("span"));
                    (r.className = i + " rs-fc3d-fsbtn"),
                        e.touchClick(r, function (e) {
                            t.isFullscreen() ? t.exitFullscreen(o) : t.goFullscreen(o);
                        }),
                        t.fullScreenCallback(o, function () {
                            t.isFullscreen() ? s.setFull() : s.setNormal(), n.call(o);
                        });
                }),
                (i.prototype.setFull = function () {
                    this.el.classList.remove("icon-screen-full"), this.el.classList.add("icon-screen-normal");
                }),
                (i.prototype.setNormal = function () {
                    this.el.classList.remove("icon-screen-normal"), this.el.classList.add("icon-screen-full");
                }),
                i
            );
        }),
        i("rs/ui/RingPreloader", ["rs/utils/ObjectUtil"], function (t) {
            "use strict";
            function e(e) {
                (this.dopt = { size: 40, borderWidth: 6, borderColor: "#AAA" }), t.merge(e, this.dopt), this.build();
            }
            return (
                (e.prototype.build = function () {
                    var t = this.dopt,
                        e = (this.el = document.createElement("div"));
                    (e.className = "rs-ringpreloader"), (e.innerHTML = "<div class='lds-ring'><div></div><div></div><div></div><div></div></div>"), (e.style.marginLeft = e.style.marginTop = 0.5 * -t.size + "px");
                    for (var i = e.firstChild.children, n = 0; n < i.length; n++) {
                        var s = i[n].style;
                        (s.width = s.height = t.size + "px"), (s.borderWidth = t.borderWidth + "px"), (s.borderTopColor = t.borderColor);
                    }
                }),
                (e.prototype.show = function () {
                    this.el.style.display = "block";
                }),
                (e.prototype.hide = function () {
                    this.el.style.display = "none";
                }),
                e
            );
        }),
        i(
            "rs/fc3d/FruitCard",
            [
                "rs/three/BaseApp",
                "rs/fc3d/Preferences",
                "rs/fc3d/AssetManager",
                "rs/fc3d/screen/HomeScreen",
                "rs/fc3d/screen/GameScreen",
                "rs/fc3d/screen/ScoreScreen",
                "rs/fc3d/FullscreenButton",
                "rs/ui/RingPreloader",
                "rs/utils/ObjectUtil",
                "rs/utils/MouseUtil",
                "rs/utils/BrowserUtil",
            ],
            function (t, e, i, n, s, v, o, r, a, c, h) {
                "use strict";
                function l(t, e) {
                    this.loadConfig(),
                        (this.isMobile = h.isMobile()),
                        this.isMobile ? ((u = "touchstart"), (d = "touchend"), (p = "touchmove")) : ((u = "mousedown"), (d = "mouseup"), (p = "mousemove")),
                        (this.mevents = { mdown: u, mup: d, mmove: p }),
                        (this.defaultOptions = { containerZ: -1400, cardWidth: 300, cardHeight: 400, cardDistance: 50, borderScale: 1.12, fitFactor: 0.85, ambientLight: 15724527, lightMovingSpeed: 4 }),
                        (e = e || {}),
                        a.merge(e, this.defaultOptions),
                        (this.root = t),
                        h.css(this.root, { position: "relative", display: "block", overflow: "hidden" });
                    var i = this;
                    window.addEventListener("resize", function (t) {
                        i.resize();
                    });
                }
                var u, d, p;
                h.getPrefix();
                return (
                    (l.prototype.loadConfig = function () {
                        var t = this,
                            e = new XMLHttpRequest();
                        e.addEventListener("load", function (e) {
                            var i = JSON.parse(this.response);
                            (t.config = i), t.initComponents();
                        }),
                            e.open("GET", "config.json"),
                            e.send();
                    }),
                    (l.prototype.initComponents = function () {
                        var t = this;
                        this.defaultOptions, this.config;
                        this.initPreferences(),
                            this.initPreloader(),
                            (this.activeScreen = null),
                            (this.assetManager = new i(this)),
                            this.setHomeScreen(),
                            setTimeout(function () {
                                t.resize();
                            }, 200);
                    }),
                    (l.prototype.initPreferences = function () {
                        this.pref = new e(this.config, localStorage.getItem("fc3d"));
                    }),
                    (l.prototype.initPreloader = function () {
                        var t = new r({ borderColor: "#ccc" }),
                            e = t.el;
                        (this.preloader = e), (e.style.top = "50%");
                    }),
                    (l.prototype.showPreloader = function () {
                        this.root.appendChild(this.preloader);
                    }),
                    (l.prototype.hidePreloader = function () {
                        this.root.contains(this.preloader) && this.root.removeChild(this.preloader);
                    }),
                    (l.prototype.initFullcreen = function () {
                        (this.fsbtn = new o(this.root, function (t) {
                            console.log("fullsceen change");
                        })),
                            this.root.appendChild(this.fsbtn.el);
                    }),
                    (l.prototype.addEventListener = function (t, e) {
                        this.root.addEventListener(t, e);
                    }),
                    (l.prototype.setScreen = function (t) {
                        this.activeScreen && this.activeScreen.hide(), t.show(), (this.activeScreen = t);
                    }),
                    (l.prototype.setGameScreen = function () {
                        this.gameScreen || (this.gameScreen = new s(this)), this.setScreen(this.gameScreen);
                    }),
                    (l.prototype.setScoreScreen = function () {
                        this.scorescreen || (this.scorescreen = new v(this)), this.setScreen(this.scorescreen);
                    }),
                    (l.prototype.setHomeScreen = function () {
                        this.homeScreen || (this.homeScreen = new n(this)), this.setScreen(this.homeScreen);
                    }),
                    (l.prototype.dispose = function () { }),
                    (l.prototype.resize = function () {
                        var t = this.getAppDimension(),
                            e = t[0],
                            i = t[1];
                        this.activeScreen && this.activeScreen.resize(e, i);
                    }),
                    (l.prototype.getAppDimension = function () {
                        var t = h.computeStyle,
                            e = t(this.root, "borderTopWidth");
                        return [t(this.root, "width") - 2 * e, t(this.root, "height") - 2 * e];
                    }),
                    l
                );
            }
        ),
        (window.FruitCard = e("rs/fc3d/FruitCard"));
})();
function savePlayerInfo(name) {
    const playerName = name || "Anonymous";

    // Generate a unique ID using the player's name and the current date-time
    const playerId = `${playerName}-${Date.now()}`;

    // Save player info in localStorage
    localStorage.setItem("currentPlayer", JSON.stringify({ playerId, playerName }));

    console.log(`Player info saved: ID - ${playerId}, Name - ${playerName}`);
}
function getCurrentPlayer() {
    const player = JSON.parse(localStorage.getItem("currentPlayer"));
    if (player) {
        return player;
    } else {
        console.error("No active player found.");
        return null;
    }
}

async function looseGame(timerObj){
    try {
        // debugger;
        const currentPlayer = JSON.parse(localStorage.getItem("currentPlayer"));
        const currentStatus = currentPlayer.status;
        if (currentPlayer && currentStatus != "lost") {
            currentPlayer.status = "lost";
            const time = timerObj.gh.gs.getPlayingTime();
            const moves = timerObj.gh.gs.getMoveCount();
            const currentScore = calculateScore(time, moves);

            // Store Current Player
            localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));

            // Save Score
            await new Promise(async (resolve, reject) => {
                try {
                    await saveScore(currentScore);
                    resolve(); 
                } catch (error) {
                    reject(error);
                } finally {
                    timerObj.gh.gs.fc3d.setScoreScreen();
                }
            });
        }
    } catch(e) {
        console.error("Error**looseGame: " , e);
    }
}

async function saveScore(score) {
    // Retrieve the current player info
    const currentPlayer = JSON.parse(localStorage.getItem("currentPlayer"));
    if (!currentPlayer) {
        console.error("No active player found. Cannot save score.");
        return;
    }

    const { playerId, playerName } = currentPlayer;

    // Fetch or initialize the global scores array
    const scores = JSON.parse(localStorage.getItem("scores")) || [];

    // Check if the current player already has a score entry
    var playerEntry = scores.find((entry) => entry.playerId == playerId);

    if (playerEntry) {
        // If the player already exists, update their score
        playerEntry.totalScore += score;
        playerEntry.games.push(score);
    } else {
        // If the player is new, create a new entry
        playerEntry = {
            playerId,
            name: playerName,
            totalScore: score,
            games: [score],
        };

        scores.push(playerEntry);
    }

    // Save updated scores back to localStorage
    localStorage.setItem("scores", JSON.stringify(scores));

    console.log(`Score saved for ${playerName}: ${score}`);
    // Save Score to db
    await saveScoreToDb(playerEntry);
}

async function saveScoreToDb(playerEntry) {
    try {
        const playerId = playerEntry.playerId;
        const playerName = playerEntry.name;
        const score = playerEntry.totalScore;
        const games=playerEntry.games;
        const date = new Date();

        const url = 'https://safarishuffleapi.codysmart.ae/api/ScoreboardApi/AddOrUpdate';
        const data = {
          playerId: playerId,
          name: playerName,
          totalScore: score,
          games:games,
        };
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' // Crucial: Tell the server it's JSON
            },
            body: JSON.stringify(data) // Convert the data object to a JSON string
          })
          .then(response => {
            if (!response.ok) {
              // Handle errors appropriately
              if (response.status == 415) {
                console.error("415 Unsupported Media Type. Check your request body and Content-Type header.");
              } else {
                  console.error(`HTTP error! status: ${response.status}`);
              }
              return response.text().then(text => { throw new Error(text) });
            }
            return response.json(); // Parse the JSON response
          })
          .then(data => {
            // Handle the successful response
            console.log('Success:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });  
    } catch (e) {
        console.error("ERROR**saveScoreToDb: " + e);
    }
}

function calculateScore(time, moves) {
    // Example scoring logic: higher scores for lower time and moves
    return Math.max(1000 - time * 10 - moves * 5, 0); // Adjust as needed
}
