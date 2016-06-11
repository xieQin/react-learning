require('react-addons-pure-render-mixin')

var ReactCssTransitionGroup = React.addons.ReactCssTransitionGroup

var TodoList = React.createClass({
  getInitialState: function() {
    return {
      items: ['Apple', 'Orange', 'Watermelon', 'Lemon']
    }
  },

  handleAdd: function() {
    var newItems = this.state.items.concat([promt('Enter new item')])
    this.setState({items: newItems})
  },

  handleRemove: function(i) {
    var newItems = this.state.items
    newItems.splice(i, 1)
    this.setState({items: newItems})
  },

  render: function() {
    var items = this.state.items.map(function(item, i) {
      return (
        <div key={item} onClick={this.handleRemove.bind(this, i)}>
          {item}
        </div>
      )
    }).bind(this)
    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <ReactCssTransitionGroup transitionName="example">
          {items}
        </ReactCssTransitionGroup>
      </div>
    )
  }
})

ReactDOM.render(
  <TodoList/>,
  document.getElementById('content')
)