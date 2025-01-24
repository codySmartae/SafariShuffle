/**
 * @author  raizensoft.com
 */
define(
    function () {

        "use strict";

        /**
         * HeaderLevelButton component
         * @class HeaderLevelButton
         * @constructor
         */
        function HeaderLevelButton(gh) {
            this.gh = gh;
            this.init();
        }

        /**
         * Init the button
         * @method init
         */
        HeaderLevelButton.prototype.init = function () {

            var el = this.el = document.createElement('div');
            el.className = 'rs-fc3d-levelbtn';

            var gh = this.gh;
            var gs = gh.gs;

            // Label
            this.label = document.createElement('span');
            this.label.className = 'levelbtn-label';
            el.appendChild(this.label);
        };

        /**
         * Set current level label
         * @method setLevel
         */
        HeaderLevelButton.prototype.setLevel = function (grid) {

            var rc = grid.split('x');
            var r = parseInt(rc[0]);
            var c = parseInt(rc[1]);
            this.label.innerHTML = r + ' &times; ' + c;

            function randColor() {
                return Math.floor(Math.random() * 150);
            }

            this.el.style.backgroundColor = 'rgba(' + randColor() + ', ' + randColor() + ', ' + randColor() + ', 1)';
        };

        return HeaderLevelButton;
    });
