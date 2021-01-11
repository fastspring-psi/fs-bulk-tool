function renderNoProducts() {
  return (`
    <div class='row'>
        <div class='col'>
            <p> There are no products available <p>
        </div>
    </div>
  `);
}

/*            <td> ${product.pricing.price.USD} </td>
            <td> ${(product.hasOwnProperty('quantityDiscounts')) ?  product.pricing.quantityDiscounts : ''} </td>
            <td> ${(product.hasOwnProperty('dateLimits')) ? product.pricing.dateLimits.start : ''} </td>
            <td> ${(product.hasOwnProperty('dateLimits')) ? product.pricing.dateLimits.end : ''} </td>*/

//TODO:
//Display %off with commas
function renderProductDiscounts(product) {
  let discounts = '';
  if (product.pricing.quantityDiscounts && Object.keys(product.pricing.quantityDiscounts).length > 0) {
    discounts = Object.keys(product.pricing.quantityDiscounts).map((key,i) => (
      `<span> ${product.pricing.quantityDiscounts[key]}% off ${key} or more${i+1 < Object.keys(product.pricing.quantityDiscounts).length ? ',<br/>' : ''}</span>`
    )).join('');
  } else {
    discounts = "No discounts";
  }
  return(discounts);
}

//TODO:
//Display date range in a more readable way
function renderProductDiscountDateLimits(product) {
  let dateLimits = '';
  if (product.pricing.dateLimits && Object.keys(product.pricing.dateLimits).length > 0) {
    dateLimits = Object.keys(product.pricing.dateLimits).map((key, i) => (
      `<span> ${key} : ${product.pricing.dateLimits[key]}${i+1 < Object.keys(product.pricing.dateLimits).length ? '<br/>' : ''} </span>`
    )).join('');
  } else {
    dateLimits = "No date limits";
  }
  return(dateLimits);
}

function renderProductDiscountReason(product) {
  let discountReason = '';
  if (product.pricing.discountReason && Object.keys(product.pricing.discountReason).length > 0) {
    discountReason = Object.keys(product.pricing.discountReason).map((key) => (
      `<span> ${product.pricing.discountReason[key]} </span>`
    )).join('');
  }
  return(discountReason);
}

//TO DO:
//Handle multiple prices
//Need to check if there are discounts or not
//Add logic to display discounts in a readable way
//Decide what information to show --> what is the best way to display product information and allow for quick editing?
//
function renderProductsTable(products) {
  const productRows = products.map((product) =>
  `
  <tr class='product-row'>
    <td> <input type="checkbox" /> </td>
    <td data-path="${product.product}"> ${product.display.en} </td>
    <td> $${product.pricing.price.USD} </td>
    <td> ${renderProductDiscounts(product)} </td>
    <td> ${renderProductDiscountDateLimits(product)} </td>
    <td> ${renderProductDiscountReason(product)} </td>
  </tr>
  `
  );
  return (`
    <div id="loading-spinner" class="spinner-border pageLoader" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <h3> Select products to discount <br></h3>
    <div id="products-table-container" class="row">
      <div class='col'>
        <table class="table table-hover" id="table-products">
          <thead>
            <tr class="bg-info">
              <th scope="col"> Selected </th>
              <th scope="col"> Display Name </th>
              <th scope="col"> Price </th>
              <th scope="col"> Discount </th>
              <th scope="col"> Discount Date Limits </th>
              <th scope="col"> Discount Reason </th>
            </tr>
          </thead>
          ${productRows.join('')}
          <tbody>
          </tbody>
          </table>
        </div>
      </div>
    `);
}
