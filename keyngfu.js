/*
 * KeyngFu
 * http://alotaiba.github.com/KeyngFu
 * 
 * KeyngFu is a bookmarklet that re-enables readonly fields
 * on a web page, and shuts down all field's associated events,
 * such as displaying virtual keyboards.
 * 
 * Copyright (c) 2012 Abdulrahman Saleh Al-Otaiba
 * Licensed under GPLv3.
 */

var elements = document.getElementsByTagName('input');

//Events that need to be nulled
var events = ['blur', 'focus', 'click', 'change', 'keydown', 'keyup', 'keypress'];

var count = 0;
for (var i = 0; i < elements.length; i++) {
    //Unlock the readonly and password fields
    if (elements[i].readOnly) {
        elements[i].readOnly = false;
        //NULL ALL THE EVENTS! 
        for (var n = 0; n < events.length; n++) {
            elements[i]["on"+events[n]] = null;
        }
        count++;
    }
}

//Provide some feedback to the user
if (count) {
    var body = document.body;
    //Workaround for a stupid bug on Chrome on Mac, where it crashes for any value that has percent(%) sign.
    var width = window.innerWidth + "px;";
    var style = "font-size:20px;color:#000;background:#FFFF00;text-align:center;padding:10px 0;position:fixed;border:1px solid #000;z-index:100000;direction:ltr;font-weight:bold;width:" + width;
    var flash_message = document.createElement("div");
    flash_message.setAttribute("style", style);
    flash_message.appendChild(document.createTextNode("Fields have been KeyngFu\u0027d!"));
    body.insertBefore(flash_message, body.firstChild);
    flash_message.style.opacity = flash_message.style.opacity || 1;
    
    //Fede out flash message div
    //13ms is jQuery's default intervalue, roughly equals to 77 calls/second
    var interval = 13;
    var duration = 2500
    var update_value = (duration/interval);
    var fade_out = setInterval(function(){
        if (flash_message.style.opacity <= 0) {
            flash_message.parentNode.removeChild(flash_message);
            clearInterval(fade_out);
        } else {
            flash_message.style.opacity -= (1/update_value);
        }
     }, interval);
} else {
    alert("There are no fields to re-enable!");
}