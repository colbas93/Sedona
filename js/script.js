"use strict"
document.addEventListener("DOMContentLoaded", function () {

  document.querySelector(".js-booking").addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(".booking-form")
      .classList.toggle("booking-form--show");
  });
});

  const ratings = document.querySelectorAll('.rating');
  if(ratings.length > 0) {
    initRatings();
  }
  
  // Основная функция
  function initRatings() {
    let ratingActive, ratingValue;
    // Бегаем по всем рейтингам на странице
    for (let index = 0; index < ratings.length; index++) {
      const rating = ratings[index];
      initRating(rating);
    }
    // Инициализируем конкретный рейтинг
    function initRating(rating) {
      initRatingVars(rating);
      
      setRatingActiveWidth();

      if (rating.classList.contains('ratign_set')) {
        setRating(rating);
      }
    }
    
    // Инициализация переменных
    function initRatingVars(rating) {
      ratingActive = rating.querySelector('.rating__active');
      ratingValue = rating.querySelector('.rating__value');
    }
    
    
    // Изменнение ширины активных звезд
    function setRatingActiveWidth(index = ratingValue.innerHTML) {
      const ratingActiveWidth = index / 0.1;
      ratingActive.style.width = `${ratingActiveWidth}%`;
    }
    // Возможность указывать оценку
    function setRating(rating) {
      const ratingItems = rating.querySelectorAll('.rating__item');
      for (let index = 0; index < ratingItems.length; index++) {
        const ratingItem = ratingItems[index];
        ratingItem.addEventListener('mouseenter', function(e) {
          // Обновление переменной
          initRatingVars(rating);
          // Обновление активных звезд
          setRatingActiveWidth(ratingItem.value);
        });

        ratingItem.addEventListener('mouseleave', function(e) {
          // Обновление активных звезд
          setRatingActiveWidth();
        });

        ratingItem.addEventListener('click', function(e) {
          initRatingVars(rating);

          if (rating.dataset.ajax) {
            setRatingValue(ratingItem.value, rating);
          } else {
            ratingValue.innerHTML = index + 1;
            setRatingActiveWidth();
          }
        });


      }
    }
  }
    

  