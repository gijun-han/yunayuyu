<?php 
class Common {
    public static $movie_img_dir = "/img/item/";
    public static function getMovieImgPath($movie_id) {
        if ($movie_id) {
            return self::$movie_img_dir . "m_" .floor((int)$movie_id /100) . "/m_" . $movie_id . ".jpg";
        }
        return null;
    }
    public static function contains($str, $str1) {
        if ($str) {
            return strpos($str, $str1) !== false;
        }
        return false;
    }
}