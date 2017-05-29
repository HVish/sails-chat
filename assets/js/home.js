var createChatBox;
$(document).ready(function() {
    createChatBox = function(userId) {
        newChat(userId, $('tr[id="' + userId + '"] a.chat-link').html());
        $.get("/message/old", {
            userId: userId
        }).done(function(data) {
            if (!data.error) {
                for (var i = (data.length - 1); i > -1; i--) {
                    var date = new Date(data[i].createdAt);
                    appendMsg(".chat-box-" + userId, data[i].message, date, true, data[i].isLeft);
                }
            }
        });
    };
    $('.online-user').on('click', '.chat-link', function() {
        var userId = $(this).parents('tr').attr('id');
        createChatBox(userId);
    });
    $("body").on("loadOlderMsg", function(e) {
        $.get("/message/old", e.msgParams).done(function(data) {
            if (!data.error) {
                for (var i = 0; i < data.length; i++) {
                    var date = new Date(data[i].createdAt);
                    prependMsg(".chat-box-" + e.msgParams.userId, data[i].message, date, data[i].isLeft);
                }
            }
            if (data.length == 20) {
                olderMsgTag('.chat-box-' + e.msgParams.userId);
            }
        });
    });
});
