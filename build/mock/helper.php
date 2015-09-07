<?php 
require_once('define.php');
class Helper {

    private $movie_img_dir = "/img/item/";

    public static function get($name) {
        $new_name = "";
        $array_name = explode("_", $name);
        foreach ($array_name as $val) {
            $new_name .= ucfirst($val);
        }
        require_once(dirname(__FILE__) . '/helper/' . $new_name . '.php');
        return new $new_name();
    }
    public function Helper() {
        $ret = $this->process();
        return $ret;
    }
    protected function process() {
    }
    protected function getParam($param_name) {
        if(isset($_GET[$param_name])) {
            return $_GET[$param_name];
        }
        return null;
    }
    public function getImageUrl($movie_id) {
        return $this->movie_img_dir . "m_" .floor((int)$movie_id /100) . "/m_" . $movie_id . ".jpg";
    }
}