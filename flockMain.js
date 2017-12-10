// set each frame
setInterval(moveMarkedDonuts, 30);
setInterval(homerMoves, 100);

setInterval(function(){
    //mamaDonut.sizeX +=0.1;    
   // document.querrySelector('#mama-donut').style.width = mamaDonut.sizeX + "%";
}, 100);

function makeSound(){
    var audio =new Audio('./sentryGoUp.wav');
    audio.play();
}

function drawKamikazeSpells(donutMagics){
    var createdSpells = [];
    for(var i = 0; i < kamikazeSpellInfo.length; i++){
        var spell = document.createElement('img');
        var info = document.createElement('div');

        info.textContent = kamikazeSpellInfo[i];
        info.style.marginBottom = '2em';
        info.style.display = 'none';
        info.style.background = '2px solid red';
        
        spell.src = './icon.png';
        spell.style.marginLeft = '5px';
        spell.style.marginRight = '5px';        

        createdSpells.push({img:spell, info:info});

        spell.onmouseover = function(){
            info.style.display = 'inline';
        }
        spell.onmouseleave = function(){
            info.style.display = 'none';
        }

        donutMagics.appendChild(info);
        donutMagics.appendChild(spell);     
    }
}

// key logic
function demarkDonuts(){
    // first remove the border each donut has
    var curDonut;
    for(var i = 0; i < markedDonuts.length; i++){
        curDonut = markedDonuts[i];
        if(curDonut.type == 'mama')
            document.querySelector('#mama-donut').style.border = '';

        else
            document.querySelectorAll('.donut-children')[curDonut.index].style.border = '';
    }

    markedDonuts = [];

    // clear the footer
    document.querySelector('#footer').style.display='none';
    var donutMagics = document.querySelector('#donut-magics');
    while(donutMagics.firstChild)
        donutMagics.removeChild(donutMagics.firstChild);
    var armyCounter = document.querySelector('#army-counter');
    while(armyCounter.firstChild)
        armyCounter.removeChild(armyCounter.firstChild);
}

function setDonutBorder(){
    var curDonut;
    var donutCounter = [0,0,0,0]; // todo: if there are more classes you should do it [{class:{counter:0}},...]
    for(var i = 0; i < markedDonuts.length; i++){
        curDonut = markedDonuts[i];
        if(curDonut.type == 'mama'){
            donutCounter[0]++;
            document.querySelector('#mama-donut').style.border = '2px solid black';
        }
        else{
            document.querySelectorAll('.donut-children')[curDonut.index].style.border = '2px solid black';
            if(curDonut.profession == 'kamikaze')
                donutCounter[1]++;
            else if(curDonut.profession == 'engineer')
                donutCounter[2]++;
            else if(curDonut.profession == 'wizard')
                donutCounter[3]++;
        }
    }

    // add a label with the donut magics
    document.querySelector('#footer').style.display = 'block';    
    
    var donutMagics = document.querySelector('#donut-magics');
   
    // the UI will show only the spells of the first marked donut
    if(markedDonuts[0].profession == 'kamikaze'){
        drawKamikazeSpells(donutMagics);
    }

    else if(markedDonuts[0].profession == 'engineer'){
        //todo
        drawKamikazeSpells(donutMagics);
        
    }

    else if(markedDonuts[0].profession == 'wizard'){
        //todo
        drawKamikazeSpells(donutMagics);
        
    }
    var armyCounter = document.querySelector('#army-counter');
    var liTextContent;

    for(var i = 0; i < donutCounter.length; i++){
            if(donutCounter[i] == 0)
                continue;

            if(i == 0)
                liTextContent = ' mama ';
            else if(i >= 1)
                liTextContent = ' ' + donutProfessions[i-1];
            
             var li = document.createElement('li');
    
            li.textContent = liTextContent + ' ' + donutCounter[i] + ' ';
            armyCounter.appendChild(li);
    }
}

document.onkeydown = function(event){
    event = event || window.event;
    var charCode = event.keyCode || event.which;
    var keyValue = String.fromCharCode(charCode).toLowerCase();

    // stop following the cursor
    if(keyValue == 'z')
        canFollowCursor = !canFollowCursor;
    // mark all
    else if(keyValue == 'x'){ 
        // clear the marked field
        demarkDonuts();

        // mark all donuts
        for(var i = 0; i < donutChildren.length; i++)
            markedDonuts.push(donutChildren[i]);

        markedDonuts.push(mamaDonut);        

        setDonutBorder();
    }

    // demark all
    else if(keyValue == 's'){
        demarkDonuts();
    }

    else if(keyValue == '1'){
        event.preventDefault();     
        if(event.ctrlKey && firstSquad){
            firstSquad = markedDonuts;
        }
        else{
            demarkDonuts();
            markedDonuts = firstSquad;
            setDonutBorder();
        }
    }

    else if(keyValue == '2'){
        event.preventDefault();     
        if(event.ctrlKey && secondSquad){
            secondSquad = markedDonuts;
        }
        else{
            demarkDonuts();
            markedDonuts = secondSquad;
            setDonutBorder();
        }
    }
}

var hasClicked;
var firstClickTime = 0;

window.onmousemove = updateCursor;
setInterval(function(){
   if(hasClicked)
         firstClickTime++;
}, 1000)

window.onmousedown = function(eventt){
    if(!hasClicked)
        hasClicked = true;

    else{
            hasClicked = false;
            
            if(firstClickTime <= 1){
                console.log("double clicked");
                firstClickTime = 0;
                return;
            }
            else
                firstClickTime = 0;
    }

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