/**
 * Created by Briana on 12/20/15.
 */

var PodcastComponent = React.createClass({
    getInitialState: function(){
        return ({
            audio: []
        })
    },
    componentDidMount: function(){
        var self = this;
        $.getJSON('/getFiles', function(data){
            self.setState({
                audio: data
            });
        });
    },
    render: function(){
        var podcasts = this.state.audio.map(function(podcast){
           return (
                <div key={podcast}>
                    <h4>{podcast.replace(/\-|\_/gi, " ").split(".")[0]}</h4>
                    <audio src={"/audio/" + podcast} controls preload id="audiopz" />
                    <br />
                    <a href={"/download/" + podcast}>Download</a>
                </div>
            )
        });
        return (
            <div>{podcasts}</div>
        )
    }
});

ReactDOM.render(<PodcastComponent />, document.getElementById("mount"));