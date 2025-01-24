/**
 * @author  raizensoft.com
 */
define(
    function () {

        "use strict";

        BoardPiece.prototype = Object.create(THREE.Mesh.prototype);
        BoardPiece.prototype.constructor = BoardPiece;

        var EASING = 0.15;

        /**
         * Board piece item
         * @class BoardPiece
         * @constructor
         */
        function BoardPiece(pb) {

            this.pb = pb;
            this.init();
        }

        /**
         * Init the puzzle
         * @method init
         */
        BoardPiece.prototype.init = function () {

            THREE.Mesh.prototype.constructor.call(this);

            var d = this.pb.dopt;

            // Default bevel scale
            this.bevelScale = d.bevelScale;
            this.geometry = new THREE.BoxGeometry(100, 100, 20);

            //window.geo = this.geometry;
            this.widh = this.height = 100;
            this.depth = 20;
            this.ou = 0;
            this.ov = 0;
            this.tu = 1;
            this.tv = 1;
            this.bd = this.bdv = (1 - this.bevelScale) * 0.5;
            this.bd1 = this.bdv1 = (1 - this.bd);

            // Default material
            var pmaterial = new THREE.MeshPhongMaterial({
                specular: d.pieceSpecular,
                color: d.pieceColor,
                emissive: d.pieceEmissive,
                emissive: 0x2a2a2a,
                side: THREE.FrontSide
            });
            this.material = pmaterial;

            // Initial tweening variables
            this.targetPositionZ = 0;
        };

        /**
         * Apply tint color to the material
         * @method tint
         */
        BoardPiece.prototype.tint = function (color) {

            this.material.color.set(color);
            this.material.needsUpdate = true;
        };

        /**
         * Reset piece color
         * @method resetColor
         */
        BoardPiece.prototype.resetColor = function () {
            this.tint(this.pb.dopt.pieceColor);
        };

        /**
         * Modify piece geometry
         * @method modifyGeometry
         */
        BoardPiece.prototype.modifyGeometry = function (w, h, d) {

            this.width = w;
            this.height = h;
            this.depth = d;

            var geo = this.geometry;
            var v = geo.vertices;
            var hw = w * 0.5, hh = h * 0.5, hd = d * 0.5;
            var bs = this.bevelScale;
            var bw = hw * bs, bh = hh * bs;

            v[0].x = bw;
            v[0].y = bh;
            v[0].z = hd;
            v[1].x = hw;
            v[1].y = hh;
            v[1].z = -hd;
            v[2].x = bw;
            v[2].y = -bh;
            v[2].z = hd;
            v[3].x = hw;
            v[3].y = -hh;
            v[3].z = -hd;

            v[4].x = -hw;
            v[4].y = hh;
            v[4].z = -hd;
            v[5].x = -bw;
            v[5].y = bh;
            v[5].z = hd;
            v[6].x = -hw;
            v[6].y = -hh;
            v[6].z = -hd;
            v[7].x = -bw;
            v[7].y = -bh;
            v[7].z = hd;
            geo.verticesNeedUpdate = true;

            var geo = this.geometry;
            var f = geo.faceVertexUvs[0];
            var
                ou = this.ou, ov = this.ov,
                tu = this.tu, tv = this.tv,
                bd = this.bd, bd1 = this.bd1,
                bdv = this.bdv, bdv1 = this.bdv1;

            f[0][0].x = ou + bd1;
            f[0][0].y = ov + bdv1;
            f[0][1].x = ou + bd1;
            f[0][1].y = ov + bdv;
            f[0][2].x = tu;
            f[0][2].y = tv;

            f[1][0].x = ou + bd1;
            f[1][0].y = ov + bdv;
            f[1][1].x = tu;
            f[1][1].y = ou;
            f[1][2].x = tu;
            f[1][2].y = tv;

            f[2][0].x = ou;
            f[2][0].y = tv;
            f[2][1].x = ou;
            f[2][1].y = ov;
            f[2][2].x = ou + bd;
            f[2][2].y = ov + bdv1;

            f[3][0].x = ou;
            f[3][0].y = ov;
            f[3][1].x = ou + bd;
            f[3][1].y = ov + bdv;
            f[3][2].x = ou + bd;
            f[3][2].y = ov + bdv1;

            f[4][0].x = ou;
            f[4][0].y = tv;
            f[4][1].x = ou + bd;
            f[4][1].y = ov + bdv1;
            f[4][2].x = tu;
            f[4][2].y = tv;

            f[5][0].x = ou + bd;
            f[5][0].y = ov + bdv1;
            f[5][1].x = ou + bd1;
            f[5][1].y = ov + bdv1;
            f[5][2].x = tu;
            f[5][2].y = tv;

            f[6][0].x = ou + bd;
            f[6][0].y = ov + bdv;
            f[6][1].x = ou;
            f[6][1].y = ov;
            f[6][2].x = ou + bd1;
            f[6][2].y = ov + bdv;

            f[7][0].x = ou;
            f[7][0].y = ov;
            f[7][1].x = tu;
            f[7][1].y = ov;
            f[7][2].x = ou + bd1;
            f[7][2].y = ov + bdv;

            f[8][0].x = ou + bd;
            f[8][0].y = ov + bdv1;
            f[8][1].x = ou + bd;
            f[8][1].y = ov + bdv;
            f[8][2].x = ou + bd1;
            f[8][2].y = ov + bdv1;

            f[9][0].x = ou + bd;
            f[9][0].y = ov + bdv;
            f[9][1].x = ou + bd1;
            f[9][1].y = ov + bdv;
            f[9][2].x = ou + bd1;
            f[9][2].y = ov + bdv1;

            f[10][0].x = tu;
            f[10][0].y = tv;
            f[10][1].x = tu;
            f[10][1].y = ov;
            f[10][2].x = ou;
            f[10][2].y = tv;

            f[11][0].x = tu;
            f[11][0].y = ov;
            f[11][1].x = ou;
            f[11][1].y = ov;
            f[11][2].x = ou;
            f[11][2].y = tv;

            geo.uvsNeedUpdate = true;
            this.geometry.computeBoundingSphere()
            this.geometry.computeFaceNormals();
        };

        /**
         * Update bevel scale and geometry
         * @method updateBevel
         */
        BoardPiece.prototype.updateBevel = function (bs) {

            this.bevelScale = bs;

            // Update bevel scale parameters
            this.bd = (1 - this.bevelScale) * 0.5 * this.nhs;
            this.bd1 = (this.nhs - this.bd);

            this.bdv = (1 - this.bevelScale) * 0.5 * this.vhs;
            this.bdv1 = (this.vhs - this.bdv);

            this.modifyGeometry(this.width, this.height, this.depth);
        };

        /**
         * Tween target bevel
         * @method tweenBevel
         */
        BoardPiece.prototype.tweenBevel = function (targetBevel) {

            var pp = this;
            var to = {value: this.bevelScale};
            anime({
                targets: to,
                value: targetBevel,
                easing: 'easeOutQuint',
                duration: 800,
                update: function () {
                    pp.updateBevel(to.value);
                }
            });
        };

        /**
         * Update piece texture and uv positions
         * @method updateTexturePosition
         */
        BoardPiece.prototype.updateTexturePosition = function (index, r, c, tex) {

            this.index = index;
            var w = tex.image.width, h = tex.image.height;
            var d = this.pb.dopt.pieceDepth;

            var i = Math.floor(index / c), j = index % c;
            var i1 = r - i - 1, j1 = j;
            var nhs = 1 / c, vhs = 1 / r;

            // Update uv origins
            var ou = j1 * nhs, ov = i1 * vhs, tu = ou + nhs, tv = ov + vhs;

            this.ou = ou;
            this.ov = ov;
            this.tu = tu;
            this.tv = tv;
            this.nhs = nhs;
            this.vhs = vhs;

            // Update bevel scale parameters
            this.bd = (1 - this.bevelScale) * 0.5 * nhs;
            this.bd1 = (nhs - this.bd);

            this.bdv = (1 - this.bevelScale) * 0.5 * vhs;
            this.bdv1 = (vhs - this.bdv);

            this.modifyGeometry(w / c, h / r, d);
            this.setTexture(tex);
        };

        /**
         * Set new texture
         * @method setMaterial
         */
        BoardPiece.prototype.setTexture = function (texture) {

            this.material.map = texture;
            this.material.needsUpdate = true;
        };

        /**
         * Render request
         * @method requestHandler
         */
        BoardPiece.prototype._renderRequest = function () {

            var delta = (this.targetPositionZ - this.position.z) * EASING;
            this.position.z += delta;
            if (this.target)
                this.target.position.z += delta;
            if (Math.abs(this.position.z - this.targetPositionZ) > 0.1)
                this.renderId = requestAnimationFrame(this._renderRequest.bind(this));
            else {
                this.position.z = this.targetPositionZ;
                if (this.target && this.targetPositionZ == 0) this.target.adjustZ();
            }
        };

        /**
         * Press this board piece
         * @method press
         */
        BoardPiece.prototype.press = function () {

            var pressAmount = -this.pb.dopt.pieceDepth * 0.75;
            cancelAnimationFrame(this.renderId);
            this.targetPositionZ = pressAmount;
            this._renderRequest();
        };

        /**
         * Unpress board piece
         * @method unpress
         */
        BoardPiece.prototype.unpress = function () {

            cancelAnimationFrame(this.renderId);
            this.targetPositionZ = 0;
            this._renderRequest();
        };

        /**
         * Animate current piece
         * @method animate
         */
        BoardPiece.prototype.animate = function (delay) {

            var bp = this;
            setTimeout(function () {

                bp.press();
                setTimeout(function () {
                    bp.unpress();
                }, 800);
            }, delay);
        };

        /**
         * Return matrix index of this piece
         * @method getMatrixIndexes
         */
        BoardPiece.prototype.getMatrixIndexes = function () {

            var r = this.pb.row, c = this.pb.column;
            var pindex = this.pindex;
            var pi = Math.floor(pindex / c), pj = pindex % c;
            return [pi, pj];
        };

        return BoardPiece;

    });
