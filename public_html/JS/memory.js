/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var elem1, elem2;//les inputs cliqué
var n;//le nombre de tours
//fonction pour initialiser le tableau
var start = function () {
    var nbCase;
    n = 0;
    elem1 = undefined;
    elem2 = undefined;
    /////demande nombre d'éléments
    do {
        nbCase = prompt("Veuillez entrer un nombre de lignes (entre 1 et 5)");
    } while (nbCase < 1 || nbCase > 5);
    ////Utilisation d'un bouton restart
    if ($('#restart').length == 0) {
        $('#menu').append("<input type='button' value='Restart' id='restart'/>");
        $('#start').remove();
        $('#restart').on("click", restart);
    }
    $('#leJeu').append("<table></table>");
    ////Gestion des couleurs randoms
    var randomElem = randomCoulTab(nbCase * 6);
    //double tri aléatoire
    randomElem.sort(function (a, b) {
        return [-1, 1].indexOf(Math.floor(Math.random() * 2));
    });
    randomElem.sort(function (a, b) {
        return [-1, 1].indexOf(Math.floor(Math.random() * 2));
    });
    ////afichage du tableau
    var i = 0;
    while (i < nbCase * 6) {
        var ligne = "<tr>";
        for (j = i; (j < (i + 6)) && (j < nbCase * 6); j++) {
            ligne += "<td><input type='button' class='div' valeur='" + randomElem.pop() + "'/></td>";
        }
        $('table').append(ligne + "</tr>");
        i += 6;
    }
    ///dynamisation des nouveaux input
    $('.div').on("click", clickElem);
};

var restart = function () {
    $('#leJeu table').remove();
    start();
};

var randomCoulTab = function (nombre) {
    var tableau = [];
    var rouge = 20;
    var vert = 20;
    var bleu = 80;
    for (var i = 0; i < nombre / 2; i++) {
        if (i % 6 == 0 && i != 0) {
            rouge += 110;
            vert = 20;
            bleu = 80;
        } else if (i % 2 == 0 && i != 0) {
            vert += 100;
            bleu = 80;
        } else if (i != 0) {
            bleu += 100;
        }
        var tmp = "#" + rouge.toString(16) + vert.toString(16) + bleu.toString(16);
        tableau.push(tmp);
        tableau.push(tmp);
    }
    return tableau;
}

var clickElem = function (event) {
    if (elem1 == undefined) {
        //afficher l'élément
        elem1 = event.target;
        $(elem1).css("background-color", $(elem1).attr("valeur"));
    } else if (elem2 == undefined) {
        //afficher l'élément
        if (event.target != elem1) {
            elem2 = event.target;
            $(elem2).css("background-color", $(elem2).attr("valeur"));
            n++;
        }
    } else {
        //désafficher les éléments et affecter le nouveau
        if ($(elem1).attr("valeur") == $(elem2).attr("valeur")) {
            $(elem1).off();
            $(elem2).off();
        } else {
            $(elem1).css("background-color", "");
            $(elem2).css("background-color", "");
        }
        elem1 = event.target;
        elem2 = undefined;
        $(elem1).css("background-color", $(elem1).attr("valeur"));
    }

    var fini = true;
    $('.div').each(function () {
        if ($(this).css("background-color") == "rgb(240, 240, 240)") {
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