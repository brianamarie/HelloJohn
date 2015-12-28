"use strict";

/**
 * Created by Briana on 12/28/15.
 */
/**
 * Created by Briana on 12/20/15.
 */

var PodcastComponent = React.createClass({
    displayName: "PodcastComponent",

    getInitialState: function getInitialState() {
        return {};
    },
    /*handleClick: function(e){
        console.log(e.target.parentNode);
        console.log(e);
        e.preventDefault();
    },*/
    componentDidMount: function componentDidMount() {
        var self = this;
        /* $('form').on('submit', function(){
             $.ajax({
             type: "POST",
             url: url,
             data: data,
             success: success,
             dataType: dataType});
         });*/
    },
    render: function render() {
        var handleClick = this.handleClick;
        return React.createElement(
            "div",
            null,
            React.createElement(
                "form",
                { method: "POST", action: "/upload", encType: "multipart/form-data" },
                React.createElement("input", { name: "name", type: "file" }),
                React.createElement(
                    "button",
                    { onClick: handleClick },
                    "Submit"
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(PodcastComponent, null), document.getElementById("upload"));