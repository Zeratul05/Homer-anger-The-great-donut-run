// donut position
var mamaDonut = {x:0, y:0, targetX:cursorX, targetY: cursorY, 
    sizeX: 10, sizeY: 30, type: 'mama'}; // size is in percents

var canFollowCursor = true;
    
// donutSpeed
var donutVelocity = 7;
var donutBonus = 0;
var donutChildren= [];


var donutProffesions = ['warrior', 'engineer', 'kamikaze', 'donutWizard'];

var firstSquad = [];
var secondSquard = [];

var markRectangle = {x0:0, y0:0, x1:0, y1:0, isOn:false};
var markedDonuts = [mamaDonut];