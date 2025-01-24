/**
 * @author  raizensoft.com
 */
define([
        'rs/fc3d/entity/CardPiece'],
    function (CardPiece) {

        "use strict";

        var DEFAULT_ITEMS = 9;

        /**
         * Pool class for CardPiece object
         * @class CardPiecePool
         * @constructor
         */
        function CardPiecePool(pb) {

            this.pb = pb;
            this.init();
        }

        /**
         * Init pool object
         * @method init
         */
        CardPiecePool.prototype.init = function () {

            this.pool = [];
            var pb = this.pb;

            for (var i = 0; i < DEFAULT_ITEMS; i++) {

                var pp = new CardPiece(pb);
                this.pool.push(pp);
            }
        };

        /**
         * Return a new piece
         * @method obtain
         */
        CardPiecePool.prototype.obtain = function (n) {

            if (this.pool.length > 0) {
                var p = this.pool.pop();
                p.index = n;
                p.reset();
                return p;
            } else {
                var p = new CardPiece(this.pb);
                p.index = n;
                return p;
            }
        };

        /**
         * Free pool object
         * @method free
         */
        CardPiecePool.prototype.free = function (piece) {
            this.pool.push(piece);
        };

        return CardPiecePool;

    });
