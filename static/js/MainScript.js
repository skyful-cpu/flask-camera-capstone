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
        sendVoiceRequest();
    }).fail(function(xhr, status, error) {
        console.log("error occured");
    });
}

function sendVoiceRequest() {
    const json_dict = {"voice": "request"};
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

console.log("connect");
setTimeout(sendGestureRequest, 2000);