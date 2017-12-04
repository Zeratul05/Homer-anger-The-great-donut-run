function donutCollision(){
    for(var i = 0; i < donutChildren.length; i++){
        var curDonut = donutChildren[i];

        // now check with every children donut from children if they collide
        for(var j = 0; j < donutChildren.length; j++){
            if(i == j)
                continue;
            
            checkOverlap(curDonut, donutChildren[j]);
        }

        // check the main donut
        checkOverlap(curDonut, mamaDonut);
    }
}

function checkOverlap(curDonut, checkedDonut){
    
    // directional bounds
    var rightBound = donut.clientWidth/2 + curDonut.x;
    var leftBound = -donut.clientWidth/2 + curDonut.x;
    var topBound = -donut.clientHeight/4 + curDonut.y;
    var botBound = donut.clientHeight/4 + curDonut.y;

    if(leftBound < checkedDonut.x && rightBound > checkedDonut.x
        && topBound < checkedDonut.y && botBound > checkedDonut.y){
           // console.log("Overlapping has been found");

            // => it is closer to the right border => + rightBound 
            if(Math.abs(checkedDonut.x - leftBound) >= Math.abs(checkedDonut.x - rightBound))
                checkedDonut.x += Math.round(Math.random() * (rightBound/5));
            else
                checkedDonut.x -= Math.round(Math.random() * (rightBound/5));

            // the same but for the y axis
            if(Math.abs(checkedDonut.y - botBound) >= Math.abs(checkedDonut.y - topBound))
                checkedDonut.y += Math.round(Math.random() * (topBound/3));
            else
                checkedDonut.y -= Math.round(Math.random() * (botBound/3));
    }
}

function checkHomerCollision() {
        // directional bounds
    var rightBound = homer.clientWidth/2 + homerPosition.x;
    var leftBound = -homer.clientWidth/2 + homerPosition.x;
    var topBound = -homer.clientHeight/4 + homerPosition.y;
    var botBound = homer.clientHeight/4 + homerPosition.y;
    
    var curDonut;
    for(var i = 0; i < donutChildren.length; i++){
        curDonut = donutChildren[i];
        if(leftBound < curDonut.x && rightBound > curDonut.x &&
            topBound < curDonut.y && botBound > curDonut.y && curDonut.proffesion == 'kamikaze'){
                // if the kamikaze is coming from right
                if(curDonut.x > homerPosition.x)
                    homerPosition.x -= Math.round(Math.random() * (rightBound));
                else if(curDonut.x < homerPosition.x) // => left
                    homerPosition += Math.round(Math.random() * (rightBound));
                
                // now check up and down
                if(curDonut.y  > homerPosition.y)
                    homerPosition.y -= Math.round(Math.random() * (botBound));
                else if(curDonut.y < homerPosition.y)
                    homerPosition.y += Math.round(Math.random() * (topBound));

                // now the kamikaze must be destroyed
                var classChildren = document.querySelectorAll('.donut-children');
                
                // check if it is marked
                for(var j = 0; j < markedDonuts.length; j++){
                    if(markedDonuts[j].index == curDonut.index){
                        markedDonuts.splice(j, 1);
                        continue;
                    }
                }

                // take the donutChildren class
                classChildren[i].parentNode.removeChild(classChildren[i]);
                donutChildren.splice(i, 1);
                for(var j = i; j < donutChildren.length; j++){
                    donutChildren[j].index--;
                }
                i--;
        }
    }
}