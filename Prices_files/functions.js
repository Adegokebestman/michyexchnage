

$(function () {

	$('[data-toggle="tooltip"]').tooltip()

	$('input.date').datetimepicker({useCurrent:false});

    $('input[type="password"].toggle').focus(function(event)
    {
        $(this).prop('type', 'text');
    });

    $('input[type="password"].toggle').blur(function(event)
    {
        $(this).prop('type', 'password');
    });

});