function AutoSlider(slider_selector, pos_span, margin) {
  if (!slider_selector || !pos_span) {
      console.error("required slider_selector and pos_span");
      return;
  }
  var slider_el = null;
  var auto_slide_timer = null;
  var infinite;
  var transform_types = [
    "transform",
    "webkitTransform",
    "MozTransform",
    "msTransform",
    "OTransform"
  ];

  function Infinite(_slider, _pos_span, _margin) {
      var slider = _slider;
      var list = [];
      var current_pos = 0;
      var pos_span = _pos_span;
      var margin = _margin || 0;
      var update_index = 1;
      var update_pos;
      var max_pos;
      var updateElPos = function(el, pos) {
          transform_types.forEach(function(transform_type) {
              el.style[transform_type] = "translate(" + pos + "px, 0px) translateZ(0px)";
          });
      };
      var addEl = function(el, pos) {
          list.push({
              el: el,
              pos: pos
          });
          updateElPos(el, pos);
      };
      var init = function() {
          list = [];
          current_pos = 0;
          update_index = 1;
          update_pos;

          max_pos = 0;
          for (var i = 0; i < slider.children.length; i++) {
              addEl(slider.children[i], max_pos);
              max_pos += (slider.children[i].scrollWidth + margin);
          }
      };
      this.getCurrentPos = function() {
          return current_pos;
      };
      this.updateCurrentPos = function() {
          current_pos += pos_span;
          var index = (update_index * (list.length / 3));
          if (index == list.length) {
              index = 0;
          }
          update_pos = list[index + 2].pos;
          if (current_pos >=  update_pos) {
              index = (update_index * (list.length / 3)) - 1;
              for (var i = (index - (list.length / 3) + 1); i <= index; i++) {
                  list[i].pos +=  max_pos;
                  updateElPos(list[i].el, list[i].pos);
              }
              update_index++;
              if (update_index > 3) {
                  update_index = 1;
              }
          }
      };
      this.setPosSpan = function(_pos_span) {
          pos_span = _pos_span;
      };
      init();
  }
  function startSlide(el) {
      var self = this;
      clearInterval(auto_slide_timer);
      el.classList.remove('in-transition');
      auto_slide_timer =setInterval(function() {
          infinite.updateCurrentPos();
          el.classList.add('in-transition');
          var translate = "translate(-" + infinite.getCurrentPos() +"px, 0px) translateZ(0px)";
          transform_types.forEach(function(transform_type) {
              el.style[transform_type] = translate;
          });
      }, 200);
  }
  function getRandomArbitary(min, max) {
      return Math.random() * (max - min) + min;
    }
  function init() {
      slider_el = document.querySelector(slider_selector);
      infinite = new Infinite(slider_el, pos_span);
      startSlide(slider_el);
  }
  this.toggleOnOff = function() {
      if (!auto_slide_timer) {
          startSlide(slider_el);
          return;
      }
      clearInterval(auto_slide_timer);
      auto_slide_timer = null;
  }
  init();
}
