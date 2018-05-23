var ball;
function setup() {
    createCanvas(800, 1200);
    ball = new Ball();

}

function draw() {
    background(66, 236, 255);
    ball.update();
    ball.show();

}

function keyPressed() {
    if (key == ' ') {
        ball.up();
    }
}

function Ball() {
    this.y = height/2;
    this.x = 64;
    this.gravity = .5;
    this.lift = -15;
    this.velocity = 0;

    this.show = function () {
        fill(255, 255, 66);
        ellipse(this.x, this.y, 32, 32);
    }

    this.up = function () {
        this.velocity += this.lift;
    }

    this.update = function() {
        this.velocity += this.gravity;
        this.velocity += 0.1;
        this.y += this.velocity;

        if (this.y > height) {
            this.y = height;
            this.velocity = 0;
        }

        if (this > 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }
}