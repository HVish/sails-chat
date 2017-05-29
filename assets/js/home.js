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
                    appendMsg("." + chatClass, data[i].message, date, true, data[i].isLeft);
                }
            }
        });
    });
});
