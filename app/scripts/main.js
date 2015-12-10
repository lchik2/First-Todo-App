/*console.log('\'Allo \'Allo!');*/
$(document).ready(function(){
	$("#allButton").addClass("active");
	$("#buttonRow").hide();
	$("#chevron").css('visibility','hidden');
	//Entering Tasks
	$("#enterTask").keypress(function(e){
		if(e.which == 13){
			var inputValue = escapeHtml($("#inputValue").val());
			if(inputValue.length >= 3 && $.trim(inputValue).length != 0){
			var open = '<li class="col-xs-12 taskBox"><span class="fa fa-2x fa-circle-thin circle col-xs-2 col-sm-2 circleMargin text-center textBack"></span><p class="tasks col-xs-8 col-sm-8 textBack">';
            var close = '</p><div class="fa fa-times fa-2x col-xs-1 col-sm-1 visible-xs-inline-block visible-sm-inline-block cancel xMargin textBack"></div></li>';
				if($('#completedButton').hasClass("active")){
					$('ul').append(open+inputValue+close);
					$('ul li').last().hide();
				}
				else{
					$('ul').append(open+inputValue+close);
				}
			$('#totalItems').html(function(i, val) {
				return +val+1;
			});
			}

			else if($.trim(inputValue).length == 0){
				alert('Task can not be all whitespace');
			}

			else{
				alert('Task must be 3 characters or more!');
			}

			$("#inputValue").val('').removeAttr('checked').removeAttr('selected');
			checkList();
		}
	});

	function checkList(){
		if(!$("ul").has("li").length){
			$("#chevron").css('visibility','hidden');
			$("#chevron").removeClass('darkChevron');
			$("#buttonRow").hide();
		}
		else{
			$("#chevron").css('visibility','visible');
			$("#buttonRow").show();
		}
	}
		

	//Mouse Hover for X
	$('body').on('mouseenter', '.taskBox',
    	function(){
    		$(this).children('.cancel').removeClass("visible-xs-inline-block visible-sm-inline-block").show();
    	});

	$('body').on('mouseleave', '.taskBox',
	    function(){
	    	$('.cancel').addClass("visible-xs-inline-block visible-sm-inline-block");
	});

	//Task Removal
	$('body').on('click', '.cancel', function(){
		if($(this).siblings().hasClass('fa-check-circle-o')){
			$(this).parent().remove();
		}
		else{
			$(this).parent().remove();
			$('#totalItems').html(function(i, val){
				return +val-1;
				});
		}
		checkList();
	});

	//Clear Completed Tasks
	$('body').on('click', '.clearComplete', function(){
		$('li span.fa-check-circle-o').parent().remove();
		checkList();
	});

	//Checking Tasks
	$('body').on('click', '.circle', function(){
		if($(this).hasClass('fa-circle-thin')){
			$(this).removeClass('fa-circle-thin').addClass('fa-check-circle-o checkCircle');
			$(this).next().toggleClass('stroked');
			$('#totalItems').html(function(i, val){
				return +val-1;
				});
			if($('#activeButton').hasClass("active")){
				$(this).parent().hide();
			}
		}
		else{
			$(this).removeClass('fa-check-circle-o checkCircle').addClass('fa-circle-thin');
			$(this).next().toggleClass('stroked');
			$('#chevron').removeClass('darkChevron');
			$('#totalItems').html(function(i, val){
				return +val+1;
				});
			if($('#completedButton').hasClass("active")){
				$(this).parent().hide();
			}
		}
		if(!$('li').children().hasClass('fa-circle-thin')){
			$('#chevron').addClass('darkChevron');
		}
	});

	//Select all Tasks
	$('body').on('click', '#chevron', function(){
		if($(this).hasClass('darkChevron')){
			$(this).removeClass('darkChevron');
			$('li span').removeClass('fa-check-circle-o checkCircle').addClass('fa-circle-thin');
			$('li p').removeClass('stroked');
			$('#totalItems').html(function(i, val){
				val = $('.fa-circle-thin').length;
				return +val;
			})
			if($('#completedButton').hasClass("active")){
				$('.fa-circle-thin').parent().hide();
			}
			else if($('#activeButton').hasClass("active")){
				$('.fa-circle-thin').parent().show();
			}
			else{
				$('.fa-circle-thin').parent().show();
			}
		}
			
		else{
			$(this).addClass('darkChevron');
			$('li span').removeClass('fa-circle-thin').addClass('fa-check-circle-o checkCircle');
			$('li p').addClass('stroked');
			$('#totalItems').html(function(i, val){
				val = 0;
				return +val;
			});
			if($('#completedButton').hasClass("active")){
				$('.fa-check-circle-o').parent().show();
			}
			else if($('#activeButton').hasClass("active")){
				$('.fa-check-circle-o').parent().hide();
			}
			else{
				$('.fa-check-circle-o').parent().show();
			}
		}
	});

	//All Button
	$('body').on('click', "#allButton", function(){
		$(this).addClass("active");
		$('.fa-circle-thin').parent().show();
		$('.fa-check-circle-o').parent().show();
	});

	//Active Button
	$('body').on('click', "#activeButton", function(){
		$(this).addClass("active");
		$('.fa-circle-thin').parent().show();
		$('.fa-check-circle-o').parent().hide();
	});

	//Completed Button
	$('body').on('click', "#completedButton", function(){
		$(this).addClass("active");
		$('.fa-check-circle-o').parent().show();
		$('.fa-circle-thin').parent().hide();
	});

	//Button Active State
	$('button.target').on('click', function(){
		$('button.target').not(this).removeClass("active");
	});

	//Double click to edit
	$(function(){
		$('body').on('dblclick', '.tasks', function(e){
			e.stopPropagation();
			var currentEle = $(this);
			var value = $(this).html();
			updateVal(currentEle, value);
		});
	});

	function updateVal(currentEle, value){
		$(currentEle).html('<input class = "newVal" type = "text" value = "' + value + '" />');
		$(".newVal").focus();
		$(".newVal").keypress(function(event){
			if (event.which == 13){
				tempValue = $('.newVal').val();
				if(tempValue.length >= 3 && $.trim(tempValue).length != 0){
				$(currentEle).html(escapeHtml($(".newVal").val().trim()));
				}
				else if($.trim(tempValue).length == 0){
					alert('Task can not be all whitespace');
				}

				else{
					alert('Task must be 3 characters or more!');
				}
			}
		});
	}

	//Escaping HTML
	var entityMap = {
	    "&": "&amp;",
	    "<": "&lt;",
	    ">": "&gt;",
	    '"': '&quot;',
	    "'": '&#39;',
	    "/": '&#x2F;'
	  };

	  function escapeHtml(string) {
	    return String(string).replace(/[&<>"'\/]/g, function (s) {
	      return entityMap[s];
	    });
	  }
});