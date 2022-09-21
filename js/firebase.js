// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCprGk09vEfE2gOeCAoLfJOPWGv28y5vA8",
    authDomain: "tijdlijnpoc.firebaseapp.com",
    projectId: "tijdlijnpoc",
    storageBucket: "tijdlijnpoc.appspot.com",
    messagingSenderId: "1008128845211",
    appId: "1:1008128845211:web:32ff43ba2a4262a3fd2d3e",
    measurementId: "G-47CWE4B7GJ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });