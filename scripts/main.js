var letterGrid = {

    init : function() {

    }

};

	var grid = $('#grid');

	var cols = 6;
	var rows = 9;

	var size = 40;

  var mult = 0;

  var gridCoords = [];

  var letterCoords = [];

  updateGrid();

  function updateGrid() {

    gridCoords = [];
    letterCoords = [];

    grid.css('height', (rows-1) * size);
    grid.css('width', (cols-1) * size);

    // grid.html('');

		for(i = 0; i < rows; i++) {
			for(j = 0; j < cols; j++) {
				var el = $('<span/>');
				el.css('left', j * size);
				el.css('bottom', i * size);
				el.data('ref', (i * cols ) + j);
				grid.append(el);
			}
		}
  }

	$('#grid span').on('click', function() {
		var ref = $(this).data('ref');
		letterCoords.push(ref);
		$(this).css('background', 'red');
		console.log(letterCoords);
		var str = letterCoords.join(", @");
		$('textarea').text("@[@" + str + "]");
	});

	$('#btn-clear').click(function(){
		$('textarea').text("");
    letterCoords = [];
    $('#grid span').css('background', '');
	});

  $('#update-grid').click(function() {
      rows = parseInt($('#rows').val());
      cols = parseInt($('#cols').val());
      updateGrid();
  });

});

$(document).ready( letterGrid.init );