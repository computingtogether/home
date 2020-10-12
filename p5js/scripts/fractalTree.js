var angle = 0;
var slider;

function setup() {
  var can = createCanvas(450, 450);
  can.parent('p5Container');
  slider = createSlider(0, TWO_PI, PI / 4, 0.01);
  slider.parent('sliderContainer');
  slider.size(200);

};

function draw() {
  background(51);
  angle = slider.value();
  stroke(255);
  translate(225, height);
  branch(130);

}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 4) {
    push();
    rotate(angle);
    branch(len * 0.67);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.67);
    pop();
  }

  //line(0, 0, 0, -len * 0.67);
}