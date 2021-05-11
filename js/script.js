document.addEventListener("DOMContentLoaded", function () {
// Открытие/закрытие формы
  if(document.querySelector('.js-booking')) {
    const $book = document.querySelector('.js-booking');
    const $bookForm = document.querySelector('.booking-form');

    $book.addEventListener('click', function(e) {
      e.preventDefault();
      $bookForm.classList.toggle("booking-form--show");
    });
  }
  
  // Звездный рейтинг
  const ratings = document.querySelectorAll('.rating');
  if(ratings.length > 0) {
    initRatings();
  }

  // основная функция
  function initRatings() {
    let ratingActive, ratingValue;
    // Бегаем по всем рейтингам на странице
    for (let index = 0; index < ratings.length; index++) {
      const rating = ratings[index];
      initRating(rating);
    }
    // онициализируем конкретный рейтинг
    function initRating(rating) {
      initRatingVars(rating);
      
      setRatingActiveWidth();

      if (rating.classList.contains('ratign_set')) {
        setRating(rating);
      }
    }
    
    // инициализация переменных
    function initRatingVars(rating) {
      ratingActive = rating.querySelector('.rating__active');
      ratingValue = rating.querySelector('.rating__value');
    }
    
    
    // изменнение ширины активных звезд
    function setRatingActiveWidth(index = ratingValue.innerHTML) {
      const ratingActiveWidth = index / 0.1;
      ratingActive.style.width = `${ratingActiveWidth}%`;
    }
    // возможность указывать оценку
    function setRating(rating) {
      const ratingItems = rating.querySelectorAll('.rating__item');
      for (let index = 0; index < ratingItems.length; index++) {
        const ratingItem = ratingItems[index];
        ratingItem.addEventListener('mouseenter', function(e) {
          // обновление переменной
          initRatingVars(rating);
          // обновление активных звезд
          setRatingActiveWidth(ratingItem.value);
        });

        ratingItem.addEventListener('mouseleave', function(e) {
          // обновление активных звезд
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
  };

});

// Jquery
$(document).ready(function() {
  // Счётчик
  // создаём действие при нажатии
	$('body').on('click', '.js-minus, .js-plus', function() {    
		const $row = $(this).closest('.number'); // объявляем строку(весь блок)    
		const $input = $row.find('.number-text'); // находим текстовое поле    
		const step = $row.data('step'); // находим дата-атрибут с числом шага
		let val = parseFloat($input.val()); // Приводим содержимое поля в числовое
    // меняем значение в поле
		if ($(this).hasClass('js-minus')) {
			val -= step;
		} else {
			val += step;
		}
		$input.val(val); // перезаписываем значение в поле
		$input.change();
		return false;
	});

  // проверяем значение поля
	$('body').on('change', '.number-text', function(){
		var $input = $(this);
		var $row = $input.closest('.number');
		var step = $row.data('step'); // шаг
		var min = parseInt($row.data('min')); // макс значение
		var max = parseInt($row.data('max')); // мин значение
		var val = parseInt($input.val()); // конвертирует в числовое значение
    // проверка поля
		if (isNaN(val)) {
			val = step;
		} else if (min && val < min) {
			val = min;	
		} else if (max && val > max) {
			val = max;	
		}
		$input.val(val); // перезаписываем значение в поле
	});
});
    

  