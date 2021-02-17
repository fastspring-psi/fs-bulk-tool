function renderNoProducts() {
  return (`
    <div class='row'>
        <div class='col'>
            <p> There are no products available <p>
        </div>
    </div>
  `);
}

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
  console.log("THIS IS WHERE THE LENGTH IS");
  if(product.pricing.dateLimits){
    console.log(Object.keys(product.pricing.dateLimits).length);
  }

  //WORK HERE ON NO DATE LIMIT IF ""
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
//Add select all & deselect  all
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
