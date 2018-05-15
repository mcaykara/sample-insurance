/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const Router = require("sf-core/ui/router");
const Picker = require("sf-core/ui/picker");
const KeyboardType = require('sf-core/ui/keyboardtype');

const Provider_searchDesign = require('ui/ui_provider_search');

const Provider_search = extend(Provider_searchDesign)(
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

const renderUI = (page) => {
  page.title.text = lang['providerSearchPage']['title'];
  page.providerName.text = lang['providerSearchPage']['providerName'];
  page.providerKeywords.text = lang['providerSearchPage']['providerKeywords'];
  page.providerType.text = lang['providerSearchPage']['providerType'];
  page.distance.text = lang['providerSearchPage']['distance'];
  page.planTitle.text = lang['providerSearchPage']['planTitle'];
  page.distanceInput.keyboardType = KeyboardType.NUMBER;

  page.searchButton.onTouchEnded = () => Router.go('tabs/provider_search/providers');

  const items = [
    "item 1",
    "item 2",
    "item 3",
    "item 4",
    "item 5"
  ];

  const selectedItems = [];

  const myPicker = new Picker({
    items: items,
    currentIndex: 2
  });

  page.providerTypeInput.onEditBegins = () => {
    myPicker.show((params) => {
      selectedItems.push(items[params.index]);
      page.providerTypeInput.text = selectedItems.join(',');
    });
  }
}

module && (module.exports = Provider_search);
