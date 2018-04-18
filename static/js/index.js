$(function(){
  $('a[data-modal]').click(function(event) {
    var imageSrc = event.currentTarget.href;
    var newHtml = '<div class="modal"><img src=' + imageSrc + '/></div>';
    $(newHtml).appendTo('body').modal();
    return false;
  });
});
