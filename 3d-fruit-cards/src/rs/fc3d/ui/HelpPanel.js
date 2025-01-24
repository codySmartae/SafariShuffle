/**
 * @author  raizensoft.com
 */
define([
        'rs/game/Scroller',
        'rs/game/BasePanel'
    ],
    function (Scroller, BasePanel) {

        "use strict";

        HelpPanel.prototype = Object.create(BasePanel.prototype);
        HelpPanel.prototype.constructor = HelpPanel;

        //var CONTENT_PATH = 'assets/text/helpcontent.html';
        var CONTENT_PATH = 'assets/text/helpcontentcopy.html';

        /**
         * Help panel class
         * @class HelpPanel
         * @constructor
         */
        function HelpPanel() {

            BasePanel.prototype.constructor.call(this);
        }

        /**
         * Init panel
         * @method init
         */
        HelpPanel.prototype.init = function () {

            BasePanel.prototype.init.call(this);
            var el = this.el;
            el.classList.add('rs-fc3d-helppanel');
            el.style.width = el.style.height = '90%';

            // Playing instruction
            var c = this.container = document.createElement('div');
            c.className = 'rs-helpcontainer';
            el.appendChild(c);

            // Setup scroller
            this.scroller = new Scroller(this.container);

            // Setup content
            var hp = this;
            var req = new XMLHttpRequest();
            req.addEventListener("load", function (e) {
                var result = this.responseText;
                c.innerHTML = result;
            });
            req.open("GET", CONTENT_PATH);
            req.send();
        };

        return HelpPanel;

    });
