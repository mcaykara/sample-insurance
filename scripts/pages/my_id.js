/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const Share = require('sf-core/share');
const My_idDesign = require('ui/ui_my_id');

const My_id = extend(My_idDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
  
    this.share1.onTouchEnded = () => Share.shareText("Hello from Smartface", this, []);
    this.share2.onTouchEnded = () => Share.shareText("Hello from Smartface", this, []);
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
  page.title.text = lang['myIDPage']['title'];
  page.policyID1.text = lang['myIDPage']['policyID1'];
  page.policyID2.text = lang['myIDPage']['policyID2'];
  page.dependents.text = lang['myIDPage']['dependents'];
  page.effectiveDate1.text = lang['myIDPage']['effectiveDate1'];
  page.effectiveDate2.text = lang['myIDPage']['effectiveDate2'];
  page.expirationDate1.text = lang['myIDPage']['expirationDate1'];
  page.expirationDate2.text = lang['myIDPage']['expirationDate2'];
}

module && (module.exports = My_id);