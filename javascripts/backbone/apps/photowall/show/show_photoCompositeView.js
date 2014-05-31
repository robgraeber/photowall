Pixlee.module('PhotowallApp.Show', function(Show, App, Backbone, Marionette, $, _) {

  Show.PhotoCompositeView = Backbone.Marionette.CompositeView.extend({
      template: 'photowall_photoCompositeView',
      itemViewContainer: '.photos',
      itemView: Show.PhotoView
  });
  
});