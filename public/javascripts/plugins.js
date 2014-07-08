    $(document).ready(function(){
    // to create mobile navigation
    $('body').prepend('<div id="menu-icon"><a><i class="icon-reorder" aria-hidden="true"></i>&nbsp;Menu</a></div>');
    $('#menu-icon').click(function() {
    $('.top-nav ul').fadeToggle('fast');
    });
     
    $(window).resize(function() {
    if(window.innerWidth > 768) {
    $('.top-nav ul').removeAttr('style'); }
    });
    });
     
    window.onorientationchange = function() {
    window.location.reload();
    };