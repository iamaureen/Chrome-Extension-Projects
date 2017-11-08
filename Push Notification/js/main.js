{

/* ========================
  Variables
======================== */

const FIREBASE_AUTH = firebase.auth();
const FIREBASE_MESSAGING = firebase.messaging();
const FIREBASE_DATABASE = firebase.database();

const signInButton = document.getElementById('sign-in');
const signOutButton = document.getElementById('sign-out');
const subscribeButton = document.getElementById('subscribe');
const unsubscribeButton = document.getElementById('unsubscribe');
const sendNotificationForm = document.getElementById('send-notification-form');
const getDataButton = document.getElementById('getDB');

/* ========================
  Event Listeners
======================== */

FIREBASE_AUTH.onAuthStateChanged(handleAuthStateChanged);
FIREBASE_MESSAGING.onTokenRefresh(handleTokenRefresh);

signInButton.addEventListener("click", signIn);
signOutButton.addEventListener("click", signOut);
subscribeButton.addEventListener("click", subscribeToNotifications);
unsubscribeButton.addEventListener("click", unsubscribeFromNotifications);
sendNotificationForm.addEventListener("submit", sendNotification);
getDataButton.addEventListener("click", getDataList);

/* ========================
  Functions
======================== */

function handleAuthStateChanged(user) {

  if (user) {
    console.log(user)
    // User is signed in
    signInButton.setAttribute("hidden", "true");
    signOutButton.removeAttribute("hidden");
    sendNotificationForm.removeAttribute("hidden");

    checkSubscription();
  } else {
    // User is not signed in
    console.log("user is not signed in");
    signOutButton.setAttribute("hidden", "true");
    signInButton.removeAttribute("hidden");
    sendNotificationForm.setAttribute("hidden", "true");
  }
}

function signIn() {
  FIREBASE_AUTH.signInWithPopup(new firebase.auth.GoogleAuthProvider());
}

function signOut() {
  FIREBASE_AUTH.signOut();
}

function handleTokenRefresh() {
  return FIREBASE_MESSAGING.getToken().then((token) => {
    console.log(token)
    console.log(FIREBASE_AUTH.currentUser.displayName)
    FIREBASE_DATABASE.ref('/tokens').push({
      token: token,
      username: FIREBASE_AUTH.currentUser.displayName,
      uid: FIREBASE_AUTH.currentUser.uid
    });
  });
}

//check if a user is subscribed or not
//if the user is subscribed, the subscribe button will be hidden,
//else unsubscribe button will be shown
function checkSubscription() {
  FIREBASE_DATABASE.ref('/tokens').orderByChild("uid").equalTo(FIREBASE_AUTH.currentUser.uid).once('value').then((snapshot) => {

    if ( snapshot.val() ) {
      subscribeButton.setAttribute("hidden", "true");
      unsubscribeButton.removeAttribute("hidden");
    } else {
      unsubscribeButton.setAttribute("hidden", "true");
      subscribeButton.removeAttribute("hidden");
    }
  });
}

function subscribeToNotifications() {
  //request users' permission,
  //<allow clicked> when we have the users' permission, get the token
  //once we have token, save it to database

  FIREBASE_MESSAGING.requestPermission()
    .then(() => handleTokenRefresh())
    .then(() => checkSubscription())
    .catch((err) => {
      console.log("error getting permission :(");
    });
}

function unsubscribeFromNotifications() {
  //steps
  //get the token
  //delete the token
  //delete the token from the database
  FIREBASE_MESSAGING.getToken()
    .then((token) => FIREBASE_MESSAGING.deleteToken(token))
    .then(() => FIREBASE_DATABASE.ref('/tokens').orderByChild("uid").equalTo(FIREBASE_AUTH.currentUser.uid).once('value'))
    .then((snapshot) => {
      console.log("token value :: ",snapshot.val())
      const key = Object.keys(snapshot.val())[0];
      return FIREBASE_DATABASE.ref('/tokens').child(key).remove();
    })
    .then(() => checkSubscription())
    .catch((err) => {
      console.log("error deleting token :(");
    });
}

function sendNotification(e) {
  e.preventDefault();

  const notificationMessage = document.getElementById('notification-message').value;
  if ( !notificationMessage ) return;

  FIREBASE_DATABASE.ref('/notifications')
    .push({
      user: FIREBASE_AUTH.currentUser.displayName,
      message: notificationMessage,
      userProfileImg: FIREBASE_AUTH.currentUser.photoURL
    })
    .then(() => {
      document.getElementById('notification-message').value = "";
    })
    .catch(() => {
      console.log("error sending notification :(")
    });
}

  //get data from database
  function getDataList(){
    console.log('button clicked')
    FIREBASE_DATABASE.ref('/notifications').once('value')
    .then(function (snap) {
      data = snap.val()
      for(let key in data){
        console.log(data[key].message)
      }

   });
  }
}
