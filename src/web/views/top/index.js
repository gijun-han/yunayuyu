require("./style.scss");
var iScroll = require("../../common/iscroll_lite");
var my_scroll;
new Vue({
    el: "body",
    data: {
        ctrl_btn_name: "STOP",
    },
    components: {
        fixedHeader: require("../../assets/fixed-header")
    },
    methods: {
        startScroll: function() {
            if (this.ctrl_btn_name == "PLAY") {
                my_scroll.destroy();
                this.$$.slider.style.transitionTimingFunction = "";
                this.$$.slider.style.transitionDuration = "";
                this.ctrl_btn_name = "STOP";
                return;
            }
            this.ctrl_btn_name = "PLAY";
            var matches = this.$$.slider.style.transform.match(/translate\((-[0-9]+)px, 0px\) translateZ\(0px\)/);
            var start_x = 0;
            if (matches && matches.length > 1) {
                start_x = parseInt(matches[1]);
            }
            var x_list = [];
            for (var i = 0; i < this.$$.slider.children.length; i++) {
                matches = this.$$.slider.children[i].style.transform.match(/translate\(([0-9]+)px, 0px\) translateZ\(0px\)/);
                if (matches && matches.length > 1) {
                    x_list.push(parseInt(matches[1]));
                }
            }

            my_scroll = new iScroll('.recommend_movie_container', {
                scrollX : true,
                scrollY : false,
                click: true,
                startX: start_x,
                maxScrollX: Math.max.apply(null, x_list) + this.$$.slider.children[0].scrollWidth,
                minScrollX: Math.min.apply(null, x_list)
            });

        }
    },
    compiled: function() {

    }
});