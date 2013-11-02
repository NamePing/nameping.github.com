function checkDistanceFromA() {
    firstLetterDistanceFromA = Math.abs(97 - Number(jQuery('#nameInputField').val().toLowerCase().charCodeAt(0)));
    $("#distanceFromA").text("A Distance: "+ firstLetterDistanceFromA);
    $("#distanceFromA").show();
    if (firstLetterDistanceFromA > 3) {
        $("#distanceFromA").css('color', 'red');
    } else if (firstLetterDistanceFromA > 0) {
        $("#distanceFromA").css('color', 'orange');
    } else {
        $("#distanceFromA").css('color', 'green');
    }
}