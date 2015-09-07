require("./style.scss")
var Vue = require('vue')
var main = new Vue({
    el: "body",
    data: {
        header_text: "testest"
    },
    components: {
        fixedHeader: function(resolve) {
            require.ensure(["../../assets/fixed-header"], resolve, "fixed-header")
        }
    }
});