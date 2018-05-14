/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const MapView = require('sf-core/ui/mapview');
const Color = require('sf-core/ui/color');
const Image = require('sf-core/ui/image');
const Router = require("sf-core/ui/router");
const Common = require("../lib/common");
const ProviderDesign = require('ui/ui_provider');

const Provider = extend(ProviderDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    
    this.button1.onPress = () => Common.callPhone(901234567890);
    this.backButton.onTouchEnded = ()=> Router.goBack();
  });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
  superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  superOnLoad();
  renderMap(this);
}

const renderMap = (page) => {
  const mapView1 = page.mapView1;
  mapView1.onCreate = () => {
      mapView1.centerLocation = {
          latitude: 37.4488259,
          longitude: -122.1600047
      };
      
      mapView1.touchEnabled = false;
      mapView1.rotateEnabled = false;
      
      mapView1.zoomLevel = 13;
        const myPin = new MapView.Pin({
            location:{
                latitude: 37.4488259,
                longitude: -122.1600047
            },
            image: Image.createFromFile("images://map_pin.png",150, 150),
        });
      mapView1.addPin(myPin);
   }  
}

module && (module.exports = Provider);