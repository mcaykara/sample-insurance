/* globals lang */
require("i18n/i18n.js"); // Generates global lang object

const Application = require("sf-core/application");
const Router = require("sf-core/ui/router");
const TabBarItem = require("sf-core/ui/tabbaritem");
const Image = require("sf-core/ui/image");
const BottomTabBar = require("sf-core/ui/bottomtabbar");

require("./theme");

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function(e) {
    alert({
        title: lang.applicationError,
        message: e.message + "\n\n*" + e.sourceURL + "\n*" + e.line + "\n*" + e.stack
    });
};

// Define routes and go to initial page of application
Router.add("login", require("./pages/login"), true);

var myTab = new BottomTabBar();

myTab.add('home', new TabBarItem({
    title:  lang["tabs"]["home"],
    icon: Image.createFromFile("images://home.png"),
    route: require('pages/home')
}));

myTab.add('my_id', new TabBarItem({
    title:  lang["tabs"]["my_id"],
    icon: Image.createFromFile("images://my_id.png"),
    route: require('pages/my_id')
}));

myTab.add('claims', new TabBarItem({
    title:  lang["tabs"]["claims"],
    icon: Image.createFromFile("images://claims.png"),
    route: require('pages/claims')
}));

myTab.add('provider_search', new TabBarItem({
    title:  lang["tabs"]["providers"],
    icon: Image.createFromFile("images://providers.png"),
    route: require('pages/provider_search')
}));

myTab.add('info', new TabBarItem({
    title: lang["tabs"]["info"],
    icon: Image.createFromFile("images://info.png"),
    route: require('pages/info')
}));

myTab.setIndex('home');
Router.add('tabs', myTab);

Router.go("tabs");
