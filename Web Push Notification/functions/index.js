const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


//function to send notifications
exports.sendNotifications = functions.database.ref('/notifications/{notificationId}').onWrite((event) => {

  // Exit if data already created
  if (event.data.previous.val()) {
    return;
  }

  // Exit when the data is deleted
  if (!event.data.exists()) {
    return;
  }

  // Setup notification
  const NOTIFICATION_SNAPSHOT = event.data;
  const payload = {
    notification: {
      title: `New Message from ${NOTIFICATION_SNAPSHOT.val().user}!`,
      body: NOTIFICATION_SNAPSHOT.val().message,
      icon: NOTIFICATION_SNAPSHOT.val().userProfileImg,
      click_action: `https://${functions.config().firebase.authDomain}`
    }
  }

  // Clean invalid tokens
  function cleanInvalidTokens(tokensWithKey, results) {

    const invalidTokens = [];

    results.forEach((result, i) => {
      if ( !result.error ) return;

      console.error('Failure sending notification to', tokensWithKey[i].token, result.error);

      switch(result.error.code) {
        case "messaging/invalid-registration-token":
        case "messaging/registration-token-not-registered":
          invalidTokens.push( admin.database().ref('/tokens').child(tokensWithKey[i].key).remove() );
          break;
        default:
          break;
      }
    });

    return Promise.all(invalidTokens);
  }


  return admin.database().ref('/tokens').once('value').then((data) => {

    if ( !data.val() ) return;

    const snapshot = data.val();
    const tokensWithKey = [];
    const tokens = [];

    //get the tokens of the user who subscribed
    for (let key in snapshot) {
      tokens.push( snapshot[key].token );
      tokensWithKey.push({
        token: snapshot[key].token,
        key: key
      });
    }

    console.log("list of tokens :: ",tokens);

    //sends notifiction to different devices
    return admin.messaging().sendToDevice(tokens, payload)
          .then(function(response) {
          // See the MessagingDevicesResponse reference documentation for
          // the contents of response.
          console.log("Successfully sent message <maureen>:", response);
        })
      //.then((response) => cleanInvalidTokens(tokensWithKey, response.results))
      //.then(() => admin.database().ref('/notifications').child(NOTIFICATION_SNAPSHOT.key).remove())
  });


});
