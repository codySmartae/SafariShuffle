/**
 * @author  raizensoft.com
 */
define([
        'rs/game/BasePanel'
    ],
    function (BasePanel) {

        "use strict";

        var SCALE = 0.85;

        ImagePanel.prototype = Object.create(BasePanel.prototype);
        ImagePanel.prototype.constructor = ImagePanel;

        /**
         * A panel showing image
         * @class ImagePanel
         * @constructor
         */
        function ImagePanel() {
            BasePanel.prototype.constructor.call(this);
        }

        /**
         * Init image panel
         * @method init
         */
        ImagePanel.prototype.init = function () {

            BasePanel.prototype.init.call(this);
            this.el.classList.add('rs-image-panel');

            var img = this.img = document.createElement('img');
            this.el.appendChild(this.img);
            this.el.style.width = this.el.style.height = 'auto';
            img.addEventListener('click', this.hide.bind(this));

            // Constraint img dimension
            img.onload = function (e) {

                var r = img.width / img.height;
                if (img.height >= window.innerHeight) {

                    img.height = window.innerHeight * SCALE;
                    img.width = img.height * r;
                }
                if (img.width >= window.innerWidth) {

                    img.width = window.innerWidth * SCALE;
                    img.height = img.width / r;
                }
            };
        };

        /**
         * Show an image with input src
         * @method show
         */
        ImagePanel.prototype.show = function (src) {

            this.img.src = src;
            BasePanel.prototype.show.call(this);
        };

        /**
         * Load an image source
         * @method load
         */
        ImagePanel.prototype.load = function (src) {

        };

        return ImagePanel;
    });
