// set each frame
setInterval(moveMarkedDonuts, 30);
setInterval(homerMoves, 100);

setInterval(function(){
    //mamaDonut.sizeX +=0.1;    
   // document.querrySelector('#donut').style.width = mamaDonut.sizeX + "%";
}, 100);

// key logic

document.onkeydown = function(event){
    event = event || window.event;
    console.log(event.ctrlKey);
    var charCode = event.keyCode || event.which;
    var keyValue = String.fromCharCode(charCode).toLowerCase();

    // stop following the cursor
    if(keyValue == 'z')
        canFollowCursor = !canFollowCursor;
    // mark all
    else if(keyValue == 'x'){ 
        // clear the marked field
        markedDonuts = [];

        // mark all donuts
        markedDonuts.push(mamaDonut);
        
        for(var i = 0; i < donutChildren.length; i++){
            markedDonuts.push(donutChildren[i]);
        }
    }

    // demark all
    else if(keyValue == 's'){
        markedDonuts = [];
    }

    else if(keyValue == '1'){
        event.preventDefault();     
        console.log(event);
        if(event.ctrlKey){
            firstSquad = markedDonuts;
            console.log('saved');
        }
        else{
            console.log('logging');
            markedDonuts = firstSquad;
        }
    }

    else if(keyValue == '2'){
        event.preventDefault();     
        console.log(event);
        if(event.ctrlKey){
            secondSquad = markedDonuts;
            console.log('saved');
        }
        else{
            console.log('logging');
            markedDonuts = secondSquad;
        }
    }
}

window.onmousemove = updateCursor;

window.onmousedown = function(eventt){
    console.log("Started marking");
    markRectangle.isOn = true;
    markRectangle.x0 = event.clientX;
    markRectangle.y0 = event.clientY;
}

window.onmouseup = function(event){
    if(markRectangle.isOn){
        // set the x1 and y1 values then using the x0 and y0 find all elements consisted in the marked rectangle
        // after it the mark values are not needed and will only hinder when changing them
        markRectangle.x1 = event.clientX;
        markRectangle.y1 = event.clientY;
        tryMarkingDonuts();
        markRectangle.x0 = 0;
        markRectangle.y0 = 0;
        markRectangle.x1 = 0;
        markRectangle.y1 = 0;
    }
}