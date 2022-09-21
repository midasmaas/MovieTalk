// Een functie die we kunnen gebruiken om pagina's te laden zodat we niet de hele tijd hetzelfde stuk code moeten kopieren plakken
function loadPage(route) {
	$("#root").load(route, function (statusTxt, jqXHR) {
		if (statusTxt == "success") {
			alert("New content loaded successfully!");
		}
		if (statusTxt == "error") {
			alert("Error: " + jqXHR.status + " " + jqXHR.statusText);
		}
	});
	$(document).unload
}

$(document).ready(function () {
	// Wanneer de index word geladen word het home scherm in de pagina gezet
	$("#root").load("./views/home.html");

	// De knoppen die ervoor zorgen dat de juiste pagina's in worden geladen.
	$("#home-button").click(function () {
		loadPage('./views/home.html')
		console.log("home")
	});
	$("#search-button").click(function () {
		loadPage('../views/search.html')
		console.log("search")
	});
	$("#profile-button").click(function () {
		loadPage('./views/profile.html')
		console.log("profile")
	});
});

//Service worker

//See if the browser supports Service Workers, if so try to register one
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("service-worker.js").then(function (registering) {
		// Registration was successful
		console.log("Browser: Service Worker registration is successful with the scope", registering.scope);
	}).catch(function (error) {
		//The registration of the service worker failed
		console.log("Browser: Service Worker registration failed with the error", error);
	});
} else {
	//The registration of the service worker failed
	console.log("Browser: I don't support Service Workers :(");
}


//Asking for permission with the Notification API
if (typeof Notification !== typeof undefined) { //First check if the API is available in the browser
	Notification.requestPermission().then(function (result) {
		//If accepted, then save subscriberinfo in database
		if (result === "granted") {
			console.log("Browser: User accepted receiving notifications, save as subscriber data!");
			navigator.serviceWorker.ready.then(function (serviceworker) { //When the Service Worker is ready, generate the subscription with our Serice Worker's pushManager and save it to our list
				const VAPIDPublicKey = "BAZGgCTrFHfX-tjY-0Rko8R0U6V0nYp6mwLr_QCBQCcfI2V8rAAqXYxtNv6CGtQonFYJZt5YTzoARkgvYhS2dBM"; // Fill in your VAPID publicKey here
				const options = { applicationServerKey: VAPIDPublicKey, userVisibleOnly: true } //Option userVisibleOnly is neccesary for Chrome
				serviceworker.pushManager.subscribe(options).then((subscription) => {
					//POST the generated subscription to our saving script (this needs to happen server-side, (client-side) JavaScript can't write files or databases)
					let subscriberFormData = new FormData();
					subscriberFormData.append("json", JSON.stringify(subscription));
					fetch("data/saveSubscription.php", { method: "POST", body: subscriberFormData });
				});
			});
		}
	}).catch((error) => {
		console.log(error);
	});
}

var installButton = document.getElementById("installID")
var installPrompt; //Variable to store the install action in
window.addEventListener("beforeinstallprompt", (event) => {
	event.preventDefault(); //Prevent the event (this prevents the default bar to show up)
	installPrompt = event; //Install event is stored for triggering it later
	//...do something here to show your install button
	installButton.style.visibility = "visible"
	console.log(installPrompt)
});


installButton.addEventListener("click", e => {

	//Recognize the install variable from before?
	installPrompt.prompt();
	toggleButton(true)

	//..Put code here that hides your install button
	installPrompt.userChoice.then((choiceResult) => {
		//Hide the install button here again
		toggleButton(true)

		if (choiceResult.outcome !== "accepted") {
			//..If it was not accepted to install than show the install button again

			toggleButton(false)
		}
		installPrompt = null;
	});

})

function toggleButton(displayed = true) {
	if (displayed) {
		installButton.style.display = "none"
	}
	else {
		installButton.style.display = "inline-block"
	}
}

