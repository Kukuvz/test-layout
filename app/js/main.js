$(function() {

  //form ajax request
  $(".product-page__form").on("submit", function(){
    $.ajax({
      url: '/handler.php',
      method: 'post',
      dataType: 'html',
      data: $(this).serialize(),
      success: function(data){
        $('#message').html(data);
      }
    });
  });

  //show modal optimal size
  if ($(window).width() > 801) {
    $('[data-modal=size-selection]').on('click', function() {
        $('.overlay, #size-selection').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #size-selection').fadeOut('slow');
    });
  }
  //disable modal link on small resolution
  if ($(window).width() < 801) {
    $('.size__optimal-text').removeAttr('href');
  }
  

  //tabs
  $('.tabs__top-item').on('click', function(e) {
    e.preventDefault();
    $('.tabs__top-item').removeClass('tabs__top-item--active');
    $(this).addClass('tabs__top-item--active');

    $('.tabs__content-item').removeClass('tabs__content-item--active');
    $($(this).attr('href')).addClass('tabs__content-item--active');
  });

  //styler cart quantity
  $('.order__cart-quantity').styler();

  //disable choose size checkbox
   $('.size__item-input--out').attr('disabled', true);

  //popup main image
  $('.popup').magnificPopup({
    type: 'image',
    zoom: {
        enabled: true,
        duration: 300
    },
  });

  //disable popup on small resolution
  if ($(window).width() < 501) {
    $('.popup').replaceWith(function(){
      $('.popup').removeAttr('href');
      return $("<div class='popup' />").append($(this).contents());
    });
  }

  //slider main image
  $('.product-page__slide-big').slick({
    asNavFor: '.product-page__slide-thumbs',
    draggable: false,
    arrows: false,
    fade: true,
    responsive: [
      {
        breakpoint: 501,
        settings: {
          draggable: true,
        }
      },
    ]
  });

  //slider thumbs
  $('.product-page__slide-thumbs').slick({
    asNavFor: '.product-page__slide-big',
    focusOnSelect: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    draggable: false,
  });

  //calculating new price and economy
  const oldPrice = document.querySelector('.price__old-num'),
        newPrice = document.querySelector('.price__new-num'),
        discount = document.querySelector('.price__discount-num'),
        economy = document.querySelector('.price__economy-num');

  function setNewPrice() {
      const numPercent = (+oldPrice.textContent / 100) * +discount.textContent;
      newPrice.textContent = (+oldPrice.textContent - numPercent);
  }

  function setEconomy() {
      economy.textContent = (oldPrice.textContent - newPrice.textContent);
  }
  
  setNewPrice();
  setEconomy();

  //telephone mask
  let setCursorPosition = (pos, elem) => {
      elem.focus();
      
      if (elem.setSelectionRange) {
          elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
          let range = elem.createTextRange();

          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
      }
  };

  function createMask(event) {
      let matrix = '(___) ___ __ __',
          i = 0,
          def = matrix.replace(/\D/g, ''),
          val = this.value.replace(/\D/g, '');

      if (def.length >= val.length) {
          val = def;
      }

      this.value = matrix.replace(/./g, function(a) {
          return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });

      if (event.type === 'blur') {
          if (this.value.length == 2) {
              this.value = '';
          }
      } else {
          setCursorPosition(this.value.length, this);
      }
  }

  let inputs = document.querySelectorAll('[name="phone"]');

  inputs.forEach(input => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
  });

  //article copy and message
  const article = document.querySelector('.info__article-num');

  article.addEventListener('click', () => {
    const copy = document.querySelector('.info__article-num').value;

    navigator.clipboard
        .writeText(copy)
        .then(() => {
            alert(`Скопирован код товара ${copy}`);
        })
        .catch(() => {
            console.log('Не удалось скопировать код товара');
        });
  });

});