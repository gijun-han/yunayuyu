<html>
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
  <style type="text/css">
  <?php include '../inc/css/top/inc.css';?>
  </style>
</head>
<body>
<div>
<!-- header -->

<fixed-header title="<?php echo $helper->title?>"></fixed-header>

<!--recommend_movie-->
  <div class="sankaku"></div>
<div class="recommend_movie_container">

  <ul class="slider_box" v-el="slider">
      <?php foreach($helper->recommend_movie_list as $item):?>
      <li class="movie" style="background-image:url(<?php echo $helper->getImageUrl($item['id']);?>);"></li>
      <?php endforeach;?>
  </ul>
  <div class="controller">
      <nav>
          <a onclick="auto_slider.toggleOnOff()" v-on="click:startScroll" v-text="ctrl_btn_name">STOP</a>
      </nav>
  </div>
</div>

</div>
<script>
  <?php include '../inc/js/top/inc.js';?>
  var auto_slider = new AutoSlider(".slider_box", 10, 1);
</script>

<script src="js/lib/vue.js"></script>
<script src="js/app/top.js"></script>
</body>
</html>
