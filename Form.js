function addMov(){
    var name = document.getElementById("mnane").value;
    var year = document.getElementById("myear").value;
    console.log(name,year);
    // add();
    //movieList.push({
    //  "name":name,
    //  "year":year,
    //  "url":url
    //});
    //renderMovieCards();
  }


function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      document.getElementById("printedData").innerHTML = this.responseText;
      }
    xhttp.open("GET", "regions.json", true);
    xhttp.send();
  }