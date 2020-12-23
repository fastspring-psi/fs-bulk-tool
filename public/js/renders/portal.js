function renderNoProducts() {
  return (`
    <div class='row'>
        <div class='col'>
            <p> There are no products available <p>
        </div>
    </div>
  `);
}


//TO DO:
//Handle multiple prices
//Need to check if there are discounts or not
//Add logic to display discounts in a readable way
//Decide what information to show --> what is the best way to display product information and allow for quick editing?
//
/*            <td> ${product.pricing.price.USD} </td>
            <td> ${(product.hasOwnProperty('quantityDiscounts')) ?  product.pricing.quantityDiscounts : ''} </td>
            <td> ${(product.hasOwnProperty('dateLimits')) ? product.pricing.dateLimits.start : ''} </td>
            <td> ${(product.hasOwnProperty('dateLimits')) ? product.pricing.dateLimits.end : ''} </td>*/
function renderProductsTable(products) {
  const productRows = products.map((product) =>
  `
        <tr class='product-row'>
            <td> ${product.display.en} </td>
            <td> ${product.pricing.price.USD} </td>
        </tr>
  `);

  return (`
      <div id="products-table-container" class="row">
        <div class='col'>
          <table class="table table-hover">
            <thead>
              <tr class="bg-info">
                <th scope="col"> Display Name </th>
                <th scope="col"> Price </th>
                <th scope="col"> Discount </th>
                <th scope="col"> Discount Start </th>
                <th scope="col"> Discount End </th>
              </tr>
            </thead>
            <tbody>
              ${productRows.join('')}
            </tbody>
          </table>
        </div>
      </div>
    `);
}
