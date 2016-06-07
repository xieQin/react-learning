var FilterableProductTable = React.createClass({
  getInitialState: function() {
    return {
      filter: '',
      isStock: false
    }
  },
  render: function() {
    return (
      <div className="container">
        <SearchBar
          filter={this.state.filter}
          isStock={this.state.isStock}
        />
        <ProductTable
          products={this.props.data}
          filter={this.state.filter}
          isStock={this.state.isStock}
        />
      </div>
    )
  }
})

var SearchBar = React.createClass({
  handleFilterChange: function(e) {
    this.setState({filter: e.target.value})
  },
  handleIsStockChange: function(e) {
    this.setState({isStock: e.target.value})
  },
  render: function() {
    return (
      <form>
        <input type="text"
          placeholder="Search..."
          value={this.props.filter}
          onChange={this.handleFilterChange}
        />
        <div className="check">
          <input type="checkbox"
            checked={this.props.isStock}
            onChange={this.handleIsStockChange}
          />
          Only show products in stock
        </div>
      </form>
    )
  }
})

var ProductTable = React.createClass({
  render: function() {
    var rows = []
    var lastCategory = null
    var isStock = this.props.isStock
    this.props.products.map(function(product) {
      if(isStock && !product.stocked) {
        return
      }
      if(product.category !== lastCategory) {
        rows.push(<ProductCategoryRow key={product.category} category={product.category}></ProductCategoryRow>)
      }
      rows.push(<ProductRow key={product.name} product={product}></ProductRow>)
      lastCategory = product.category
    })
    return (
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
})

var ProductCategoryRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td colSpan="2">{this.props.category}</td>
      </tr>
    )
  }
})

var ProductRow = React.createClass({
  render: function() {
    var name = this.props.product.stocked ?
             this.props.product.name :
             <span style={{color: 'red'}}>
              {this.props.product.name}
             </span>
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    )
  }
})

var data = [
  {"id": 1, "category": "Sporting Goods", "price": "$49.99", "stocked": true, "name": "Football"},
  {"id": 2, "category": "Sporting Goods", "price": "$9.99", "stocked": true, "name": "Baseball"},
  {"id": 3, "category": "Sporting Goods", "price": "$29.99", "stocked": false, "name": "Basketball"},
  {"id": 4, "category": "Electronics", "price": "$99.99", "stocked": true, "name": "iPod Touch"},
  {"id": 5, "category": "Electronics", "price": "$399.99", "stocked": false, "name": "iPhone 5"},
  {"id": 6, "category": "Electronics", "price": "$199.99", "stocked": true, "name": "Nexus 7"}
]

ReactDOM.render(
  <FilterableProductTable url="/api/search" data={data}/>,
  document.getElementById('content')
)