$(document).ready(function () {
    $('#button').on('click',function () {
        word =  $("#word").val();
        console.log(word);

        $.ajax({
            url: "https://mashape-community-urban-dictionary.p.mashape.com/define?term=" + word + "",
            type: 'GET',
            headers: {
                "X-Mashape-Key":"XFrXqH7gR8mshnhheXEoSQY4vGAPp1g2zCRjsnowJFYnR9dp9V"
            },
            crossDomain: true,
            dataType: 'json',
            success: function(result) {
                console.log(result);
                myfunction(result);
            },
            error: function() { alert('Failed!'); }
    });
    });
//
    function myfunction(json) {
        console.log(json);
        console.log(json.list);
        var html = "";
        if(json.list.length == 0){
            html2 = "<h1>No results.</h1>"
        }else{
            html2 = "<h1>Word: " + word + "</h1><br>";
            for(var i = 0; i < json.list.length; i++){
                html += "<h2>" + (i+1) + "</h2>";
                html += "<table border='white' class='table table-bordered'>";
                html += "<tr><th>Likes/Dislikes</th><td>"+ json.list[i].thumbs_up + " : "+ json.list[i].thumbs_down + "</td></tr>";
                html += "<tr><th>Definition</th><td>" + json.list[i].definition + "</td></tr><tr><th>Example</th><td>" + json.list[i].example + "</td></tr>";
                if(json.sounds[i]){
                    html += "<tr><th>Audio</th><td>" + "<audio controls='true' src='" + json.sounds[i] + "' id='audio' type='audio/m4a'></audio>" + "</td></tr>";
                }
                html +=  "<tr><th>Submitted By:</th><td>" + json.list[i].author + "</td>";
                html += "</table><br><br><br>";
            }

        }
        console.log(html);
        $('#wrd').empty();
        $('#wrd').append(html2);
        $('#definition').empty();
        $('#definition').append(html);


    }
});