Pixlee.module('PhotowallApp.Show', function(Show, App, Backbone, Marionette, $, _, TweenMax) {
  Show.PhotoView = Backbone.Marionette.ItemView.extend({
    template: 'photowall_photoView',
    className: 'photoImg',
    tagName: "img",
    attributes: function() {
      return {
        src: this.model.get('medium_url'),
      };
    },
    events:{
      "error": "imgError",
    },
    initialize:function(){
      animateCheck(this);
    },
    imgError:function(e){
      e.target.style.display = 'none';
    },
  });

  var isScrolledIntoView = function(el){
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();
      var elemTop = $(el).offset().top;
      var elemBottom = elemTop + $(el).height();

      return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  };
  var animateCheck = function(view){
    if(isScrolledIntoView(view.el) && !view.model.get("alreadyAnimated")){
      view.model.set("alreadyAnimated", true);
      TweenMax.from(view.el, 1.2, {rotationY:500, scale:0.1, ease:Power1.easeOut});
    }
  };
}, TweenMax);