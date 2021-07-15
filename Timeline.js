var startYear = -500;
var endYear = 2000;
var gradiation = 10;
var topPoint = new Point(0, 0);
var bottomPoint = new Point(0, 500);
var scalingFactor = 5;

var pointIncrease = new Point(gradiation, 0);

var path;
var text;

for (var i = startYear; i < endYear; i += 1) {
    path = new Path.Line(topPoint, bottomPoint);
    if (i % 100 == 0) {
        grayValue = 0;
        text = new PointText(bottomPoint);
        text.fillColor = 'black';
        text.content = i;
    }
    else if (i % 50 == 0) {
        grayValue = 0.5;
        text = new PointText(bottomPoint);
        text.fillColor = 'black';
        text.content = i;
    }
    else if (i % 10 == 0) {
        grayValue = 0.75;
        text = new PointText(bottomPoint);
        text.fillColor = 'black';
        text.content = i;
    }
    else if (i % 5 == 0) {
        grayValue = 0.875;
    }
    else {
        continue;
    }
    path.strokeColor = new Color(grayValue);

    topPoint += pointIncrease * scalingFactor;
    bottomPoint += pointIncrease * scalingFactor;
}
var rectangle = new Rectangle(new Point(20, 20), new Size(60, 60));
var cornerSize = new Size(10, 10);
var shape = new Shape.Rectangle(rectangle, cornerSize);
shape.strokeColor = 'red';

/* // Create a Tool so we can listen for events
var toolPan = new paper.Tool()
toolPan.activate()

// On drag, scroll the View by the difference between mousedown 
// and mouseup
toolPan.onMouseDrag = function (event) {
  var delta = event.downPoint.subtract(event.point)
  paper.view.scrollBy(delta)
} */

tool.onKeyDown = function (event) {
    if (event.key == 'right') {
        // Scale the path by 110%:
        paper.view.scrollBy(new Point(9, 0))

        // Prevent the key event from bubbling
        return false;
    }
    else if (event.key == 'left') {
        // Scale the path by 110%:
        paper.view.scrollBy(new Point(-9, 0))

        // Prevent the key event from bubbling
        return false;
    }
}
