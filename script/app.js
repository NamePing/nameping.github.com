$(document).ready(function() {
  $('#warning').hide();
  $("#syllableCount").hide();
  $("#distanceFromA").hide();
  $("#domainsColumn").hide();
  $("#socialNetworkColumn").hide();

  $('#output').html("Facebook: ");

  var something1;
  var something2;
  var something3;
  var requests = [something1, something2, something3];

  // $('#nameInputForm').submit(checkFacebookAvail);
  // //$('#nameInputForm').submit(checkTwitterAvail);
  // $('#nameInputForm').submit(checkDomainsAvail);
  $('#nameInputForm').submit(checkSyllables);
  $('#nameInputForm').submit(checkDistanceFromA);
  $('#nameInputForm').submit(function(e){
      for(var i=0; obj=requests[i]; i++){
        if(obj) obj.abort();
      }
      
      something1 = checkFacebookAvail();
      //something2 = checkTwitterAvail();
      something3 = checkDomainsAvail();
      requests = [something1, something2, something3]
      e.preventDefault();
  });
  $('#nameInputForm').submit(updateSiteAddress);

  $('#nameInputForm').submit(function() {
    if ($("#nameInputField").val() !== '') {
      $('#warning').show();
      $("#syllableCount").show();
      $("#distanceFromA").show();
      $("#domainsColumn").show();
      $("#socialNetworkColumn").show();
    } else {
      $('#warning').hide();
      $("#syllableCount").hide();
      $("#distanceFromA").hide();
      $("#domainsColumn").hide();
      $("#socialNetworkColumn").hide();
    }
  });

  if (getUrlVars()["q"]) {
    $('#nameInputField').attr('value', getUrlVars()["q"]);
    $('#nameInputForm').trigger('submit');
  }

  $('#nameInputField').keyup(function() {
    var value = $(this).val();
    var lastvalue = $(this).attr('lastval');
    if (value !== lastvalue) {
      $('#nameInputForm').submit();
    }
    $(this).attr('lastval', value);
    if (value.length > 15) {
      $("#warning").html('Too long for Twitter');
    } else if (value.length < 5) {
      $("#warning").html('Too short for Facebook');
    }
    if (value.length > 15 || value.length < 5) {
      $(this).css('color', 'red');
    } else {
      $(this).css('color', 'black');
      $("#warning").html('');
    }
  });

  // Trigger keyup for already populated field.
  $('#nameInputField').trigger('keyup');

  // Show more domains:
  $('.doNameStatusToggle').click(function() {
    $('#doNameStatusToggle').toggle();
    $('#doNameStatus').toggle();
  });
});

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function updateSiteAddress() {
  currentURL = window.location.href.toString().split("?q=")[0];
  window.history.pushState("object or string", "Title", currentURL + "?q=" + $('#nameInputField').attr('value'));
}
