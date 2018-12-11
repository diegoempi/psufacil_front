$(document).click(function(e) {
	if (!$(e.target).is('.nav-items')) {
        $('.collapse').collapse('hide');
        console.log("estoy entrando");	    
    }
});
