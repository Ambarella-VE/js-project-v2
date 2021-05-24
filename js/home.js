//Inicializacion
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

  fetch('https://raw.githubusercontent.com/Ambarella-VE/js-project-v2/desafio-clase-7/assets/utils/data.json')
  .then(res => res.json())
  .then(data => data.forEach(obj => {
    $(`#hero-img-${obj.id}`).css("background-image",`
      linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2),rgba(255, 255, 255, 0.4)), url(${obj.url})
    `)
  }))
  .catch(err => console.log(err))
});