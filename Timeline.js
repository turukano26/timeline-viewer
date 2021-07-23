var startYear = -500;
var endYear = 2000;
var gradiation = 10;

var pointIncrease = new Point(gradiation, 0);

var path;
var text;

var maxDepth = 5;
var filePath = "regions.json";

var curColor = 0;

var regionLayer = new Layer({name: regions});
var timelineLayer = new Layer({name: timeline});

function printLines() {

    var topPoint = new Point(0, 0);
    var bottomPoint = new Point(0, 500);
    var scalingFactor = 5;

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
}

// Create a Tool so we can listen for events
var toolPan = new paper.Tool()
toolPan.activate()

// On drag, scroll the View by the difference between mousedown 
// and mouseup
toolPan.onMouseDrag = function (event) {
    var delta = event.downPoint.subtract(event.point)
    paper.view.scrollBy(delta)
}

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

var mydata = JSON.parse(loadFile(filePath));
console.log(mydata);

function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }
    return result;
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
    }
};
xhttp.open("GET", "regions.xml", true);
xhttp.send();

function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    height = printRegions(xmlDoc, 1, 0);
    printLines(height);
}


function printRegions(rootNode, depth, startY) {
    for (var i = 0; i < rootNode.childNodes.length; i++) {

        var curChild = rootNode.childNodes[i];

        if (curChild.nodeType == 1) {

            //console.log(curChild.nodeName + "   " + height);

            //if its not a leaf
            if (curChild.childNodes.length != 0 && depth < maxDepth) {

                endY = printRegions(curChild, depth + 1, startY);
                createCatagoryBox(curChild.nodeName, startY, endY, depth);
                startY = endY;

            }
            //if it is a leaf
            else {

                endY = startY + 100 / depth;
                createFinalBox(curChild.nodeName, startY, endY, depth);
                startY = endY;
            }
        }
    }
    return endY;
}

function createCatagoryBox(label, startY, endY, depth) {
    rectangle = new Rectangle(new Point(depth * 50, startY), new Point(50 + depth * 50, endY));
    shape = new Shape.Rectangle(rectangle);
    shape.fillColor = rainbowStop((curColor-0.12)%1);
    shape.opacity = 0.5;

    var textLocation = new Point(depth * 50, endY);
    var text = new PointText(textLocation);
    text.fillColor = 'black';
    text.content = label;
    text.rotate(270, textLocation);
    text.translate(new Point(25, -5));
    text.fontSize = 20;
    console.log(text.strokeBounds.height + "   " + label);

    if (text.strokeBounds.height > endY - startY) {
        scalingFactor = (endY - startY) / (text.strokeBounds.height + 10);
        text.scale(scalingFactor, scalingFactor, textLocation);
    }
}

function createFinalBox(label, startY, endY, depth) {
    rectangle = new Rectangle(new Point(depth * 50, startY), new Point(3000, endY));
    shape = new Shape.Rectangle(rectangle);
    shape.fillColor = rainbowStop(curColor);
    curColor = (curColor+0.05)%1;
    shape.opacity = 0.25;

    var textLocation = new Point(depth * 50, endY);
    var text = new PointText(textLocation);
    text.fillColor = 'black';
    text.content = label;
    text.fontSize = 15;
    text.translate(new Point(10, -5));
}
