/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const MapView = require('sf-core/ui/mapview');
const Color = require('sf-core/ui/color');
const Image = require('sf-core/ui/image');
const Application = require('sf-core/application');
const Router = require("sf-core/ui/router");
const Providers_mapDesign = require('ui/ui_providers_map');

const Providers_map = extend(Providers_mapDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

    this.listButton.onTouchEnded = ()=> Router.goBack();
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
  
  var myDataSet = [
         {
            label1: 'Smart Pharmacy',
            label2: 'Pharmacy',
            label3: '0.7 miles',
            icon: Image.createFromFile("images://map_icon1.png",150, 150),
            location: {
                  latitude: 37.455,
                  longitude: -122.1600047
              }
        },
        {
            label1: 'John Smart M.D.',
            label2: 'Doctor',
            label3: '1.2 miles',
            icon: Image.createFromFile("images://map_icon2.png",150, 150),
            location: {
                  latitude: 37.4488559,
                  longitude: -122.1630047
              }
        },
         {
            label1: 'Smart Hospital',
            label2: 'Hospital',
            label3: '5.2 miles',
            icon: Image.createFromFile("images://map_icon3.png", 150,  150),
            location: {
                  latitude: 37.4488759,
                  longitude: -122.1550047
              }
        },
    ];
    
  page.mapView1.onCreate = () => {
        page.mapView1.centerLocation = {
            latitude: 37.4488259,
            longitude: -122.1600047
        };
        
        page.mapView1.zoomLevel = 13;
        
        myDataSet.forEach(data=>{
          const myPin = new MapView.Pin({
              location: data.location,
              image: data.icon,
              title: data.label1,
              color: Color.RED,
              onPress: function() {
                  Application.call("geo:" + myPin.location.latitude + ',' + myPin.location.longitude, {
                      'hl': 'en',
                  });
              }
          });
          page.mapView1.addPin(myPin);
        });
   }  
}

module && (module.exports = Providers_map);