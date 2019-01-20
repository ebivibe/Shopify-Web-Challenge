var saved = [];
var recent;
$(document).ready(function () {
    $("form").submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000",
            type: 'GET',
            dataType: "jsonp",
            crossDomain: true,

            success: function (data) {
                recent = data;
                if ($(search).val()!="") {
                    $("#resultsbody").html("<tbody id=\"resultsbody\"></tbody>");
                    for (var i = 0; i < data.length - 1; i++) {
                        var keywords = [];
                        keywords.push(data[i].keywords.split(', '));
                        keywords.push(data[i].keywords.split(' ').join(',').split(','));
                        console.log(keywords);
                        if (keywords[0].includes($(search).val()) || keywords[1].includes($(search).val())) {
                            var body = JSON.stringify(data[i].body);
                            var title = JSON.stringify(data[i].title);
                            var bodystring = $('<textarea />').html(body).text();
                            var titlestring = $('<textarea />').html(title).text();
                            bodystring = parseHTML(bodystring);
                            titlestring = parseHTML(titlestring);
                            var el = $("<tr></tr>");
                            el.html("<td class=\"ff\"><div class=\"f\"><img class=\"star\" id=\"star" + i + "\"src=\"icons/grey.PNG\" height=\"20px\" width=\"20px\"></img> " + titlestring + "</div></td><td><div class=\"s\">" + bodystring + "</div></td>");
                            $('a', el);
                            $("#resultsbody").append(el);
                        }

                    }
                }

            }

        });
    });

});

function parseHTML(text) {
    text = text.replace(/"/g, '');
    text = text.replace(/\\n/g, '');
    return text;
}

$(document).ready(function () {
    $(document).on('click', '.star', function () {
        var index = parseInt($(this).attr('id').replace("star", ""));

        if (saved.includes(index)) {
            var temp = saved.indexOf(index);
            saved.splice(temp, 1);
            $("#star" + index).attr("src", "icons/grey.PNG");
        }
        else {
            saved.push(index);
            $("#star" + index).attr("src", "icons/green.PNG");
        }
        if (saved.length > 0) {
            $("#holder").html("<div id=\"fav\"> <h1 id=\"favlabel\">Favourites</h1><table width=\"500px\" id=\"favs\"><tbody id=\"favbody\"></tbody></table></div>");
            for (i in saved) {
                var body = JSON.stringify(recent[saved[i]].body);
                var title = JSON.stringify(recent[saved[i]].title);
                var bodystring = $('<textarea />').html(body).text();
                var titlestring = $('<textarea />').html(title).text();
                bodystring = parseHTML(bodystring);
                titlestring = parseHTML(titlestring);
                var el = $("<tr></tr>");
                el.html("<td class=\"ff\"><div class=\"f\"><img class=\"star2\" id=\"star2" + saved[i] + "\"src=\"icons/selected.PNG\" height=\"20px\" width=\"24px\"></img> " + titlestring + "</div></td><td><div class=\"s\">" + bodystring + "</div></td>");
                $('a', el);
                $("#favbody").append(el);
            }
        }
        else {
            $("#holder").html("");
        }
    });
});

$(document).ready(function () {
    $(document).on('click', '.star2', function () {
        var index = parseInt($(this).attr('id').replace("star2", ""));
        var temp = saved.indexOf(index);
        saved.splice(temp, 1);
        $("#star" + index).attr("src", "icons/grey.PNG");
        if (saved.length > 0) {
            $("#holder").html("<div id=\"fav\"> <h1 id=\"favlabel\">Favourites</h1><table width=\"500px\" id=\"favs\"><tbody id=\"favbody\"></tbody></table></div>");
            for (i in saved) {
                var body = JSON.stringify(recent[saved[i]].body);
                var title = JSON.stringify(recent[saved[i]].title);
                var bodystring = $('<textarea />').html(body).text();
                var titlestring = $('<textarea />').html(title).text();
                bodystring = parseHTML(bodystring);
                titlestring = parseHTML(titlestring);
                var el = $("<tr></tr>");
                el.html("<td class=\"ff\"><div class=\"f\"><img class=\"star2\" id=\"star2" + saved[i] + "\"src=\"icons/selected.PNG\" height=\"20px\" width=\"24px\"></img> " + titlestring + "</div></td><td><div class=\"s\">" + bodystring + "</div></td>");
                $('a', el);
                $("#favbody").append(el);
            }
        }
        else {
            $("#holder").html("");
        }
    });
});