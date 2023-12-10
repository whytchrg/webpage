const size = 300

function setup() {
    createCanvas(500, 500);
    noStroke();
}

function draw() {
    clear();

    translate(width/2, height/2);
    // scale(0.75);
  
  stroke(color(0, 0, 0));
  strokeWeight(4);
  fill(255);
  arc(0, 0, size, size, 0, PI);
  fill(0);
  arc(0, 0, size, size, PI, TWO_PI);
  fill(255);
  arc(size/4, 0, size/2, size/2, PI, TWO_PI);
  fill(0);
  arc(-size/4, 0, size/2, size/2, 0, PI);

}