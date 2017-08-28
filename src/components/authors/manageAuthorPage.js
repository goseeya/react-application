"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorApi = require('../../api/authorApi');
var toastr = require('toastr');


var ManageAuthorPage = React.createClass({
     contextTypes: {
        router: React.PropTypes.func
    },
    // mixin: [
    //     Router.Navigation
    // ],

    getInitialState: function() {
        return {
            author: { id: '', firstName: '', lastName: '' }
        };
    },

    setAuthorState: function(event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },

    saveAuthor: function(event) {
        event.preventDefault();
        AuthorApi.saveAuthor(this.state.author); //saves author to fake api
        toastr.success('Author saved.');
        //redirect user to author pg
        this.context.router.transitionTo('authors');

    },

    render: function() {
        return (
            <div>
                <AuthorForm 
                    author={this.state.author}
                    onChange={this.setAuthorState}
                    onSave={this.saveAuthor} />
            </div>
        );
    }
});

module.exports = ManageAuthorPage;