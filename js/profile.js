var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

// Als iemand is ingelogd doe dan het volgende
if (user != null) {
    document.getElementById("Name").innerHTML = user.displayName;
    document.getElementById("profilepicture").src = user.photoURL;
}

// Test of de data uit kan worden gelezen
document.getElementById("test-profile-button").addEventListener("click", function () {
    console.log("test button")
    user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
    });
});
