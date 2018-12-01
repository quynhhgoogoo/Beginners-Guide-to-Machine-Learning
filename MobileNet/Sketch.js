let classifier;
let parrot;

function modelReady() {
    console.log('Model is ready!!');
    classifier.predict(parrot, gotResults);
}

//Error first call back
function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);

        let label = results[0].className;
        let prob = results[0].probability;

        //fill(0);
        //textSize(100);
        //text(label, 10, height - 100);
        createP(label);
        createP(prob);
    }
}

function imageReady() {
    image(parrot, 0, 0, width, height);
}

function setup() {
    createCanvas(600, 400);
    parrot = createImg('img/parrot.jpg', imageReady);
    parrot.hide();
    background('#FA8072');

    classifier = ml5.imageClassifier('MobileNet', modelReady);
}