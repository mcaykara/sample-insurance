/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const LoginDesign = require('ui/ui_login');
const Color = require("sf-core/ui/color");
const Router = require("sf-core/ui/router");
const Dialog = require("sf-core/ui/dialog");
const FlexLayout = require("sf-core/ui/flexlayout");
const System = require('sf-core/device/system');
const Common = require("../lib/common");
const View = require('sf-core/ui/view');
const ActivityIndicator = require('sf-core/ui/activityindicator');
const rau = require("sf-extension-utils").rau;
const Animator = require('sf-core/ui/animator');
const Button = require('sf-core/ui/button');
const Data = require('sf-core/data');
const fingerprint = require("sf-extension-utils").fingerprint;

const Login = extend(LoginDesign)(
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
    this.headerBar.visible = false;
    rau.checkUpdate();
    this.pushToken.text = Data.getStringVariable('pushToken');
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
    var animationRootView = page.layout;
    Animator.animate(animationRootView, 400, function() {

    }).complete(function() {

    });

    page.usernameTextInput.text = lang['loginPage']['usernameInputHint'];
    page.passwordTextInput.text = lang['loginPage']['passwordInputHint'];

    page.usernameTextInput.onEditBegins = () => {
        if (page.usernameTextInput.text == lang['loginPage']['usernameInputHint']) {
            page.usernameTextInput.text = "";
        }
    }

    page.usernameTextInput.onEditEnds = () => {
        if (page.usernameTextInput.text == "") {
            page.usernameTextInput.text = lang['loginPage']['usernameInputHint'];
        }
    }

    page.passwordTextInput.onEditBegins = () => {
        if (page.passwordTextInput.text == lang['loginPage']['passwordInputHint']) {
            page.passwordTextInput.text = "";
        }
    }

    page.passwordTextInput.onEditEnds = () => {
        if (page.passwordTextInput.text == "") {
            page.passwordTextInput.text = lang['loginPage']['passwordInputHint'];
        }
    }

    page.title.text = lang['loginPage']['title'];
    page.loginButton.text = lang['loginPage']['loginButtonText'];
    page.forgotPasswordTitle.text = lang['loginPage']['forgotPasswordTitle'];

    const loadingLayout = new FlexLayout({
        id: 999,
        alpha: 0.5,
        visible: false,
        touchEnabled: true,
        positionType: FlexLayout.PositionType.ABSOLUTE,
        top: System.OS === "Android" ? 10 : 23,
        right: 10
    });
    const myActivityIndicator = new ActivityIndicator({
        color: Color.WHITE,
        backgroundColor: Color.TRANSPARENT,
        touchEnabled: true,
        ios: {
            type: ActivityIndicator.iOS.Type.WHITE
        }
    });

    loadingLayout.addChild(myActivityIndicator);
    loadingLayout.justifyContent = FlexLayout.JustifyContent.CENTER;

    page.loginButtonLayout.addChild(loadingLayout);

    fingerprint.init({
        userNameTextBox: page.usernameTextInput,
        passwordTextBox: page.passwordTextInput,
        button: page.loginButton,
        autoEvents: true,
        callback: (err, fingerprintResult) => {
            fingerprintResult && fingerprintResult.success();
            setTimeout(() => {
                loadingLayout.visible = false;
                Router.go("tabs");
            }, 1500);
        }
    });

    page.title.onTouch = () => {
        page.usernameTextInput.text = "insurance";
        page.passwordTextInput.text = "123456";
    };

    page.loginButton.onPress = () => {
        loadingLayout.visible = true;
        fingerprint.loginWithFingerprint();
    }
}

module && (module.exports = Login);
