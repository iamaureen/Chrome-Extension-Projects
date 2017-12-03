// TODO(DEVELOPER): Change the values below using values from the initialization snippet: Firebase Console > Overview > Add Firebase to your web app.
// Initialize Firebase
var config = {
   apiKey: "AIzaSyCZCs7PIno3eKWR1u-CR5Ua9AqPLPFwluw",
   authDomain: "tolc-b0fa5.firebaseapp.com",
   databaseURL: "https://tolc-b0fa5.firebaseio.com",
   projectId: "tolc-b0fa5",
   storageBucket: "tolc-b0fa5.appspot.com",
   messagingSenderId: "62715960283"
 };
firebase.initializeApp(config);


 var bookmark_div = document.getElementById("bookmark");

  var name;
 var url;
 var tags;

//final FirebaseDatabase database = FirebaseDatabase.getInstance();
//DatabaseReference ref = database.getReference("/tokens");

/**
 * initApp handles setting up the Firebase context and registering
 * callbacks for the auth status.
 *
 * The core initialization is in firebase.App - this is the glue class
 * which stores configuration. We provide an app name here to allow
 * distinguishing multiple app instances.
 *
 * This method also registers a listener with firebase.auth().onAuthStateChanged.
 * This listener is called when the user is signed in or out, and that
 * is where we update the UI.
 *
 * When signed in, we also authenticate to the Firebase Realtime Database.
 */
function initApp() {
  // Listen for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("works");

      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var refreshToken = user.refreshToken;
      var providerData = user.providerData;
      // [START_EXCLUDE]
      document.getElementById('quickstart-button').textContent = 'Sign out';
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';

    } else {
      // Let's try to get a Google auth token programmatically.
      // [START_EXCLUDE]
      document.getElementById('quickstart-button').textContent = 'Sign-in with Google';
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      document.getElementById('quickstart-account-details').textContent = 'null';
      // [END_EXCLUDE]
    }
    document.getElementById('quickstart-button').disabled = false;
  });
  // [END authstatelistener]

  document.getElementById('quickstart-button').addEventListener('click', startSignIn, false);

}

firebase.database().ref('/references').on('value', function(snapshot) {
  console.log(snapshot.val());
});

/**
 * Start the auth flow and authorizes to Firebase.
 * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
 */
function startAuth(interactive) {
  // Request an OAuth token from the Chrome Identity API.
  chrome.identity.getAuthToken({interactive: !!interactive}, function(token) {
    if (chrome.runtime.lastError && !interactive) {
      console.log('It was not possible to get a token programmatically.');
    } else if(chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else if (token) {
      // Authrorize Firebase with the OAuth Access Token.
      var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // The OAuth token might have been invalidated. Lets' remove it from cache.
        if (error.code === 'auth/invalid-credential') {
          chrome.identity.removeCachedAuthToken({token: token}, function() {
            startAuth(interactive);
          });
        }
      });
    } else {
      console.error('The OAuth Token was null');
    }
  });
}

/**
 * Starts the sign-in process.
 */
function startSignIn() {
  document.getElementById('quickstart-button').disabled = true;
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    startAuth(true);
  }
}


$('#closePopUp').click(function(event) {
window.close();
});

function setStatus(status) {
  document.getElementById("status").innerHTML = status;
}

function getURL() {

  chrome.runtime.getBackgroundPage(function(eventPage) {
          // Call the getPageInfo function in the background page, passing in
          // our onPageDetailsReceived function as the callback. This injects
          // content.js into the current tab's HTML
          eventPage.getPageDetails(onPageDetailsReceived);
      });
}

function onPageDetailsReceived(pageDetails)  {
    // document.getElementById('title').value = pageDetails.title;
    // document.getElementById('url').value = pageDetails.url;
    // document.getElementById('summary').innerText = pageDetails.summary;
    console.log(pageDetails.url)
    url = pageDetails.url;
    document.getElementById('url').value = pageDetails.url;
}


function addSource(event)
{
  event.preventDefault();
  document.getElementById("bookmark").removeAttribute("hidden");
}

function dontaddSource(event)
{
  event.preventDefault();
document.getElementById("bookmark").setAttribute("hidden", "true");
}

window.onload = function() {
    document.getElementById('addSource-button').addEventListener('click', addSource);
    document.getElementById('dontaddSource-button').addEventListener('click', dontaddSource);
     getURL();
  initApp();
};
