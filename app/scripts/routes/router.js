/*global Web, Backbone*/

Web.Routers = Web.Routers || {};

(function () {
  'use strict';

    Web.Routers.Router = Backbone.Router.extend({
    controller: null
    , currentView: null
    , currentModal: null
    , history: []
    , routes: {
        ''              : 'home'
      , 'home'          : 'home'
      , 'work'          : 'work'
      , 'error/:name'   : 'error'
      , 'loading/:name' : 'loading'
    }
    /**
     *
     */
    , initialize: function (options) {
      if (_.isUndefined(options)) {
        return;
      }

      this.controller = options.controller;

      this.listenTo(Backbone.history, 'route', _.bind(this.saveHistory, this));

      this.$body = $(document.body);
      this.$app = $('<div id="web" class="web"/>');
      this.$modal = $('<div />');
      $(document.body).append(this.$modal, this.$app);

      this.$body.addClass((top === self ? 'frame-false' : 'frame-true'));

      this.$modal.attr({
        'class': 'modal fade clearfix'
        , 'tabindex': '-1'
        , 'role': 'dialog'
        , 'aria-labelledby': 'modalLabel'
        , 'aria-hidden': 'true'
        , 'data-backdrop': 'static'
      }).on('hidden.bs.modal', _.bind(this.closedCurrentModal, this));


    }
    /**
     *
     */
    , setCurrentView: function (view) {
      this.closeCurrentModal();
      this.$app.css({opacity: 0});
      this.$app.css({transition: 'none'});
      this.$app.html(view.render().$el);

      var bodyContext = 'body-' + view.className;
      this.$body.alterClass('body-*', bodyContext);

      // remove old view
      if (this.currentView !== null) {
        this.currentView.remove();
        this.currentView = null;
      }
      // store current view
      this.currentView = view;
      setTimeout(_.bind(function(){
        this.$app.css({opacity: 1.0});
        this.$app.css({transition: 'all 1.0s ease'});
      },this),100);
    }
    /**
     *
     */
    , setCurrentModal: function (view) {
      var modalContext = 'modal-has-' + view.className;
      var modal = new Web.Views.Modal({
        model: {view: view}, controller: this.controller
      });
      this.$body.alterClass('modal-has-*', modalContext);
      this.$modal.html(modal.render().$el);

        this.$modal.modal({
        show: true
        , keyboard: false
        , backdrop: 'static'
      });

      // remove old modal
      if (this.currentModal !== null) {
        if (_.isObject(this.currentModal.model.view)) {
          this.currentModal.model.view.remove();
        }
        this.currentModal.remove();
        this.currentModal = this.controller.Views.Modal = null;
      }
      // store current modal
      this.currentModal = this.controller.Views.Modal = modal;
    }
    /**
     *
     */
    , closedCurrentModal: function () {
      console.log('MODAL HIDDEN!!');
      if (this.currentModal !== null) {
        if (_.isObject(this.currentModal.model.view)) {
          this.currentModal.model.view.remove();
        }
        this.currentModal.remove();
        this.currentModal = this.controller.Views.Modal = null;
        this.$body.alterClass('modal-has-*', '');
      }
    }
    /**
     *
     */
    , closeCurrentModal: function () {
      console.log('CLOSE CURRENT MODAL');

      this.$modal.modal('hide');

    }
    /**
     *
     */
    , home: function () {
      if(!this._isOpen()){
        return;
      }
      var view = new Web.Views.Home({
        model: this.controller.Models.Cms.get('text')['view_home']
        , controller: this.controller
      });
      this.setCurrentView(view);
    }
    /**
     *
     */
    , work: function () {
      if(!this._isOpen()){
        return;
      }
      var view = new Web.Views.Work({
        model: this.controller.Models.Cms.get('text')['view_work']
        , controller: this.controller
      });
      this.setCurrentView(view);
    }
    /**
     *
     */
    , error: function (name) {
      var data = this.controller.Models.Cms.get('text')['views_error'][name];
      data = (_.isObject(data) ? data : this.controller.Models.Cms.get('text')['views_error']['generic']);
      var view = new Web.Views.Error({
        model: data
        , controller: this.controller
      });
      this.setCurrentModal(view);
    }
    /**
     *
     */
    , loading: function (name) {
      var data = this.controller.Models.Cms.get('text')['views_loading'][name];
      data = (_.isObject(data) ? data : this.controller.Models.Cms.get('text')['views_loading']['generic']);
      var view = new Web.Views.Loading({
        model: data
        , controller: this.controller
      });
      this.setCurrentModal(view);
    }
    /**
     *
     */
    , _isOpen: function () {
        var requestedFragment = Backbone.history.fragment;

        
        // is the user out of the geographically acceptable region
        if (_.isNull(this.controller.Models.Geo.get('inRegion'))) {
            this.controller.Models.Geo.once('change:inRegion', _.bind(function () {
                this.navigate(requestedFragment, {trigger: true})
            }, this));
            this.navigate('loading/generic', {trigger: false});
            return false;
        } else if (!this.controller.Models.Geo.get('inRegion')) {
            this.navigate('error/geo', {trigger: true});
            return false;
        }
        

        // is the window closed?
        if(this.controller.Models.Cms.get('windowStatus')===0){
            this.navigate('error/window', {trigger: true});
            return false;
        }

        return true;
    }
    /**
     *
     */
    , saveHistory: function (router, route, params) {
      this.history.push({
        name: route
        , args: params
        , fragment: Backbone.history.fragment
      });
      console.log('saveHistory', Backbone.history.fragment, route);
    }
  });

})();