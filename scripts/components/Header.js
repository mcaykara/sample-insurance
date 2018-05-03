/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const HeaderDesign = require('library/Header');

const Header = extend(HeaderDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || {});
    this.pageName = pageName;
  }

);

module && (module.exports = Header);