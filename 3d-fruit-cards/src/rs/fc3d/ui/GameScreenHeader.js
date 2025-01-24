/**
 * @author  raizensoft.com
 */
define([
        'rs/fc3d/ui/HeaderTimeButton',
        'rs/fc3d/ui/HeaderLevelButton',
        'rs/fc3d/ui/HeaderMoveButton'
    ],
    function (
        HeaderTimeButton,
        HeaderLevelButton,
        HeaderMoveButton) {

        "use strict";

        /**
         * GameScreenHeader component
         * @class GameScreenHeader
         * @constructor
         */
        function GameScreenHeader(gs) {

            this.gs = gs;
            this.init();
        }

        /**
         * Build header components
         * @method init
         */
        GameScreenHeader.prototype.init = function () {

            // Root container
            var el = this.el = document.createElement('div');
            el.className = 'rs-fc3d-gameheader';

            // Time button
            this.timeBtn = new HeaderTimeButton(this);
            el.appendChild(this.timeBtn.el);
            //
            // Level button
            this.levelBtn = new HeaderLevelButton(this);
            el.appendChild(this.levelBtn.el);

            // Move button
            this.moveBtn = new HeaderMoveButton(this);
            el.appendChild(this.moveBtn.el);
        };

        /**
         * Return client size dimension
         * @method getClientSize
         */
        GameScreenHeader.prototype.getClientSize = function () {
            return [this.el.clientWidth, this.el.clientHeight];
        };

        /**
         * Show the header
         * @method show
         */
        GameScreenHeader.prototype.show = function () {

            anime({
                targets: this.el,
                top: 4,
                easing: 'easeOutQuint',
                duration: 800
            });
        };

        /**
         * Hide the header
         * @method hide
         */
        GameScreenHeader.prototype.hide = function () {

            anime({
                targets: this.el,
                top: -60,
                easing: 'easeOutQuint',
                duration: 800
            });
        };

        return GameScreenHeader;

    });

