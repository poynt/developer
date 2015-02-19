(function () {

var rescroll = function () {
  var top = $('#main').scrollTop();
  if (top > 54) {
    $('#main').css('top', '0px');
    $('#sidebar').css('padding-top', '0px');
    $('#main').css('padding-top', '84px');
    $('#nav').css('top', '-54px');
  } else {
    $('#main').css('top', (54 - top) + 'px');
    $('#sidebar').css('padding-top', (54 - top) + 'px');
    $('#main').css('padding-top', (30 + top) + 'px');
    $('#nav').css('top', (-1 * top) + 'px');
  }
};

$('#main').scroll(rescroll);

$('#sidebar > ul > li > a').each(function () {
  if ($(this).text() === $('.page-header > h2').text().trim() || ($(this).text() === 'Home' && $('#poyntos').length)) {
    $(this).parent().addClass('active');
  }
});

})();
