var app = {
    init: function () {
      app.checkIE();
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
}

export default app;
