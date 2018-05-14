const Application = require("sf-core/application");
const AlertView = require('sf-core/ui/alertview');
    
exports.checkAppUpdate = ()=>{
    //Checks if there is a valid update. If yes returns result object.    
    Application.checkUpdate(function(err, result) {
        if (err) {
            //Checking for update is failed
            //alert("check update error: " + err);
        }
        else {
            //Update is successful. We can show the meta info to inform our app user.
            if (result.meta) {
                var isMandatory = (result.meta.isMandatory && result.meta.isMandatory === true) ? true : false;
                var updateTitle = (result.meta.title) ? result.meta.title : 'A new update is ready!';
                var updateMessage = "Version " + result.newVersion + " is ready to install.\n\n" +
                    "What's new?:\n" + JSON.stringify(result.meta.update) +
                    "\n\n"
                //adding mandatory status  
                updateMessage += (isMandatory) ? "This update is mandatory!" : "Do you want to update?";
                //Function will run on users' approve
                function onFirstButtonPressed() {
                    if (result.meta.redirectURL && result.meta.redirectURL.length != 0) {
                        //RaU wants us to open a URL, most probably core/player updated and binary changed.
                        Application.call(result.meta.redirectURL);
                    }
                    else {
                        //There is an update waiting to be downloaded. Let's download it.
                        result.download(function(err, result) {
                            if (err) {
                                //Download failed
                                alert("Autoupdate download failed: " + err);
                            }
                            else {
                                //All files are received, we'll trigger an update.
                                result.updateAll(function(err) {
                                    if (err) {
                                        //Updating the app with downloaded files failed
                                        alert("Autoupdate update failed: " + err);
                                    }
                                    else {
                                        //After that the app will be restarted automatically to apply the new updates
                                        Application.restart();
                                    }
                                });
                            }
                        });
                    }
                }
                //We will do nothing on cancel for the timebeing.
                function onSecondButtonPressed() {
                    //do nothing
                }
                //if Update is mandatory we will show only Update now button.
                var myAlertView = new AlertView({
                    title: updateTitle,
                    message: updateMessage
                });

                myAlertView.addButton({
                    type: AlertView.Android.ButtonType.POSITIVE,
                    text: "Update now",
                    onClick: function() {
                        onFirstButtonPressed();
                    }
                });
                
                if (!isMandatory) {
                    myAlertView.addButton({
                        type: AlertView.Android.ButtonType.NEGATIVE,
                        text: "Later",
                        onClick: function() {
                            onSecondButtonPressed();
                        }
                    });
                }

                myAlertView.show();
            }
        }
    });
    
}

exports.callPhone = (phone)=>{
    Application.call(`tel:+${phone}`,{});
}