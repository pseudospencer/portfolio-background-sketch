var w = [];
var approvedColors = ['#000', '#a2aaa2', '#c4c4c4', '#e8eae8', '#fff',
                     '#00ff00', '#39d63f', '#02ff0c', '#7fc17f', '#5ec15e'];
var density = 120;

function setup() {
    createCanvas(windowWidth, windowHeight);
    let rows = width/density;
    let cols = height/density;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            w[w.length] = new Walker(r * density, c * density);
        }
    }

    for (let i = 0; i < 16; i++) {
        w[i] = new Walker();
    }
    background(255);
}

function draw() {
    for (let i = 0; i < w.length; i++) {
        w[i].step();
        w[i].display();
    }
}

function Walker(x = random(0, width), y = random(0, height)) {
    this.x = x;
    this.y = y;
    this.tx = random(0,10000);
    this.ty = this.tx + random(0,10000);
    this.radius = floor(random(8, 30));
    this.maxStep = random(3, 6);

    // color variables
    this.stroke;
    this.fill;


    this.display = function() {
        stroke(this.stroke);
        fill(this.fill);
        ellipse(this.x, this.y, this.radius, this.radius);
    }

    this.step = function() {
        let xStep = map(noise(this.tx), 0, 1, -this.maxStep, this.maxStep);
        let yStep = map(noise(this.ty), 0, 1, -this.maxStep, this.maxStep);

        this.x += xStep;
        this.y += yStep;

        this.tx += .1;
        this.ty += .1;

        this.return();
    }

    this.return = function() {
        // keeps walker inside canvas, 're-inits' when it goes out
        let flag1 = false;
        let flag2 = false;
        if (this.x < -2 * this.radius ||
            this.x > width + 2 * this.radius ||
            this.y < -2 * this.radius ||
            this.y > height + 2 * this.radius) {

            this.x = random(0, width);
            this.y = random(0, height);
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

    this.randomizeStrokeAndFill();
}
