//TODO
//Make submit function independent of page ie accept arguments
//If no date change payload
//If no disc reason
function discountSelectedProducts() {
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

  //add loading spinner
  console.log(payload);

  // Perform charge request
  //TODO add iterated success verification
  $.post(`${window.location.origin}/products`, payload)
      .done((resUpdatedProds) => {
          if (resUpdatedProds && resUpdatedProds.success && resUpdatedProds.response.products) {
              // Reload table content
              // Give 2 seconds for changes to reflect in API
              setTimeout(function() {
                  $.post(`${window.location.origin}/getPortalDetails`, { token, accountId })
                      .done((resPortal) => {
                          if (resPortal && resPortal.success) {
                              const productsElement = resPortal.products.length > 0 ?
                                  renderProductsTable(resPortal.products)
                                  :
                                  renderNoProducts(resPortal.products);
                              ;
                              $('#products-container').html([productsElement]);

                          }
                          const formElement = renderSelectedDiscountForm();
                          $('#form-container').append(formElement);
                    });
            }, 3000);
        } else {
            alert('Could not update products, please make sure products exists');
            const formElement = renderSelectedDiscountForm();
            $('#form-container').append(formElement);
        }
    });
}
