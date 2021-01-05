
$(document).ready(function(){
  var date_input=$('input[name="date"]'); //our date input has the name "date"
  var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
  var options={
    format: 'mm/dd/yyyy',
    container: container,
    todayHighlight: true,
    autoclose: true,
  };
  date_input.datepicker(options);
})

//TODO
//Make submit function independent of page ie accept arguments
function selectedDiscountSubmit() {
  debugger;
  var percent = document.getElementById("pcntOff").value;
  var prodQty = document.getElementById("prodQty").value;
  var dateStart = document.getElementById("dateStart").value;
  var dateEnd = document.getElementById("dateEnd").value;
  var discReason = document.getElementById("discReason").value;

  var productsTable = document.getElementById("table-products");

  var checkBoxes = productsTable.getElementsByTagName("INPUT");

  for(var i = 0; i < checkBoxes.length; i++){
    if(checkBoxes[i].checked){
      console.log(i);
    }
  }
}

function testPrint() {
  var percent = document.getElementById("pcntOff").value;
  var prodQty = document.getElementById("prodQty").value;
  var dateStart = document.getElementById("dateStart").value;
  var dateEnd = document.getElementById("dateEnd").value;
  var discReason = document.getElementById("discReason").value;

  var newWin=window.open('','Print-Window');
  newWin.document.open();
  newWin.document.write(percent,prodQty,dateStart,dateEnd,discReason);
  newWin.document.close();
  setTimeout(function(){newWin.close();},10);
}

function renderSelectedDiscountForm() {
  return(`
    <form>
      <div class="form-group">
        <div class="input-group mb-3" id="discount-amount-group">
          <input class="form-control" id="pcntOff" placeholder="20" type="text" >
          <span class="input-group-text">% for </span>
          <select class="form-select" id="prodQty">
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
        </div>
      </div>
      <div class="form-group" id="discount-date-range-group">
        <span class="input-group-text" for="dateStart">From</span>
        <input class="form-control" id="dateStart" name="date" placeholder="MM/DD/YYY" type="text"/>
        <span class="input-group-text" for="dateEnd">To</span>
        <input class="form-control" id="dateEnd" name="date" placeholder="MM/DD/YYY" type="text"/>
      </div>
      <div class="form-group">
        <label class="input-group-text" for="discReason">
          Discount Reason<br>
        </label>
        <textarea rows="4" class="form-control" id="discReason" name="text" placeholder="Please give a reason for the discount."></textarea>
      </div>
      <div class="form-group">
        <div>
          <button class="btn btn-primary " id="discount-form-submit" name="submit" type="button" onclick="return selectedDiscountSubmit()">
            Submit
          </button>
        </div>
      </div>
    </form>`);
}
