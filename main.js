var paraules=["JAVA","EMPRESA","NETBEANS","ORDINADOR","ECLIPSE","SERGI","COLLADOS","HECTOR"];
var i= 0,win=0;
var buffer="";
//var display=document.querySelector('#time');

var sopa=new SopaLletres();

function SopaLletres(){
    this.makeTable = function (container, data) {//Crea una taula a partir de l'array
        var table = $("<table/>");
        $.each(data, function (rowIndex, r) {
            var row = $("<tr>");
            var rowEnd = $("</tr>");
            table.append(row);
            $.each(r, function (colIndex, c) {
                var td = $("<td>");
                var tdEnd = $("</td>");
                row.append(td);
                td.append($("<button onclick='clicaLletra(&quot;" + c + "&quot;," + i + ")' id='" + i + "'>" + c + "</button>"));//cada cela es composa de botons on al clicar es fa la funcio resolve
                td.append(tdEnd);
                i++;
            });
            table.append(rowEnd);
        });
        return container.append(table);
    };

    this.startGame= function(){
        $('#btn').fadeOut(2000,function(){
            $('#time').fadeIn(2000,function(){
                $('#solutions').slideDown(1000,function(){
                    $('#tbl').fadeIn(2000, function () {
                        var timer = sopa.startTimer(179);
                    });
                });
            });
        });
    };

    this.startTimer = function(duration) {
        var timer = duration, minutes, seconds;
        a=setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            $('#time').text(minutes + ":" + seconds);


            if(timer<61){
                $('#time').css("color","red");
                $('#time').animate({
                    "font-size": "28px"
                },100,function(){
                    $(this).animate({
                        "font-size":"25px"
                    });
                });
            }
            if(win==8) {
                clearInterval(a);
            }

            if (--timer < 0) {
                alert("Has perdut! Has aconseguit "+win+" punts");
                clearInterval(a);
                $('#tbl').fadeOut(1000);
            }
        }, 1000);
    };



    this.resolve = function(lletra,id){
        if( !$('#'+id).hasClass("done")) {//Si esta finalitzada la paraula no deixa clicar
            if ($('#' + id).hasClass("sel")) {//s'aplica quan es desseleecciona una lletra
                $('#' + id).removeClass("sel");
                var index = buffer.indexOf(lletra);
                var a = buffer.substring(index, index + 1);
                var splitString = buffer.split(a);
                buffer = splitString.join("");
            }
            else {//selecciona una lletra i al fica a al cadena buffer
                $('#' + id).addClass("sel");
                buffer += lletra;
            }
        }

        console.log(buffer);
        for (var j = 0; j < paraules.length; ++j) {
            if(buffer == paraules[j]){//busca si el buffer actual es igual a qualsevol paraula solucio
                console.log(buffer+" TROBADA");

                $('#' + buffer).animate({
                    "font-size": "20px"
                },100,function(){
                    $(this).animate({
                        "font-size":"16px"
                    });
                });
                $('#' + buffer).addClass("solutionDone");//Valida la paraula al tex de sota
                for(var x=0;x<buffer.length;x++){//treu la classe sel i fica done a les posicions del buffer
                    $( "div#tbl" ).find( ".sel" ).removeClass("sel").addClass("done");
                }
                buffer="";
                win++;
                console.log(buffer);
                console.log(win);

                if(win==8) {
                    alert("Has guanyat! Has aconseguit " + win + " punts");//Has guanyat!
                    $('#tbl').fadeOut(1000);
                }

            }
        }
    }

}
$(document).ready(function() {
    var data = [["H", "D", "C", "O", "L", "L", "A", "D", "O", "S"],
                ["J", "A", "V", "A", "M", "T", "S", "P", "O", "D"],
                ["P", "R", "F", "E", "Y", "A", "E", "H", "R", "E"],
                ["H", "Z", "H", "M", "L", "K", "R", "N", "D", "C"],
                ["E", "T", "R", "P", "D", "S", "G", "L", "I", "L"],
                ["C", "N", "P", "R", "O", "M", "I", "H", "N", "I"],
                ["T", "P", "L", "E", "T", "D", "G", "W", "A", "P"],
                ["O", "X", "A", "S", "S", "F", "N", "G", "D", "S"],
                ["R", "Y", "T", "A", "K", "P", "M", "H", "O", "E"],
                ["N", "E", "T", "B", "E", "A", "N", "S", "R", "D"]];



    var table = sopa.makeTable($('#tbl'), data);

    $("#solutions > span").hover(function(){
        if(!$(this).hasClass("solutionDone"))
            $(this).css("color", "red");
    }, function(){
        if(!$(this).hasClass("solutionDone"))
        $(this).css("color", "black");
    });


});


function clicaLletra(lletra,id){
    sopa.resolve(lletra,id);
}

function beginPartida(){
    sopa.startGame();
}






