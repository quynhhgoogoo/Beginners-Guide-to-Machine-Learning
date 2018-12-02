let mobilenet;
let regression;

let video;
let label = 0;

let trainButton;
let addButton;

let slider;

function modelReady() {
    console.log('Model is ready');
}

function videoReady() {
    console.log('Video is ready');
}

function whileTraining(loss) {
    if (loss == null) {
        console.log('Training completed');
        regression.predict(gotResults);
    } else {
        console.log(loss);
    }
}

/*function sliderValue() {
    console.log(slider.value());
    regression.addImage(slider.value());
}*/

function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        //console.log(results);
        label = result;
        regression.predict(gotResults);
    }
}

function setup() {
    createCanvas(640, 550);

    video = createCapture(VIDEO);
    video.hide();

    background(0);

    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    regression = mobilenet.regression(video, videoReady);

    slider = createSlider(0, 1, 0.5, 0.01);
    //slider.input();

    addButton = createButton('Upload your img');
    addButton.mousePressed(function() {
        regression.addImage(slider.value());
    });

    trainButton = createButton('train');
    trainButton.mousePressed(function() {
        regression.train(whileTraining);
    });
}

function draw() {
    background('#B22222');
    image(video, 0, 0, 640, 480);
    ellipse(label * width, height / 2, 15, 15);

    fill(255);
    textSize(32);
    text(label, 10, height - 20);
}