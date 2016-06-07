var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []}
  },
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      cache: false,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval)
  },
  handleCommentSubmit: function(comment) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState(data)
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString())
      }
    })
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    )
  }
})

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      )
    })
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    )
  }
})

var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''}
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value})
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value})
  },
  handelSubmit: function(e) {
    e.preventDefault()
    var author = this.state.author.trim()
    var text = this.state.author.trim()
    if(!text || !author) {
      return
    }
    this.props.onCommentSubmit({author: author, text: text})
    this.setState({author: '', text: ''})
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handelSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="say something"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input
          type="submit"
          value="Post"
        />
      </form>
    )
  }
})

var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id:2, author: "Jordan Walke", text: "This is *anthor* comment"}
]

var Comment = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable()
    var rawMarkup = md.render(this.props.children.toString())
    return { __html: rawMarkup }
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerousSetInnerHTML={this.rawMarkup()} />
      </div>
    )
  }
})

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000}/>,
  document.getElementById('content')
)