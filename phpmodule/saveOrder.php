<?php
    $post = file_get_contents("php://input");
    $data = json_decode($post);

    echo $data->products[0]->name; //BARDZO WAŻNA RZECZ!!!.... dla przykładu oczywiście
?>
