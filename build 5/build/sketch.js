var w = [];
var approvedColors = ['#000', '#a2aaa2', '#c4c4c4', '#e8eae8', '#fff',
                     '#00ff00', '#39d63f', '#02ff0c', '#7fc17f', '#5ec15e'];
var density = 150;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);

    let rows = width/density;
    let cols = height/density;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            w[w.length] = new Walker(r * density - density/2, c * density - density/2);
        }
    }
}

function draw() {
    for (let i = 0; i < w.length; i++) {
        w[i].update();
        w[i].display();
    }
}

function Walker(x = random(0, width), y = random(0, height)) {
    this.location = createVector(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.topspeed = random(3,6);
    this.time = createVector(random(0,10000), random(0,10000));

    // this.x = x;
    // this.y = y;
    // this.tx = random(0,10000);
    // this.ty = this.tx + random(0,10000);
    // this.maxStep = random(3, 6);
    this.radius = floor(random(8, 40));

    // color variables
    this.stroke;
    this.fill;


    this.display = function() {
        stroke(this.stroke);
        fill(this.fill);
        ellipse(this.location.x, this.location.y, this.radius, this.radius);
    }

    this.update = function() {

        // // mouse tracking
        // let mouse = createVector(mouseX, mouseY);
        // let mousedir = p5.Vector.sub(mouse, this.location);
        // let mousedist = p5.Vector.dist(mouse, this.location);
        // mousedir.normalize();
        // mousedir.mult(mousedist * this.topspeed);
        // this.acceleration = mousedir;
        // this.velocity.add(this.acceleration);
        // this.velocity.limit(this.topspeed);
        // this.location.add(this.velocity);

        // perlin noise
        let xStep = map(noise(this.time.x), 0, 1, -this.maxStep, this.maxStep);
        let yStep = map(noise(this.time.y), 0, 1, -this.maxStep, this.maxStep);
        this.location.x += xStep;
        this.location.y += yStep;
        this.time.add(.1, .1);
        // this.time.x += .1;
        // this.time.y += .1;

        this.return();
    }

    this.return = function() {
        // keeps walker inside canvas, 're-inits' when it goes out
        let flag1 = false;
        let flag2 = false;
        if (this.location.x < -2 * this.radius ||this.location.x > width + 2 * this.radius ||
            this.location.y < -2 * this.radius ||this.location.y > height + 2 * this.radius) {
            this.location.x = random(0, width);
            this.location.y = random(0, height);
            this.randomizeSizeAndSpeed();
            this.randomizeStrokeAndFill();
        }
    }

    this.randomizeStrokeAndFill = function() {
        this.stroke = approvedColors[floor(random(approvedColors.length))];
        this.fill = approvedColors[floor(random(approvedColors.length))];
        // always different colors
        while (this.fill == this.stroke) {
            this.fill = approvedColors[floor(random(approvedColors.length))];
        }
    }

    this.randomizeSizeAndSpeed = function() {
        this.time.x = random(0,10000);
        this.time.y = this.time.x + random(0,10000);
        this.radius = floor(random(8, 40));
        this.maxStep = random(3, 6);
    }

    this.randomizeStrokeAndFill();
}
