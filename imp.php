// PHP
function compress_image($image_path) {
  $image = imagecreatefromjpeg($image_path);
  imagejpeg($image, $image_path, 80);
  imagedestroy($image);
}