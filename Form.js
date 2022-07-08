function addMov(){
    var name = document.getElementById("mnane").value;
    var year = document.getElementById("myear").value;
    console.log(name,year);

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("printedData").innerHTML = this.responseText;
    }
    xhttp.open("POST", "regions.json", true);
    xhttp.send();
}


function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      document.getElementById("printedData").innerHTML = this.responseText;
      }
    xhttp.open("GET", "regions.json", true);
    xhttp.send();
}