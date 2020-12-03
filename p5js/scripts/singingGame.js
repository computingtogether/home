
// pitch lib https://github.com/cwilso/PitchDetect
let enableBtn;
var x1 =100;
var y1=100;

// we store the music note in this variable
let note = "";

// this is the html element where we grab the music note from
let noteSpan;

var x2;
var y2; 
var score =0;

function setup() {
  var can = createCanvas(400, 400);
  can.parent("p5Container");

  x2 = random(50,350);
  y2 = random(50,350);

  // make a button 
  enableBtn = createButton('Enable Mic');

  // when you press the button, turn on the mic
  // this function comes from the pitch detect lib
  enableBtn.mousePressed(toggleLiveInput);

  // grab the span that contains the note information
  noteSpan = select('#note');

  textSize(48);
}

function draw() {
  background(255);
  
  fill('rgb(0,255,0)');
  rect(x2,y2,20,20);
  fill(255, 204, 0);
  rect(x1,y1,10,10);
  fill(255, 0, 0);
  
  if(note =="F")
  {
   x1 = x1+1; 
  }
  if(note =="A")
  {
   x1 = x1-1; 
  }
  if(note =="D")
  {
   y1 = y1-1; 
  }
  if(note =="C")
  {
   y1 = y1+1; 
  }
  if(x1<0 || x1>400){
    x1=200;
    y1=200;
    
  }
   if(y1<0 || y1>400){
    x1=200;
    y1=200;
    
  }
  
  
  if(x1<x2+10 &&x1>x2-10 && y1<y2+10 && y1>y2-10)
  {
        x2 = random(50,350);
        y2 = random(50,350);
        score++; 
  }
  note = null;

 textSize(40);

  if (noteSpan.html() != "-") 
  {
    note = noteSpan.html();
    text(note, 320, 50);
  }
  
    textSize(20);
    fill(0);
    text("score: " + score,  300, 80);
}