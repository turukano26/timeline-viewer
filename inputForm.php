<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Input Screen</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="style.css">
    <script type="text/javascript" src="Form.js"></script>

    <script>
        function showUser(str) {
            if (str == "") {
                document.getElementById("txtHint").innerHTML = "";
                return;
            } else {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("txtHint").innerHTML = this.responseText;
                }
                };
                xmlhttp.open("GET","getuser.php?q="+str,true);
                xmlhttp.send();
            }
        }
    </script>

</head>
<body>
    <div id="demo">
        <div id= "printedData"></div>
        <button type="button" onclick="loadDoc()">Change Content</button>
    </div>
    <br>
    <div class="slidecontainer">
        <input type="range" min="1" max="4" value="3" class="slider" id="myRange">
    </div>
    <form name="submitmovie" id="formsubmit" action="submitdata2.php" method="post">
        <label>Name</label>
        <input type="text" name="movie-name" id="mnane">
        <label>Year</label>
        <input type ="number" name="movie-year" id="myear">
        <input type="submit">
    </form>



    <form>
        <select name="users" onchange="showUser(this.value)">
            <option value="">Select a person:</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="3">Joseph Swanson</option>
            <option value="4">Glenn Quagmire</option>
        </select>
    </form>
    <br>
    <div id="txtHint"><b>Person info will be listed here...</b></div>

    <?php
    $servername = "127.0.0.1";
    $username = "joey";
    $password = getenv('mysqlpass');
    $password = 'philricha26sql!';
    // Create connection
    $conn = new mysqli($servername, $username, $password);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }
      echo "Connected successfully";
  
      // Create database
      $sql = "CREATE DATABASE myDB";
      if ($conn->query($sql) === TRUE) {
      echo "Database created successfully";
      } else {
      echo "Error creating database: " . $conn->error;
      }
    ?>

    <a href="index.html">Go back to the timeline</a>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
</body>
</html>