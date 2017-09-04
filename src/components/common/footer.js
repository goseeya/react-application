'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Footer = React.createClass({
    render: function() {
        //Link to= from routes
        return (
            <div class="panel panel-default">
                <div class="panel-footer">Małgorzata Rakowska 2017</div>
            </div>
        );
    }
});

module.exports = Footer;