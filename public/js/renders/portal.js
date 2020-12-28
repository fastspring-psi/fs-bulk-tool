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
function renderProductDiscounts(product) {
  let discounts = '';
  if (product.pricing.quantityDiscounts && Object.keys(product.pricing.quantityDiscounts).length > 0) {
    discounts = Object.keys(product.pricing.quantityDiscounts).map((key) => (
      `<span> ${key} : ${product.pricing.quantityDiscounts[key]} </span>`
    )).join('');
  } else {
    discounts = "No discounts";
  }
  return(discounts);
}

function renderProductDiscountDateLimits(product) {
  let dateLimits = '';
  if (product.pricing.dateLimits && Object.keys(product.pricing.dateLimits).length > 0) {
    dateLimits = Object.keys(product.pricing.dateLimits).map((key) => (
      `<span> ${key} : ${product.pricing.dateLimits[key]} </span>`
    )).join('');
  } else {
    dateLimits = "No date limits";
  }
  return(dateLimits);
}

/*
<tr class='product-row'>
    <td> ${product.display.en} </td>
    <td> ${product.pricing.price.USD} </td>
    <td> TEST </td>
</tr>
*/


function renderProductsTable(products) {
  const productRows = products.map((product) =>
  `
  <tr class='product-row'>
      <td> ${product.display.en} </td>
      <td> ${product.pricing.price.USD} </td>
      <td> ${renderProductDiscounts(product)} </td>
      <td> ${renderProductDiscountDateLimits(product)} </td>
      <td> ${product.pricing.discountReason ? product.pricing.discountReason.en : ''} </td>
  </tr>
  `
);

  return (`
      <div id="products-table-container" class="row">
        <div class='col'>
          <table class="table table-hover">
            <thead>
              <tr class="bg-info">
                <th scope="col"> Display Name </th>
                <th scope="col"> Price </th>
                <th scope="col"> Discount </th>
                <th scope="col"> Discount Date Limits </th>
                <th scope="col"> Discount Description </th>
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
