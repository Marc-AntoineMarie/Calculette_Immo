function isEmpty (value){
    return value != "" && value != null;
};
function isGreaterthanmontant (value){
    return (value) >= 1000;
};
function isLowerthanmontant (value){
    return (value) <= 1000000000;
};
function isGreaterthantaux (value){
    return (value) >= 0.01;
};
function isLowerthantaux (value){
    return (value) <= 100;
};
function isGreaterthanduree (value){
    return (value) >= 1;
};
function isLowerthanduree (value){
    return (value) <= 100;
};
function isValidInt(value) {
    if (!isNaN(parseInt(value, 10))) {
        return true;
    } 
    else {
        return false;
    }
};
function isValidFloat(value) {
    return (value % 1 !== 0);
};
function verifmontant (value){
    if(isEmpty(value) && isGreaterthanmontant(value) && isLowerthanmontant(value) && isValidInt(value) && !isValidFloat(value)){
        return "";
    }
    else{
        return " montant,";
    }
};
function veriftaux (value){
    if(isEmpty(value) && isGreaterthantaux(value) && isLowerthantaux(value) && isValidInt(value)){
        return "";
    }
    else{
        return " taux,";
    }
};
function verifduree (value){
    if(isEmpty(value) && isGreaterthanduree(value) && isLowerthanduree(value) && isValidInt(value) && !isValidFloat(value)){
        return "";
    }
    else{
        return " durée,";
    }
};

document.getElementById("calcul").addEventListener("click", function(event){

    event.preventDefault();

    let montantvide = document.querySelector("#montant").value;
    let tauxvide = document.querySelector("#taux").value;
    let dureevide = document.querySelector("#duree").value;

    const msgmontant = verifmontant(montantvide);
    const msgtaux = veriftaux(tauxvide);
    const msgduree = verifduree(dureevide);

    if(msgmontant == " montant," || msgtaux == " taux," || msgduree == " durée,") {        
        document.getElementById("message").textContent = "Veuillez remplir les champs :"+ msgmontant + msgtaux + msgduree + " avec des données valides !";
    }
    else {
        document.getElementById("message").textContent = ""; 
    }
});



// Debut calcul tableau
document.getElementById("calcul").addEventListener("click", function () {
    // Affichage du tableau si le message est vide
    const tableau = document.getElementById("affiche");
    const message = document.getElementById("message")?.textContent || "";

    if (message === "") {
        tableau.style.display = "flex";
    } else {
        tableau.style.display = "none";
    }

    // Efface les anciennes données du tableau
    const tableBody = document.querySelector("#affiche tbody");
    tableBody.innerHTML = ""; // Supprime toutes les anciennes lignes

    // Calcul du tableau
    let montant = parseFloat(document.getElementById("montant").value);
    let taux = parseFloat(document.getElementById("taux").value);
    let duree = parseInt(document.getElementById("duree").value, 10);

    // Calcul des variables
    let mensualite = taux / (100 * 12); // Taux mensuel
    let dureeMois = duree * 12; // Durée en mois
    let echeance =
        (montant * mensualite * Math.pow(1 + mensualite, dureeMois)) /
        (Math.pow(1 + mensualite, dureeMois) - 1);
    let soldeInitial = montant;

    // Boucle pour chaque mois
    for (let mois = 1; mois <= dureeMois; mois++) {
        let interet = soldeInitial * mensualite; // Intérêt pour ce mois
        let amortissement = echeance - interet; // Amortissement pour ce mois
        let soldeRestant = soldeInitial - amortissement; // Nouveau solde restant

        // Créer une ligne dans le tableau
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${mois}</td>
            <td>${soldeInitial.toFixed(2)}</td>
            <td>${echeance.toFixed(2)}</td>
            <td>${interet.toFixed(2)}</td>
            <td>${amortissement.toFixed(2)}</td>
            <td>${soldeRestant.toFixed(2)}</td>
        `;

        tableBody.appendChild(row); // Ajouter la ligne au tableau

        // Mettre à jour le solde initial pour le prochain mois
        soldeInitial = soldeRestant;
    }
});


// Bouton Telechargement PDF
document.getElementById("PDF").addEventListener("click", function () {
    const element = document.body; // Capture toute la page

    // Étape 1 : Sauvegarder les styles d'origine
    const originalStyles = {
        homeMargin: document.querySelector(".home").style.margin,
        afficheMargin: document.querySelector(".affiche").style.margin,
        formWidth: document.querySelector(".form").style.width,
        inputStyles: Array.from(document.querySelectorAll("input")).map(input => ({
            width: input.style.width,
            lineHeight: input.style.lineHeight,
        })),
        tableCellWidths: Array.from(document.querySelectorAll("th, td")).map(cell => cell.style.width),
    };

    // Étape 2 : Appliquer des styles dynamiques
    if (window.matchMedia("(max-width: 321px)").matches) {
        document.querySelector(".home").style.margin = "20px 20px";
        document.querySelector(".affiche").style.margin = "20px 20px";
        document.querySelector(".form").style.width = "245.6px"; 
        document.querySelectorAll("input").forEach(cell => {
            cell.style.lineHeight = "0px";
        });
        document.querySelectorAll("th, td").forEach(cell => {
            cell.style.width = "10%";   
        });

    } else if (window.matchMedia("(min-width: 322px) and (max-width: 400px)").matches) {
        document.querySelector(".home").style.margin = "20px 20px";
        document.querySelector(".affiche").style.margin = "20px 20px";
        document.querySelector(".form").style.width = "293px";
        document.querySelectorAll("input").forEach(cell => {
            cell.style.lineHeight = "0px";
        });
        document.querySelectorAll("th, td").forEach(cell => {
            cell.style.width = "10%";
        });

    } else if (window.matchMedia("(min-width: 401px) and (max-width: 426px)").matches) {
        document.querySelector(".home").style.margin = "20px 20px";
        document.querySelector(".affiche").style.margin = "20px 20px";
        document.querySelector(".form").style.width = "344px"; 
        document.querySelectorAll("input").forEach(cell => {
            cell.style.lineHeight = "0px";
        });
        document.querySelectorAll("th, td").forEach(cell => {
            cell.style.width = "10%";
        });

    } else if (window.matchMedia("(min-width: 427px) and (max-width: 1024px)").matches) {
        document.querySelector(".home").style.margin = "30px 70px";
        document.querySelector(".affiche").style.margin = "30px 70px";

    } else if (window.matchMedia("(min-width: 1025px)").matches) {
        document.querySelector(".home").style.margin = "50px 100px";
        document.querySelector(".affiche").style.margin = "50px 100px";
    }

    // Étape 3 : Générer le PDF
    html2pdf(element, {
        margin: 0.2,
        filename: 'pret_immobilier.pdf',
        html2canvas: { scale: 3 },
        jsPDF: { format: 'a4', orientation: 'portrait' }
    });

    // Étape 4 : Réinitialiser les styles
    setTimeout(() => { // Attendre un moment pour s'assurer que le PDF est créé
        document.querySelector(".home").style.margin = originalStyles.homeMargin;
        document.querySelector(".affiche").style.margin = originalStyles.afficheMargin;
        document.querySelector(".form").style.width = originalStyles.formWidth;
        document.querySelectorAll("input").forEach((cell, index) => {
            cell.style.width = originalStyles.inputStyles[index].width;
            cell.style.lineHeight = originalStyles.inputStyles[index].lineHeight;
        });
        document.querySelectorAll("th, td").forEach((cell, index) => {
            cell.style.width = originalStyles.tableCellWidths[index];
        });
    }, 500); // Délai pour laisser `html2pdf` finir
});


