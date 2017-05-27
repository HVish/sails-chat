var setChatTitle;
var appendMsg;
var newChat;
var sendMsg;
$(document).ready(function() {
    newChat = function (chatBoxClass, title) {
        var dom = '<div class="chat-box ' + chatBoxClass + '">\
            <div class="chat-title">\
                <div class="name">' + title + '</div>\
                <button type="button" class="chat-close close" aria-label="Close">\
                    <span aria-hidden="true">&times;</span>\
                </button>\
            </div>\
            <div class="chat-body"></div>\
            <div class="chat-footer">\
                <div id="message-input" contenteditable="true" placeholder="Type your message.."></div>\
                <button type="button" class="btn btn-default" name="button"></button>\
            </div>\
        </div>';
        $('body .chat-box').remove();
        $('body').append(dom);
        $('body .' + chatBoxClass).keypress(function (e) {
            if ((e.keyCode || e.which) == 13 && !e.shiftKey) {
                sendMsg("." + chatBoxClass);
                return false;
            }
        });
    }
    setChatTitle = function(chatBox, title) {
        $(chatBox).find(".chat-title .name").html(title);
    }
    appendMsg = function(chatBox, msg, meta, isScroll, isLeft) {
        var lastMsg = $(chatBox).find(".chat-body div:last-child");
        var side = isLeft ? "left" : "right";
        if (lastMsg.hasClass(side)) {
            lastMsg.find(".messages").append('<li><span class="message">' + msg +
                '</span><span class="meta">' + meta + '</span></li>');
        } else {
            $(chatBox).find('.chat-body').append('\
            <div class="' + side + '">\
                <ul class="messages">\
                    <li>\
                        <span class="message">' + msg + '</span>\
                        <span class="meta">' + meta + '</span>\
                    </li>\
                </ul>\
            </div>');
        }
        if (isScroll) {
            var chatBody = $(chatBox).find('.chat-body');
            chatBody.animate({
                scrollTop: chatBody.height()
            }, 500);
        }
    }
    prependMsg = function(chatBox, msg, meta, isLeft) {
        var firstMsg = $(chatBox).find(".chat-body div:first-child");
        var side = isLeft ? "left" : "right";
        if (firstMsg.hasClass(side)) {
            firstMsg.find(".messages").prepend('<li><span class="message">' + msg +
                '</span><span class="meta">' + meta + '</span></li>');
        } else {
            $(chatBox).find('.chat-body').prepend('\
            <div class="' + side + '">\
                <ul class="messages">\
                    <li>\
                        <span class="message">' + msg + '</span>\
                        <span class="meta">' + meta + '</span>\
                    </li>\
                </ul>\
            </div>');
        }
    }
    sendMsg = function (chatBox) {
        var msg = $(chatBox).find("#message-input").html();
        if (msg) {
            var date = new Date();
            var meta = date.toLocaleTimeString("en-US", {
                hour12: true,
                hour: "numeric",
                minute: "numeric"
            });
            appendMsg(chatBox, msg, meta, true);
            var event = $.Event( "sendMsg" );
            event.msgParams = {
                message: msg,
                createdAt: date,
                toUser: chatBox.split("-")[2]
            }
            $('body').trigger(event);
            $(chatBox).find("#message-input").html('');
        }
    }
    $("body").on("click", ".chat-close", function () {
        $(this).parents('.chat-box').remove();
    });

});
