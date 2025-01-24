/**
 * @author  raizensoft.com
 */
define([
        'rs/utils/ObjectUtil',
        'rs/fc3d/entity/CardPiecePool',
    ],
    function (
        ObjectUtil,
        CardPiecePool) {

        "use strict";

        CardBoard.prototype = Object.create(THREE.Group.prototype);
        CardBoard.prototype.constructor = CardBoard;

        /**
         * CardBoad contains collection of card item
         * @class CardBoard
         * @constructor
         */
        function CardBoard(g3d) {

            this.g3d = g3d;
            this.dopt = g3d.dopt;
            this.config = g3d.fc3d.config;
            this.init();
        }

        /**
         * Init the component
         * @method init
         */
        CardBoard.prototype.init = function () {

            THREE.Group.prototype.constructor.call(this);

            // Generate pool
            this.cpool = new CardPiecePool(this);
            this.cpieces = [];
        };

        /**
         * Generate a new game
         * @method newGame
         */
        CardBoard.prototype.newGame = function (category, grid, callback) {

            function shuffleArray(array) {

                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }

            category = category || 0;
            grid = grid || '2x3';

            var c = this.config;
            var am = this.g3d.fc3d.assetManager;
            var g3d = this.g3d;
            var d = this.dopt;
            var glight = this.g3d.container.glight;

            // Free up pool object
            for (var i = 0; i < this.cpieces.length; i++) {

                var cp = this.cpieces[i];
                this.remove(cp);
                this.cpool.free(cp);
            }
            this.cpieces.splice(0);

            // Load category data
            var data = this.config.data;
            var keys = Object.keys(data);
            var cat = keys[category];

            // Get card texture
            var idx = Math.floor(Math.random() * am.cardTextures.length);
            var ctex = am.cardTextures[idx];

            // Construct grid items
            var rc = grid.split('x');
            var r = parseInt(rc[0]);
            var c = parseInt(rc[1]);
            var total = this.total = r * c;
            var indexCount = 0;

            // Generate card list
            var clist = [];
            var numList = [];

            // Index array
            for (var i = 0; i < data[cat]; i++) numList[i] = i + 1;
            shuffleArray(numList);

            for (var i = 0; i < this.total; i += 2) {
                clist[i] = clist[i + 1] = numList[indexCount++];
                if (indexCount == data[cat])
                    indexCount = 0;
            }
            for (var k = 0; k < 10; k++) shuffleArray(clist);
            // console.log(clist);

            var galWidth = (d.cardDistance + d.cardWidth) * (c - 1);
            var galHeight = (d.cardDistance + d.cardHeight) * (r - 1);
            this.galWidth = d.cardWidth * c + d.cardDistance * (c - 1);
            this.galHeight = d.cardHeight * r + d.cardDistance * (r - 1);
            var sx = -galWidth * 0.5;
            var sy = -galHeight * 0.5;
            var count = 0;
            var loadedCount = 0;

            for (var i = 0; i < r; i++) {
                for (var j = 0; j < c; j++) {

                    var it = this.cpool.obtain(count);
                    this.cpieces.push(it);
                    it.cardIndex = clist[count];
                    count++;
                    it.position.x = sx + j * (d.cardWidth + d.cardDistance);
                    it.position.y = sy + i * (d.cardHeight + d.cardDistance);
                    it.position.z = 0;

                    // Set back and front texture
                    it.setBackTexture(ctex);
                    var frontTex = new THREE.TextureLoader().load(
                        'data' + '/' + cat + '/' + it.cardIndex + '.jpg',
                        function () {
                            if (++loadedCount == total) {
                                callback.call(g3d);
                            }
                        });
                    it.setFrontTexture(frontTex);
                    this.add(it);
                }
            }

            // Set light bound
            glight.setBound([galWidth, galHeight], 0);
            this.g3d.container.fitGameBoard();

            // Set new cycle
            this.cycleCount = 0;
            this.matchCount = this.total;
        };

        /**
         * Shuffle card collections
         * @method arrange
         */
        CardBoard.prototype.shuffle = function () {

        };

        /**
         * Scale fit board to specific region
         * @method setScaleFitPosition
         */
        CardBoard.prototype.getScaleFitPosition = function (targetWidth, targetHeight) {

            var d = this.dopt;

            // Calculate current board dimensions
            var values = this.getBound();
            var fw = values[0], fh = values[1], depth = values[2];

            var k = d.fitFactor || 0.96;
            var r = fw / fh;

            var rt;
            if (targetWidth / r > targetHeight) {
                rt = targetHeight * k / fh;
            } else {
                rt = targetWidth * k / fw;
            }

            var camZ = this.g3d.camera.position.z;
            var zt = camZ - camZ / rt - depth * 0.5;
            return zt;
        };

        /**
         * Return puzzle board bound
         * @method getDimension
         */
        CardBoard.prototype.getBound = function () {

            var d = this.dopt;

            // Calculate current board dimensions
            var w = this.galWidth, h = this.galHeight;
            return [w, h, 10];
        };

        /**
         * Flip all item back
         * @method flipBack
         */
        CardBoard.prototype.flipBack = function () {

            for (var i = 0; i < this.cpieces.length; i++) {

                var it = this.cpieces[i];
                it.flipBack(i * 40);
            }
        };

        /**
         * Check current match count
         * @method checkMatchCount
         */
        CardBoard.prototype.checkMatchCount = function () {

            this.matchCount -= 2;
            if (this.matchCount == 0) {
                this.g3d.setWonState();
            }
        };


        return CardBoard;

    });
