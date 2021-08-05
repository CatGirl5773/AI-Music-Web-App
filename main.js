music = "";
music2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
music_playing = "";
leftWristScore = 0;

function preload() {
    music = loadSound("Chicken Song.mp3");
    music2 = loadSound("DJ Music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is initialized!');
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    music_playing = music.isPlaying();

    if(leftWristScore > 0.2) {
        circle(leftWristX, leftWristY, 20);
        music2.stop();
        if(music_playing == false) {
            music.play();
            document.getElementById("song_name").innerHTML = "Song: Chicken Song";
        }
    }
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        leftWristScore = results[0].pose.keypoints[9].score;
        console.log("Left Wrist Score = " + leftWristScore);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + ", Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + ", Right Wrist Y = " + rightWristY);
    }
}
