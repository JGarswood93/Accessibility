var countdownInterval;
var currentCountdownInSec = 1;

$(function () {
    var getTextNodesIn = function (el) {
        return $(el).find(":not(iframe,script)").addBack().contents().filter(function () {
            return this.nodeType == 3;
        });
    };
    var textNodes = getTextNodesIn($("*"));

    function isLetter(char) {
        return /^[\D]$/.test(char);
    }

    var wordsIntTextNodes = [];
    for (var i = 0; i < textNodes.length; i++) {
        var node = textNodes[i];

        var words = [];

        var re = /\w+/g;
        var match;
        while ((match = re.exec(node.nodeValue)) != null) {

            var word = match[0];
            var position = match.index;

            words.push({
                length: word.length,
                position: position
            });
        }
        wordsIntTextNodes[i] = words;
    }

    function messUpWords() {
        for (var i = 0; i < textNodes.length; i++) {
            var node = textNodes[i];
            for (var j = 0; j < wordsIntTextNodes[i].length; j++) {

                if (Math.random() > 1 / 10) {
                    continue;
                }
                var wordMeta = wordsIntTextNodes[i][j];
                var word = node.nodeValue.slice(wordMeta.position, wordMeta.position + wordMeta.length);
                var before = node.nodeValue.slice(0, wordMeta.position);
                var after = node.nodeValue.slice(wordMeta.position + wordMeta.length);

                node.nodeValue = before + messUpWord(word) + after;
            }
        }
    }
    function messUpWord(word) {
        if(word.length < 3){
            return word;
        }
        return word[0] + messUpMessyPart(word.slice(1, -1)) + word[word.length - 1];
    }
    function messUpMessyPart(messyPart){
        if(messyPart.length < 2){
            return messyPart;
        }
        var a, b;
        while(!(a < b)){

            a = getRandomInt(0, messyPart.length - 1);
            b = getRandomInt(0, messyPart.length - 1);
        }
        return messyPart.slice(0, a) + messyPart[b] +
            messyPart.slice(a+1, b) + messyPart[a] + messyPart.slice(b+1);
    }
    function getRandomInt(min, max) {

        return Math.floor(Math.random() * (max - min + 1) + min);

    }

    countdownInterval = setInterval(function () {
        if(currentCountdownInSec > 0) {
            $("#countdownIndicator").html("<b>Your view of this page will change in...:</b> " + currentCountdownInSec + "s");
            --currentCountdownInSec;
        } else {
            $("#countdownIndicator").html("<b>You are now experiencing this page as someone with Dyslexia may experience it.</b>");
            clearInterval(countdownInterval);
        }
    }, 1000);

    setTimeout(function () {
        setInterval(messUpWords, 50);
    }, currentCountdownInSec*1000);
});