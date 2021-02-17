//TODO
//Make submit function independent of page ie accept arguments
//If no date change payload
//If no disc reason

//This function works with the forms.js render
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

  if(!(percent && prodQty)) {
    alert('Please fill in percentage and quantity for discount');
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

  if(!dateStart && !dateEnd){
    pricing.dateLimitsEnabled = false;
    console.log("There are no dates");
  } else if(dateStart && dateEnd){
    pricing.dateLimits["start"] = dateStart;
    pricing.dateLimits["end"] = dateEnd;
  } else if(dateStart && !dateEnd){
    pricing.dateLimits["start"] = dateStart;
  } else if(!dateStart && dateEnd){
    pricing.dateLimits["end"] = dateEnd;
  }

  if(discReason){
    pricing.discountReason["en"] = discReason;
  } else {
    pricing.discountReason["en"] = "";
  }
  pricing.quantityDiscounts[prodQty] = percent;
  //pricing.dateLimits["start"] = dateStart;
  //pricing.dateLimits["end"] = dateEnd;
  //pricing.discountReason["en"] = discReason;
  for(i = 0; i < productPaths.length; i++) {
    payload.products[i] = {
      product: productPaths[i],
      pricing
    };
  }

  const token = getToken();
  payload.token = token;

  console.log(payload);

  $('#loading-spinner').show();

  // Perform charge request
  //TODO add iterated success verification
  $.post(`${window.location.origin}/products`, payload)
      .done((resUpdatedProds) => {
          if (resUpdatedProds && resUpdatedProds.success && resUpdatedProds.response.products) {
              // Reload table content
              // Give 2 seconds for changes to reflect in API
              console.log(resUpdatedProds.response.products);
              setTimeout(function() {
                  $.post(`${window.location.origin}/getPortalDetails`, { token })
                      .done((resPortal) => {
                          if (resPortal && resPortal.success) {
                              const productsElement = resPortal.products.length > 0 ?
                                  renderProductsTable(resPortal.products)
                                  :
                                  renderNoProducts(resPortal.products);
                              ;
                              $('#loading-spinner').hide();
                              $('#products-container').html([productsElement]);

                          }
                          const formElement = renderSelectedDiscountForm();
                          $('#form-container').html(formElement);
                          //used for table row selecting
                          $(document).ready(function(){
                            var date_input=$('input[name="date"]'); //our date input has the name "date"
                            var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
                            var options={
                              format: "yyyy-mm-dd",
                              clearBtn: true,
                              container: container,
                              todayHighlight: true,
                              autoclose: true
                            };
                            date_input.datepicker(options);
                          })

                          $('.table tr.product-row').click(function(event){
                            event.preventDefault();
                            if (event.target.type !== 'checkbox') {
                              $(':checkbox', this).trigger('click');
                            }
                          });

                          $('[data-toggle="tooltip"]').tooltip()
                    });
            }, 3000);
        } else {
            alert('Could not update products, please make sure products exists');
            const formElement = renderSelectedDiscountForm();
            $('#form-container').append(formElement);
        }
    });
}
