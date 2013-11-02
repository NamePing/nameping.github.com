function checkTwitterAvail() {
  $('#twNameStatus').html("Checking...");
  $('#twNameStatusWrap').css('color', 'gray');

  twitterNameToCheck = $('input#nameInputField').attr('value');
  twitterAPIURL = 'https://api.twitter.com/1/users/show.json?screen_name=' + twitterNameToCheck;
  if (twitterNameToCheck.length < 16) {
    $.ajax({
      url: twitterAPIURL,
      crossDomain: true,
      dataType: 'jsonp',
      success: function(data, status) {
        $('#twNameStatus').html("Taken");
        $('#twNameStatusWrap').css('color', 'red');
      },
      error: function(data, e1, e2) {
        if (false && e2 && e2 === "timeout") {
          $('#twNameStatus').html("Error (may have hit 150/hr. limit).");
          $('#twNameStatusWrap').css('color', 'gray');
        } else {
          console.log(e2);
          $('#twNameStatus').html("Available");
          $('#twNameStatusWrap').css('color', 'green');
        }
      },
      timeout: 666
    });
  } else {
    $('#twNameStatus').html("Must be 15 characters or less.");
    $('#twNameStatusWrap').css('color', 'orange');
  }
  return false;
}
