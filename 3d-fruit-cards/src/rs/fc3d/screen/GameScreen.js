/**
 * @author  raizensoft.com
 */
define([
        'rs/game/CategoryPanel',
        'rs/fc3d/ui/TrophyPanel',
        'rs/fc3d/ui/HelpPanel',
        'rs/fc3d/ui/GameScreenButtonBar',
        'rs/fc3d/ui/GameScreenWonBar',
        'rs/fc3d/ui/GameScreenHeader',
        'rs/fc3d/Game3d'],
    function (
        CategoryPanel,
        TrophyPanel,
        HelpPanel,
        GameScreenButtonBar,
        GameScreenWonBar,
        GameScreenHeader,
        Game3d) {

        "use strict";

        /**
         * main Game screen
         * @class GameScreen
         * @constructor
         */
        function GameScreen(fc3d, config) {

            this.fc3d = fc3d;
            this.config = fc3d.config;
            this.init();
        }

        /**
         * Init game screen components
         * @method init
         */
        GameScreen.prototype.init = function () {

            // Root element
            var gs = this;
            var el = this.el = document.createElement('div');
            el.className = 'rs-gscreen';
            el.style.width = el.style.height = '100%';
            el.style.display = 'none';

            // Setup panels
            this.initPanel();
            debugger
            // Header
            this.header = new GameScreenHeader(this);
            el.appendChild(this.header.el);

            // ButtonBar
            this.bbar = new GameScreenButtonBar(this);
            el.appendChild(this.bbar.el);

            // Wonbar
            this.wbar = new GameScreenWonBar(this);
            el.appendChild(this.wbar.el);

            // Game3d
            this.game3d = new Game3d(this);
            el.appendChild(this.game3d.el);
        };

        /**
         * Init game panels
         * @method initPanel
         */
        GameScreen.prototype.initPanel = function () {

            // Trophy panel
            this.trophyPanel = new TrophyPanel(this);

            // Help Panel
            if (this.fc3d.homeScreen)
                this.hpanel = this.fc3d.homeScreen.hpanel;
            else
                this.hpanel = new HelpPanel();
        };

        /**
         * Start a new game
         * @method newGame
         */
        GameScreen.prototype.newGame = function (category, grid) {

            var gs = this;

            if (category == undefined)
                category = this.fc3d.pref.data.category;
            if (grid == undefined)
                grid = this.fc3d.pref.data.grid;
            this.category = category;
            this.grid = grid;

            this.trophyPanel.hide();

            // Show active bar
            this.showButtonBar();

            // Show preloader
            this.fc3d.showPreloader();

            function onLoadCallback() {

                gs.fc3d.hidePreloader();
                gs.reset();

                gs.header.levelBtn.setLevel(grid);
                gs.header.timeBtn.resume();
                gs.header.show();
            }

            this.game3d.newGame(category, grid, onLoadCallback);
        };

        /**
         * Reset meta component
         * @method reset
         */
        GameScreen.prototype.reset = function () {

            this.header.timeBtn.reset();
            this.header.moveBtn.reset();
        };

        /**
         * Show game screen
         * @method show
         */
        GameScreen.prototype.show = function () {

            this.currentCategory = this.fc3d.pref.data.defaultCategory;
            this.fc3d.root.appendChild(this.el);
            this.transitionIn();
            var d = this.fc3d.getAppDimension();
            this.game3d.resize(d[0], d[1]);
            this.game3d.startRendering();
            this.levelIndex = 0;
            var levels = this.config.level;
            this.newGame(levels[0].category, levels[0].grid);
        };

        /**
         * Hide game screen
         * @method hide
         */
        GameScreen.prototype.hide = function () {

            this.fc3d.root.removeChild(this.el);
            this.game3d.stopRendering();
        };

        /**
         * Show game won bar
         * @method showWonBar
         */
        GameScreen.prototype.showWonBar = function (status) {

            this.bbar.hide();
            var wbar = this.wbar;
            setTimeout(function () {
                wbar.show(status);
            }, 400);
        };

        /**
         * Show button bar
         * @method showButtonBar
         */
        GameScreen.prototype.showButtonBar = function () {

            this.wbar.hide();
            var bbar = this.bbar;
            setTimeout(function () {
                bbar.show();
            }, 400);
        };

        /**
         * Transition in
         * @method transitionIn
         */
        GameScreen.prototype.transitionIn = function () {
            this.el.style.display = 'block';
        };

        /**
         * Transition out
         * @method transitionOut
         */
        GameScreen.prototype.transitionOut = function () {

        };

        /**
         * Get playing time
         * @method getPlayingTime
         */
        GameScreen.prototype.getPlayingTime = function () {
            return this.header.timeBtn.currentTime;
        };

        /**
         * Resizing handler
         * @method resize
         */
        GameScreen.prototype.resize = function (rw, rh) {
            this.game3d.resize(rw, rh);
        };

        /**
         * Return move count\
         * @method getMoveCount
         */
        GameScreen.prototype.getMoveCount = function () {
            return this.header.moveBtn.count;
        };

        /**
         * Play next level
         * @method nextLevel
         */
        GameScreen.prototype.nextLevel = function () {

            var levels = this.config.level;
            this.levelIndex++;
            if (this.levelIndex == levels.length) this.levelIndex = 0;
            this.newGame(levels[this.levelIndex].category, levels[this.levelIndex].grid);
        };

        /**
         * Replay current level
         * @method replay
         */
        GameScreen.prototype.replayLevel = function () {

            var levels = this.config.level;
            this.newGame(levels[this.levelIndex].category, levels[this.levelIndex].grid);
        };

        /**
         * Dispose resources
         * @method dispose
         */
        GameScreen.prototype.dispose = function () {
        };

        return GameScreen;

    });
