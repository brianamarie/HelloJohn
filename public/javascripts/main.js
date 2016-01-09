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
                { key: podcast },
                React.createElement(
                    "h4",
                    null,
                    podcast.replace(/\-|\_/gi, " ").split(".")[0]
                ),
                React.createElement("audio", { src: "/audio/" + podcast, controls: true, preload: true, id: "audiopz" }),
                React.createElement("br", null),
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