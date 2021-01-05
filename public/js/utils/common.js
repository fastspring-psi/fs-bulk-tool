function logout() {
    // Remove token from sessionStorage
    sessionStorage.removeItem('FS-token');
    // Redirect to login page
    window.location.href = '/login.html';
}

function forceLogout(errMessage) {
    alert(errMessage);
    logout();
}

/*  Retrieves private token to query API from sessionStorage.
 *  If token is not available we will redirect users back to login page.
 */
function getToken() {
    const token = JSON.parse(sessionStorage.getItem('FS-token'));
    if (!token) {
        forceLogout('Token not found, please login again!');
    } else {
        return token;
    }
}

//TODO
//Make submit function independent of page ie accept arguments
function submitSelectedDiscount() {
  var percent = document.getElementById("pcntOff").value;
  var prodQty = document.getElementById("prodQty").value;
  var dateStart = document.getElementById("dateStart").value.toISOString();
  var dateEnd = document.getElementById("dateEnd").value.toISOString();
  var discReason = document.getElementById("discReason").value;
  console.log(typeof(dateStart));
  var productsTable = document.getElementById("table-products");

  var checkBoxes = productsTable.getElementsByTagName("INPUT");
  var productPaths = [];
  for(var i = 0; i < checkBoxes.length; i++){
    if(checkBoxes[i].checked){
      var row = checkBoxes[i].parentNode.parentNode;
      productPaths.push(row.cells[1].getAttribute("data-path"));
    }
  }
  var productBodies = productPaths.map((product, i) =>
  `
  {
    "product" : "${product}",
    "display" : {
      "en" : "String"
    },
    "pricing" : {
      "quantityDiscounts" : {
        "${prodQty}" : ${percent}
      },
      "dateLimits" : {
        "start" : "${dateStart}",
        "end" : "${dateEnd}"
      },
      "discountReason" : {
        "en" : "${discReason}"
      }
    }
  } ${productPaths[i+1] ? ',' : ''}
  `
  );

  console.log(productBodies);
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
