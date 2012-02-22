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

for (var i = 0; i < elements.length; i++) {
    //Unlock the readonly and password fields
    if (elements[i].readOnly || elements[i].type == "password") {
        elements[i].readOnly = false;
        //NULL ALL THE EVENTS! 
        for (var n = 0; n < events.length; n++) {
            elements[i]["on"+events[n]] = null;
        }
    }
}
