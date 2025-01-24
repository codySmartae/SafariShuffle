/**
 * @author  raizensoft.com
 */
define(
    function () {

        "use strict";

        /**
         * LevelScreen class
         * @class LevelScreen
         * @constructor
         */
        function LevelScreen(fc3d, config) {

            this.fc3d = fc3d;
            this.config = fc3d.config;
            this.init();
        }

        /**
         * Init screen
         * @method init
         */
        LevelScreen.prototype.init = function () {

            var el = this.el = document.createElement('div');
            el.className = 'rs-lscreen';
            el.style.width = el.style.height = '100%';
            el.style.display = 'none';
            this.fc3d.root.appendChild(el);

            // body...
        };

        /**
         * Show screen
         * @method show
         */
        LevelScreen.prototype.show = function () {

            // body...
        };

        /**
         * Hide screen
         * @method hide
         */
        LevelScreen.prototype.hide = function () {

            // body...
        };

        /**
         * Resizing handler
         * @method resize
         */
        LevelScreen.prototype.resize = function () {

            // body...
        };

        return LevelScreen;

    });
