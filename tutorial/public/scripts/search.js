var FilterableProductTable = React.createClass({
  getInitialStete: function() {
    return {
      filter: '',
      isStock: false
    }
  },
  render: function() {
    return (
      <div className="container">
        <SearchBar />
        <ProductTable products={this.props.data} />
      </div>
    )
  }
})

var SearchBar = React.createClass({
  render: function() {
    return (
      <div className="search">
        <input type="text" placeholder="Search..."/>
        <input type="checkbox"/>
        <label>Only show products in stock</label>
      </div>
    )
  }
})

var ProductTable = React.createClass({
  render: function() {
    var rows = []
    var lastCategory = null
    this.props.products.map(function(product) {
      if(product.category !== lastCategory) {
        rows.push(<ProductCategoryRow key={product.category} category={product.category}></ProductCategoryRow>)
      }
      rows.push(<ProductRow key={product.name} name={product.name} price={product.price}></ProductRow>)
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
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.price}</td>
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

// ReactDOM.render(
//   <FilterableProductTable url="/api/search"/>,
//   document.getElementById('content')
// )

ReactDOM.render(
  <FilterableProductTable url="/api/search" data={data}/>,
  document.getElementById('content')
)