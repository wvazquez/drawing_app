// Switches the class 'selected' to the color clicked on
var color = $('.selected').css('background-color');
$('.controls').on('click', 'li', function(){ //binds the click function on li created now or dynamically added in the future.
  $(this).siblings().removeClass('selected');
  $(this).addClass('selected');
  color = $(this).css('background-color');
});


// Hides or reveals the color picker
$('#revealColorSelect').click(function(){
  changeColor();
  $('#colorSelect').toggle();
});


// changes display color on color picker
function changeColor(){
  var r = $('#red').val();
  var g = $('#green').val();
  var b = $('#blue').val();
  $('#newColor').css('background-color', 'rgb('+r+','+g+','+b+')');
}
$('input[type=range]').on('input', changeColor);

//adds the new color
$('#addNewColor').click(function(){
  var $newColorPicked = $('<li></li>');
  $newColorPicked.css('background-color', $('#newColor').css('background-color'));
  $('.controls ul').append($newColorPicked);
  $newColorPicked.click(); //triggers the click function so it becomes the selected color.
});


//Drawing functionality
$canvas = $('#canvas');
var context = $canvas[0].getContext('2d');
var lastevent;
var mouseDown = false;
$canvas.mousedown(function(e){
  lastevent = e;
  mouseDown = true;
}).mousemove(function(e){
  if(mouseDown){
    context.beginPath();
    context.moveTo(lastevent.offsetX, lastevent.offsetY);
    context.lineTo(e.offsetX,e.offsetY);
    context.strokeStyle = color;
    context.stroke();
    lastevent = e;
  }
}).mouseenter(function(){
  if(mouseDown){
    $canvas.mousedown();
  }
}).mouseup(function(){
    mouseDown = false;
}).mouseleave(function(){
  $canvas.mouseup();
});
