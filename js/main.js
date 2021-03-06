function search() {
    var searchCriteria = encodeURI("body:" + $("#criteria").val());
    // Qiitaの検索API実行
    searchQiita(searchCriteria);
    // Teratailの検索API実行
    searchTera(searchCriteria);
}

function searchQiita(searchCriteria){
    var url = "https://qiita.com/api/v2/items?page=1&per_page=20&query=" + searchCriteria;
    $.ajax({
        type: "GET",
        url: url,
        success: function (result) {
            var html = "";
            var qiitabody = $("#qiitaBody");
            qiitabody.empty()
            for(var i = 0 ; i < result.length  ; i++){
                var curRes =  result[i];
                var no = i + 1;
                var targetUrl = "'" + curRes.url +"'";
                html = html + '<tr onclick="onTr(' + targetUrl + ')">'
                            +   "<td style='width:5%'>" + no + "</td>"
                            +   "<td style='width:45%'>" + curRes.title + "</td>"
                            +   "<td style='width:50%'>" + curRes.body.slice(0,20) + "</td>"
                            + "</tr>"
            }
            qiitabody.append(html);
        }
    });
}

function searchTera(searchCriteria){
    var url = "https://teratail.com/api/v1/questions?limit=20&page=1&body_str=java" + searchCriteria;
    $.ajax({
        type: "GET",
        url: url,
        success: function (result) {
            var questions = result.questions;
            var html = "";
            var teraBody = $("#teraBody");
            teraBody.empty()
            for(var i = 0 ; i < questions.length  ; i++){
                var curRes =  questions[i];
                var no = i + 1;
                var targetUrl = "'" + curRes.url +"'";
                html = html + '<tr onclick="onTr(' + targetUrl + ')">'
                            +   "<td style='width:5%'>" + no + "</td>"
                            +   "<td style='width:45%'>" + curRes.title + "</td>"
                            + "</tr>"
            }
            teraBody.append(html);
            console.log(result);
        }
    });
}

function onTr(url){
    window.open(url, '_blank');
}