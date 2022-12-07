"use strict";
//@ts-check

let pvm = new Date();

window.addEventListener("load", function() {
    // Käsitellään lomakkeen lähettäminen
    let kommenttiLomake = document.getElementById("kommenttilomake");
    kommenttiLomake.addEventListener("submit", function(e) {
    e.preventDefault();
    console.log("Kommentti tallennettu!");
    console.log(pvm.toLocaleDateString());

    // Tyhjennetään lopuksi lomake
    kommenttiLomake.reset();
    });
});
