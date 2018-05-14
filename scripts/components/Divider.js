/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const DividerDesign = require('library/Divider');

const Divider = extend(DividerDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || {});
    this.pageName = pageName;
  }

);

module && (module.exports = Divider);