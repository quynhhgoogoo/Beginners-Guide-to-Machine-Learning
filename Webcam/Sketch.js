let classifier;
let video;
let label = '';

function modelReady() {
    console.log('Model is ready!!');
    classifier.predict(gotResults);
}

//Error first call back
function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);

        label = results[0].className;
        //let prob = results[0].probability;

        createP('name of the object : ' + label);
        //createP('probability of object : ' + prob);

        classifier.predict(gotResults);
    }
}

function setup() {
    createCanvas(1000, 700);
    video = createCapture(VIDEO);
    video.hide();
    background('#FA8072');

    classifier = ml5.imageClassifier('MobileNet', video, modelReady);
}

function draw() {
    background('#FA8072');
    image(video, 0, 0, width, height);

    fill(255);
    textSize(50);
    text(label, 10, height - 20);
}