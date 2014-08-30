$('#mineVac').click(function() {
    $(this).addClass('checkedVac');
    $('#allVac').removeClass('checkedVac');
});

$('#allVac').click(function() {
    $(this).addClass('checkedVac');
    $('#mineVac').removeClass('checkedVac');
});