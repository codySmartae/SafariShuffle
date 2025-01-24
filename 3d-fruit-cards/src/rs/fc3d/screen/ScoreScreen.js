/**
 * @author  raizensoft.com
 */
define([
    'rs/game/CategoryPanel',
    'rs/fc3d/ui/HelpPanel',
   // 'rs/fc3d/ui/GameScreenButtonBar',
    'rs/fc3d/ui/GameScreenWonBar',
    'rs/fc3d/ui/GameScreenHeader',
],
    // 'rs/fc3d/Game3d'],
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
    function ScoreScreen(fc3d, config) {

        this.fc3d = fc3d;
        this.loaded=true;
        this.config = fc3d.config;
        this.init();
    }

    /**
     * Init game screen components
     * @method init
     */
    ScoreScreen.prototype.init = function () {

        // Root element
        var gs = this;
        var el = this.el = document.createElement('div');
        el.className = 'rs-gscreen-zakaria';
        el.style.width = el.style.height = '100%';
        el.style.display = 'block';
        gs.appendChild(el);

        
        // Setup panels
        this.initPanel();
        

        

        // Header
        this.header = new GameScreenHeader(this);
        el.appendChild(this.header.el);

        // ButtonBar
        //this.bbar = new GameScreenButtonBar(this);
        //el.appendChild(this.bbar.el);

        // Wonbar
        //this.wbar = new GameScreenWonBar(this);
        //el.appendChild(this.wbar.el);

        // Game3d
        //this.game3d = new Game3d(this);
        //el.appendChild(this.game3d.el);
        //this.game3d=new Game3d(this);
        //el.appendChild(this.game3d.el);
    };

        /**
         * Load assets
         * @method load
         */
        ScoreScreen.prototype.load = function () {

            this.el.style.display = 'block';
            this.el.appendChild(this.header.el);
            this.header.center();

            // AssetManager callbacks
            var am = this.fc3d.assetManager;
            var hs = this;
            var header = this.header;
            var menu = this.menu;

            am.onLoad = function () {

                setTimeout(function () {

                    am.showDelay = true;

                    // Move header to top app
                    header.moveTop();

                    // Show menu
                    hs.el.appendChild(menu.el);
                    menu.show();

                }, SHOW_DELAY);
            };

            am.onProgress = function (url, loaded, total) {
                hs.header.setProgress(loaded / total * 100);
            }
            this.fc3d.assetManager.load();
        };
    /**
     * Init game panels
     * @method initPanel
     */
    ScoreScreen.prototype.initPanel = function () {
        
        // Trophy panel
        //this.trophyPanel = new TrophyPanel(this);

        // Help Panel
        if (this.fc3d.homeScreen)
            this.hpanel = this.fc3d.homeScreen.hpanel;
        else
            this.hpanel = new HelpPanel();
    };
    ScoreScreen.prototype.newGame = function (category, grid) {

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
     * Show game screen
     * @method show
     */
    ScoreScreen.prototype.show = function () {

        this.currentCategory = this.fc3d.pref.data.defaultCategory;
        this.fc3d.root.appendChild(this.el);
        this.transitionIn();
        //var d = this.fc3d.getAppDimension();
        //this.game3d.resize(d[0], d[1]);
        //this.game3d.startRendering();
        //this.levelIndex = 0;
        //var levels = this.config.level;
        //this.newGame(levels[0].category, levels[0].grid);
    };

    /**
     * Hide game screen
     * @method hide
     */
    ScoreScreen.prototype.hide = function () {

        this.fc3d.root.removeChild(this.el);
        this.transitionOut();
    };

    /**
     * Show game won bar
     * @method showWonBar
     */
    ScoreScreen.prototype.showWonBar = function (status) {

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
    ScoreScreen.prototype.showButtonBar = function () {

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
    ScoreScreen.prototype.transitionIn = function () {
        this.el.style.display = 'block';
    };

    /**
     * Transition out
     * @method transitionOut
     */
    ScoreScreen.prototype.transitionOut = function () {

    };

    /**
     * Get playing time
     * @method getPlayingTime
     */
    ScoreScreen.prototype.getPlayingTime = function () {
        return this.header.timeBtn.currentTime;
    };

    /**
     * Resizing handler
     * @method resize
     */
    ScoreScreen.prototype.resize = function (rw, rh) {
        this.game3d.resize(rw, rh);
    };

    /**
     * Return move count\
     * @method getMoveCount
     */
    ScoreScreen.prototype.getMoveCount = function () {
        return this.header.moveBtn.count;
    };

    /**
     * Play next level
     * @method nextLevel
     */
    ScoreScreen.prototype.nextLevel = function () {

        var levels = this.config.level;
        this.levelIndex++;
        if (this.levelIndex == levels.length) this.levelIndex = 0;
        this.newGame(levels[this.levelIndex].category, levels[this.levelIndex].grid);
    };

    /**
     * Replay current level
     * @method replay
     */
    ScoreScreen.prototype.replayLevel = function () {

        var levels = this.config.level;
        this.newGame(levels[this.levelIndex].category, levels[this.levelIndex].grid);
    };

    /**
     * Dispose resources
     * @method dispose
     */
    ScoreScreen.prototype.dispose = function () {
    };

    return GameScreen;

});
