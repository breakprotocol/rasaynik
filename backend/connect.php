<?php

$servername = "localhost";

$username = "root";

$password = "";

$db = "chemical_factory";

// Create connection

$mysqli = new mysqli($servername, $username, $password,$db);



// Check connection

if ($mysqli->connect_error) {

    die("Connection failed: " . $mysqli->connect_error);

} 



?>