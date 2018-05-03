/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const Header1Design = require('library/Header1');

const Header1 = extend(Header1Design)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || {});
    this.pageName = pageName;
  }

);

module && (module.exports = Header1);