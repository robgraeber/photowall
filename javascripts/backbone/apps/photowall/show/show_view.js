Pixlee.module('PhotowallApp.Show', function(Show, App, Backbone, Marionette, $, _) {
  
  var PhotoView = Backbone.Marionette.ItemView.extend({
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
        "load": "imgLoad",
        "click": "onClick"
      },
      onClick:function(){
      },
      initialize:function(){
        animateCheck(this);
      },
      imgError:function(e){
        e.target.style.display = 'none';
      },
      imgLoad:function(e){
      }
  });
  var PhotoCompositeView = Backbone.Marionette.CompositeView.extend({
      template: 'photowall_photoCompositeView',
      itemViewContainer: '.photos',
      itemView: PhotoView
  });

  var photoCompositeView = new PhotoCompositeView({collection: new Backbone.Collection()});
  var initialLoad = 6*10;
  var incrementalLoad = 6*3;
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

	//This is the layout 
  Show.PhotowallLayout = Marionette.Layout.extend({
      template: 'photowall_layout',
      regions:{
          photos_region:"#photos_region",
          pagination_region:"#pagination_region"
      },
      initialize:function(){
        var that = this;
        $(window).scroll(function(){
          // photoCompositeView.children.each(function(view){
          //   animateCheck(view);
          // });

          var topHeight = $("body").height() - window.innerHeight;
          if(topHeight - $(window).scrollTop() < 1000){
            console.log("preload me");
            var len = photoCompositeView.collection.length;
            photoCompositeView.collection.add(that.collection.slice(len, len+incrementalLoad));
          }
        });
      },
      onShow:function(){
        this.photos_region.show(photoCompositeView);
        photoCompositeView.collection.add(this.collection.slice(0,initialLoad));
      }
  });
});
