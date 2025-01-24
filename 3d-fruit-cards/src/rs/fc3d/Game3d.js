/**
 * @author  raizensoft.com
 */
define([
        'rs/three/BaseApp',
        'rs/utils/ObjectUtil',
        'rs/utils/BrowserUtil',
        'rs/game3d/Firework3DSet',
        'rs/fc3d/Game3dState',
        'rs/fc3d/GameLight',
        'rs/fc3d/Game3dContainer'],

    function (
        BaseApp,
        ObjectUtil,
        BrowserUtil,
        Firework3DSet,
        Game3dState,
        GameLight,
        Game3dContainer) {

        "use strict";

        Game3d.prototype = Object.create(BaseApp.prototype);
        Game3d.prototype.constructor = Game3d;

        /**
         * Main game components
         * @class Game3d
         * @constructor
         */
        function Game3d(gs) {

            this.gs = gs;
            this.config = gs.config;
            this.fc3d = gs.fc3d;
            this.dopt = this.fc3d.defaultOptions;
            this.am = this.fc3d.assetManager;

            // Default dimension
            var w = 500, h = 300;
            BaseApp.prototype.constructor.call(this, w, h);
            this.setCameraMatchProjection();

            // Default cursor
            this.defaultCursor = 'auto';

            // Build basic threejs components
            this.buildScene();
            //this.enableOrbitControl();
        }

        /**
         * Enable orbit controls
         * @method enableOrbitControl
         */
        Game3d.prototype.enableOrbitControl = function () {

            this.controls = new OrbitControls(this.camera, this.el);
            this.controls.enableDamping = true;
        };

        /**
         * Build scene
         * @method buildScene
         */
        Game3d.prototype.buildScene = function () {

            // Parent container for all items
            this.container = new Game3dContainer(this);

            this.clock = new THREE.Clock();

            // Add game container
            var scene = this.scene;
            scene.add(this.container);

            var am = this.am;

            // Init firework collection
            this.f3ds = new Firework3DSet(this,
                {
                    numParticles: 3,
                    callback: function () {
                        am.firework.play();
                    }
                });
            scene.add(this.f3ds);
            //scene.background = new THREE.Color( "" );

            // Intial game state
            this.setRunningState();

            // Setup raycasting
            this._setUpRaycaster();

            // Force resizing upon building scene
            this.resizeHandler();
        };

        /**
         * Setup raycasting
         * @method _setUpRaycast
         * @private
         */
        Game3d.prototype._setUpRaycaster = function () {

            var camera = this.camera;
            var raycaster = this.raycaster;
            var container = this.container;
            var el = this.el;
            var am = this.fc3d.assetManager;

            var gal = this;
            var cb = this.container.cardBoard;
            var gs = this.gs;

            function doRaycast(e) {

                var mouse = {
                    x: (e.offsetX / gal.width) * 2 - 1,
                    y: -(e.offsetY / gal.height) * 2 + 1,
                };
                raycaster.setFromCamera(mouse, camera);

                // Compute intersections
                var intersects = raycaster.intersectObjects(container.children, true);

                for (var i = 0; i < intersects.length; i++) {

                    var item = intersects[i].object;

                    // Click handler
                    if (e.type == 'mousedown') {

                        if (item.parent.index !== undefined) {

                            if (cb.cycleCount < 2) {

                                if (item.parent.side == 0) return;
                                am.shuffleend.play();
                                item.parent.flip();

                                // Count moveBtn
                                gs.header.moveBtn.doCount();

                                // Check card index matching
                                if (cb.cycleCount == 1) {

                                    cb.cycleCount = 2;
                                    if (cb.currentItem.cardIndex !== item.parent.cardIndex) {

                                        setTimeout(function () {

                                            cb.cycleCount = 0;
                                            cb.currentItem.flipBack();
                                            item.parent.flipBack();
                                        }, 1000);
                                    } else {

                                        setTimeout(function () {

                                            am.wintune.play();
                                            cb.cycleCount = 0;
                                            cb.currentItem.matchTransition();
                                            item.parent.matchTransition();
                                            cb.checkMatchCount();
                                        }, 300);
                                    }
                                } else {

                                    cb.cycleCount++;
                                    cb.currentItem = item.parent;
                                }
                            }
                        }
                    }
                    // Mouse over out handler
                    if (e.type == 'mousemove') {
                        el.style.cursor = 'pointer';
                        //item.overHandler.call(this, e);
                    }
                    break;

                    /*
                    - object : intersected object (THREE.Mesh)
                    - distance : distance from camera to intersection (number)
                    - face : intersected face (THREE.Face3)
                    - faceIndex : intersected face index (number)
                    - point : intersection point (THREE.Vector3)
                    - uv : intersection point in the object's UV coordinates (THREE.Vector2)
                    */
                }

                if (intersects.length == 0 && e.type == 'mousemove') {
                    el.style.cursor = gal.defaultCursor;
                }
            }

            // Mouse click, over, out
            el.addEventListener('mousedown', doRaycast);

            // Check mousemove to determine over and out status
            el.addEventListener('mousemove', doRaycast);
        };

        /**
         * Start a new game with specific grid dimension
         * @method newGame
         */
        Game3d.prototype.newGame = function (category, grid, callback) {

            this.setRunningState();
            var g3d = this;

            this.container.visible = false;
            this.container.cardBoard.newGame(category, grid, function () {
                g3d.container.show();
                callback.call(g3d);
            });
        };

        /**
         * Override _renderRequest
         * @method _renderRequest
         */
        Game3d.prototype._renderRequest = function () {

            BaseApp.prototype._renderRequest.call(this);
            var delta = this.clock.getDelta();
            if (this.controls)
                this.controls.update();

            this.container.glight.animate();
            if (this.state == Game3dState.WON) {
                this.f3ds.update(delta);
            }
        };

        /**
         * Set current state to running
         * @method setRunningState
         */
        Game3d.prototype.setRunningState = function () {

            this.state = Game3dState.RUNNING;
            this.f3ds.visible = false;
        };

        /**
         * Test running state
         * @method isRunningState
         */
        Game3d.prototype.isRunningState = function () {
            return (this.state == Game3dState.RUNNING);
        };

        /**
         * Set current state to won
         * @method setWonState
         */
        Game3d.prototype.setWonState = function () {

            this.state = Game3dState.WON;

            // Show firework
            this.f3ds.visible = true;
            this.f3ds.reset();

            // Setup UI
            this.gs.header.timeBtn.pause();
            this.gs.header.hide();
            this.gs.showWonBar('LEVEL PASSED');
            this.am.wintune.play();
        };

        /**
         * Resize game
         * @method resize
         */
        Game3d.prototype.resize = function (rw, rh) {

            this.width = rw;
            this.height = rh;
            this.camera.aspect = rw / rh;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(rw, rh);
            this.resizeHandler();
            this.container.fitGameBoard();
            this.f3ds.changeRegion(rw, rh);
        };

        Game3d.prototype.getResponsiveZPosition = function () {

            var w = window.innerWidth, h = window.innerHeight;
            var d = this.dopt;
            var bp = BrowserUtil.bp;
            var s = ['XS', 'SM', 'MD', 'LG', 'XL'];
            for (var i = s.length - 1; i >= 0; i--)
                if (w >= bp[s[i]]) break;
            var tz = d.responsive[s[i]];
            return tz;
        };

        /**
         * Override resizeHandler
         * @method resizeHandler
         */
        Game3d.prototype.resizeHandler = function (e) {

            BaseApp.prototype.resizeHandler.call(this);
            this.setCameraMatchProjection();
        };

        /**
         * Show this element
         * @method show
         */
        Game3d.prototype.show = function () {
            this.el.style.display = 'block';
        };

        /**
         * Hide this element
         * @method hide
         */
        Game3d.prototype.hide = function () {
            this.el.style.display = 'none';
        };

        /**
         * Destroy the game component and save resoureces
         * @method destroy
         */
        Game3d.prototype.destroy = function () {

        };

        return Game3d;

    });
