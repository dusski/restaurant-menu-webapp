//	$(window).resize(function(){
//		$(".btn").height($(".btn").width());
//	});

var tables = $(".num");

//console.log(tables);

$(document).ready(function(){
	for(var i = 0; i < tables.length; i++){
		tables[i].innerHTML = i+1;
	}
	
	
});
	