if (bodyOn) {
  $('canvas').css({'opacity': '0'});
  bodyOn = false;
}

else {
  $('canvas').css({'opacity': '1'});
  bodyOn = true;
  bodypix.segment(gotResults, options);
}
