/* globals lang */
require("./theme");
require("i18n/i18n.js"); // Generates global lang object

const Application = require("sf-core/application");
const Router = require("sf-core/ui/router");
const TabBarItem = require("sf-core/ui/tabbaritem");
const Image = require("sf-core/ui/image");
const BottomTabBar = require("sf-core/ui/bottomtabbar");
const InstaBug = require("sf-plugin-instabug");
const Color = require("sf-core/ui/color");
const Navigator = require("sf-core/ui/navigator");
const Data = require('sf-core/data');
const componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");
const Notifications = require("sf-core/notifications");

Notifications.registerForPushNotifications(function(e) {
  Data.setStringVariable('pushToken', e.token);
}, function() {
  console.log("Register failed.");
});

Application.onReceivedNotification = function(e) {
  Router.go(e.remote.page);
}

if (!Data.getBooleanVariable('instaBugLoaded')) {
    InstaBug.build("3befcc60214c7d4f020f466763e1eed0", InstaBug.InvocationEvent.SHAKE);
    InstaBug.showIntroMessage();
    Data.setBooleanVariable('instaBugLoaded', true);
}

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function(e) {
    alert({
        title: lang.applicationError,
        message: e.message + "\n\n*" + e.sourceURL + "\n*" + e.line + "\n*" + e.stack
    });
};

// Define routes and go to initial page of application
const navigator = new Navigator();
navigator.add("login", "pages/login");
navigator.go("login");

global.tabBar = null;
global.tabBar = new BottomTabBar({
    backgroundColor: Color.create("#F8F8F8"),
    itemColor: { normal: Color.create(80, 0, 0, 0), selected: Color.create("#893EF1") }
});

global.tabBar.children = {};

const homeNavigator = new Navigator();
homeNavigator.add("index", "pages/home");
homeNavigator.go("index");
global.tabBar.children["home"] = new TabBarItem({
    title: lang["tabs"]["home"],
    icon: { normal: Image.createFromFile("images://home.png"), selected: Image.createFromFile("images://home.png") },
    route: homeNavigator
});

const myIDNavigator = new Navigator();
myIDNavigator.add("index", "pages/my_id");
myIDNavigator.go("index");
global.tabBar.children["my_id"] = new TabBarItem({
    title: lang["tabs"]["my_id"],
    icon: Image.createFromFile("images://my_id.png"),
    route: myIDNavigator
});

const claimsNavigator = new Navigator();
claimsNavigator.add("index", "pages/claims");
claimsNavigator.go("index");
global.tabBar.children["claims"] = new TabBarItem({
    title: lang["tabs"]["claims"],
    icon: Image.createFromFile("images://claims.png"),
    route: claimsNavigator
});

const providerSearchNavigator = new Navigator();
providerSearchNavigator.add("index", "pages/provider_search");
providerSearchNavigator.add("providers", "pages/providers");
providerSearchNavigator.add("providers_map", "pages/providers_map");
providerSearchNavigator.add("provider", "pages/provider");
providerSearchNavigator.go("index");
global.tabBar.children["provider_search"] = new TabBarItem({
    title: lang["tabs"]["providers"],
    icon: Image.createFromFile("images://providers.png"),
    route: providerSearchNavigator
});

const infoNavigator = new Navigator();
infoNavigator.add("index", "pages/info");
infoNavigator.add("library", "pages/library");
infoNavigator.go("index");
global.tabBar.children["info"] = new TabBarItem({
    title: lang["tabs"]["info"],
    icon: Image.createFromFile("images://info.png"),
    route: infoNavigator
});

componentContextPatch(global.tabBar, "bottomtabbar");

global.tabBar.add("home", global.tabBar.children["home"]);
global.tabBar.add("my_id", global.tabBar.children["my_id"]);
global.tabBar.add("claims", global.tabBar.children["claims"]);
global.tabBar.add("provider_search", global.tabBar.children["provider_search"]);
global.tabBar.add("info", global.tabBar.children["info"]);

global.tabBar.setIndex("home");

Router.add("tabs", global.tabBar);
Router.add("login", navigator);
Router.go("login");
