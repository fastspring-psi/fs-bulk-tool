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
//If no date change payload
//If no disc reason
function submitSelectedDiscount() {
  var percent = document.getElementById("pcntOff").value;
  var prodQty = document.getElementById("prodQty").value;
  var dateStart = document.getElementById("dateStart").value;
  var dateEnd = document.getElementById("dateEnd").value;
  var discReason = document.getElementById("discReason").value;
  if(test)
  var dates_body = '';
  if(dateStart && dateEnd){
    dates_body = (`
    ,"dateLimitsEnabled": true,
    "dateLimits" : {
      "start" : "${dateStart}",
      "end" : "${dateEnd}"
    },
    `);
  }elseif(dateStart){
    dates_body = (`
    ,"dateLimitsEnabled": true,
    "dateLimits" : {
      "start" : "${dateStart}"
    },
    `);
  }elseif(dateEnd){
    dates_body = (`
    ,"dateLimitsEnabled": true,
    "dateLimits" : {
      "end" : "${dateEnd}"
    }
    `);
  }
  var discReason_body = '';
  if(discReason){
    discReason_body = (`
    ,"discountReason" : {
      "en" : "${discReason}"
    }
    `);
  }

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
    "pricing" : {
      "quantityDiscounts" : {
        "${prodQty}" : ${percent}
      }${dates_body}
      ${discReason_body}
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
