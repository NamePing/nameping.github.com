$(document).ready(function() {
  $('#warning').hide();
  $("#syllableCount").hide();
  $("#distanceFromA").hide();
  $("#domainsColumn").hide();
  $("#socialNetworkColumn").hide();

  $('#output').html("Facebook: ");

  $('#nameInputField').change(function() {
    $('#nameInputForm').submit();
  });

  $('#nameInputForm').submit(checkFacebookAvail);
  //$('#nameInputForm').submit(checkTwitterAvail);
  $('#nameInputForm').submit(checkDomainsAvail);
  $('#nameInputForm').submit(
    checkSyllables);
  $('#nameInputForm').submit(
    checkDistanceFromA);
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
    $('#nameInputForm').submit();
    var value = $(this).val();
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
