//TODO
//Make submit function independent of page ie accept arguments
//If no date change payload
//If no disc reason

//This function works with the forms.js render
function discountSelectedProducts() {

  var percent = [];
  var qty = [];
  //var match = true;

  const req_percent = document.getElementById("pcntOff0").value;
  const req_prodQty = document.getElementById("prodQty0").value;
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

  if(!(req_percent && req_prodQty!="Choose...")) {
    alert('Please fill in percentage and quantity for discount');
    return;
  }
  if(productPaths.length == 0) {
    alert('Please select products to apply discount to');
    return;
  }

  for(i = 0; i < 10; i++){
    if(document.getElementById(`pcntOff${i}`) && document.getElementById(`prodQty${i}`)) {
      if((document.getElementById(`pcntOff${i}`).value == "") && (document.getElementById(`prodQty${i}`).value == "Choose...")){

      } else if((document.getElementById(`pcntOff${i}`).value == "") || (document.getElementById(`prodQty${i}`).value == "Choose...")) {
        alert("One of your discounts does not have a matching quantity or percent.");
        return;
      } else {
        percent.push(document.getElementById(`pcntOff${i}`).value);
        qty.push(document.getElementById(`prodQty${i}`).value);
      }

    } else {
      break;
    }
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
  } else if(dateStart && dateEnd){
    pricing.dateLimits["start"] = dateStart;
    pricing.dateLimits["end"] = dateEnd;
  } else if(dateStart && !dateEnd){
    pricing.dateLimits["start"] = dateStart;
    pricing.dateLimits["end"] = "";
  } else if(!dateStart && dateEnd){
    pricing.dateLimits["start"] = "";
    pricing.dateLimits["end"] = dateEnd;
  }

  if(discReason){
    pricing.discountReason["en"] = discReason;
  } else {
    pricing.discountReason["en"] = "";
  }

  for(i = 0; i < percent.length; i++){
    pricing.quantityDiscounts[qty[i]] = percent[i];
  }

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

                            var maxField = 10; //Input fields increment limitation
                            var addButton = $('.add_button'); //Add button selector
                            var wrapper = $('#discount-amount-group'); //Input field wrapper
                            //New input field html

                            var x = 1; //Initial field counter is 1
                            //Once add button is clicked
                            $(addButton).click(function(){
                                //Check maximum number of input fields
                                    const fieldHTML = `
                                    <div class="input-group mb-3">
                                      <input class="form-control" id="pcntOff${x}" placeholder="20" type="text" >
                                          <span class="input-group-text">% for </span>
                                          <select class="form-select" id="prodQty${x}">
                                            <option selected>Choose...</option>
                                            <option value="1">1 or more </option>
                                            <option value="2">2 or more</option>
                                            <option value="3">3 or more</option>
                                            <option value="4">4 or more</option>
                                            <option value="5">5 or more</option>
                                            <option value="6">6 or more</option>
                                            <option value="7">7 or more</option>
                                            <option value="8">8 or more</option>
                                            <option value="9">9 or more</option>
                                            <option value="10">10 or more</option>
                                          </select>
                                          <p class="remove_button">&#8854;</p>
                                        </div>`;
                                if(x < maxField){
                                    x++; //Increment field counter
                                    $(wrapper).append(fieldHTML); //Add field html
                                }
                            });

                            //Once remove button is clicked
                            $(wrapper).on('click', '.remove_button', function(e){
                                e.preventDefault();
                                $(this).parent('div').remove(); //Remove field html
                                x--; //Decrement field counter
                            });
                          })

                          $('.table tr.product-row').click(function(event){
                            event.preventDefault();
                            if (event.target.type !== 'checkbox') {
                              $(':checkbox', this).trigger('click');
                            }
                          });

                          $('[data-toggle="tooltip"]').tooltip()

                          $("#product-selectall").click(function(){  //"select all" change
                            console.log("HERE");
                            if ($(this).hasClass('allChecked')) {
                                $('input[type="checkbox"]', '#table-products').prop('checked', false);
                            } else {
                                $('input[type="checkbox"]', '#table-products').prop('checked', true);
                            }
                            $(this).toggleClass('allChecked');
                          });
                    });
            }, 3000);
            alert('You have successfully discounted your products!');
        } else {
            alert('Could not update products, please make sure products exists');
            const formElement = renderSelectedDiscountForm();
            $('#form-container').append(formElement);
        }
    });
}
