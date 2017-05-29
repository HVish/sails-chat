var setChatTitle;
var appendMsg;
var newChat;
var sendMsg;
var olderMsgTag;
$(document).ready(function() {
    newChat = function(userId, title) {
        var chatBoxClass = "chat-box-" + userId;
        var dom = '<div class="chat-box ' + chatBoxClass + '" data-userId="' + userId + '">\
            <div class="chat-title">\
                <div class="name">' + title + '</div>\
                <button type="button" class="chat-close close" aria-label="Close">\
                    <span aria-hidden="true">&times;</span>\
                </button>\
            </div>\
            <div class="chat-body">\
                <div class="meta-center">\
                    <a class="load-older-msg">Load older messages</a>\
                </div>\
            </div>\
            <div class="chat-footer">\
                <div id="message-input" contenteditable="true" placeholder="Type your message.."></div>\
                <div class="chat-send"></div>\
            </div>\
        </div>';
        $('body .chat-box').remove();
        $('body').append(dom);
        $('body .' + chatBoxClass).keypress(function(e) {
            if ((e.keyCode || e.which) == 13 && !e.shiftKey) {
                sendMsg("." + chatBoxClass);
                return false;
            }
        });
        $('body .' + chatBoxClass + ' .chat-send').click(function() {
            sendMsg("." + chatBoxClass);
        });
        $('body').on('click', '.' + chatBoxClass + ' .load-older-msg', function() {
            var event = $.Event("loadOlderMsg");
            event.msgParams = {
                userId: userId,
                skip: $('.' + chatBoxClass + ' .chat-body li').length
            }
            $(this).parents('div.meta-center').remove();
            $('body').trigger(event);
        });
    }

    olderMsgTag = function(chatBox) {
        $(chatBox + ' .chat-body').prepend(
            '<div class="meta-center">\
                <a class="load-older-msg">Load older messages</a>\
            </div>'
        );
    }

    setChatTitle = function(chatBox, title) {
        $(chatBox).find(".chat-title .name").html(title);
    }
    appendMsg = function(chatBox, msg, date, isScroll, isLeft) {
        var lastMsg = $(chatBox).find(".chat-body div:last-child");
        var side = isLeft ? "left" : "right";
        var meta = date.toLocaleTimeString("en-US", {
            hour12: true,
            hour: "numeric",
            minute: "numeric"
        });
        var prevDate = $(chatBox + " .chat-body div:last-child li:last-child").attr("data-date");
        prevDate = new Date(prevDate);
        prevDate.setHours(0, 0, 0, 0);

        var tempNow = new Date(date);
        tempNow.setHours(0, 0, 0, 0);

        if (prevDate.toString() != tempNow.toString()) {
            $(chatBox).find('.chat-body').append('<div class="meta-center">' +
                date.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }) +
                '</div>');
        }

        if (lastMsg.hasClass(side)) {
            lastMsg.find(".messages").append(
                '<li data-date="' + date + '"><span class="message">' + msg +
                '</span><span class="meta">' + meta + '</span></li>');
        } else {
            $(chatBox).find('.chat-body').append('\
            <div class="' + side + '">\
                <ul class="messages">\
                    <li data-date="' + date + '">\
                        <span class="message">' + msg + '</span>\
                        <span class="meta">' + meta + '</span>\
                    </li>\
                </ul>\
            </div>');
        }
        if (isScroll) {
            var chatBody = $(chatBox).find('.chat-body');
            chatBody.animate({
                scrollTop: chatBody.prop("scrollHeight")
            }, 0);
        }
    }
    prependMsg = function(chatBox, msg, date, isLeft) {
        var firstMsg = $(chatBox).find(".chat-body div:nth-child(2)");
        var side = isLeft ? "left" : "right";
        var meta = date.toLocaleTimeString("en-US", {
            hour12: true,
            hour: "numeric",
            minute: "numeric"
        });

        var nextDate = firstMsg.find("li:first-child").attr("data-date");
        nextDate = new Date(nextDate);
        nextDate.setHours(0, 0, 0, 0);

        var tempNow = new Date(date);
        tempNow.setHours(0, 0, 0, 0);

        if (nextDate.toString() == tempNow.toString()) {
            $(chatBox + ' .chat-body div:first-child').remove();
        }

        if (firstMsg.hasClass(side)) {
            firstMsg.find(".messages").prepend(
                '<li data-date="' + date + '"><span class="message">' + msg +
                '</span><span class="meta">' + meta + '</span></li>');
        } else {
            $(chatBox).find('.chat-body').prepend('\
            <div class="' + side + '">\
                <ul class="messages">\
                    <li data-date="' + date + '">\
                        <span class="message">' + msg + '</span>\
                        <span class="meta">' + meta + '</span>\
                    </li>\
                </ul>\
            </div>');
        }

        $(chatBox).find('.chat-body').prepend(
            '<div class="meta-center">' +
            date.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }) +
            '</div>'
        );
    }

    sendMsg = function(chatBox) {
        var msg = $(chatBox).find("#message-input").html();
        if (msg) {
            var date = new Date();
            appendMsg(chatBox, msg, date, true);
            var event = $.Event("sendMsg");
            event.msgParams = {
                message: msg,
                createdAt: date,
                toUser: $(chatBox).attr("data-userId")
            }
            $('body').trigger(event);
            $(chatBox).find("#message-input").html('');
        }
    }
    $("body").on("click", ".chat-close", function() {
        $(this).parents('.chat-box').remove();
    });

});
