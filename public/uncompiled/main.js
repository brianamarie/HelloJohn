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
                <div>
                    <h4 key={podcast}>{podcast}</h4>
                    <audio src={"/audio/" + podcast} controls preload />
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