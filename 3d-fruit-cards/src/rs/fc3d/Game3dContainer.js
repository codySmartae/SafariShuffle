/**
 * @author  raizensoft.com
 */
define([
        'rs/utils/ImageUtil',
        'rs/fc3d/CardBoard',
        'rs/fc3d/GameLight'],

    function (
        ImageUtil,
        CardBoard,
        GameLight) {

        "use strict";

        Game3dContainer.prototype = Object.create(THREE.Group.prototype);
        Game3dContainer.prototype.constructor = Game3dContainer;

        var EASING = 'easeOutQuint';
        var DURATION = 1200;

        /**
         * Generic and root container for all 3d game items
         * @class Game3dContainer
         * @constructor
         */
        function Game3dContainer(g3d) {

            // References to Gallery3D
            this.g3d = g3d;
            this.init();
        }

        /**
         * Init the container
         * @method init
         */
        Game3dContainer.prototype.init = function () {

            // Call parent constructorP
            THREE.Group.prototype.constructor.call(this);

            //  Add GameBoard component
            this.cardBoard = new CardBoard(this.g3d);
            this.add(this.cardBoard);

            // Light object
            var glight = this.glight = new GameLight(this.g3d);
            this.add(glight);
        };

        /**
         * Fit game board to current screen dimension
         * @method fitGameBoard
         */
        Game3dContainer.prototype.fitGameBoard = function () {

            var gs = this.g3d.gs;
            var d = this.g3d.dopt;
            var s0 = gs.header.getClientSize();
            var s1 = gs.bbar.getClientSize();
            var cH = this.g3d.el.clientHeight;
            var cW = this.g3d.el.clientWidth;
            var mw = cW, mh = cH - s0[1] - s1[1] - 10;

            this.g3d.setCameraMatchProjection();
            var zt = this.cardBoard.getScaleFitPosition(mw, mh);
            this.position.z = zt;
            this.scaleFitZ = zt;
            this.glight.setBound(this.cardBoard.getBound());
        };

        /**
         * Show puzzle board with transitioning effect
         * @method transitionIn
         */
        Game3dContainer.prototype.show = function () {

            this.visible = true;

            this.visible = false;
            this.inFlatView = true;
            this.inTransition = true;
            this.fitGameBoard();

            var g3c = this;
            this.rotation.x = -Math.PI;

            anime.remove(this.scale);
            anime({
                targets: this.scale,
                x: [0.1, 1],
                y: [0.1, 1],
                z: [0.1, 1],
                easing: 'easeOutQuad',
                duration: 1800
            });

            anime.remove(this.rotation);
            anime({
                targets: this.rotation,
                x: 0,
                easing: 'easeOutQuad',
                duration: 1800,
                complete: function () {
                    g3c.inTransition = false;
                }
            });

            setTimeout(function () {
                g3c.visible = true;
            }, 140);

            setTimeout(function () {
                g3c.cardBoard.flipBack();
            }, 2000);
        };

        return Game3dContainer;

    });
