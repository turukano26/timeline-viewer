var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "DESKTOP-NIDIQ85",
    user: "joey",
    password: "philricha26sql!"
  });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

/* var http = require('http'),
    fs = require('fs');


fs.readFile('index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(8000);
}); */