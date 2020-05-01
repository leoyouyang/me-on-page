let bodyOn = true;
let bodypix;
let video;
let segmentation;
let meWidth = 320, meHeight = 240;
let isDragging = false;

const options = {
  "outputStride": 8, // 8, 16, or 32, default is 16
  "segmentationThreshold": 0.3 // 0 - 1, defaults to 0.5
}

function setup() {
  let meCanvas = createCanvas(meWidth, meHeight);
  meCanvas.id('meOnPage');
  video = createCapture(VIDEO);
  video.size(meWidth, meHeight);
  video.hide();
  bodypix = ml5.bodyPix(video, modelReady);
}

function modelReady() {
  console.log('ready!');
  bodypix.segment(gotResults, options);
}

function gotResults(err, result) {
  if (bodyOn) {
    if (err) {
      console.log(err);
      return;
    }
    segmentation = result;
    image(video, 0, 0, meWidth, meHeight);
    image(segmentation.maskBackground, 0, 0, meWidth, meHeight);
    removeBackground();
    bodypix.segment(gotResults, options);
  }
}

function removeBackground() {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i] == 0 && pixels[i + 1] == 0 && pixels[i + 2] == 0) {
      pixels[i + 3] = 0;
    }
  }
  updatePixels();
}

function mousePressed() {
  if (mouseX > 0 && mouseX < meWidth && mouseY > 0 && mouseY < meHeight && keyIsDown(83)) {
    if (meWidth == 320) {
      meWidth = 640;
      meHeight = 480;
      resizeCanvas(meWidth, meHeight);
    } else {
      meWidth = 320;
      meHeight = 240;
      resizeCanvas(meWidth, meHeight);
    }
  }
}

function mouseDragged() {
  isDragging = true;
}

function mouseReleased() {
  if (isDragging == true)
    isDragging = false;
}

window.addEventListener('mousemove', function(e) {
  if (mouseX > 0 && mouseX < meWidth && mouseY > 0 && mouseY < meHeight && isDragging) {
    $("#meOnPage").css("top", e.y - meHeight / 2);
    $("#meOnPage").css("left", e.x - meWidth / 2);
  }
});
