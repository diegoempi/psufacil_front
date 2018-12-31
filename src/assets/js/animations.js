$(document).click(function(e) {
	if (!$(e.target).is('.nav-items')) {
        $('.collapse').collapse('hide');
        //alert( 'entra');
    }
});
