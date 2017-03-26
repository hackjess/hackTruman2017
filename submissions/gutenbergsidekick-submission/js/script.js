/** Manages the front-end of the Project Gutenberg Sidekick System
  */

var socket = io.connect();

var basketCount = 0;

var outputTerms = [];

var opts = {
 lines: 13, // The number of lines to draw
 length: 28, // The length of each line
 width: 14, // The line thickness
 radius: 42, // The radius of the inner circle
 scale: 1, // Scales overall size of the spinner
 corners: 1, // Corner roundness (0..1)
 color: '#000', // #rgb or #rrggbb or array of colors
 opacity: 0.25, // Opacity of the lines, rotate: 0, // The rotation offset
 direction: 1, // 1: clockwise, -1: counterclockwise
 speed: 1, // Rounds per second
 trail: 60, // Afterglow percentage
 fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
 zIndex: 2e9, // The z-index (defaults to 2000000000)
 className: 'spinner', // The CSS class to assign to the spinner
 top: '50%', // Top position relative to parent
 left: '50%', // Left position relative to parent
 shadow: false, // Whether to render a shadow
 hwaccel: false, // Whether to use hardware acceleration
 position: 'absolute' // Element positioning
};

var resultNumber;
var frequency;

$(document).ready(function(){
    $('#wrong-url').hide();

    $("#clrBasket").click(function(){

        $(".panel-body .list-group-item").remove();
        basketCount = 0;
        outputTerms = [];
    });

    $("#submitbasket").click(function(){

        var pdfOutputString = "Project Gutenberg Sidekick - Reading Notes\n\n";
        for(var m = 0; m < basketCount; m++){
            pdfOutputString += outputTerms[m] + '\n\n\n\n\n\n';
        }

        console.log(pdfOutputString);

        if(pdfOutputString){
            var doc = new jsPDF();


            doc.text(pdfOutputString, 20, 20);

            setTimeout(function(){
                doc.output("dataurlnewwindow");
            }, 1000);
        }
    });

    socket.on('term-result', function(data){
        if (resultNumber == 65) {
            resultNumber = data.termList.length;
        }
        populateResults(data.termList, "first book");
        var title = data.title;
        title = title.slice(0, 5) + ":" + title.slice(5);
        $('#book-title').text(title);
    });

    socket.on('wrong-url-format', function(){
        $('#wrong-url').show();
        $('#wrong-url').fadeTo(2000, 500).slideUp(500, function(){
        $('#wrong-url').slideUp(500);
      });
    });

    $('#result_selector').unbind('change').change(function() {
        resultNumber = $('#result_selector').val();
    });


    $("#submitbutton").click(function(e){
        //this runs when the sumbit button is clicked
        //should contain code for finding the proper nouns,
        // as well as scrolling the page
        //prevent the button from refreshing the page
        e.preventDefault();


        fireRequest();

    });
});






function fireRequest(){

    var query = $("#bookid").val();
    frequency = $('#frequency_selector').val();
    //magic thanks to Callie and Khoa
    socket.emit('send-url-request', {'url': query, 'result_number': resultNumber, 'frequency': frequency});
}


function populateResults(terms, bookIdNo){


    var outputString = "<ol>";

    for(var i = 0; i < resultNumber; i++){
        var formId = "term_" + terms[i] + "_" + bookIdNo;
        var formButton = "button_" + terms[i] + "_" + bookIdNo;

        var currentQuer = terms[i];
        var jsonQ = "https://en.wikipedia.org/w/api.php?action=opensearch&search=";
        jsonQ += currentQuer;
        jsonQ += "&limit=1&namespace=0&format=json&origin=*";


        $.getJSON(jsonQ, function(result){


            var numOfResults = result[1].length;

            var qtitles = [];
            for(var t = 0; t < 10; t++)
            {
              qtitles[t] = result[1][t];
            }

            var qdescrips = [];
            for(var u = 0; u < 10; u++)
            {
              qdescrips[u] = result[2][u];
            }

            var qlinks = [];
            for(var v = 0; v < 10; v++)
            {
              qlinks[v] = result[3][v];
            }

            if(qtitles[0] != "Undefined"){
                var currentWiki = '<div id="' + 'button_' + qtitles[0] + '_' + bookIdNo + '">';

                for(var p = 0; p < numOfResults; p++){
                    currentWiki += "<strong>" + '<a href="' + qlinks[p] + '">' + qtitles[p] + '</a>' + "</strong><p>" + qdescrips[p] + "</p>";
                }

                currentWiki += "<hr></div>";


                currentLine = "<li> " + currentWiki + "</li>";

                outputString += currentLine;
            }


        });


    }

    setTimeout(function(){
        outputString += "</ol>";

        $("#resultsoutput li").remove();

        $("#resultsoutput").html(outputString);

        $("#searchresults").css("display", "inline");


        //add the button listeners
        $('[id^="button_"]').click(function(){
            //alert(this.id);

            var newRow = "<li class='list-group-item'>" + this.id.slice(7, this.id.length - 11);
            newRow += "\n" + "</li>";
            $(newRow).prependTo(".panel-body");
            outputTerms.unshift(this.id.slice(7, this.id.length - 11));
            basketCount++;

        });

        var offset = 20; //Offset of 20px

        $('html, body').animate({
            scrollTop: $("#searchresults").offset().top + offset
        }, 1000);
    }, 1000);

}
