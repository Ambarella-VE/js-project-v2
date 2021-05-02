//Inicializacion MaterializeCSS
document.addEventListener('DOMContentLoaded', function() {
  var carouselElems = document.querySelectorAll('.carousel');
  var carouselInit = M.Carousel.init(carouselElems,{
    fullWidth: true,
    indicators: true
  });
});