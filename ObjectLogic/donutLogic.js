// user update of the donut
function updateDonut(){
    donutBonus=document.querySelector('#velocity-bar').value;
    donutBonus=parseInt(donutBonus);
}

// user spawns them
function spawnDonuts(){
    // determine if the checkbox is true
    var parentValue = document.querySelector('#child-spawner');

    if(parentValue.value == 1){
        parentValue.value=0;
        return;
    }

    else
        parentValue.value=1;

    // create the two images
    // with size Math.random() * width\height
    var childrenLength = 2;
    var bodyWidth = document.body['clientWidth'];
    var bodyHeight = document.body['clientHeight'];
    
    for(var i = 0; i < childrenLength; i++){
        // initialize the image
        var img = document.createElement('img');
        img.className="donut-children";
        
        // set its size
        var imgX = Math.round(Math.random()*bodyWidth);
        var imgY = Math.round(Math.random()*bodyHeight);
        // set the donut type
        var professionIndex = Math.round(Math.random() * (donutProfessions.length-1));

        img.style.left= imgX+ 'px';
        img.style.top= imgY+ 'px';
        
        // set the donut image, depending on its profession
        if(donutProfessions[professionIndex] == 'kamikaze')
            img.src='./pictures/kamikaze.png';
        else if(donutProfessions[professionIndex] == 'engineer')
            img.src='./pictures/engineer.png';
        else 
            img.src='./pictures/donut.png';

        // due to its marked he should has his border set
        img.style.border = '2px solid black';

        var newChild = {x:imgX, y:imgY, targetX:cursorX, targetY:cursorY,
                        type:'child', index:donutChildren.length, profession:donutProfessions[professionIndex]};
        
        donutChildren.push(newChild);
        markedDonuts.push(newChild);
        document.body.appendChild(img);
        // add to the vector
    }
}

function tryMarkingDonuts(){
    // remove the currently marked elements
    demarkDonuts();
    // and set all elements which were on to off    
    // see if there are marked children donuts
    for(var i = 0; i < donutChildren.length; i++)
        checkMarking(donutChildren[i]);

    // check mama donut
    checkMarking(mamaDonut);

   // console.log("Marked lenghts " + markedDonuts)
}

function checkMarking(curDonut){

    if(((curDonut.x >= markRectangle.x0 && curDonut.x <= markRectangle.x1) || 
        (curDonut.x >= markRectangle.x1 && curDonut.x <= markRectangle.x0))
        && ((curDonut.y >= markRectangle.y0 && curDonut.y <= markRectangle.y1) || 
            (curDonut.y >= markRectangle.y1 && curDonut.y <= markRectangle.y0))){ 
                // mark the donut
                markedDonuts.push(curDonut);

                // check to see what is the type of donut and to acknowledge that he is marked set a border;
                if(curDonut.type == 'child')
                    document.querySelectorAll('.donut-children')[curDonut.index].style.border = '2px solid black';

                else
                    document.querySelector('#mama-donut').style.border = '2px solid black';
            }
}

function IsTargetReached(curDonut){
    
        // set bounds, which simulate colliders
        console.log('foo IsTargetReached');
        var mamaDonut = document.querySelector('#mama-donut');
        var rightBound = mamaDonut.clientWidth/2 + donut.x;
        var leftBound = -mamaDonut.clientWidth/2 + donut.x;
        var topBound = -mamaDonut.clientHeight/4 + donut.y;
        var botBound = mamaDonut.clientHeight/4 + donut.y;
    
      //  console.log(leftBound);
        // if the target is between the bounds then the donut has reached its target
        if(leftBound <= curDonut.targetX && rightBound >= curDonut.targetX &&
            topBound <= curDonut.targetY && botBound >= curDonut.targetY)
            return true;
}


function moveMarkedDonuts(){
    for(var i = 0; i < markedDonuts.length; i++){
        var curDonut = markedDonuts[i],
            obj;

        curDonut.targetX = cursorX;
        curDonut.targetY = cursorY;

        // the donut is moving dependent on the cursorPosition
        if(curDonut.x < curDonut.targetX)
            curDonut.x+=donutVelocity + donutBonus;
        else
            curDonut.x-=donutVelocity + donutBonus;
        if(curDonut.y < curDonut.targetY)
            curDonut.y+=donutVelocity + donutBonus;
        else
            curDonut.y-=donutVelocity + donutBonus;
       
        // take the donut style
        if(curDonut.type == 'mama'){
            obj = document.querySelector('#mama-donut');
            obj=obj.style;
        }
        else{
            obj = document.querySelectorAll('.donut-children')[curDonut.index];
            if(obj)
                obj = obj.style;
            else 
                continue;
        }
        obj.left = curDonut.x + 'px';
        obj.top = curDonut.y  + 'px';
    }

     donutCollision();
}