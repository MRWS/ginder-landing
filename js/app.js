var app = {
    init: function () {
      if(window.addEventListener){
          window.addEventListener("scroll", function() {
              app.animate();
          }, false);
      }else{
          window.attachEvent("scroll", function(){
              app.animate();
          });
      }

      app.checkIE();
      app.counter();
      app.animate();
    },
    chartBuilder: function() {
      var charts = document.querySelectorAll('.canvas_chart');
      charts.forEach(function(chart, k) {
        var $span = chart.parentNode.querySelector('.chart_stat .value'),
            value = parseInt($span.getAttribute('data-value')),
            build = $span.getAttribute('data-build');
        if (build === "false" && chart.parentNode.parentNode.classList.contains("animate")) {
          chart = chart.getContext('2d');

          var config = {
            type: 'doughnut',
            data: {
              datasets: [{
                data: [
                  value,
                  100 - value,
                ],
                backgroundColor: [
                  "#05476C",
                  "white",
                ],
                label: 'Dataset 1'
              }],
            },
            options: {
              responsive: false,
              legend: {
                position: 'top',
              },
              animation: {
                animateScale: true,
                animateRotate: true
              }
            }
          };
          window.myDoughnut = new Chart(chart, config);
          $span.setAttribute("data-build", "true");
        }
      });

    },
    counter: function() {
      var stats = document.querySelectorAll('.chart_stat');
      for (var i = 0; i < stats.length; i++) {
        var stat = stats[i];

        app.inc(stat);
      }
    },
    inc: function(elem) {
      var value       = elem.querySelector('span.value'),
          stat        = parseInt(value.innerText),
          startNumber = 0;

      value.innerText = startNumber;
      var lol = setInterval(function () {
        if (startNumber < stat) {
          startNumber++;
          value.innerText = startNumber;
        } else {
          clearInterval(lol);
        }
      }, 1500 / stat);
    },
    checkIE : function(){
      var nav =   window.navigator.userAgent,
          idx =   nav.indexOf("MSIE"),
          tri =   nav.indexOf("Trident/");
      if(idx > 0 || tri > 0){
          var version = (parseInt(nav.substring(idx + 5, nav.indexOf('.', idx)), 10));
          app.ie  =   true;
          document.body.classList.add('ie');
          document.body.classList.add('ie'+version);
      }
    },
    animate: function(){
      var _wa = document.querySelectorAll('.wa');
      for (var i = 0; i < _wa.length; i++) {
        var _this    = _wa[i],
            _style   = window.getComputedStyle(_this),
            _wh      = screen.height - parseInt(_style.marginTop) - parseInt(_style.marginBottom),
            _offsetT = _this.offsetTop + parseInt(_style.marginTop) + _wh * .05,
            _scroll  = window.scrollY,
            _screen  = _scroll + _wh,
            _charts  = _this.querySelector('.canvas_chart');


      if (_screen >= _offsetT) {
        _this.classList.add("animate");

        if (_charts) {
          app.chartBuilder();
        }
      }
    }
  },
}

export default app;
