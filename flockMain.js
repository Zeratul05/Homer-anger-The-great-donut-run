// donut position
var donutX = 0;
var donutY = 0;
// homer position
var homerX = 0;
var homerY = 0;

// cursor position
var cursorX;
var cursorY;

// donutSpeed
var donutVelocity = 7;
var donutBonus = 0;
var donutChildren= [];

// homerSpeed
var homerVelocity = 7;
var homerHunger = 0;

var timer= 0;
var homerState = 'normal';

// get mouseX
function mouseX(evt){
    if(!evt)
        evt = window.event;
    if(evt.pageX)
        return evt.pageX;
    else if(evt.clientX)
        return evt.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    else 
        return 0;
}

// get mouseY
function mouseY(evt){
    if(!evt)
        evt = window.event;
    
    if(evt.pageY)
        return evt.pageY;
    else if(evt.clientY)
        return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    else 
        return 0;
}

function updateCursor(evt){
    cursorX = evt.pageX;
    cursorY = evt.pageY;
}

// user update of the donut
function updateDonut(){
    donutBonus=document.getElementById('velocity-bar').value;
    donutBonus=parseInt(donutBonus);
}

// user update to homer
function updateHomer(){
    homerHunger=document.getElementById('homer-bar').value;
    homerHunger=parseInt(homerHunger);
}

// user spawns them
function spawnDonuts(){
    // determine if the checkbox is true
    var parentValue = document.getElementById('child-spawner');

    if(parentValue.value == 1){
        parentValue.value=0;
        return;
    }
    else
        parentValue.value=1;

    // create the two images
    var childrenLength = 2;
    var bodyWidth = document.body['clientWidth'];
    var bodyHeight = document.body['clientHeight'];
    
    for(var i = 0; i < childrenLength; i++){
        // initialize the image
        var img = document.createElement('img');
        img.className="donut-children";
        img.src='./pictures/donut.png';
        
        var imgX = Math.round(Math.random()*bodyWidth);
        var imgY = Math.round(Math.random()*bodyHeight);
    
        img.style.left= imgX+ 'px';
        img.style.top= imgY+ 'px';

        donutChildren.push({x:imgX, y:imgY});
        document.body.appendChild(img);
        // add to the vector
    }
}

function homerMoves(){
    var homerObj = document.getElementById('homer').style;
    var donutObj = document.getElementById('donut').style;

    // the logic is the same as the donut following the cursor. But instead of the cursor, the donut
    if(homerX < donutX)
        homerX+=homerVelocity+homerHunger;
    else
        homerX-=homerVelocity+homerHunger;
    if(homerY < donutY)
        homerY+=homerVelocity+homerHunger;
    else
        homerY-=homerVelocity+homerHunger;

/*
    if(homerX == donutX && homerY == donutY)
        alert('Donut has been eaten');
*/
    // set css
    homerObj.left=homerX + 'px';
    homerObj.top=homerY + 'px';
}

function followCursor(){
    var obj = document.getElementById('donut').style;

    // the donut is moving dependent on the cursorPosition
    if(donutX < cursorX)
        donutX+=donutVelocity + donutBonus;
    else
        donutX-=donutVelocity + donutBonus;
    if(donutY < cursorY)
        donutY+=donutVelocity + donutBonus;
    else
        donutY-=donutVelocity + donutBonus;
        
    // set css
    obj.left = donutX + 'px';
    obj.top = donutY + 'px';
}

    // all the donut children must move
function moveChildren(){

    for(var i = 0; i < donutChildren.length; i+=1){
        var donutChild = donutChildren[i];

        if(donutChild.x < cursorX)
            donutChild.x+=donutVelocity+donutBonus;
        else
            donutChild.x-=donutVelocity+donutBonus;
        if(donutChild.y < cursorY)
            donutChild.y+=donutVelocity+donutBonus;
        else
            donutChild.y-=donutVelocity-donutBonus;
        
        var childStyle = document.getElementsByClassName('donut-children')[i].style;
        childStyle.left=donutChild.x+'px';
        childStyle.top=donutChild.y+'px';
    }
}

setInterval(followCursor, 30);
setInterval(homerMoves, 100);
setInterval(moveChildren, 30);

// count the timer
setInterval(function(){
    timer+=1;

    if(timer >= 2000 && homerState == 'normal'){
        document.getElementById('homer').src='./pictures/homerNormalAngry.jpg';
        homerState = 'normalAngry';    
    }

    else if(timer > 20000  && homerState == 'normalAngry'){
        document.getElementById('homer').src='./pictures/homerAngry.jpg';
        homerState = 'angry';
    }

    else if(timer > 75000 && homerState == 'angry'){
        let random = Math.random() * 1;

        if(random){
            document.getElementById('homer').src='./pictures/homerUltraAngry.jpg';         
            homerState = 'homerdantium';
        }
        else{
            document.getElementById('homer').src='./pictures/homeroHulk.png';
            homerState='homerohulk';
        }
    }

}, 1);

document.onmousemove=updateCursor;