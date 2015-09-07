<?php
if(isset($_GET["page"])) {

    require_once("../mock/helper.php");
    $page = $_GET["page"];
    $helper = Helper::get($page);
    include_once '../views/'. $page .'/index.php';

} else if (isset($_GET["api"])) {

    require_once("../mock/api.php");
    $api = $_GET["api"];
    $api = Api::get($api);
    $api->execute();

} else {

    echo "error!!";

}
