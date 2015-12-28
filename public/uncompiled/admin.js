/**
 * Created by Briana on 12/28/15.
 */
/**
 * Created by Briana on 12/20/15.
 */

var PodcastComponent = React.createClass({
    getInitialState: function(){
        return ({
        })
    },
    /*handleClick: function(e){
        console.log(e.target.parentNode);
        console.log(e);
        e.preventDefault();
    },*/
    componentDidMount: function(){
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
    render: function(){
        let handleClick = this.handleClick;
        return (
        <div>
            <form method="POST" action="/upload" encType="multipart/form-data">
                <input name="name" type="file"></input>
                <button onClick={handleClick}>Submit</button>
            </form>
        </div>
        )
    }
});

ReactDOM.render(<PodcastComponent />, document.getElementById("upload"));