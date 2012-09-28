var Present = {};
Present.converter = new Showdown.converter();
Present.showSlide = function(slide) {
  Present.currentSlide = slide;
  $('#slide').html(Present.slides[Present.currentSlide]);
  $('#count').html('Slide ' + (Present.currentSlide+1) + ' of ' + Present.slides.length);
};

Present.nextSlide = function() {
  if (Present.currentSlide < Present.slides.length-1) {
    Present.showSlide(Present.currentSlide+1);
  }
};

Present.prevSlide = function() {
  if (Present.currentSlide > 0) {
    Present.showSlide(Present.currentSlide-1);
  }
};

$.ajax({
  url: 'slides.md',
  success: function(data) {
    if (data.length > 0) {
      var converted = Present.converter.makeHtml(data);
      Present.slides = converted.split('<p>!</p>');
      Present.showSlide(0);
    }
  }
});

$(document).keydown(function(e){
    if (e.keyCode == 37) {
       Present.prevSlide();
       return false;
    }
    if (e.keyCode == 39) {
      Present.nextSlide();
      return false;
    }
});
