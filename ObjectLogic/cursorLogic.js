
// cursor position
var cursorX;
var cursorY;

function scrollWin(event){
    if(event.x >= window.innerWidth / 10)
        window.scrollBy(window.innerWidth, 0);
    if(event.y >= window.innerHeight / 2)
        window.scrollBy(0, window.innerHeight);
}

// get mouseX
function mouseX(event){
    if(!event)
        event = window.event;
    if(event.pageX)
        return event.pageX;
    else if(event.clientX)
        return event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    else 
        return 0;
}

// get mouseY
function mouseY(event){
    if(!event)
        event = window.event;
    
    if(event.pageY)
        return event.pageY;
    else if(event.clientY)
        return event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    else 
        return 0;
}

function updateCursor(event){
    // check the scroll bounds
    scrollWin(event);

    // user controls this by the key z check keypress function
    if(!canFollowCursor)
        return;

    // update the cursor
    cursorX = event.pageX;
    cursorY = event.pageY;
}