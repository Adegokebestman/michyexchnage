$(document).ready(function () {


	$('a.open-close-div').click(function(e) {

	   $(this).toggleClass('close'); var id = $(this).attr('container'); $('#'+id).slideToggle();

    });
	
	$('a.open-close-div').each(function(index, element) {

       var id = $(this).attr('container'); $('#'+id).hide();
       
    });

    $('.modal').on('shown.bs.modal', function() {

	    $(this).find('[autofocus]').focus();
	});


  	$('[data-toggle=offcanvas]').click(function () {

    	$('.row-offcanvas').toggleClass('active')
  	});

	  $(":input[popover-target]").click(function(){

        $($(this).attr('popover-target')).popover('show');
      })

      $(":input[popover-target]").blur(function(){
        
        $($(this).attr('popover-target')).popover('hide');
      })

      $("[data-toggle='popover']").click(function () {

          $(this).popover('toggle');
      });

      $("[data-toggle='popover']").blur(function () {
         $(this).popover('hide');
      });

      $("[data-toggle='popover']").change(function () {
          $(this).popover('hide');
      });



	$(".readonly").keydown(function(e){
        e.preventDefault();
    });


	/* permits input of delimeters */
  	$('textarea.mobile').bind('keypress', function(e) {
	
  	  return (e.which >= 48 && e.which <= 57 ) || (e.which == 44 || e.which == 8  || e.which == 0  || e.which == 13) //commas, backspace | delete for mozilla firefox browsers and enter for form submission.
  	})


	function number_format(x, y)
	{
		
		if( isNaN(x) || x == '') { x = 0; };

		if(!isNaN(y))   x = parseFloat(x).toFixed(y);

	    var parts = x.toString().split(".");

	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	    return parts.join(".");
	}


	/* Was: input[type=text]:enabled.currency */

	$('input[type=text]:enabled.currency').focusin(function(e) {
        
		var i = $(this).val(); i = i.replace(/,/g, ''); i = i.replace(/ /g, '');

		if(parseFloat(i).toFixed(6) == 0.000000) i = ''; $(this).val(i);

    });
	
	$('input[type=text]:enabled.currency').focusout(function(e) {
		
		var x = $(this).val(); x= x.replace(/,/g, ''); x = x.replace(/ /g, '');

		var y = $(this).attr('decimal'); y = isNaN(y) ? 2: y;

		$(this).val(number_format(x, y));

    });


	function keyblock(type, e, o)
	{
		// Requires: keypress event 44 = comma, 45 = minus, 46 = decimal, 8 = backspace, 0 = delete ( mozilla firefox)
		
		if(type == 'currency')
		{
			if( (e.which == 46 || e.which == 110) && $(o).indexOf('.') != -1) { return false; }

			return (e.which >= 48 && e.which <= 57) ||  (e.which >= 96 && e.which <= 105) || (e.which == 45 || e.which == 109) || (e.which == 46 || e.which == 110) || e.which == 8 || e.which == 0;
		}
		else if(type == 'number')
		{
			if($(o).indexOf('.') != -1) { return false; } return keyblock('currency', e, o);
		}
		else
		{
			return true;
		}
	}
	

    $('input[type=text]:enabled.currency').bind('keypress', function(e) {

		if(e.which == 46 && $(this).val().indexOf('.') != -1) {	return false; }
		
		return (e.which >= 48 && e.which <= 57 )
			|| (e.which == 44 || e.which == 45 || e.which == 46 || e.which == 8  || e.which == 0  || e.which == 13) //comma, minus, decimal (dot) | backspace | delete for mozilla firefox browsers and enter for form submission.
	});


	$('input[type=text]:enabled.number').focusin(function(e) {
		
		var i = $(this).val(); i = i.replace(/,/g, ''); i = i.replace(/ /g, ''); $(this).val(i);
    });
	
	$('input[type=text]:enabled.number').focusout(function(e) {
		
		var x = $(this).val(); x= x.replace(/,/g, ''); x = x.replace(/ /g, '');

		$(this).val(number_format(x, null));

    });


    $('input[type=text]:enabled.number').bind('keypress', function(e) {
		
		return (e.which >= 48 && e.which <= 57 )
			|| (e.which == 45 || e.which == 8  || e.which == 0 || e.which == 13 ) //minus, backspace | delete for mozilla firefox browsers and enter for form submission.
	});

	$('input[type=text]:enabled.numeric').bind('keypress', function(e) {
		
		return (e.which >= 48 && e.which <= 57 )
			|| (e.which == 45 || e.which == 8  || e.which == 0 || e.which == 13 ) //minus, backspace | delete for mozilla firefox browsers and enter for form submission.
	});


  	$('input[type=text]:enabled.mobile').bind('keypress', function(e) {
		
		return (e.which >= 48 && e.which <= 57 )
			|| (e.which == 0  || e.which == 13 ) //delete |enter : - delete for mozilla firefox browsers and enter for form submission.
	})



    $('input[type=text].currency, input[type=text].number, input[type=text].numeric, input[type=text].mobile').bind('keypress', function(e) {

    	if( e.which == 13) { return false; } // 13 = enter (prevent enter keys on this controls)
	});


	$(document).on("keydown", function (e)
	{
		/* prevents the backspace key presss on disabled controls from triggering the browser back button */

	    if (e.which === 8 && !$(e.target).is("input:not([readonly]), textarea")) { e.preventDefault(); } 

	});


	$('textarea[maxlength]').keyup(function()
	{

	    var limit = parseInt($(this).attr('maxlength')); var text = $(this).val(); var chars = text.length;

	    if(chars > limit) { var new_text = text.substr(0, limit); $(this).val(new_text); }

	 });


	$('input[type=text].currency, input[type=text].number, input[type=text].numeric, input[type=text].mobile').focusout();

});


http_request = function (url, data)
{
  var data = JSON.stringify(data);

  return $.ajax({type: "POST", url: url, data: data, dataType: "json", contentType: "application/json;charset=utf-8"});
}



function form_execute(data, url)
{

    window.onbeforeunload = null;

    var form = document.createElement('form');

    form.setAttribute('method', 'POST');

    form.setAttribute('action', url);

    for(var key in data)
    {
        if(data.hasOwnProperty(key))
        {
            var hiddenField = document.createElement('input');
            hiddenField.setAttribute('type', 'hidden');
            hiddenField.setAttribute('name', key);
            hiddenField.setAttribute('value', data[key]);
            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);

    form.submit();

}