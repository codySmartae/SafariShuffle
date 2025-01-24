/**
 * @author  raizensoft.com
 */
define(
    function () {

        "use strict";

        var SOUNDS_PATH = 'assets/sounds';
        var GRAPHICS_PATH = 'assets/graphics';
        var DATA_PATH = 'data';

        /**
         * Central asset manager objec
         * @class AssetManager
         * @constructor
         */
        function AssetManager(fc3d) {

            this.fc3d = fc3d;
            this.init();
        }

        /**
         * Init sub components
         * @method init
         */
        AssetManager.prototype.init = function () {

            // Init LoadingManager
            var lm = this.loadingManager = new THREE.LoadingManager();
            var am = this;
            lm.onLoad = function () {

                am.loaded = true;

                console.log('Assets loaded');
                if (am.onLoad)
                    am.onLoad.call(am);
            };
            lm.onProgress = function (url, loaded, total) {
                if (am.onProgress)
                    am.onProgress.call(am, url, loaded, total);
            };
            this.soundOn = true;
        };

        /**
         * Start loading assets
         * @method load
         */
        AssetManager.prototype.load = function () {

            this.loadAudio();
            this.loadTextures();
        };

        /**
         * Load audio facility
         * @method loadAudio
         */
        AssetManager.prototype.loadAudio = function () {

            var am = this;
            var c = this.fc3d.config;

            // Audio
            var listener = new THREE.AudioListener();

            function loadAudio(src, callback) {

                var au = new THREE.Audio(listener);
                var audioLoader = new THREE.AudioLoader(am.loadingManager);
                audioLoader.load(src, function (buffer) {
                    au.setBuffer(buffer);
                    if (callback)
                        callback.call(am);
                });
                return au;
            }

            // Background
            if (c.general.useBackgroundMusic)
                this.bgSound = loadAudio(SOUNDS_PATH + '/bg.mp3', function () {
                    this.bgSound.setVolume(0.5);
                    this.bgSound.setLoop(true);
                });

            // btnClick sound
            this.btnClick = loadAudio(SOUNDS_PATH + '/btnClick.mp3');

            // Firework
            this.firework = loadAudio(SOUNDS_PATH + '/firework.mp3');

            // Win tune
            this.wintune = loadAudio(SOUNDS_PATH + '/wintune.mp3');

            // Shuffle
            this.shufflestart = loadAudio(SOUNDS_PATH + '/shufflestart.mp3');

            this.shuffleend = loadAudio(SOUNDS_PATH + '/shuffleend.mp3');
        };

        /**
         * Load app textures
         * @method loadTextures
         */
        AssetManager.prototype.loadTextures = function () {

            var d = this.fc3d.defaultOptions;
            var am = this;

            // Board textures
            var texList = this.fc3d.config.general.cardTextures;
            this.cardTextures = [];

            function loadCardTexture(path) {

                var cardLoader = new THREE.TextureLoader(am.loadingManager);
                cardLoader.load(GRAPHICS_PATH + '/' + path, function (tex) {
                    am.cardTextures.push(tex);
                });
            }

            for (var i = 0; i < texList.length; i++) {
                loadCardTexture(texList[i]);
            }

            // Firework texture
            var fwl = new THREE.TextureLoader(am.loadingManager);
            fwl.load(GRAPHICS_PATH + '/' + 'lensflare.png', function (tex) {
                am.fwTexture = tex;
            });
        };

        /**
         * Toggle sound
         * @method toggleSound
         */
        AssetManager.prototype.toggleSound = function () {

            this.soundOn = !this.soundOn;

            if (this.soundOn) {

                if (this.bgSound) this.bgSound.setVolume(0.8);
                this.btnClick.setVolume(0.8);
                this.firework.setVolume(1);
                this.wintune.setVolume(1);
                this.shufflestart.setVolume(1);
                this.shuffleend.setVolume(1);
            } else {

                if (this.bgSound) this.bgSound.setVolume(0);
                this.btnClick.setVolume(0);
                this.firework.setVolume(0);
                this.wintune.setVolume(0);
                this.shufflestart.setVolume(0);
                this.shuffleend.setVolume(0);
            }
        };

        return AssetManager;

    });
