let mobilenet;
let classifier;

let video;
let label = 'put your object';

let faceButton;
let handButton;
let trainButton;

function modelReady() {
    console.log('Model is ready');
}

function videoReady() {
    console.log('Video is ready');
}

function whileTraining(loss) {
    if (loss == null) {
        console.log('Training completed');
        classifier.classify(gotResults);
    } else {
        console.log(loss);
    }
}

function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        //console.log(results);
        label = result;
        classifier.classify(gotResults);
    }
}

function setup() {
    createCanvas(640, 550);

    video = createCapture(VIDEO);
    video.hide();

    background(0);

    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobilenet.classification(video, videoReady);

    faceButton = createButton('face');
    faceButton.mousePressed(function() {
        console.log('Receiving face pixels');
        classifier.addImage('face');
    });

    handButton = createButton('hand');
    handButton.mousePressed(function() {
        console.log('Receiving hand pixels');
        classifier.addImage('hand');
    });

    trainButton = createButton('train');
    trainButton.mousePressed(function() {
        classifier.train(whileTraining);
    });
}

function draw() {
    background('#B22222');
    image(video, 0, 0, 640, 480);

    fill(255);
    textSize(32);
    text(label, 10, height - 20);
}