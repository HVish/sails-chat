$(document).ready(function () {
    $('.online-user').on('click', '.chat-link', function () {
        var chatClass = "chat-box-" + $(this).parents('tr').attr('id');
        newChat(chatClass, $(this).html());
    });
});
