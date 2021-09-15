var quotes = $(".entrepress");


var $ = jQuery;

$(document).ready(function () {
  var quoteIndex = -1;
  var strArray = ['Entrepreneurs', 'Industry Experts', 'Leaders', 'Influencers']
  function showNextQuote() {
    ++quoteIndex;
    var elementIndex = quoteIndex % strArray.length;
    $(quotes).text(strArray[elementIndex]);
    quotes
      .fadeIn(1000)
      .delay(1000)
      .fadeOut(1000, function(){
        showNextQuote();
        quotes.removeClass('textafter');
      })
  }
  function showUnderLine() {
    setInterval(() => {
      quotes.addClass('textafter');
    }, 0);
  }

  $.when(showUnderLine(), showNextQuote());
});
