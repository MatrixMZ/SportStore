<?php
    $post = file_get_contents("php://input");
    $data = json_decode($post); //converted to array

    echo $data[0]->name; //BARDZO WAŻNA RZECZ!!!.... dla przykładu oczywiście




?>

