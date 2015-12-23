"use strict";

/**
 * Created by Briana on 12/20/15.
 */

var PodcastComponent = React.createClass({
    displayName: "PodcastComponent",

    getInitialState: function getInitialState() {
        return {
            audio: []
        };
    },
    componentDidMount: function componentDidMount() {
        var self = this;
        $.getJSON('/getFiles', function (data) {
            self.setState({
                audio: data
            });
        });
    },
    render: function render() {
        var podcasts = this.state.audio.map(function (podcast) {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h4",
                    { key: podcast },
                    podcast
                ),
                React.createElement("audio", { src: "/audio/" + podcast, controls: true, preload: true }),
                React.createElement(
                    "a",
                    { href: "/download/" + podcast },
                    "Download"
                )
            );
        });
        return React.createElement(
            "div",
            null,
            podcasts
        );
    }
});

ReactDOM.render(React.createElement(PodcastComponent, null), document.getElementById("mount"));