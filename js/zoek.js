/*
function HTMLAsync() {
    return new Promise(resolve => {
        const zoekBalk = document.getElementById("zoekBalkHTML");
        const filmUL = document.getElementById("zoekResultatenHTML");
    });
}

function checkElement(selector) {
    if (document.querySelector(selector) === null) {
        return HTMLAsync().then(() => checkElement(selector));
        console.log("prank gaat fout")
    } else {
        return Promise.resolve(true);
        console.log(zoekBalk)
    }
}
*/

var zoekBalk = document.getElementById("zoekBalkHTML");
var filmUL = document.getElementById("zoekResultatenHTML");
var user = firebase.auth().currentUser

var filmInfoDiv = document.getElementById('filmInfo')
var titelHTML = document.getElementById('titelID')
var datumHTML = document.getElementById('datumID')

//Event listener van zoekbalk
//const zoekBalkExport = () => 

zoekBalk.addEventListener("keyup", async (e) => {
  let zoekOpToets = e.target.value;
  const ApiURL = `https://api.themoviedb.org/3/search/movie?api_key=43cd73c99a6544c0e4bf86ff2e600bd8&query=${zoekOpToets}&page=1`;

  if (zoekOpToets === "") {
  } else {
    try {
      const dataTerug = await zoekFilm(ApiURL);
      //console.log(dataTerug)
      resultaatFilm(dataTerug);
    } catch (error) {
      console.error(error);
      window.alert(error.message);
    }
    console.log(zoekBalk.value);
  }
});

async function zoekFilm(ApiURL) {
  const resultaat = await fetch(ApiURL);
  const data = await resultaat.json();
  console.log(data.results);

  return data.results;
}

function resultaatFilm(films) {
  //console.log(filmUL)
  filmUL.innerHTML = "";
  for (let film of films.slice(10)) {
    //console.log(film)
    //${id = film}
    const resultaatFilmHTML = `
            <li class="z-0 relative">
                <p>
                    ${film.title}
                </p>
                <p>
                    ${film.release_date}
                </p>

                <button onclick="toonDiv('`+ film.title + `','` + film.release_date + `')" type="button" class="bg-gradient-to-r from-green-400 to-blue-500 focus:from-pink-500 focus:to-yellow-500">
                    Voeg toe!     
                </button>
            </li>
        `;
    console.log("De ID is=", film.id);

    filmUL.innerHTML += resultaatFilmHTML;
  }
}

//const toonInfoDiv = document.getElementById(film.id)
function toonDiv(filmName, filmDate) {
  filmInfoDiv.classList.remove('hidden')
  titelHTML.innerHTML = filmName
  datumHTML.innerHTML = filmDate
}

//toonInfoDiv.onclick = toonDiv
var voegToeTijdlijnKnop = document.getElementById('tijdlijnVoegToe')



//Firebasefunctie
function tijdlijnDB() {

  //LocatieID
  var LocatieID = document.getElementById("LocatieHTML")

  //'optional' in JS: als waarde null/undefined is, doe 'Geen locatie opgeven', else LocatieID.innerHTML
  var OptionalLocatieID = ((LocatieID === null || LocatieID === undefined) ? "Geen locatie opgegeven" : LocatieID.innerHTML)

  db.collection("feed").add({
    movietitel: titelHTML.innerHTML,
    moviedate: datumHTML.innerHTML,
    UUID: user.uid,
    Rating: HTMLSterRating.value,
    Locatie: OptionalLocatieID
  })
  console.log(newLocation.innerHTML)
}

voegToeTijdlijnKnop.onclick = tijdlijnDB

var verwijderInfoDiv = document.getElementById('verwijderInfo')

function verwijderDiv() {
  filmInfoDiv.classList.add('hidden')
}

verwijderInfoDiv.onclick = verwijderDiv

//export{HTMLAsync, checkElement, zoekBalkExport, zoekFilm, resultaatFilm}

var HTMLSterRating = document.getElementById('sterRating')


HTMLSterRating.oninput = function() {
  //console.log(HTMLSterRating.value)
}


//Locatievoorziening
var target = document.getElementById('target');
var newLocation = "Nog geen locatie"

function appendLocation(location) {
  //Coördinaten omzetten in adres
  var KEY = "84abb795ee3be1f9dcdf3278803c4fd0";
  var LAT = location.coords.latitude
  var LNG = location.coords.longitude

  let url = `http://api.positionstack.com/v1/reverse?access_key=${KEY}&query=${LAT},${LNG}`



  fetch(url).then(async Geodata => {
    const vertaalData = await Geodata.json()
    //console.log("DIT IS DE DATA",vertaalData.data[0].name)

    var adresTerug = vertaalData.data[0].name
    var adresHTML = document.createElement('p');
    adresHTML.setAttribute("id", "LocatieHTML")
    adresHTML.innerHTML = adresTerug
    target.appendChild(adresHTML);


  })
  .catch(async error => console.warn(error.message))
}

if ('geolocation' in navigator) {
  document.getElementById('askButton').addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(function (location) {
      appendLocation(location);
    });
  });
} else {
  target.innerText = 'Locatie niet ondersteund.';
}

/*

var KEY = "84abb795ee3be1f9dcdf3278803c4fd0";
var LAT = 40.7638435;
var LNG = -73.9729691;

let url = `http://api.positionstack.com/v1/reverse?access_key=${KEY}&query=${LAT},${LNG}`



fetch(url).then(async data => {
  const vertaalData = await data.json()
  console.log("DIT IS DE DATA",vertaalData)
})
.catch(async error => console.warn(error.message))

*/

