/**
 * @author  raizensoft.com
 */
define(
    function () {

        "use strict";

        GameLight.prototype = Object.create(THREE.Group.prototype);
        GameLight.prototype.constructor = GameLight;

        var SPEED = 2;

        /**
         * Group of lights in the game
         * @class GameLights
         * @constructor
         */
        function GameLight(g3d) {

            this.g3d = g3d;
            this.dopt = g3d.dopt;
            this.speed = this.dopt.lightMovingSpeed;
            this.init();
        }

        /**
         * Init the light
         * @method init
         */
        GameLight.prototype.init = function () {

            THREE.Group.prototype.constructor.call(this);

            // Default bound values
            this.bound = [300, 400, 10];
            this.dirX = 1;
            var lights = this.lights = [];

            var intensity = 0.1;
            lights[0] = new THREE.PointLight(0xffffff, intensity, 0);
            lights[1] = new THREE.PointLight(0xffffff, intensity, 0);
            //lights[ 2 ] = new THREE.PointLight( 0xffffff, intensity, 0 );

            //lights[ 0 ].position.set( -200, 600, -400 );
            //lights[ 0 ].oZ = -400;

            lights[1].position.set(150, 200, 300);
            lights[1].oZ = 800,

                //lights[ 2 ].position.set( - 100, - 200, - 100 );

                //this.add( lights[ 0 ] );
                this.add(lights[1]);
            //this.add( lights[ 2 ] );

            var scene = this.g3d.scene;

            //var h1 = new THREE.PointLightHelper(lights[0], 5);
            var h2 = new THREE.PointLightHelper(lights[1], 20);
            //var h3 = new THREE.PointLightHelper(lights[2], 5);

            //scene.add(h1);
            //scene.add(h2);
            //this.add(h3);

            var ambientLight = new THREE.AmbientLight(this.dopt.ambientLight, 0.8);
            this.add(ambientLight);
        };

        /**
         * Move and animate lights
         * @method animate
         */
        GameLight.prototype.animate = function () {

            this.lights[1].position.x += this.dirX * this.speed;
            var lX = this.lights[1].position.x;
            if (lX > this.bound[0] * 0.5 || lX < -this.bound[0] * 0.5)
                this.dirX = -this.dirX;
        };

        /**
         * Transition light objects
         * @method transition
         */
        GameLight.prototype.transition = function () {

        };

        /**
         * Set boundary for light movements
         * @method setBound
         */
        GameLight.prototype.setBound = function (bound, shiftZ) {

            this.bound = bound;
            var l1 = this.lights[1];
            l1.position.set(bound[0] * 0.5, 0, l1.oZ);

            //var l0 = this.lights[0];
            //l0.position.set(0, -bound[1] * 0.5 - 50, -30);
        };

        return GameLight;

    });
