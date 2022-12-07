"use strict";
//@ts-check

let pvm = new Date();
let data = [];

// Määritellään kommentti-objektin rakenne
function Kommentti(nimi, viesti, paiva) {
    this.nimi = nimi;
    this.viesti = viesti;
    this.paiva = paiva;
}


/**
 * Luo sivulle kommenttilistauksen
 */
 function luoKommenttiListaus() {
    // Haetaan kommenttilistauksen alku HTML-dokumentista
    let kommenttiListaus = document.getElementById("kommentit");

    // Tarkistetaan onko olemassaolevaa listaa ja jos on, tyhjennetään se ensin
    while (kommenttiListaus.firstChild) {
        kommenttiListaus.removeChild(kommenttiListaus.firstChild);
    }
}


window.addEventListener("load", function() {
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
    data.push(new Kommentti(nimikentta.value, kommenttikentta.value, aika));

    console.log("Kommentti tallennettu!");
    console.log(aika);

    // Tyhjennetään lopuksi lomake
    kommenttiLomake.reset();

    console.log(data);

    });
});
