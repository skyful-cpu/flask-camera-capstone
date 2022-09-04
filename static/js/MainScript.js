var speechResult = document.getElementById("speech-result")

function sendGestureRequest() {
    const json_dict = {"gesture": "request"};
    const stringify = JSON.stringify(json_dict);

    $.ajax({
        type: "POST",
        url: "/gesture",
        contentType: "application/json",
        data: stringify
    }).done(function(json_data) {
        console.log(json_data);
        startAnnyang();
    }).fail(function(xhr, status, error) {
        console.log("error occured");
    });
}

function startAnnyang() {
    if (annyang) {
        annyang.setLanguage("ko");
        annyang.start();
        console.log("start annyang record");

        setTimeout(function() {
            annyang.pause();
            console.log("pause annyang record");
        }, 5000);
    }
}

function sendVoiceRequest(speechResult) {
    const json_dict = {"speech": speechResult};
    const stringify = JSON.stringify(json_dict);

    $.ajax({
        type: "POST",
        url: "/voice",
        contentType: "application/json",
        data: stringify
    }).done(function(json_data) {
        console.log(json_data);
        sendGestureRequest();
    }).fail(function(xhr, status, error) {
        console.log("error occured");
    });
}

annyang.addCallback("result", function(userSaid) {
    speechResult.innerHTML = userSaid[0];
    sendVoiceRequest(userSaid[0]);

    setTimeout(function() {
        speechResult.innerHTML = "";
    }, 3000);
})

console.log("connect");
setTimeout(sendGestureRequest, 2000);