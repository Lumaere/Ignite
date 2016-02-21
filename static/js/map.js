var map, dialog, mp;

  require([
    "esri/map", 
    "esri/dijit/Popup",
    "esri/dijit/PopupTemplate",
    "esri/layers/FeatureLayer", 
    "esri/tasks/query",
    "esri/TimeExtent",
    "esri/symbols/SimpleFillSymbol", 
    "esri/symbols/SimpleLineSymbol", 
    "esri/renderers/SimpleRenderer", 
    "esri/graphic", 
    "esri/lang",
    "esri/Color", 
    "esri/geometry/webMercatorUtils",
    "dojo/_base/connect",
    "dojo/number", 
    "dojo/dom",
    "dojo/dom-style", 
    "dojo/dom-class",
    "dojo/dom-construct",
    "dijit/TooltipDialog", 
    "dijit/popup", 
    "dojo/domReady!"
  ], 

  function(
    Map, 
    Popup,
    PopupTemplate,
    FeatureLayer, 
    query,
    TimeExtent,
    SimpleFillSymbol, 
    SimpleLineSymbol,
    SimpleRenderer, 
    Graphic, 
    esriLang,
    Color,
    webMercatorUtils,
    connect,
    number, 
    dom,
    domStyle, 
    domClass,
    domConstruct,
    TooltipDialog, 
    dijitPopup
  ) {

    map = new Map("mapDiv", {
      basemap: "dark-gray",
      center: [-80.94, 33.646],
      zoom: 3,
      slider: true,
      isDoubleClickZoom: true
    });

    var states_url = "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/5";
    var nation_url = "http://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Countries_(Generalized)/FeatureServer/0";

    var states = new FeatureLayer(states_url, {
      mode: FeatureLayer.MODE_ONDEMAND,
      outFields: ["*"]
    });

    var nation = new FeatureLayer(nation_url, {
      mode: FeatureLayer.MODE_ONDEMAND,
      outFields: ["*"]
    });


    var symbol = new SimpleFillSymbol(
      SimpleFillSymbol.STYLE_SOLID, 
      new SimpleLineSymbol(
        SimpleLineSymbol.STYLE_SOLID, 
        new Color([255,255,255,0.00]), 1
      ),
      new Color([125,125,125,0.00])
    );

    var highlightSymbol = new SimpleFillSymbol(
      SimpleFillSymbol.STYLE_SOLID, 
      new SimpleLineSymbol(
        SimpleLineSymbol.STYLE_SOLID, 
        new Color([255,0,143]), 3
      ), 
      new Color([125,125,125,0.35])
    );

    states.setRenderer(new SimpleRenderer(symbol));
    nation.setRenderer(new SimpleRenderer(symbol));

    var popup = new Popup({
      fillSymbol: highlightSymbol,
      titleInBody: false,
      offsetX: 0,
      offsetY: 0
    }, domConstruct.create("div"));
    domClass.add(popup.domNode, "dark");

    var template = new PopupTemplate({
      title: "{STATE_NAME}",
      description: "Pop: {POP2007}"
    })
    map.infoWindow = popup;
    states.infoTemplate = template;



    var nationTemplate = new PopupTemplate({
      title: "{Country}"
    })
    nation.infoTemplate = nationTemplate;

    var nationOn = true;
    // map.addLayer(states);
    map.addLayer(nation);

    // connect.connect(map.infoWindow, "onMaximize", function() {
    //   console.log("popup Maximized");
    // });

    //close the dialog when the mouse leaves the highlight graphic
    map.on("load", function(){
      map.graphics.enableMouseEvents();
      map.graphics.on("mouse-out", closeDialog);
      map.on("mouse-up", updateLeaderboard);
      map.on("mouse-move", showCoordinates);
      // map.on("mouse-drag", showCoordinates);
    });

    map.on("zoom-end", function() {
      if(map.getZoom() >= 5) {
        if(nationOn) {
          map.removeLayer(nation);
          map.addLayer(states);
          nationOn = false;
        }
      }
      else {
        if(!nationOn) {
          map.removeLayer(states);
          map.addLayer(nation);
          nationOn = true;
        }
      }
    });
            
    //listen for when the onMouseOver event fires on the countiesGraphicsLayer
    //when fired, create a new graphic with the geometry from the event.graphic and add it to the maps graphics layer
    states.on("mouse-over", function(evt){
      var highlightGraphic = new Graphic(evt.graphic.geometry,highlightSymbol);
      map.graphics.add(highlightGraphic);
      
    });

    nation.on("mouse-over", function(evt){
      var highlightGraphic = new Graphic(evt.graphic.geometry,highlightSymbol);
      map.graphics.add(highlightGraphic);
    });


    function isClose(val) {
      // console.log(Math.max(5, 10));
      var dist = Math.pow(val["location"][0] - mp.y, 2) + Math.pow(val["location"][1] - mp.x, 2); 
      return dist <= Math.max(10 - map.getZoom(), 2);
    }


    function updateLeaderboard(evt) {
      // var minPerson = {}, min = 1e9;
      // console.log(mp.x, mp.y);
      var closePeps = data.filter(isClose);

      console.log(closePeps);
    }


    function showCoordinates(evt) {
      mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
    }


    function closeDialog() {
      map.graphics.clear();
      dijitPopup.close(dialog);
    }

  });
