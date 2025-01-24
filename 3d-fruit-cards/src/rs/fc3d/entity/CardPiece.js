/**
 * @author  raizensoft.com
 */
define(
    function () {

        "use strict";

        CardPiece.prototype = Object.create(THREE.Group.prototype);
        CardPiece.prototype.constructor = CardPiece;

        var HEIGHT = 20;
        var DEFAULT_COLOR = 0xffffff;

        /**
         * CardPiece entity
         * @class CardPiece
         * @constructor
         */
        function CardPiece(pb) {

            this.pb = pb;
            this.init();
        }

        /**
         * Init the piece
         * @method init
         */
        CardPiece.prototype.init = function () {

            THREE.Group.prototype.constructor.call(this);

            var am = this.pb.g3d.fc3d.assetManager;
            var d = this.pb.dopt;
            var w = d.cardWidth, h = d.cardHeight;

            var backMat = new THREE.MeshPhongMaterial({
                specular: 0x111111,
                color: DEFAULT_COLOR,
                emissive: 0x111111,
                side: THREE.FrontSide
            });

            var frontMat = new THREE.MeshPhongMaterial({
                specular: 0x0a0a0a,
                color: DEFAULT_COLOR,
                emissive: 0x333333,
                side: THREE.FrontSide
            });

            var mats;
            mats = [
                backMat,
                backMat,
                backMat,
                backMat,
                frontMat,
                backMat
            ];

            this.frontMat = frontMat;
            this.backMat = backMat;

            // Create mesh object
            this.mesh = new THREE.Mesh();
            this.mesh.material = mats;
            this.mesh.geometry = new THREE.BoxBufferGeometry(d.cardWidth, d.cardHeight, 4);
            this.add(this.mesh);

            // Build shadow mesh
            var shadowPath = 'shadow1.png';
            var stex = new THREE.TextureLoader().load('assets/textures/' + shadowPath);
            var scale = d.borderScale;
            var smesh = new THREE.Mesh(
                new THREE.PlaneGeometry(w * scale, h * scale),
                new THREE.MeshBasicMaterial({map: stex, side: THREE.DoubleSide, transparent: true}));
            this.add(smesh);
            this.side = 0;
        };

        /**
         * Set current piece color
         * @method setColor
         */
        CardPiece.prototype.setBackTexture = function (tex) {

            for (var i = 0; i < 5; i++) {
                if (i !== 4) {
                    this.mesh.material[i].map = tex;
                    this.mesh.material[i].needsUpdate = true;
                }
            }
        };

        /**
         * Set front texture for this piece
         * @method setTexture
         */
        CardPiece.prototype.setFrontTexture = function (tex) {

            this.mesh.material[4].map = tex;
            this.mesh.material[4].needsUpdate = true;
        };

        /**
         * Reset color of this piece
         * @method resetColor
         */
        CardPiece.prototype.resetColor = function () {

        };

        /**
         * Transition in
         * @method transitionIn
         */
        CardPiece.prototype.transitionIn = function (delay) {

            anime.remove(this.position);
            this.position.z = Math.random() * 500 + 800;
            anime({
                targets: this.position,
                z: HEIGHT,
                duration: 800,
                easing: 'easeOutQuad',
                delay: delay / 3.5
            });
        };

        /**
         * Flip current card
         * @method flip
         */
        CardPiece.prototype.flip = function () {

            this.side = 1 - this.side;
            anime.remove(this.rotation);
            anime({
                targets: this.rotation,
                y: Math.PI * this.side,
                easing: 'easeOutQuint',
                duration: 800
            });
        };

        /**
         * Flip to back
         * @method flipBack
         */
        CardPiece.prototype.flipBack = function (delay) {

            this.side = 1;
            delay = delay || 0;
            anime.remove(this.rotation);
            anime({
                targets: this.rotation,
                y: Math.PI,
                easing: 'easeOutQuint',
                delay: delay,
                duration: 800
            });
        };

        /**
         * Flip to front
         * @method flipFront
         */
        CardPiece.prototype.flipFront = function (delay) {

            this.side = 0;
            delay = delay || 0;
            anime.remove(this.rotation);
            anime({
                targets: this.rotation,
                y: 0,
                easing: 'easeOutQuint',
                duration: 800
            });
        };

        /**
         * Match transitioning
         * @method matchTransition
         */
        CardPiece.prototype.matchTransition = function () {

            anime.remove(this.position);
            anime({
                targets: this.position,
                y: 1400,
                easing: 'easeOutQuint',
                duration: 1200
            });
        };


        /**
         * Reset current data
         */
        CardPiece.prototype.reset = function () {

            anime.remove(this.position);
            anime.remove(this.rotation);
            this.rotation.y = 0;
            this.position.set(0, 0, 0);
        };

        return CardPiece;

    });
