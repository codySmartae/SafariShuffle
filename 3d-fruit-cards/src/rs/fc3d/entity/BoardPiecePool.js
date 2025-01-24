/**
 * @author  raizensoft.com
 */
define([
        'rs/fc3d/entity/BoardPiece'],
    function (BoardPiece) {

        "use strict";

        var DEFAULT_ITEMS = 10;

        /**
         * BoardPiece pool object
         * @class BoardPiecePool
         * @constructor
         */
        function BoardPiecePool(pb) {

            this.pb = pb;
            this.init();
        }

        /**
         * Init pool object
         * @method init
         */
        BoardPiecePool.prototype.init = function () {

            this.pool = [];
            var pb = this.pb;
            for (var i = 0; i < DEFAULT_ITEMS; i++) {

                var pp = new BoardPiece(pb);
                this.pool.push(pp);
            }
        };

        /**
         * Return a new piece
         * @method obtain
         */
        BoardPiecePool.prototype.obtain = function () {

            if (this.pool.length > 0) {
                var p = this.pool.pop();
                return p;
            } else {
                var p = new BoardPiece(this.pb);
                return p;
            }
        };

        /**
         * Free pool object
         * @method free
         */
        BoardPiecePool.prototype.free = function (piece) {
            this.pool.push(piece);
        };

        return BoardPiecePool;
    });
