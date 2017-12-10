// homer position
var homerPosition = {x:0, y:0};

// homerSpeed
var homerVelocity = 7;
var homerHunger = 0;

var timer= 0;
var homerState = 'normal';

// count the timer
setInterval(function(){
    timer+=1;

    // allow homer to evolve

    // change the homer state and picture, depending on the game timer
    if(timer >= 2000 && homerState == 'normal'){
        document.getElementById('homer').src='./pictures/homerNormalAngry.jpg';
        homerState = 'normalAngry';    
    }

    else if(timer > 20000  && homerState == 'normalAngry'){
        document.getElementById('homer').src='./pictures/homerAngry.jpg';
        homerState = 'angry';
    }

    else if(timer > 75000 && homerState == 'angry'){
        let random = Math.round(Math.random() * 1);

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

// user update to homer
function updateHomer(){
    homerHunger=document.getElementById('homer-bar').value;
    homerHunger=parseInt(homerHunger);
}

function homerMoves(){
    var homerObj = document.querySelector('#homer').style;
    var donutObj = document.querySelector('#mama-donut').style;
    
    // the logic is the same as the donut following the cursor. But instead of the cursor, the donut
    if(homerPosition.x < mamaDonut.x)
        homerPosition.x+=homerVelocity+homerHunger;
    else
        homerPosition.x-=homerVelocity+homerHunger;
    if(homerPosition.y < mamaDonut.y)
        homerPosition.y+=homerVelocity+homerHunger;
    else
        homerPosition.y-=homerVelocity+homerHunger;

/*
    if(homerPosition.x == mamaDonut.x && homerPosition.y == mamaDonut.y)
        alert('Donut has been eaten');
*/
    // set css
    homerObj.left=homerPosition.x + 'px';
    homerObj.top=homerPosition.y + 'px';

    checkHomerCollision();
}