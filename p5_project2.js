var ball;
var pipes = [];
var was_hit = false;
function setup() {
    createCanvas(800, 800);
    ball = new Ball();
    pipes.push(new Pipe());
}

function draw() {
    background(66, 236, 255);

    for (var i = pipes.length-1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();

        if (pipes[i].hits(ball)) {
            ball.lift = 0;
            ball.velocity = 0;
            console.log("hit");
            was_hit = true;
        }

        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
        if(was_hit && ball.y == height){
            noLoop()
        }

}
    ball.update();
    ball.show();


if (frameCount % 70 == 0) {
        pipes.push(new Pipe());
    }
}
function keyPressed() {
    if (key == ' ') {
        ball.up();
    }
}

function Ball() {
    this.y = height/2;
    this.x = 64;
    this.gravity = 0.5;
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
        //this.velocity += 0.1;
        this.y += this.velocity;

        if (this.y > height) {
            this.y = height;
            this.velocity = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }
}

function Pipe() {
    this.top = random(height/2);
    this.bottom = random(height/2);
    this.x = width;
    this.w = 60;
    this.speed = 2.5;

    this.highlight = false;

    this.hits = function(ball) {
        if (ball.y < this.top || ball.y > height - this.bottom) {
            if (ball.x > this.x && ball.x < this.x + this.w) {
                this.highlight = true;
                return true;
            }
        }
        this.highlight = false;
        return false;
    }

    this.show = function() {
        fill(0,255,0);
        if (this.highlight) {
            fill (255, 0, 0);
        }
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height-this.bottom, this.w, this.bottom);
    }

    this.update = function() {
        this.x -= this.speed;
    }

    this.offscreen = function() {
        if (this.x < -this.w) {
            return true;
        }
        else {
            return false;
        }
    }
}
