define(
    function () {

        "use strict";

        /**
         * @class ObjectUtil
         * @description Helper class with convenient method to handle common object functionalities
         *
         */
        var ObjectUtil = {

            /**
             * Perform deep merging. Target object get updated with properties from source object.
             * @method merge
             * @param {Object} source Source object
             * @param {Target} target Target object
             *
             */
            merge: function (source, target, overwrite) {

                for (var prop in source) {

                    if (Object.prototype.toString.call(source[prop]) === "[object Object]") {

                        if (target[prop] === undefined) target[prop] = {};
                        this.merge(source[prop], target[prop]);
                    } else {
                        //if (target[prop] === undefined) target[prop] = source[prop];
                        target[prop] = source[prop]; //TODO test
                    }
                }

                return target;
            },


            clone: function (object, deep) {

                var c = {};
                ObjectUtil.merge(object, c, deep);
                return c;
            },

            shuffleArray: function (array) {
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
        };

        return ObjectUtil;
    });
