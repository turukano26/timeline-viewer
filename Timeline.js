var startYear = -500;
var endYear = 2000;
var gradiation = 10;

var pointIncrease = new Point(gradiation, 0);

var path;
var text;

var mouseDown = false;

var curScrollPoint;
var lastScrollPoint;

var maxDepth = 5;
var filePath = "regions.json";

var curColor = 0;

var regionLayer = new Layer({ name: "regions" });
var timelineLayer = new Layer({ name: "timeline" });

function printLines() {

    var topPoint = new Point(0, 0);
    var bottomPoint = new Point(0, 20000);
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

toolPan.onMouseDrag = function (event){
    timelineLayer.translate(new Point(event.delta.x, 0));
    regionLayer.translate(new Point(0, event.delta.y));
}

/* tool.onKeyDown = function (event) {
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
} */

var elem = document.getElementById("canvas");

if (elem.addEventListener) {
    if ('onwheel' in document) {
        // IE9+, FF17+, Ch31+
        elem.addEventListener("wheel", onWheel);
    } else if ('onmousewheel' in document) {
        // устаревший вариант события
        elem.addEventListener("mousewheel", onWheel);
    } else {
        // Firefox < 17
        elem.addEventListener("MozMousePixelScroll", onWheel);
    }
} else { // IE8-
    elem.attachEvent("onmousewheel", onWheel);
}

function onWheel(e) {
    e = e || window.event;

    //get mousewheel delta only for negative or positive
    var delta = e.deltaY || e.detail || e.wheelDelta;

    // get the point in paper coords
    var point = paper.view.getEventPoint(e);
    //make a zoom
    paper.zooming(delta, point);// THIS IS THE ZOOM FUNCTION ITSELF!!!!!!!

    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}

this.zooming = function (delta, point) {
    var MIN = 0.2;
    var MAX = 7;
    var ZOOM_FACTOR = 10;
    // recieve event coords in view
    var pointIn = point;
    // recieve coords in project
    var pointOut = paper.view.projectToView(pointIn);
    //get mouse event only for + or -
    var zoom = delta;
    //prepare zoom factor
    var zoomVal = paper.view.zoom / ZOOM_FACTOR;
    //make a zoom
    if (zoom > 0) {
        paper.view.zoom -= zoomVal;
    }
    if (zoom < 0) {
        paper.view.zoom += zoomVal;
    }
//if bigga or smalla adjust
    if (paper.view.zoom > MAX) {
        paper.view.zoom = MAX;
    } else if (paper.view.zoom < MIN) {
        paper.view.zoom = MIN;
    }
    // recieve event coord in project after native zoom
    var pointOut2 = paper.view.projectToView(pointIn);
    // get translation and apply it
    //var trans = [((pointOut.x - pointOut2.x) / paper.view.zoom), ((pointOut.y - pointOut2.y) / paper.view.zoom)];
    var trans = [((pointOut.x - pointOut2.x) / paper.view.zoom), ((pointOut.y - pointOut2.y) / paper.view.zoom)];
    paper.view.translate(trans);

};

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

    regionLayer.activate();
    height = printRegions(xmlDoc, 0, 0);

    timelineLayer.activate();
    printLines(height);

    regionLayer.bringToFront();
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
    shape.fillColor = rainbowStop((curColor - 0.12) % 1);
    shape.opacity = 0.3;

    var textLocation = new Point(depth * 50, endY);
    var text = new PointText(textLocation);
    text.fillColor = 'black';
    text.content = label;
    text.rotate(270, textLocation);
    text.translate(new Point(25, -5));
    text.fontSize = 20;

    if (text.strokeBounds.height > endY - startY) {
        scalingFactor = (endY - startY) / (text.strokeBounds.height + 10);
        text.scale(scalingFactor, scalingFactor, textLocation);
    }
}

function createFinalBox(label, startY, endY, depth) {
    rectangle = new Rectangle(new Point(depth * 50, startY), new Point(3000, endY));
    shape = new Shape.Rectangle(rectangle);
    shape.fillColor = rainbowStop(curColor);
    curColor = (curColor + 0.05) % 1;
    shape.opacity = 0.25;

    var textLocation = new Point(depth * 50, endY);
    var text = new PointText(textLocation);
    text.fillColor = 'black';
    text.content = label;
    text.fontSize = 15;
    text.translate(new Point(10, -5));
}
