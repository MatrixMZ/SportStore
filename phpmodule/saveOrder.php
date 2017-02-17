<?php

    $post = file_get_contents("php://input");
echo $post;
    $data = json_decode($post); //converted to array

    echo $data[0]->name; //BARDZO WAŻNA RZECZ!!!.... dla przykładu oczywiście

//    $file = fopen($path, "w+");
//    $fcontent = fread($file, filesize($path));

//$ilosc = $_POST['ilosc'];
//setcookie('cookie', $ilosc);
//$_COOKIE['cookie'];

class SaveOrder{

    public $path = '../json/orders.json';
    public $ajax_in, $ajax_out, $json_old, $json_new;

    public function run(){
        $this->fileRead();
        $this->dataUpdate();
        $this->createData();
        $this->fileSave();
    }

    private function fileRead(){
        $old_json = file_get_contents($this->path, true);
    }
    private function createData(){

    }
    private function dataUpdate(){
        $this->new_json = 'Updated Datax'.$this->ajax_in[0]->name;
    }
    private function fileSave(){
        $fp = fopen($this->path, 'w');
        fputs($fp, $this->new_json);
        fclose($fp);
    }
}

$order = new SaveOrder();
$order->ajax_in = json_decode(file_get_contents("php://input"));
//echo $order->ajax_in;
$order->run();

?>

