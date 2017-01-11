# Cloud_Applications


## Stappen plan om online te zetten

### Stap 1
Zorg ervoor dat men zowel meteor als npm geïnstalleerd heeft op de server.

`sudo apt-get install -y nodejs`
`sudo apt-get install -y meteor`

Hierna clone je de repository met het git commando.
(indien men dit nog niet heeft: `sudo apt-get install -y git`)
`git clone https://github.com/joen194/Cloud_Apllications`

### Stap 2

Ga in de repository en pas het volgende bestand aan.
/server/registerscript.js 
Op lijn 23 voegd met de secret key in van u google web app in.
Dit is nodig om de reCaptcha te configureren.
lijn: 23 `secretKey: 'key'`
Verder in het bestand voegd men het wachtwoord van het email adres in.
lijn: 46  `var password = 'nope';`

In /client/js/LoginPage.js past men de siteKey aan volgens de google web app.
lijn: 12 `siteKey: "uw site key",`

### Stap 3

In de map voeg de volgende commando's uit:
`npm install`
Om dan meteor te starten:
`meteor`
Om meteor te starten op een poort van een site:
`env ROOT_URL=http://'urlsite:poort meteor`

### Stap 4

Nu zal men even in de iets moeten toevoegen om google te configureren.
In client/templates/LoginPage.html uncommend je de loginbuttons lijn.
lijn: 21 `<!-- {{> loginButtons}} --> ` verander naar ` {{> loginButtons}} `
Nu Als men meteor opstart en naar de loginpagina gaat zal men naast de aanmeld knop een 'sign in' zien staatn. Hierin configureerd men google met behulp van de Client-ID en de Clientgeheim.
Na de configuratie verwijderd men lijn 21 in LoginPage.html.

### Stap 5

Nu Al de stappen compleet zijn start men meteor op door `env ROOT_URL=http://'urlsite:poort meteor` uit te voeren.
En je bent klaar ! 


