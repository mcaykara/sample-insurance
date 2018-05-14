/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const LoginDesign = require('ui/ui_login');
const Color = require("sf-core/ui/color");
const Router = require("sf-core/ui/router");

const Login = extend(LoginDesign)(
    // Constructor
    function(_super) {
        // Initalizes super class for this page scope
        _super(this);
        // overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.loginButton.onPress = function() {
            Router.go("tabs");
        };
    });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
    superOnShow();
    this.headerBar.visible = false;
    
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
    page.layout.backgroundColor = Color.createGradient({
        direction: Color.GradientDirection.DIAGONAL_RIGHT,
        startColor: Color.create("#9F26EC"),
        endColor: Color.create("#547BFF")
    });

    page.usernameTextInput.text = lang['loginPage']['usernameInputHint'];
    page.passwordTextInput.text = lang['loginPage']['passwordInputHint'];

    page.usernameTextInput.onEditBegins = ()=> {
        if(page.usernameTextInput.text==lang['loginPage']['usernameInputHint']){
            page.usernameTextInput.text = "";
        }
    }
    
     page.usernameTextInput.onEditEnds = ()=> {
        if(page.usernameTextInput.text==""){
            page.usernameTextInput.text = lang['loginPage']['usernameInputHint'];
        }
     }
    
    page.passwordTextInput.onEditBegins = ()=> {
        if(page.passwordTextInput.text==lang['loginPage']['passwordInputHint']){
            page.passwordTextInput.text = "";
        }
    }
    
    page.passwordTextInput.onEditEnds = ()=> {
        if(page.passwordTextInput.text==""){
            page.passwordTextInput.text = lang['loginPage']['passwordInputHint'];
        }
    }
    
    page.title.text = lang['loginPage']['title'];
    page.loginButton.text = lang['loginPage']['loginButtonText'];
    page.forgotPasswordTitle.text = lang['loginPage']['forgotPasswordTitle'];
}

module && (module.exports = Login);
