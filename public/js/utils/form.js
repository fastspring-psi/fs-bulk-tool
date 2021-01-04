
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

  $('.table tr').click(function(event){
    console.log("table row clicked");
    if (event.target.type !== 'checkbox') {
      $(':checkbox', this).trigger('click');
    }
  });
});

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
