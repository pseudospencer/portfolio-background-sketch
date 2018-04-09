var w = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
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

function Walker() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.tx = random(0,10000);
    this.ty = this.tx + 10000;
    this.radius = floor(random(8, 30));
    this.maxStep = random(3, 10);

    this.fr;
    this.fg;
    this.fb;
    this.sr;
    this.sg;
    this.sb;

    this.display = function() {
        stroke(this.sr, this.sg, this.sb);
        fill(this.fr, this.fg, this.fb);
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
        let flag1 = false;
        let flag2 = false;
        if (this.x < -2 * this.radius || this.x > width + 2 * this.radius || this.y < -2 * this.radius || this.y > height + 2 * this.radius) {
            this.x = random(0, width);
            this.y = random(0, height);
            this.randomizeStrokeAndFill();
        }
    }

    this.randomizeStrokeAndFill = function() {
        this.fr = random(0,255);
        this.fg = random(0,255);
        this.fb = random(0,255);
        this.sr = random(0,255);
        this.sg = random(0,255);
        this.sb = random(0,255);
    }

    this.randomizeStrokeAndFill();
}
