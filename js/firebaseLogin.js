var provider = new firebase.auth.GoogleAuthProvider();
var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified, displayName;

// Login knop
$("#login-button").click(function () {
    login();
    console.log("login");
});

//Logout knop
$("#logout-button").click(function () {
    logout();
    console.log("logout");
});

function login() {
    firebase.auth()
        // Geef het popup scherm waar de gebruiker in kan loggen.
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user
            var userUid = user.uid

            // Ervoor zorgen dat de nodige dat in de collectie komt te staan.
            const account = {
                userUid: user.uid || "unknown",
                email: user.email || "unknown",
                displayName: user.displayName || "unknown",
                photoURL: user.photoURL || "unknown",
                emailVerified: user.emailVerified || "unknown"
            }
            // Push de data naar de collectie.
            db.collection("users").doc(userUid).set(account)
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
}

// Functie waarmee de gebruiker uit kan loggen.
function logout() {
    firebase.auth().signOut().then(() => {
        console.log("Logout succes")
    }).catch((error) => {
        console.log("Error: ")
    });
}

// Checken of de user zijn data blijft wanneer hij in is geloged. Hiermee kunnen we ook zien of de login succesvol was.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        document.getElementById("user-id").innerHTML = user.uid;
    } else {
        document.getElementById("user-id").innerHTML = "user not logged in";
    }
});