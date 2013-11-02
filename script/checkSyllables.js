function checkSyllables() {
    brandName = $("#nameInputField").val();
    newcount = new_syllable_count(brandName);
    $("#syllableCount").text('Syllables: ' + newcount);

    if (newcount > 3) {
        $("#syllableCount").css('color', 'red');
    } else if (newcount > 2) {
        $("#syllableCount").css('color', 'orange');
    } else {
        $("#syllableCount").css('color', 'green');
    }
}

function new_syllable_count(word) {
    //word.downcase!
    word = word.toLowerCase();

    //return 1 if word.length <= 3
    if(word.length <= 3) { return 1; }

    //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    //word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/(?:[^laeiouy]es|[^laeiouy]e)$/, '');

    //word.sub!(/^y/, '')
    word = word.replace(/^y/, '');

    //word.scan(/[aeiouy]{1,2}/).size
    return word.match(/[aeiouy]{1,2}/g).length;
}