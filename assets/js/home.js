$(document).ready(function() {
    $('.online-user').on('click', '.chat-link', function() {
        var userId = $(this).parents('tr').attr('id');
        var chatClass = "chat-box-" + userId;
        newChat(chatClass, $(this).html());
        $.get("/message/old", {
            userId: userId
        }).done(function(data) {
            if (!data.error) {
                for (var i = (data.length - 1); i > -1; i--) {
                    var date = new Date(data[i].createdAt);
                    var meta = date.toLocaleTimeString("en-US", {
                        hour12: true,
                        hour: "numeric",
                        minute: "numeric"
                    });
                    appendMsg("." + chatClass, data[i].message, meta, true, data[i].isLeft);
                }
            }
        });
    });
});
