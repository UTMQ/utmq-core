angular.module('UTMQViewerApp')
  .service('EditorService', function EditorService() {

    org = { mathdox:{formulaeditor:{options:{dragPalette:false, paletteShow: "none", useBar:true}}}};
    var baseurl = "";
    var lastadded;

    var scripts = document.getElementsByTagName("script");
    lastadded = scripts[scripts.length - 1];

    var addScript = function(url) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = baseurl + url;
      script.charset = "utf-8";
      lastadded.parentNode.insertBefore(script, lastadded.nextSibling);
      lastadded = script;
    };

    addScript("scripts/editor/FEConcatenation.js");


    return {
    };
  });
