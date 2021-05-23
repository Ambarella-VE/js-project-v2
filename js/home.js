//Inicializacion MaterializeCSS
document.addEventListener('DOMContentLoaded', function() {
  var carouselElems = document.querySelectorAll('.carousel');
  var carouselInit = M.Carousel.init(carouselElems,{
    fullWidth: true,
    indicators: true,
    duration: 200
  });
  slideDownFn(".hero-animation1",1500,0);
  slideDownFn(".hero-animation2",1500,0);
  fadeInFn(".btn-row",2500,0);
  [1,2].forEach(() => {
    const elemInstance = M.Carousel.getInstance(carouselElems[0])
    setTimeout(()=>{
      elemInstance.next();
    },2000);
  });
});