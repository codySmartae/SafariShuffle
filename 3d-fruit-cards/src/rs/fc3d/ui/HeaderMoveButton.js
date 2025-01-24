/**
 * @author  raizensoft.com
 */
define([],
    function () {

        "use strict";

        /**
         * HeaderMoveButton component
         * @class HeaderMoveButton
         * @constructor
         */
        function HeaderMoveButton(gh) {

            this.gh = gh;
            this.init();
        }

        /**
         * Init the component
         * @method init
         */
        HeaderMoveButton.prototype.init = function () {

            var el = this.el = document.createElement('div');
            el.className = 'rs-fc3d-movebtn';
            this.count = 0;

            var gh = this.gh;
            var mbtn = this;

            // Move icon
            var mi = this.micon = document.createElement('span');
            el.appendChild(mi);
            mi.className = 'icon-magic';

            // Move value
            var mv = this.mval = document.createElement('span');
            mv.className = 'movebtn-value';
            el.appendChild(mv);
            mv.innerHTML = '0000';
            this.count = 0;
        };

        /**
         * Count move
         * @method undo
         */
        HeaderMoveButton.prototype.doCount = function () {

            this.count++;
            this.format();
        };

        /**
         * Format count
         * @method format
         */
        HeaderMoveButton.prototype.format = function () {

            var n = this.count;
            var c = 0;
            var s = "";
            while (n >= 10) {
                c++;
                n = n / 10;
            }
            c = 4 - c - 1;
            for (var i = 0; i < c; i++) s += "0";
            this.mval.innerHTML = s + this.count;
        };

        /**
         * Reset hint count
         * @method reset
         */
        HeaderMoveButton.prototype.reset = function () {

            this.count = 0;
            this.format();
        };

        return HeaderMoveButton;

    });
