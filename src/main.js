"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('app'));
}); //without history location style - /#/about

// Router.run(routes, Router.HistoryLocation, function(Handler) {
//     React.render(<Handler/>, document.getElementById('app'));
// }); - no support for old browsers
