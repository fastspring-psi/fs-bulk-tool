//TODO
//Make submit function independent of page ie accept arguments
//If no date change payload
//If no disc reason
function submitSelectedDiscount() {
  const percent = document.getElementById("pcntOff").value;
  const prodQty = document.getElementById("prodQty").value;
  const dateStart = document.getElementById("dateStart").value;
  const dateEnd = document.getElementById("dateEnd").value;
  const discReason = document.getElementById("discReason").value;

  const productsTable = document.getElementById("table-products");
  const checkBoxes = productsTable.getElementsByTagName("INPUT");
  const productPaths = [];
  for(var i = 0; i < checkBoxes.length; i++){
    if(checkBoxes[i].checked){
      var row = checkBoxes[i].parentNode.parentNode;
      productPaths.push(row.cells[1].getAttribute("data-path"));
    }
  }

  if(!(percent && prodQty && dateStart && dateEnd && discReason)) {
    alert('Please fill in all discount fields');
    return;
  }
  if(productPaths.length == 0) {
    alert('Please select products to apply discount to');
    return;
  }

  const pricing = {
      quantityDiscounts: {},
      dateLimitsEnabled: true,
      dateLimits: {},
      discountReason: {}
  };
  const payload = {
    products: []
  };

  pricing.quantityDiscounts[prodQty] = percent;
  pricing.dateLimits["start"] = dateStart;
  pricing.dateLimits["end"] = dateEnd;
  pricing.discountReason["en"] = discReason;
  for(i = 0; i < productPaths.length; i++) {
    payload.products[i] = {
      product: productPaths[i],
      pricing
    };
  }

  const token = getToken();
  payload.token = token;

  console.log(payload);
}
