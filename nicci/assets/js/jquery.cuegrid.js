// JavaScript Document

    function cuegrid_click(name, func)
    {
	   	$('#cuegrid-table td a[name="' + name + '"]').click(function (e)
	   	{
	         if (!e.shiftKey) { func($(this).attr('value')); }
	    });
    }

    function cuegrid_double_click(name, func)
    {
	   	$('#cuegrid-table td a[name="' + name + '"]').dblclick(function (e)
	   	{
	          func($(this).attr('value'));
	    });
    }

    function cuegrid_shift_click(name, func)
    {
	   	$('#cuegrid-table td a[name="' + name + '"]').click(function (e)
	   	{
          	if (e.shiftKey) { func($(this).attr('value')); }
	    });
    }


	$('#cuegrid th[name="cuegrid-line-header"] input[type="checkbox"][name="cuegrid_row"]').change(function(e)
	{
		$('#cuegrid tbody input[type="checkbox"][name^="cuegrid_row-"]').prop('checked', $(this).prop('checked'));
    });


	$('#cuegrid th[name="cuegrid-line-header"] a').click(function(e)
	{

		var c = $('#cuegrid-sort').val(); var a = c; var n = $(this).attr('sort');
		
		if(c != null)
		{
			if(c.substring(0,1) == '*') { c = c.substring(1); }
			if(c == n) { n = a == c ? ':' + n: n; }
		}

		$('#cuegrid-post').val('sort');

		$('#cuegrid-sort').val(n); $('#cuegrid-sort').closest('form').submit();

    });


	$('#cuegrid-pagination ul li a').click(function(e)
	{
		$('#cuegrid-page').val($(this).attr('data'));

		$('#cuegrid-post').val('page');

		$('#cuegrid-page').closest('form').submit();
    });


    $('#cuegrid-pagination-menu').change(function(e)
	{
		$('#cuegrid-page').val($(this).val());

		$('#cuegrid-post').val('menu');

		$('#cuegrid-page').closest('form').submit();
    });


    $('#cuegrid-table td span.truncated a').mouseover(function (e) {
	
		$(this).popover({title: '...', html: true, content: nl2br($(this).parent('span').attr('title')) });
	});


	$('html').on('click', function(e)
	{
	  	if(typeof $(e.target).data('original-title') == 'undefined' && !$(e.target).parents().is('.popover.in')) { $('[data-original-title]').popover('hide');}
	});


	function nl2br(str, is_xhtml) { /* source: http://phpjs.org/functions/nl2br/ */

	  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>';

	  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');

	}