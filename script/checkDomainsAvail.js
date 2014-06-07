function checkDomainsAvail() {
  $('#doNameStatusContent').html('<img src="http://www.laneaviation.com/wp-content/themes/laneaviation/images/loading.gif" width="25px" />');
  $('#doComNameStatus').html('<img src="http://www.laneaviation.com/wp-content/themes/laneaviation/images/loading.gif" width="25px" />');
  $('#doNameStatusWrap').css('color', 'gray');

  domainNameToCheck = $('input#nameInputField').attr('value');
  domainrAPIURL = 'http://domai.nr/api/json/search?q=' + domainNameToCheck;

  return $.ajax({
    url: domainrAPIURL,
    crossDomain: true,
    dataType: 'jsonp',
    success: function(data, status) {
        $('#doNameStatusContent').html('');
        $('#doComNameStatus').html('');
        $('#doNameStatusWrap').css('color', 'black');
        count = 0;
      data.results.forEach(function(element, index, array) {
        if (count > 0) {
          selector = '#doNameStatusContent';
        } else {
          selector = '#doComNameStatus';
        }
        count++;
        if (element.availability != 'tld') {
         $(selector + '').append(
          '<p id="domainNumber' + index + '">' + element.domain + '</p>'
          );
        if (element.path !== '') {
          $(selector + ' p#domainNumber' + index).append(element.path);
        }
        $(selector + ' p#domainNumber' + index).append(': ' + element.availability);


        if (element.availability == 'available') {
          $(selector + ' p#domainNumber' + index).append(' <a href="'+ element.register_url +'">Purchase</a>');
          $('#domainNumber' + index).css('color', 'green');
        } else {
          $(selector + ' p#domainNumber' + index).append(' <a href="http://centralops.net/co/DomainDossier.aspx/?addr='+ element.domain +'&dom_whois=true&dom_dns=true&net_whois=true">Whois</a>');
          $('#domainNumber' + index).css('color', 'red');
        }
        }
      });
    },
    error: function(data, e1, e2) {
      $('#doNameStatusContent').html(e1);
    },
    timeout: 3000
  });
}
