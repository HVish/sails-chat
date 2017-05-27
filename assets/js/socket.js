$(document).ready(function () {
    var socket = io.sails.connect();
    socket.on("connect", function () {
        socket.get("/join/user", function (data) {
            console.log(data);
        });
    });
    socket.on("testConnection", function (data) {
        console.log(data);
    });
    socket.on("login", function (data) {
        var tbody = $('.online-user tbody');
        var row = $('<tr id="' + data.userId + '"/>');
        row.append("<td>" + (tbody.find('tr').length + 1) + "</td>");
        row.append('<td><a class="chat-link">' + data.name + '</a></td>');
        tbody.append(row);
    });
    socket.on("logout", function (data) {
        $('.online-user tbody tr[id="' + data.userId + '"]').remove();
    });
    socket.on("newMsg", function (data) {
        var date = new Date(data.createdAt);
        var meta = date.toLocaleTimeString("en-US", {
            hour12: true,
            hour: "numeric",
            minute: "numeric"
        });
        appendMsg(".chat-box-" + data.fromUser, data.message, meta, true, true);
    });
    $("body").on("sendMsg", function (e) {
        socket.post("/message/new", e.msgParams);
    });
});
