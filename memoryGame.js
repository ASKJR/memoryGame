 $(function(){
    $( "#selectCardQuantity" ).change(function() {
  		var gridCell  = '';
  		for (var i = 0 ; i < $(this).val() ; i++) {
  			gridCell += '<div class="col-lg-2 col-sm-3 col-xs-4">' + '<a href="#"> '+
             			'<img src="http://placehold.it/200x200" class="thumbnail img-responsive">'+
        			'</a>' +
        			
   	 			'</div>'
  		}
  		$('#memoryGameGrid').html(gridCell);
	});
 });



