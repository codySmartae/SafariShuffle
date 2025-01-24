/**
 * @author  raizensoft.com
 */
define([
        'rs/fc3d/ui/GameButton'
    ],
    function (GameButton) {

        "use strict";

        /**
         * GameScreenWonBar
         * @class GameScreenWonBar
         * @constructor
         */
        function GameScreenWonBar(gs) {

            this.gs = gs;
            this.init();
        }

        /**
         * Init won bar components
         * @method init
         */
        GameScreenWonBar.prototype.init = function () {

            // Root container
            var el = this.el = document.createElement('div');
            el.className = 'rs-fc3d-gamewonbar';
            el.style.bottom = '-85px';

            // Status
            this.status = document.createElement('h1');
            this.status.className = 'trophy-level-title';
            this.status.innerHTML = 'DRAW';

            // Replay button
            this.replayBtn = new GameButton('icon-nextlevel', this.doNewGame.bind(this));
            this.replayBtn.addClass('rs-fc3d-mainbutton-extra');
            this.replayBtn.addClass('newgame-button');
            var s = this.replayBtn;
            s.width = s.height = s.lineHeight = '48px';
            s.fontSize = '28px';
            el.appendChild(this.replayBtn.el);
        };

        /**
         * Set won/lose/draw status
         * @method setStatus
         */
        GameScreenWonBar.prototype.setStatus = function (status) {
            this.status.innerHTML = status;
        };

        /**
         * Replay current level
         * @method doNewGame
         */
        GameScreenWonBar.prototype.doNewGame = function () {

            var am = this.gs.fc3d.assetManager;
            am.btnClick.play();
            this.gs.newGame();
        };

        /**
         * Show the bar
         * @method show
         */
        GameScreenWonBar.prototype.show = function (status) {

            anime({
                targets: this.el,
                bottom: 12,
                easing: 'easeOutQuint',
                duration: 800
            });
            this.setStatus(status);
            this.gs.trophyPanel.show();
            document.body.appendChild(this.status);
        };

        /**
         * Hide the bar
         * @method hide
         */
        GameScreenWonBar.prototype.hide = function () {

            anime({
                targets: this.el,
                bottom: -85,
                easing: 'easeOutQuint',
                duration: 800
            });
            if (document.body.contains(this.status))
                document.body.removeChild(this.status);
        };

        return GameScreenWonBar;
    });
