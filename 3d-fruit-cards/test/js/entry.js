
// Setup baseUrl for source folder and library paths
requirejs.config({
  baseUrl:"../src/",
  paths:{
    libs:"../libs/"
  }
});

require(['rs/fc3d/FruitCard', 'libs/domReady'], 

  function(FruitCard, domReady) {

    "use strict";

    domReady(function() {

      var el = document.querySelector('.rs-fc3d');
      var fc3d = new FruitCard(el);
      window.fc3d = fc3d;
    });
  });
