
	/*

		This function replaced application.js
		This is because it (remoting.js) pulls conversion directly from the database and returns prices based on discounts
		20-10-2018 @ 10:00PM
	*/


	var data = null; var action = null;


	var quote_input  = $('div.calc.quote input');
	var units_input  = $('div.calc.units input');

	var quote_list   = $('div.calc.quote ul');
	var units_list   = $('div.calc.units ul');

	var quote_button = $('div.calc.quote button.exchange');
	var units_button = $('div.calc.units button.exchange');

	//console.log(quote_input, units_input, quote_list, units_list, quote_button, units_button);


	function load_currencies(e, z)
	{

		data = e; action = z; if(e.currencies.length == 0) return;

		currency_init(quote_list);

		currency_init(units_list);


		/* Initialize default values */

		units_input.val(1); if(action == 'trade') { quote_input.val(1); }

		exchange( action != 'trade' ? 'quote': 'units');		
	}


	function fetch_currencies(e)
	{
		return e.is(units_list) ? data.currencies: ( action != 'trade' ? data.base: data.currencies );
	}


	function currency_init(e)
	{

		var rows = fetch_currencies(e); var elements = []; e.empty();

		if(rows.length == 1) { e.parent('div').find('button[data-toggle]').removeAttr('data-toggle').siblings('button[group]').addClass('blocked'); }

		$.each(rows, function(i)
		{
			elements.push('<li title="'+rows[i].name+'" data="'+rows[i].id+'"><a href="javascript:void(0)">'+rows[i].code+'</a></li>'+"\n");
		});

		e.append(elements.join('<li role="separator" class="divider"></li>'+"\n"));

		e.find('li').show(); units_input.val(1);

		if(rows.length == 0) { alert('Currencies not loaded.'); return; }

		set_currency(rows[0].id, e, true);

	}



	function set_currency(id, object, init = false)
	{

		object.find('li.divider').hide();

		object.find('li[data="'+id+'"]').hide().siblings(':not(.divider)').show().not(':last').next('.divider').show();

		object.parent('div').find('button.exchange').html(get_currency_prop(fetch_currencies(object), id, 'code'));

		object.attr('data', id);

		// do not trigger calculation if init = true

		if(init !== true) { exchange(object.is(units_list) ? 'units': 'quote'); }

	}



	function parse_amount(amount, currency)
	{
		amount = parseFloat(String(amount).replace(/,/g, '')); if(isNaN(amount)) { amount = 0; }

		//if(currency) { return amount.toFixed(4).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString(); }

		if(currency) { return amount.toFixed(4).toString().replace('.0000', ''); }

		return amount;
	}



	function exchange(e)
	{

		console.log(e);

		var request = $('#request').val(); var sr = null; var tr = null;

		if( request == 'buy'  ) { sr = 'buy';  tr = 'buy';  } else

		if( request == 'sell' ) { sr = 'sell'; tr = 'sell';  } else

		if( request == 'trade') { sr = 'sell'; tr = 'buy';  } else
		{
			alert('Request not specified: Expects buy, sell or trade.');
		}


		var x = quote_list.attr('data');

		var y = units_list.attr('data');


		/* if currency quote and currency units is thesame, set same value. */

		if(x == y)
		{
			if(e == 'quote') { r = parse_amount(units_input.val(), true); quote_input.val(r); } else

			if(e == 'units') { r = parse_amount(quote_input.val(), true); units_input.val(r); }

			return;	
		}
		
		var m = 0; var n = 0; var url = "/assets/scripts/remoting.php";


		if(e == 'quote')
		{
			m = parse_amount(units_input.val()); quote_input.val('?');

			o = { request:request, cunits:y, cquote:x, units:m, quote:'?' };

			$.post(url, o, function(data)
			{
				data = jQuery.parseJSON(data); if(data == null) { return; }

				quote_input.val(parse_amount(data.quote, true));

				// units_input.val(parse_amount(data.units, true)); /* also reset using returned value */
			});

		}
		else if(e == 'units')
		{
			m = parse_amount(quote_input.val()); units_input.val('?');

			o = { request:request, cunits:y, cquote:x, units:'?', quote:m };

			$.post(url, o, function(data)
			{
				data = jQuery.parseJSON(data); if(data == null) { return; }

				units_input.val(parse_amount(data.units, true));

				// quote_input.val(parse_amount(data.quote, true)); /* also reset using returned value */
			});
		}
	}



	function get_currency_prop(currencies, id, e)
	{
		var val = 0;

        $.each( currencies, function( index, obj )
        {
           if(obj.hasOwnProperty('id'))
           {
              if(obj.id == id) { val = (e != 'index') ? obj[e]: index; return false; }
           }
        });

        return val;
	}


	$(document).ready(function()
	{

		$('#exchange-btn').click(function()
		{
			var data = { request: $('#request').val(), quote_id: quote_list.attr('data'), units_id: units_list.attr('data'), quote: quote_input.val(), units: units_input.val() };

			form_execute(data, $(this).attr('url')) ;
		});


		$('div.calc.quote ul li, div.calc.units ul li').click(function()
		{

			var x = $('div.calc.'+ $(this).parent('ul').attr('group') +' ul');

			set_currency($(this).attr('data'), x); //$(this).parent('ul')

		});


		$('button.exchange[group]:not(.blocked)').click(function()
		{

			var x = $('div.calc.'+ $(this).attr('group') +' ul');

			var currencies = fetch_currencies(x);

			var j = get_currency_prop(currencies, x.attr('data'), 'index');

			j = (j == currencies.length - 1) ? 0: (j + 1);

			if(currencies[j] == null) { return; }
			
			set_currency(currencies[j].id, x);

		});


		$('div.calc.quote input, div.calc.units input').on('input paste', function()
		{
			exchange($(this).is(units_input) ? 'quote': 'units');
		});


		/* Twins effect */

		$('div.calc.quote input').on('input paste', function(e)
		{
			$('div.calc.quote input').not($(this)).val($(this).val());
		});


	});





