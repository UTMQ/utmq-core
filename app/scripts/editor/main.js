angular.module('UTMQViewerApp')
  .service('EditorService', function EditorService() {


    var init = function () {
      console.log('EditorService init');
      // TODO: unwindow this.
      org = {
        mathdox: {
          formulaeditor: {
            options: {
              debug: true,
              dragPalette: false,
              paletteShow: "none",
              useBar: true
            }
          }
        }
      };

      var baseurl = "";
      var lastadded;

      var scripts = document.getElementsByTagName("script");
      lastadded = scripts[scripts.length - 1];

      var addScript = function (url) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = baseurl + url;
        script.charset = "utf-8";
        lastadded.parentNode.insertBefore(script, lastadded.nextSibling);
        lastadded = script;
      };

      addScript("scripts/editor/FEConcatenation.js");


    };

    return {
      init: init
    }
  });
