/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const InfoDesign = require('ui/ui_info');

const Info = extend(InfoDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

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
  renderUI(this);
}

const renderUI = (page)=>{
   page.title.text = lang['infoPage']['title'];
   page.informationLibraryTitle.text = lang['infoPage']['informationLibraryTitle'];
   page.callUsTitle.text = lang['infoPage']['callUsTitle'];
   page.sendMessageTitle.text = lang['infoPage']['sendMessageTitle'];
   page.rememberMeTitle.text = lang['infoPage']['rememberMeTitle'];
   page.fingerprintTitle.text = lang['infoPage']['fingerprintTitle'];
   page.notificationsTitle.text = lang['infoPage']['notificationsTitle'];
}
module && (module.exports = Info);