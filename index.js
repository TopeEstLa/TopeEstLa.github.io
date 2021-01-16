$('#menuClick').on('change', function() {
    if ($('#menuClick').is(':checked')) {
        $('.menuContainer').css('left', '50%');
        $('.menuContainer').css('box-shadow', '20px 0 125px #000');
        $('#header').css('filter', 'blur(15px)', 'filter', 'brightness(50%)');
    } else {
        $('.menuContainer').css('left', '100%');
        $('.menuContainer').css('box-shadow', '0px 0 0px #000');
        $('#header').css('filter', 'blur(0px)', 'filter', 'brightness(100%)');
    }
});