/**
 * @author  raizensoft.com
 */
define([
        'rs/three/BaseApp',
        'rs/fc3d/Preferences',
        'rs/fc3d/AssetManager',
        'rs/fc3d/screen/HomeScreen',
        'rs/fc3d/screen/GameScreen',
        'rs/fc3d/FullscreenButton',
        'rs/ui/RingPreloader',
        'rs/utils/ObjectUtil',
        'rs/utils/MouseUtil',
        'rs/utils/BrowserUtil'],

    function (
        BaseApp,
        Preferences,
        AssetManager,
        HomeScreen,
        GameScreen,
        FullscreenButton,
        RingPreloader,
        ObjectUtil,
        MouseUtil,
        BrowserUtil) {

        "use strict";

        var RESIZE_TIMEOUT = 200;
        var CONFIG_PATH = "config.json";

        var pf = BrowserUtil.getPrefix();
        var mdown, mup, mmove;

        function FruitCard(input, options) {

            // Load main config.json
            this.loadConfig();

            // Mobile setup
            this.isMobile = BrowserUtil.isMobile();

            if (this.isMobile) {

                mdown = 'touchstart';
                mup = 'touchend';
                mmove = 'touchmove';
            } else {
                mdown = 'mousedown';
                mup = 'mouseup';
                mmove = 'mousemove';
            }

            this.mevents = {
                mdown: mdown,
                mup: mup,
                mmove: mmove,
            };

            // Init default options
            this.defaultOptions = {
                containerZ: -1400,
                cardWidth: 300,
                cardHeight: 400,
                cardDistance: 50,
                borderScale: 1.12,
                fitFactor: 0.85,
                ambientLight: 0xefefef,
                lightMovingSpeed: 4
            };

            options = options || {};
            ObjectUtil.merge(options, this.defaultOptions);

            // Setup root reference
            this.root = input;
            BrowserUtil.css(this.root, {
                position: 'relative',
                display: 'block',
                overflow: 'hidden'
            });

            // Setup gallery resize handler
            var fc3d = this;
            window.addEventListener('resize', function (e) {
                fc3d.resize();
            });
        }

        /**
         * Load configurations
         * @method loadConfig
         */
        FruitCard.prototype.loadConfig = function () {

            // Load main config.json
            var fc3d = this;
            var req = new XMLHttpRequest();
            req.addEventListener("load", function (e) {

                var result = JSON.parse(this.response);
                fc3d.config = result;
                fc3d.initComponents();
            });
            req.open("GET", CONFIG_PATH);
            req.send();
        };

        /**
         * Init game compponents
         * @method initComponent
         */
        FruitCard.prototype.initComponents = function () {

            var fc3d = this;
            var dopt = this.defaultOptions;
            var config = this.config;

            // Preferences
            this.initPreferences();

            // Preloader
            this.initPreloader();

            // Fullscreen btn
            /*
            if (!BrowserUtil.isMobile() && config.general.useFullscreen)
              this.initFullcreen();
            */

            // Default screen
            this.activeScreen = null;

            // Asset managers
            this.assetManager = new AssetManager(this);

            // Home Screen as default screen
            this.setHomeScreen();

            // this.assetManager.onLoad = function() {
            //     fc3d.setGameScreen();
            // };
            // this.assetManager.load();

            // Force resize on intialization
            setTimeout(function () {
                fc3d.resize();
            }, RESIZE_TIMEOUT);
        };

        /**
         * Initialize preferences
         * @method initPreferences
         */
        FruitCard.prototype.initPreferences = function () {
            this.pref = new Preferences(this.config, localStorage.getItem("fc3d"));
        };

        /**
         * Init preloader component
         * @method initPreloader
         */
        FruitCard.prototype.initPreloader = function () {

            var rp = new RingPreloader({borderColor: '#ccc'});
            var el = rp.el;
            this.preloader = el;
            el.style.top = '50%';
        };

        /**
         * Show preloader
         * @method showPreloader
         */
        FruitCard.prototype.showPreloader = function () {
            this.root.appendChild(this.preloader);
        };

        /**
         * Hide preloader
         * @method hidePreloader
         */
        FruitCard.prototype.hidePreloader = function () {
            if (this.root.contains(this.preloader))
                this.root.removeChild(this.preloader);
        };

        /**
         * Init fullscreen functionalities
         * @method initFullcreen
         */
        FruitCard.prototype.initFullcreen = function () {

            // Fullscreen button
            var fc3d = this;
            this.fsbtn = new FullscreenButton(this.root, function (e) {
                console.log('fullsceen change');
            });
            this.root.appendChild(this.fsbtn.el);
        };

        /**
         * Shortcut to root element addEventListener method
         * @method addEventListener
         */
        FruitCard.prototype.addEventListener = function (event, listener) {
            this.root.addEventListener(event, listener);
        };

        /**
         * Set active screen
         * @method setScreen
         */
        FruitCard.prototype.setScreen = function (screen) {

            if (this.activeScreen) {
                this.activeScreen.hide();
            }

            screen.show();
            this.activeScreen = screen;
        };

        /**
         * Set active game screen
         * @method setGameScreen
         */
        FruitCard.prototype.setGameScreen = function () {

            if (!this.gameScreen) {
                this.gameScreen = new GameScreen(this);
            }
            this.setScreen(this.gameScreen);
        };

        /**
         * Set home screen as active screen
         * @method setHomeScreen
         */
        FruitCard.prototype.setHomeScreen = function () {

            if (!this.homeScreen)
                this.homeScreen = new HomeScreen(this);
            this.setScreen(this.homeScreen);
        };

        /**
         * Dispose resources
         * @method dispose
         */
        FruitCard.prototype.dispose = function () {

        };

        /**
         * Resize handler
         * @method resize
         */
        FruitCard.prototype.resize = function () {

            var d = this.getAppDimension();
            var rw = d[0], rh = d[1];
            if (this.activeScreen)
                this.activeScreen.resize(rw, rh);
        };

        /**
         * Return current app dimension
         * @method getAppDimension
         */
        FruitCard.prototype.getAppDimension = function () {

            var cs = BrowserUtil.computeStyle;
            var bo = cs(this.root, 'borderTopWidth');
            var rw = cs(this.root, 'width') - 2 * bo;
            var rh = cs(this.root, 'height') - 2 * bo;
            return [rw, rh];
        };

        return FruitCard;
    });
