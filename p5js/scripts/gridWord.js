var tough2 = choseTough();
var easy7 = choseEasy();
var resetButton;
var words;
var possibles = [];
var totalPossible;
var input;
var numToGuess;

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
  input.position(125, 400);
  resetButton.parent('p5Container');

  reset();


    console.log(possibles);
}

function draw() {
  background(200);
  textSize(32);

  text(tough2[0], 120, 120);
  text(tough2[1], 300, 120);

  text(easy7[6], 120, 300);
  text(easy7[5], 300, 300);
  text(easy7[4], 210, 120);
  text(easy7[3], 210, 300);
  text(easy7[2], 120, 210);
  text(easy7[1], 300, 210);


  fill(255, 0, 0);
  text(easy7[0], 210, 210);       //center letter
  fill(0, 0, 0);

  textSize(16);
  text(totalPossible + " possible words", 160, 35);
  text(numToGuess + "  left to guess ", 160, 65);
  text("guess: ", 72, 417);

  resetButton.mousePressed(reset);

  if(keyIsDown(13)){
    checkGuess();
  }

  if(numToGuess==0)
  reset();
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
    document.getElementById('foundWords').innerHTML = '';

}



function checkGuess() {
  for (var y = 0; y < possibles.length; y++) {
    if (possibles[y] == input.value()) {
      document.getElementById('foundWords').innerHTML += possibles[y] + "<br />";
      numToGuess--;
      possibles.splice(y,1);
      totalPossible --;
      input.value('');
    }
  }


}