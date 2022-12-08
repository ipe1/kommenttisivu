"use strict";
//@ts-check

const pvm = new Date();
const kommentit = [];
let idNro = 1;

// Määritellään kommentti-objektin rakenne
function Kommentti(id, nimi, viesti, paiva) {
    this.id = id;
    this.nimi = nimi;
    this.viesti = viesti;
    this.paiva = paiva;
}


/**
 * Päivittää sivulle kommenttilistauksen
 */
 function paivitaKommenttiListaus() {
    // Haetaan kommenttilistauksen alku HTML-dokumentista
    let kommenttiListaus = document.getElementById("kommentit");

    // Tarkistetaan onko olemassaolevaa listaa ja jos on, tyhjennetään se ensin
    while (kommenttiListaus.firstChild) {
        kommenttiListaus.removeChild(kommenttiListaus.firstChild);
    }

    // Lisätään kommentit näkyville kommentit-osioon
    for (let kommentti of kommentit) {
        // Luodaan ensin kommenttielementti
        let kommenttiElementti = document.createElement("li");
        kommenttiElementti.setAttribute("id", kommentti.id);
        // Luodaan kirjoittajan nimelle oma elementtinsä
        let nimiElementti = document.createElement("strong");
        nimiElementti.textContent = kommentti.nimi;
        // Ja varsinainen kommentti
        let viestiElementti = document.createElement("p");
        viestiElementti.setAttribute("class", "viesti");
        viestiElementti.textContent = kommentti.viesti;
        // Lopuksi päivämäärä ja muokkauspainike
        let pvmElementti = document.createElement("p");
        pvmElementti.setAttribute("class", "pvm");
        pvmElementti.textContent = kommentti.paiva;
        let muokkauspainike = document.createElement("button");
        muokkauspainike.setAttribute("class", "muokkauspainike");
        muokkauspainike.textContent = "Muokkaa";

        // Lisätään edellä luodut elementit DOM-puuhun
        kommenttiElementti.appendChild(nimiElementti);
        kommenttiElementti.appendChild(viestiElementti);
        kommenttiElementti.appendChild(pvmElementti);
        kommenttiElementti.appendChild(muokkauspainike);
        kommenttiListaus.appendChild(kommenttiElementti);

        // Lisätään muokkauspainikkeelle myös klikkauksen kuuntelija
        muokkauspainike.addEventListener("click", function(e) {
            muokkaaKommenttia(e.target.parentElement);
        });
    }
}


/**
 * Muokkaa yksittäistä kommenttia
 */
function muokkaaKommenttia(kommenttiElementti) {
    // Otetaan nykyinen viesti talteen
    let id = kommenttiElementti.id;
    let kommentti;
    for (let k of kommentit) {
        if (k.id === id) {
            kommentti = k;
        }
    }
    console.log("Alkuperäinen kommentti: " + kommentti.viesti);

    // Korvataan viestielementti muokattavalla tekstikentällä
    let viestiElementit = kommenttiElementti.getElementsByClassName("viesti");
    kommenttiElementti.removeChild(viestiElementit[0]);
    let muokkausElementti = document.createElement("p");
    let muokkausKentta = document.createElement("textarea");
    muokkausKentta.setAttribute("cols", "50");
    muokkausKentta.value = kommentti.viesti;
    muokkausElementti.appendChild(muokkausKentta);
    kommenttiElementti.firstChild.append(muokkausElementti);
    
    // Korvataan muokkauspainike tallennuspainikkeella
    let painikeElementit = kommenttiElementti.getElementsByTagName("button");
    kommenttiElementti.removeChild(painikeElementit[0]);
    let tallennusPainike = document.createElement("button");
    tallennusPainike.textContent = "Tallenna";
    kommenttiElementti.appendChild(tallennusPainike);

    // Lisätään tallennuspainikkeelle toiminnallisuus jossa tallennetaan muokattu kommentti ja päivitetään listaus
    tallennusPainike.addEventListener("click", function(e) {
        kommentti.viesti = muokkausKentta.value;
        paivitaKommenttiListaus();

        console.log("Muokattu kommenttia " + id + "!");
    });

}

window.addEventListener("load", function() {
    // Päivitetään kommenttilistaus
    paivitaKommenttiListaus();

    // Käsitellään lomakkeen lähettäminen
    let kommenttiLomake = document.getElementById("kommenttilomake");
    kommenttiLomake.addEventListener("submit", function(e) {
    e.preventDefault();

    let nimikentta = document.getElementById("nimikentta");
    let kommenttikentta = document.getElementById("kommenttikentta");
    let aika = pvm.toLocaleDateString();

    // Tarkistetaan syötteiden oikeellisuus
    kommenttiLomake.checkValidity();
    kommenttiLomake.reportValidity();

    // Viedään tiedot data-objektiin
    kommentit.push(new Kommentti("k" + idNro, nimikentta.value, kommenttikentta.value, aika));
    // Kasvatetaan idNro:ta mahdollista seuraavaa kommenttia varten
    idNro++;

    console.log("Kommentti tallennettu!");
    console.log(aika);
    
    // Päivitetään kommenttilistaus
    paivitaKommenttiListaus();

    // Tyhjennetään lopuksi lomake
    kommenttiLomake.reset();

    console.log(kommentit);
    });

});
