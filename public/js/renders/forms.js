//TODO - create discount each time a discount is added
//add tooltips for explenation
function renderSelectedDiscountForm() {
  return(`
    <form>
      <div class="form-group" id="discount-amount-group">
        <div class="input-group mb-3">
            <input class="form-control" id="pcntOff0" placeholder="20" type="text" >
            <span class="input-group-text">% for </span>
            <select class="form-select" id="prodQty0">
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
            <p class="add_button">&oplus;</p>
        </div>
         <div class="req-info">
              <span class="form-tooltip" data-toggle="tooltip" data-placement="right" data-html="true" title="<h6>Product Discount<br></h6><p>Product discount applies the given percentage to the selected quantity and more. If you would like to apply a given percentage to all products select &quot;1 or more&quot;.</p?">&nbsp;&#9432<span>
              <p>* Discount amount and quantity are required</p>
        </div>
      </div>
      <div class="form-group" id="discount-date-range-group">
        <span class="input-group-text" for="dateStart">From</span>
        <input class="form-control" id="dateStart" name="date" placeholder="YYYY-MM-DD" type="text" readonly/>
        <span class="input-group-text" for="dateEnd">To</span>
        <input class="form-control" id="dateEnd" name="date" placeholder="YYYY-MM-DD" type="text" readonly/>
        <span class="form-tooltip"data-toggle="tooltip" data-placement="right" data-html="true" title="<h6>Discount Date Range<br></h6><p>The discount date range determines when your discount will start and end. Dates start at 00:00 of the given day. eg. If you would like a discount to end on YYYY-01-20 you would select YYYY-01-21 as the end date.</p>">&nbsp;&#9432<span>
      </div>
      <div class="form-group">
        <label class="input-group-text" for="discReason">
          Discount Reason<br>
        </label>
        <textarea rows="4" class="form-control" id="discReason" name="text" placeholder="Please give a reason for the discount."></textarea>
      </div>
      <div class="form-group">
      </div>
    </form>
    <button class="btn btn-primary " id="discount-form-submit" name="submit" type="button" onclick="return discountSelectedProducts()">
      Submit
    </button>`);
}
