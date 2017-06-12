var wikiUrl = '';
var $wikiElem = $('#wikipedia-links');
var $wikiHeader = $('#wikipedia-header')

$('#wikiQuery').keyup(function() {
    var search = $(this).val();
    wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + search + '&format=json&callback=wikiCallback';
});

$('#btnSubmit').click(function() {
  $wikiElem.text("");
  $wikiHeader.text("Wikipedia Search Results");
  $.ajax({
    url: wikiUrl,
    dataType: 'jsonp',
    success: function (response) {
      var articleList = response[1];
      for (var i = 0; i < articleList.length; i++) {
        articleStr = articleList[i];
        var url = response[3][i];
        $wikiElem.append('<a href="' + url + '" class="list-group-item list-group-item-action flex-column align-items-start" target="_blank">' + '<div class="d-flex w-100 justify-content-between">' + '<h5 class="mb-1">' + articleStr + '</h5>' + '</div>' + '<p class="mb-1">' + response[2][i] + '</p></a>');
      }
    }
  });
});

$('#wikiQuery').keypress(function(e) {
        if (e.which == 13) {
            $('#btnSubmit').click();
        }
    });
