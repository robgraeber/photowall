Pixlee.module('PhotowallApp.Show', function(Show, App, Backbone, Marionette, $, _) {
  
  var photoCompositeView = new Show.PhotoCompositeView({collection: new Backbone.Collection()});
  var initialLoad = 6*10;
  var incrementalLoad = 6*3;

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
          var topHeight = $("body").height() - window.innerHeight;
          if(topHeight - $(window).scrollTop() < 1000){
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
