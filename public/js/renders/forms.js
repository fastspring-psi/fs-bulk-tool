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
      </div>
    </form>
    <button class="btn btn-primary " id="discount-form-submit" name="submit" type="button" onclick="return selectedDiscountSubmit()">
      Submit
    </button>`);
}
