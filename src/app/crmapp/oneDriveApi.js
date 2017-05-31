
var CRMOneDrive = function () {
    self = this;
    self.crmsession;
    self.settings = {
        sessionType: 1, // Session type 1 = CRMSalzgitter app, 2 = User defined session,
        onLogingComplete: undefined
    };




    self.getSession = function () {
        return self.crmsession;
    }

    self.noCRMOutlookLogin = function(aid) {
        WL.logout();
        MostrarNotificaciones(self.settings.$alert, 'CRMSalzgitter OneDrive', 'Please enter credential to CRMSalzgitter OneDrive: Id ' + aid + ' outlook ' + outlookId, 'warning');
    }

    self.login = function (aoptions) {
        $.extend(self.settings, aoptions);



        WL.init({ client_id: clientId, redirect_uri: redirectUri });




        WL.login({ "scope": "wl.skydrive wl.skydrive_update " }).then(
            function (response) {

                WL.api({
                    path: "me",
                    method: "GET"
                }, function (responseme) {
                    var r = responseme;
                    if (responseme.id == outlookId) {
                        self.crmsession = response.session;
                        if (self.settings.onLogingComplete) {
                            self.settings.onLogingComplete(response);
                        }
                    } else {
                        self.noCRMOutlookLogin(responseme.id);
                    }
                });



            },
            function (response) {
                log("Could not connect, status = " + response.status);
            }
        );

    }

    self.downloadFile = function (fName, $alert) {
        self.login({
            onLogingComplete: function (alogin) {
                WL.download({
                    path: fName + '/content'
                }).then(
                          function (response) {
                              // Will not be called for web apps.
                          },
                          function (responseFailed) {
                              MostrarNotificaciones($alert, 'Download File', "Error downloading file: " + responseFailed.error.message, 'error');

                          }
                  );

            }
        });
    }
    

    self.deleteDocument = function (fName, $alert) {
        self.login({
            onLogingComplete: function (alogin) {
                WL.api({
                    path: fName,
                    method: "DELETE"
                }).then(
               function (response) {

                   MostrarNotificaciones($alert, 'Deleting File', "File have been deleted", 'success');
               },
               function (responseFailed) {
                   MostrarNotificaciones($alert, 'Deleting File', "Error deleting the file", 'error');
               }
                );

            }
        });
    }
}

var crmOneDrive = new CRMOneDrive();
