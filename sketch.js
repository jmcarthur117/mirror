let capture
let tracker
let balls = []
let box_1 = {x: 0, y: 10, size: 30, vx: 5, vy: 0, delay: 0}
let box_2 = {x: 800, y: 10, size: 30, vx: -5, vy: 0, delay: 0}
let box_3 = {x: 0, y: 560, size: 30, vx: -5, vy: 0, delay: 0}
let box_4 = {x: 800, y: 560, size: 30, vx: -5, vy: 0, delay: 0}
let box_5 = {x: 0, y: 10, size: 30, vx: 0, vy: 5, delay: 0}
let box_6 = {x: 760, y: 10, size: 30, vx: 0, vy: 5, delay: 0}
let box_7 = {x: 0, y: 560, size: 30, vx: 0, vy: -5, delay: 0}
let box_8 = {x: 760, y: 560, size: 30, vx: 0, vy: -5, delay: 0}
let boxes = [box_1, box_2, box_3, box_4, box_5, box_6, box_7, box_8]

function setup() {

    createCanvas(800, 600).parent('p5')

    // start capturing video
    capture = createCapture(VIDEO)
    capture.size(800, 600)
    capture.hide()

    // create the tracker
    tracker = new clm.tracker()
    tracker.init()
    tracker.start(capture.elt)

}

function draw() {

    // draw background stuff
    background(0,0,0,10);
    noStroke();
    for (let i=0; i<50; i++) {
      fill(random(0,255), random(0,255), random(0,255))
      rect(random(width), random(height), 4, 4)
    }

    for (let box of boxes) {
      fill(random(0,255), random(0,255), random(0,255))
      square(box.x, box.y, box.size)
      if  (frameCount > box.delay){
        box.x = box.x + box.vx
        box.y = box.y + box.vy
      }
      if (box.x >= width) {
          box.vx = -box.vx
      }

      if (box.x < 0) {
          box.vx = -box.vx
      }

      if (box.y >= height) {
          box.vy = -box.vy
      }

      if (box.y < 0) {
          box.vy = -box.vy
      }

    }

    // show the mirrored video feed
    //showFlippedCapture()

    // get new data from tracker
    let features = tracker.getCurrentPosition()

    // sometimes the tracker doesn't capture anything
    // in that case, we want to stop the function right here using 'return'
    if (features.length == 0) {
        return
    }

    //fill face
    noStroke()
    fill(0,0,0,90)
    // triangle(features[0].x, features[0].y, features[1].x, features[1].y, features[35].x, features[35].y)
    // triangle(features[1].x, features[1].y, features[2].x, features[2].y, features[35].x, features[35].y)
    // triangle(features[2].x, features[2].y, features[3].x, features[3].y, features[35].x, features[35].y)
    //
    //
    // triangle(features[14].x, features[14].y, features[13].x, features[13].y, features[39].x, features[39].y)
    // triangle(features[13].x, features[13].y, features[12].x, features[12].y, features[39].x, features[39].y)

    quad(features[15].x, features[15].y, features[16].x + 10, features[16].y, features[20].x + 10, features[20].y, features[19].x, features[19].y,)
    quad(features[15].x, features[15].y, features[19].x + 10, features[19].y, features[0].x + 10, features[0].y, features[14].x, features[14].y,)
    quad(features[14].x, features[14].y, features[0].x + 10, features[0].y, features[1].x + 10, features[1].y, features[13].x, features[13].y,)
    quad(features[13].x, features[13].y, features[1].x + 10, features[1].y, features[2].x + 10, features[2].y, features[12].x, features[12].y,)
    quad(features[12].x, features[12].y, features[2].x + 10, features[2].y, features[3].x + 10, features[3].y, features[11].x, features[11].y,)
    quad(features[11].x, features[11].y, features[3].x + 10, features[3].y, features[4].x + 10, features[4].y, features[10].x, features[10].y,)
    quad(features[10].x, features[10].y, features[4].x + 10, features[4].y, features[5].x + 10, features[5].y, features[9].x, features[9].y,)
    quad(features[9].x, features[9].y, features[5].x + 10, features[5].y, features[6].x + 10, features[6].y, features[8].x, features[8].y,)
    triangle(features[8].x, features[8].y, features[6].x, features[6].y, features[7].x, features[7].y)

    // 'features' is an array of objects with x, y properties
    // for (let feature of features) {
    //     stroke(0)
    //     fill(0,255,0)
    //     circle(feature.x, feature.y, 4)
    //     text(feature.label, feature.x, feature.y)
    // }

    let mouth_top = features[60]
    let mouth_bottom = features[57]
    let distance = dist(mouth_top.x, mouth_top.y, mouth_bottom.x, mouth_bottom.y)

    let nose_tip = features[62]
    let nose_left = features[39]
    let nose_right = features[35]

    let left_nose_distance = dist(nose_tip.x, nose_tip.y, nose_left.x, nose_left.y)
    let right_nose_distance = dist(nose_tip.x, nose_tip.y, nose_right.x, nose_right.y)
    let nose_pointing = left_nose_distance - right_nose_distance
    //print(nose_pointing)


    if (distance > 25) {

      let mouth_center = { x: mouth_top.x,
                           y: (mouth_top.y + mouth_bottom.y) / 2
                         }
      noStroke()
      fill(0, 255, 0)
      square(mouth_center.x, mouth_center.y, 10)

      let random_ball = {x: random(mouth_center.x - 20, mouth_center.x + 20),
                         y: random(mouth_center.y - 5, mouth_center.y + 5),
                         vx: random(nose_pointing / 8, nose_pointing / 4),
                         vy: random(-10, 10),
                         c: [random(0,255), random(0,255), random(0,255), random(200, 250)]
                        }
          balls.push(random_ball)

    }

    for (let ball of balls) {
      noStroke()
      fill(ball.c)
      square(ball.x, ball.y, 40)

      ball.x += ball.vx
      ball.y += ball.vy

      ball.vy += 0.8

      if (ball.x < 0 || ball.x > width || ball.y < 0 || ball.y > width) {
          balls.splice(balls.indexOf(ball), 1)
      }

    }

    //fill face
    // noStroke()
    // fill(255,0,0)
    // // triangle(features[0].x, features[0].y, features[1].x, features[1].y, features[35].x, features[35].y)
    // // triangle(features[1].x, features[1].y, features[2].x, features[2].y, features[35].x, features[35].y)
    // // triangle(features[2].x, features[2].y, features[3].x, features[3].y, features[35].x, features[35].y)
    // //
    // //
    // // triangle(features[14].x, features[14].y, features[13].x, features[13].y, features[39].x, features[39].y)
    // // triangle(features[13].x, features[13].y, features[12].x, features[12].y, features[39].x, features[39].y)
    //
    // quad(features[14].x, features[14].y, features[0].x + 10, features[0].y, features[1].x + 10, features[1].y, features[13].x, features[13].y,)
    // quad(features[13].x, features[13].y, features[1].x + 10, features[1].y, features[2].x + 10, features[2].y, features[12].x, features[12].y,)
    // quad(features[12].x, features[12].y, features[2].x + 10, features[2].y, features[3].x + 10, features[3].y, features[11].x, features[11].y,)
    // quad(features[11].x, features[11].y, features[3].x + 10, features[3].y, features[4].x + 10, features[4].y, features[10].x, features[10].y,)
    // quad(features[10].x, features[10].y, features[4].x + 10, features[4].y, features[5].x + 10, features[5].y, features[9].x, features[9].y,)
    // quad(features[9].x, features[9].y, features[5].x + 10, features[5].y, features[6].x + 10, features[6].y, features[8].x, features[8].y,)
    // triangle(features[8].x, features[8].y, features[6].x, features[6].y, features[7].x, features[7].y)

    //the nose is feature 62
    let nose = features[62]
    fill(random(0,255), random(0,255), random(0,255))
    square(nose.x, nose.y, 10)

    //the eyes are elements 32 and 27
    fill(random(0,255), random(0,255), random(0,255))
    circle(features[32].x, features[32].y, 10)  // access the array directly
    circle(features[27].x, features[27].y, 10)

    // the eyebrows are elements 15, 16, 17, 18, 19, 20, 21, 22
    fill(random(0,255), random(0,255), random(0,255))
    square(features[15].x, features[15].y, 10)
    square(features[16].x, features[16].y, 10)
    square(features[17].x, features[17].y, 10)
    square(features[18].x, features[18].y, 10)
    square(features[19].x, features[19].y, 10)
    square(features[20].x, features[20].y, 10)
    square(features[21].x, features[21].y, 10)
    square(features[22].x, features[22].y, 10)

    // cheek
    fill(random(0,255), random(0,255), random(0,255))
    square(features[0].x, features[0].y, 10)
    square(features[1].x, features[1].y, 10)
    square(features[2].x, features[2].y, 10)
    square(features[3].x, features[3].y, 10)
    square(features[4].x, features[4].y, 10)
    square(features[5].x, features[5].y, 10)
    square(features[6].x, features[6].y, 10)
    square(features[7].x, features[7].y, 10)
    square(features[8].x, features[8].y, 10)
    square(features[9].x, features[9].y, 10)
    square(features[10].x, features[10].y, 10)
    square(features[11].x, features[11].y, 10)
    square(features[12].x, features[12].y, 10)
    square(features[13].x, features[13].y, 10)
    square(features[14].x, features[14].y, 10)

    //right eye circumference
    fill(random(0,255), random(0,255), random(0,255))
    square(features[30].x, features[30].y, 5)
    square(features[69].x, features[69].y, 5)
    square(features[31].x, features[31].y, 5)
    square(features[70].x, features[70].y, 5)
    square(features[28].x, features[28].y, 5)
    square(features[67].x, features[67].y, 5)
    square(features[29].x, features[29].y, 5)
    square(features[68].x, features[68].y, 5)

    //left eye circumference
    fill(random(0,255), random(0,255), random(0,255))
    square(features[25].x, features[25].y, 5)
    square(features[64].x, features[64].y, 5)
    square(features[24].x, features[24].y, 5)
    square(features[63].x, features[63].y, 5)
    square(features[23].x, features[23].y, 5)
    square(features[66].x, features[66].y, 5)
    square(features[26].x, features[26].y, 5)
    square(features[65].x, features[65].y, 5)

    //nose circumference
    fill(random(0,255), random(0,255), random(0,255))
    square(features[33].x, features[33].y, 5)
    square(features[41].x, features[41].y, 5)
    square(features[40].x, features[40].y, 5)
    square(features[39].x, features[39].y, 5)
    square(features[38].x, features[38].y, 5)
    square(features[43].x, features[43].y, 5)
    square(features[37].x, features[37].y, 5)
    square(features[42].x, features[42].y, 5)
    square(features[36].x, features[36].y, 5)
    square(features[35].x, features[35].y, 5)
    square(features[34].x, features[34].y, 5)

    //mouth circumference
    fill(random(0,255), random(0,255), random(0,255))
    square(features[50].x, features[50].y, 5)
    square(features[51].x, features[51].y, 5)
    square(features[52].x, features[52].y, 5)
    square(features[53].x, features[53].y, 5)
    square(features[54].x, features[54].y, 5)
    square(features[55].x, features[55].y, 5)
    square(features[44].x, features[44].y, 5)
    square(features[45].x, features[45].y, 5)
    square(features[46].x, features[46].y, 5)
    square(features[47].x, features[47].y, 5)
    square(features[48].x, features[48].y, 5)
    square(features[49].x, features[49].y, 5)
    square(features[59].x, features[59].y, 5)
    square(features[60].x, features[60].y, 5)
    square(features[61].x, features[61].y, 5)
    square(features[56].x, features[56].y, 5)
    square(features[57].x, features[57].y, 5)
    square(features[58].x, features[58].y, 5)


  }

// this function flips the webcam and displays it
function showFlippedCapture() {
    push()
    translate(capture.width, 0)
    scale(-1, 1)
    image(capture, 0, 0, capture.width, capture.height)
    pop()
}
