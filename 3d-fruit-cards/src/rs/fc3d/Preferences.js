/**
 * @author  raizensoft.com
 */
define(
    function () {

        "use strict";

        /**
         * Preferences
         * @class Preferences
         * @constructor
         */
        function Preferences(config, dataString) {

            this.dataString = dataString;
            this.config = config;
            this.init(dataString);
        }

        /**
         * Init preferences
         * @method init
         */
        Preferences.prototype.init = function (dataString) {

            if (dataString == null) {
                this.data = {
                    name: 'fc3d',
                    category: 0,
                    grid: '3x4'
                };
                this.save();
            } else {
                this.data = JSON.parse(dataString);
            }
        };

        /**
         * Save new data to local storage
         * @method save
         */
        Preferences.prototype.save = function () {

            if (this.data != null)
                localStorage.setItem("fc3d", JSON.stringify(this.data));
        };

        /**
         * Save default category
         * @method saveCategory
         */
        Preferences.prototype.saveCategory = function (catId) {

            this.data.category = catId;
            this.save();
        };

        return Preferences;

    });
