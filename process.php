<?php

$errors = [];
$data = [];

if (empty($_POST['name'])) {
    $errors['name'] = 'Name is required.';
}

if (empty($_POST['birthdate'])) {
    $errors['birthdate'] = 'Email is required.';
}

if (empty($_POST['deathdate'])) {
    $errors['deathdate'] = 'Superhero alias is required.';
}

if (!empty($errors)) {
    $data['success'] = false;
    $data['errors'] = $errors;
} else {
    $data['success'] = true;
    $data['message'] = 'Success!';
    $data['data'] = $_POST;
    
    $servername = "127.0.0.1";
    $username = "joey";
    $password = getenv('mysqlpass');
    $password = 'philricha26sql!';
    // Create connection
    $con = new mysqli($servername, $username, $password);

    mysqli_select_db($con,"new_schema");

    $sql="INSERT INTO people VALUES (UUID_TO_BIN(UUID()),'".$_POST["name"]."',0".$_POST["birthdate"].",".$_POST["deathdate"].");";

    $result = mysqli_query($con,$sql);
}

echo json_encode($data);
?>