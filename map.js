var map, dialog, query, queryTask, infoTemplate;

  require([
    "esri/map", 
    "esri/dijit/Popup",
    "esri/dijit/PopupTemplate",
    "esri/layers/FeatureLayer", 
    "esri/tasks/query",
    "esri/symbols/SimpleFillSymbol", 
    "esri/symbols/SimpleLineSymbol", 
    "esri/renderers/SimpleRenderer", 
    "esri/graphic", 
    "esri/lang",
    "esri/Color", 
    "dojo/_base/connect",
    "dojo/number", 
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
    SimpleFillSymbol, 
    SimpleLineSymbol,
    SimpleRenderer, 
    Graphic, 
    esriLang,
    Color,
    connect,
    number, 
    domStyle, 
    domClass,
    domConstruct,
    TooltipDialog, 
    dijitPopup
  ) {

    map = new Map("mapDiv", {
      basemap: "dark-gray",
      center: [-80.94, 33.646],
      zoom: 2,
      slider: true
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


    // map.addLayer(states);
    map.addLayer(nation);


    // connect.connect(map.infoWindow, "onMaximize", function() {
    //   console.log("popup Maximized");
    // });

    //close the dialog when the mouse leaves the highlight graphic
    map.on("load", function(){
      map.graphics.enableMouseEvents();
      map.graphics.on("mouse-out", closeDialog);
    });

    
            
    //listen for when the onMouseOver event fires on the countiesGraphicsLayer
    //when fired, create a new graphic with the geometry from the event.graphic and add it to the maps graphics layer
    // states.on("mouse-over", function(evt){
    //   var highlightGraphic = new Graphic(evt.graphic.geometry,highlightSymbol);
    //   map.graphics.add(highlightGraphic);
      
    // });

    nation.on("mouse-over", function(evt){
      var highlightGraphic = new Graphic(evt.graphic.geometry,highlightSymbol);
      map.graphics.add(highlightGraphic);
      
    });

    function closeDialog() {
      map.graphics.clear();
      dijitPopup.close(dialog);
    }

  });
