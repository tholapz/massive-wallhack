/*global Web, Backbone*/
Web.Views = Web.Views || {};
(function () {
  'use strict';
    Web.Views.Home = Backbone.View.extend({
    template: Web.Templates['home']
    , className: 'view-home'
    , events: {
        'click .route-error': 'routeError'
      , 'click .route-loading': 'routeLoading'
    }
    /**
     *
     */
    , initialize: function (options) {
      _.bindAll(this, 'render');

      try {
        if(_.isUndefined(options.controller)){
          throw Error('The controller is a dependency. Please inject the controller into the view.');
        }
      } catch (e) {
        console.log(e);
      }

      this.controller = options.controller;
    }
    /**
     *
     */
    , render: function () {
      this.$el.html(this.template(this.model));
      return this;
    }
    /**
     *
     */
    , routeError: function (e) {
      e.preventDefault();
      this.controller.Routers.Router.navigate('error/generic', {trigger: true});
    }
    /**
     *
     */
    , routeLoading: function (e) {
      e.preventDefault();
      this.controller.Routers.Router.navigate('loading/generic', {trigger: true});
    }
  });
})();