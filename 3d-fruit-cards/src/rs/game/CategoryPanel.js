/**
 * @author  raizensoft.com
 */
define([
        'rs/game/BasePanel'
    ],
    function (BasePanel) {

        "use strict";

        CategoryPanel.prototype = Object.create(BasePanel.prototype);
        CategoryPanel.prototype.constructor = CategoryPanel;

        /**
         * CategoryPanel
         * @class CategoryPanel
         * @constructor
         */
        function CategoryPanel(gs) {

            this.gs = gs;
            BasePanel.prototype.constructor.call(this);
        }

        /**
         * Init
         * @method init
         */
        CategoryPanel.prototype.init = function () {

            BasePanel.prototype.init.call(this);
            var el = this.el;
            el.classList.add('rs-sp3d-categorypanel');
            el.style.width = el.style.height = 'auto';

            // Title
            this.title = document.createElement('h1');
            this.title.className = 'trophy-level-title';
            this.title.innerHTML = 'Category';

            // Build category list
            var gs = this.gs;
            var catList = ['NUMBERS', 'IMAGES']
            this.list = [];

            function clickHandler(e) {

                var idx = gs.category;

                if (idx !== e.currentTarget.index) {
                    gs.fc3d.assetManager.btnClick.play();
                    gs.fc3d.pref.saveCategory(e.currentTarget.index);
                    gs.newGame();
                }
            }

            for (var i = 0; i < catList.length; i++) {

                var item = document.createElement('div');
                item.className = 'rs-categoryitem';
                item.innerHTML = catList[i];
                item.index = i;
                item.addEventListener('click', clickHandler);
                this.list.push(item);
                el.appendChild(item);
            }

        };

        /**
         * Show the panel
         * @method show
         */
        CategoryPanel.prototype.show = function () {

            BasePanel.prototype.show.call(this);
            document.body.appendChild(this.title);

            var index = this.gs.category;
            for (var i = 0; i < this.list.length; i++)
                this.list[i].classList.remove('selected-item');
            this.list[index].classList.add('selected-item');
        };

        /**
         * Hide the panel
         * @method hide
         */
        CategoryPanel.prototype.hide = function () {

            BasePanel.prototype.hide.call(this);
            if (document.body.contains(this.title))
                document.body.removeChild(this.title);
        };

        return CategoryPanel;

    });
