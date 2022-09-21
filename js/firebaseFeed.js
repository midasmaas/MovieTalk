var user = firebase.auth().currentUser

// De feed van de de database op halen en laten zien
var feedList = document.querySelector("#feed-list")
// creëer element en render feed
function renderFeed(doc
) {
  const tijdlijnItems =`
  <li class="z-0 relative">
                <p>
                    ${doc.data().movietitel}
                </p>
                <p>
                    ${doc.data().moviedate}
                </p>

                <p>
                  ${doc.data().Rating}
                </p>

                <p>
                ${doc.data().Locatie}
                </p>


                <button onclick="likeButton('`+ doc.id +`')" type="button" class="bg-gradient-to-r from-green-400 to-blue-500 focus:from-pink-500 focus:to-yellow-500">
                    Like!     
                </button>
              
            </li>

  `

  feedList.innerHTML += tijdlijnItems
  console.log("TEST")

  //feedList.appendChild(tijdlijnItems)
}



function likeButton(postID){

  db.collection("feed").doc(postID).set({
    likeAmount: +1

  }, { merge: true })

}

/*
function likeButton(postID){

  const increment = firebase.firestore.FieldValue.increment(1);
  db.collection("feed").doc(postID).update({ Like: increment})

}

*/

var DBTijdlijn = db.collection("feed")

firebase.auth().onAuthStateChanged((user) => {
  console.log("2TEST")
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;

    DBTijdlijn.where("UUID", "==", user.uid).onSnapshot((snapshot) => {
      tijdlijnItems = ""
      snapshot.docs.forEach(doc => {
        renderFeed(doc);
      })
    })

  } else {
    // User is signed out
    // ...
  }
});