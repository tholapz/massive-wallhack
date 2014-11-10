this["Web"] = this["Web"] || {};
this["Web"]["Templates"] = this["Web"]["Templates"] || {};

this["Web"]["Templates"]["error"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<h1>' +((__t = ( headline1 )) == null ? '' : __t) +'</h1>\n<p>' +((__t = ( paragraph1 )) == null ? '' : __t) +'</p>\n<a href="#' +((__t = ( button.route )) == null ? '' : __t) +'" class="btn' +((__t = ( (button.display === 'true')? '' : ' hidden' )) == null ? '' : __t) +'">' +((__t = ( button.text )) == null ? '' : __t) +'</a>';}return __p};

this["Web"]["Templates"]["home"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }with (obj) {__p += '<h1>' +((__t = ( headline1 )) == null ? '' : __t) +'</h1>\n<h2>' +((__t = ( headline2 )) == null ? '' : __t) +'</h2>\n'; _.forEach(buttons, function (button, key) { ;__p += '\n<a href="#' +((__t = ( button.route )) == null ? '' : __t) +'" class="btn' +((__t = ( (button.display === 'true')? '' : ' hidden' )) == null ? '' : __t) +'' +((__t = ( ' route-'+key )) == null ? '' : __t) +'">' +((__t = ( button.text )) == null ? '' : __t) +'</a>\n'; }) ;__p += '\n';}return __p};

this["Web"]["Templates"]["loading"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<h1>' +((__t = ( headline1 )) == null ? '' : __t) +'</h1>\n<p>' +((__t = ( paragraph1 )) == null ? '' : __t) +'</p>\n<div>\n  <p class="loading-label">' +((__t = ( headline2 )) == null ? '' : __t) +'</p>\n  <div class="progress progress-striped active">\n    <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>\n  </div>\n</div>';}return __p};

this["Web"]["Templates"]["modal"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="modal-window">\n  <div class="modal-wrapper">\n    <div class="modal-layout">\n      <div class="modal-content">\n        \n      </div>\n    </div>\n  </div>\n</div>';}return __p};

this["Web"]["Templates"]["work"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }with (obj) {__p += '<h1>' +((__t = ( title )) == null ? '' : __t) +'</h1>\n'; _.forEach(buttons, function (button, key) { ;__p += '\n<a href="#' +((__t = ( button.route )) == null ? '' : __t) +'" class="btn' +((__t = ( (button.display === 'true')? '' : ' hidden' )) == null ? '' : __t) +'' +((__t = ( ' route-'+key )) == null ? '' : __t) +'">' +((__t = ( button.text )) == null ? '' : __t) +'</a>\n'; }) ;__p += '\n';}return __p};