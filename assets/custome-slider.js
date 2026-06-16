document.addEventListener('DOMContentLoaded', function(){


  const slider = document.querySelector('.custom-slider');


  const slides = document.querySelectorAll('.slide-item');


  const nextBtn = document.querySelector('.next-btn');


  const prevBtn = document.querySelector('.prev-btn');


  let currentSlide = 0;


  function updateSlider(){
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  }


  nextBtn.addEventListener('click', function(){


    currentSlide++;


    if(currentSlide >= slides.length){
      currentSlide = 0;
    }


    updateSlider();


  });


  prevBtn.addEventListener('click', function(){


    currentSlide--;


    if(currentSlide < 0){
      currentSlide = slides.length - 1;
    }


    updateSlider();


  });


});
