var tough2 = choseTough();
// index 0 (0,1)       index 1 (0,2) 
var easy7 = choseEasy();
// index 0 (1,1)       index 1 (1,2)      index 2 (2,2)   
// index 3 (2,1)       index 4 (0,0)      index 5 (1,0)   
// index 6 (2,0)  

var resetButton;
var words;
var possibles = [];
var totalPossible;
var input;
var numToGuess;
var points;


function preload() {
  words = loadTable("/home/p5js/scripts/dictionary.csv", 'csv');

}

function setup() {
  var can = createCanvas(450, 450);
  input = createInput();
  input.size(200);
  resetButton = createButton('Reset');
  can.parent('p5Container');
  input.parent('p5Container');
  resetButton.position(20, 20);
  input.position(72, 400);
  resetButton.parent('p5Container');
  points = 0;

  reset();


  console.log(possibles);
}

function draw() {
  background(240);
  textSize(32);

  fill(outerColor(4));
  rect(83, 90, 90, 90, 20, 0, 0, 0); //  (0,0)
  fill(outerColor(5));
  rect(83, 180, 90, 90, 0, 0, 0, 0); // (1,0)
  fill(outerColor(6));
  rect(83, 270, 90, 90, 0, 0, 0, 20); // (2,0)

  fill(toughColor(0));
  rect(173, 90, 90, 90, 0, 0, 0, 0); //  (0,1)
  fill(innerColor());
  rect(173, 180, 90, 90, 0, 0, 0, 0); //  (1,1)
  fill(outerColor(3));
  rect(173, 270, 90, 90, 0, 0, 0, 0); // (2,1)

  fill(toughColor(1));
  rect(263, 90, 90, 90, 0, 20, 0, 0); // (0,2)
  fill(outerColor(1));
  rect(263, 180, 90, 90, 0, 0, 0, 0); // (1,2)
  fill(outerColor(2));
  rect(263, 270, 90, 90, 0, 0, 20, 0); // (2,2)

  fill(0, 0, 0);
  text(tough2[0], 210, 150);
  text(tough2[1], 300, 150);

  text(easy7[6], 120, 330);   //vowel
  text(easy7[5], 120, 240);    //vowel
  text(easy7[4], 120, 150);     //vowel

  text(easy7[3], 210, 330);
  text(easy7[2], 300, 330);
  text(easy7[1], 300, 240);


  fill(255, 0, 0);
  text(easy7[0], 210, 240);       //center letter
  fill(0, 0, 0);

  textSize(16);

  fill(200, 100, 0);
  text(points + "  points ", 350, 417);

  fill(0);
  text(totalPossible + " possible words", 160, 35);
  text(numToGuess + "  left to guess ", 160, 65);
  text("guess: ", 20, 417);

  resetButton.mousePressed(reset);

  if (keyIsDown(13)) {
    if (!checkGuess())
      input.value('');

  }

  if (numToGuess == 0)
    reset();

  var element = document.getElementById("foundWords");
  element.scrollTop = element.scrollHeight;
}

function choseTough() {
  var temp = ["b", "g", "j", "k", "p", "x", "y", "z"];
  var ret = [];
  while (ret.length < 2) {
    var num = Math.trunc(Math.random() * temp.length);
    ret.push(temp[num]);
    temp.splice(num, 1);
  }
  return ret;
}

function choseEasy() {
  var easy = ["c", "d", "f", "h", "l", "m", "n", "q", "r", "s", "t", "v"];
  var vowel = ["a", "e", "i", "o", "u"];
  var ret = [];
  while (ret.length < 4) {
    var num = Math.trunc(Math.random() * easy.length);
    ret.push(easy[num]);
    easy.splice(num, 1);
  }
  for (var i = 0; i < ret.length; i++) {
    if (ret[i] == "q") {
      ret.push(vowel.pop());
    }
  }
  if (ret.length == 5) {
    var num = Math.trunc(Math.random() * vowel.length);
    ret.push(vowel[num]);
    vowel.splice(num, 1);
  }
  while (ret.length < 7) {
    var num = Math.trunc(Math.random() * vowel.length);
    ret.push(vowel[num]);
    vowel.splice(num, 1);
  }
  return ret;
}

function findPossibleWords() {

  for (var i = 0; i < words.getRowCount(); i++) {
    const w = words.getString(i, 0);

    var goOn = true;

    for (var r = 0; r < w.length; r++) {
      var sum = 0;

      for (var h = 0; h < 2; h++) {
        sum += w.charAt(r).indexOf(tough2[h]);
      }
      for (var f = 0; f < 7; f++) {
        sum += w.charAt(r).indexOf(easy7[f]);
      }

      if (sum == -9) {
        goOn = false;
        break;
      }
    }

    if (goOn && w.indexOf(easy7[0]) != -1) {
      possibles.push(w);
    }
  }

}

function reset() {
  tough2 = choseTough();
  easy7 = choseEasy();
  possibles = [];
  findPossibleWords();
  console.log(possibles);
  totalPossible = possibles.length;
  numToGuess = Math.trunc(totalPossible / 10);
  if (numToGuess > 10)
    numToGuess = 10;
  if (numToGuess == 0)
    numToGuess = 1;
  // document.getElementById('foundWords').innerHTML = '';

}



function checkGuess() {
  for (var y = 0; y < possibles.length; y++) {
    if (possibles[y] == input.value()) {
      document.getElementById('foundWords').innerHTML += possibles[y] + "<br />";
      numToGuess--;
      points += input.value().length;
      possibles.splice(y, 1);
      input.value('');
      return true;
    }
  }
  return false;
}



function outerColor(y) {
  for (var b = 0; b < input.value().length; b++) {
    if (input.value().charAt(b) == easy7[y])
      return color(120, 120, 255);;
  }
  return color(200, 200, 240);
}

function toughColor(y) {
  for (var b = 0; b < input.value().length; b++) {
    if (input.value().charAt(b) == tough2[y])
      return color(120, 120, 255);;
  }
  return color(200, 200, 240);
}

function innerColor() {
  for (var b = 0; b < input.value().length; b++) {
    if (input.value().charAt(b) == easy7[0])
      return color(255, 150, 150);;
  }
  return color(240, 200, 200);
}