<!DOCTYPE html>
<html>
<head>
<style>
table {
  width: 100%;
  border-collapse: collapse;
}

table, td, th {
  border: 1px solid black;
  padding: 5px;
}

th {text-align: left;}
</style>
</head>
<body>

<?php
$q = intval($_GET['q']);
echo $q;

$servername = "127.0.0.1";
$username = "joey";
$password = getenv('mysqlpass');
$password = 'philricha26sql!';
// Create connection
$con = new mysqli($servername, $username, $password);

mysqli_select_db($con,"new_schema");
$sql="SELECT * FROM people WHERE id = ".$q;
$result = mysqli_query($con,$sql);


echo "<table>
<tr>
<th>Firstname</th>
<th>Lastname</th>
<th>Age</th>
<th>Hometown</th>
<th>Job</th>
</tr>";
while($row = mysqli_fetch_array($result)) {
  echo "<tr>";
  echo "<td>" . $row['id'] . "</td>";
  echo "<td>" . $row['name'] . "</td>";
  echo "<td>" . $row['born'] . "</td>";
  echo "</tr>";
}
echo "</table>";
mysqli_close($con);
?>
</body>
</html>