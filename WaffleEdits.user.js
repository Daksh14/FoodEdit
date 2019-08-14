// ==UserScript==
// @name         meh.
// @namespace    https://github.com/Daksh14
// @version      0.6
// @description  Make your last message to meh.
// @author       weegees
// @match        https://chat.stackoverflow.com/rooms/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    if (typeof GM !== 'object') {
        GM = {};
    }

    if (typeof GM_xmlhttpRequest === 'function' && !GM.xmlHttpRequest) {
        GM.xmlHttpRequest = GM_xmlhttpRequest;
    }

    const buttonsContainer = $("#chat-buttons");
    const mehButton = $("<button>");
    mehButton.attr("id", "meh-button").addClass("button").text(".meh").css({
        "position": "relative",
        "background-color": "#C60030",
        "margin-left" : "10px"
    });

    buttonsContainer.append(mehButton);

    mehButton.click(editLastMessage);

    function editLastMessage() {
        const theMessage = 'meh.'
        const fkey = $("#fkey").attr("value");
        const messageElement = $(".monologue.mine").last().find(".message:last");
        const messageId = messageElement.attr("id").split("-")[1];

        const requestSettings = {
            "method": "POST",
            "url": "https://" + window.location.host + "/messages/" + messageId,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "fkey": fkey,
                "text": theMessage
            }
        }
        $.ajax(requestSettings)
    }

})();
