var FilterableProductTable = React.createClass({
  render: function() {
    return (
      <div className="container">
        <SearchBar></SearchBar>
        <ProductTable></ProductTable>
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
    return (
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
          <ProductCategoryRow></ProductCategoryRow>
          <ProductRow></ProductRow>
        </tbody>
      </table>
    )
  }
})

var ProductCategoryRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>Sporting Goods</td>
      </tr>
    )
  }
})

var ProductRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>Football</td>
        <td>$49.99</td>
      </tr>
    )
  }
})

ReactDOM.render(
  <FilterableProductTable url="/api/search"/>,
  document.getElementById('content')
)