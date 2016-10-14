/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var elem1, elem2;
var n;
//fonction pour initialiser le tableau
var start = function () {
    /////demande nombre d'éléments
    var nbCase;
    n = 0;
    elem1 = undefined;
    elem2 = undefined;
    do {
        nbCase = prompt("Veuillez entrer un nombre de case (pair)");
    } while (nbCase % 2 != 0 || nbCase < 1);
    ////Utilisation d'un bouton restart
    if ($('#restart').length == 0) {
        $('#menu').append("<input type='button' value='Restart' id='restart'/>");
        $('#start').remove();
        $('#restart').on("click", restart);
    }
    $('#leJeu').append("<table></table>");
    ////Gestion des couleurs randoms
    var randomElem = [];
    for (var i = 0; i < nbCase; i++) {
        randomElem.push(Math.floor(i / 2) + 1);
    }
    randomElem.sort(function (a, b) {
        return [-1, 1].indexOf(Math.floor(Math.random() * 2));
    })
    ////afichage du tableau
    var i = 0;
    while (i < nbCase) {
        var ligne = "<tr>";
        for (j = i; (j < (i + 5)) && (j < nbCase); j++) {
            ligne += "<td><input type='button' class='div' valeur='" + randomElem.pop() + "'/></td>";
        }
        $('table').append(ligne + "</tr>");
        i += 5;
    }
    ///dynamisation des nouveaux input
    $('.div').on("click", clickElem);
};

var restart = function () {
    $('#leJeu table').remove();
    start();
};


var clickElem = function (event) {
    if (elem1 == undefined) {
        //afficher l'élément
        elem1 = event.target;
        $(elem1).attr("value", $(elem1).attr("valeur"));
    } else if (elem2 == undefined) {
        //afficher l'élément
        elem2 = event.target;
        $(elem2).attr("value", $(elem2).attr("valeur"));
        n++;
    } else {
        //désafficher les éléments et affecter le nouveau
        if ($(elem1).attr("valeur") == $(elem2).attr("valeur")) {
            $(elem1).toggle();
            $(elem2).toggle();
        } else {
            $(elem1).attr("value", "");
            $(elem2).attr("value", "");
        }
        elem1 = event.target;
        elem2 = undefined;
        $(elem1).attr("value", $(elem1).attr("valeur"));
    }
    
    var fini = true;
    $('.div').each(function(){
        if ($(this).css("display") == "inline"){
            fini = false;
        }
    });
    if (fini) {
        alert("GG ! Réussi en " + n + " tours !");
    }
};

$(document).ready(function () {
    $('#start').on("click", start);
});