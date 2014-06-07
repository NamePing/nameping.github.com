function checkFacebookAvail() {
  $('#fbNameStatus').html('<img src="http://www.laneaviation.com/wp-content/themes/laneaviation/images/loading.gif" width="25px" />');
  $('#fbNameStatusWrap').css('color', 'gray');

  fbNameToCheck = $('input#nameInputField').attr('value');
  if (fbNameToCheck.length <= 4) {
    $('#fbNameStatus').html("Must be at least 5 characters.");
    $('#fbNameStatusWrap').css('color', 'orange');
  } else if (fbNameToCheck.length >50) {
    $('#fbNameStatus').html("Must be less than 51 characters.");
    $('#fbNameStatusWrap').css('color', 'orange');
  } else {
    var facebookGraphURL = 'https://graph.facebook.com/' + fbNameToCheck;
    $('#fbNameStatusLabel').html("Facebook/"+fbNameToCheck+":");
    return $.ajax({
      url: facebookGraphURL,
      crossDomain: true,
      dataType: 'json',
      success: function(data, status) {
        console.log('Facebook AJAX success.');
        $('#fbNameStatus').html("Taken");
        $('#fbNameStatusWrap').css('color', 'red');
      },
      error: function(data, e1, e2) {
        console.log("Facebook AJAX error.");
        errorObject = (eval("(" + data.responseText + ")"));
        if (errorObject.error.code == '803') {
          $('#fbNameStatus').html("Available");
          $('#fbNameStatusWrap').css('color', 'green');
        } else {
          $('#fbNameStatus').html("Not Kosher");
          $('#fbNameStatusWrap').css('color', 'red');
        }
      }
    });
  }
  return false;
}

