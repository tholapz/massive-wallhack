/*global Web, window, jQuery*/
(function () {
  'use strict';
  window.Web = {
    Models: {}
    , Collections: {}
    , Views: {}
    , Routers: {}
    , Templates: {}
    , init: function (options) {

      var controller = {
        Models: {}
        , Collections: {}
        , Views: {}
        , Routers: {}
      };

      controller.Models.Cms = new Web.Models.Cms({wid: 'data/data.json'}, {controller: controller});
      controller.Models.Cms.once('change:ts', _.bind(function () {
        
        // Akamai Geo Location
        controller.Models.Geo = new Web.Models.Geo({
            countries: controller.Models.Cms.get('settings').countries
        });
        

        

        
        controller.Models.Google = new Web.Models.Google({}, {
            controller : controller
            ,ga_id : controller.Models.Cms.get("settings").google_analytics
            ,ga_domain : 'votenow.tv'
        });
        

        

        

        controller.Routers.Router = new Web.Routers.Router({controller: controller });
        Backbone.history.start();

      }, this));
      controller.Models.Cms.requestData();

      return this;
    }
  };

  jQuery(document).ready(function ($) {
    Web.init({});
  });

})();
