document.addEventListener('DOMContentLoaded', () => {


  // OPEN POPUP
  document.querySelectorAll('.popup-open-btn').forEach(button => {


    button.addEventListener('click', () => {


      const popupId = button.dataset.popup;


      document.getElementById(popupId).classList.add('active');


    });


  });


  // CLOSE POPUP
  document.querySelectorAll('.popup-close, .popup-overlay').forEach(item => {


    item.addEventListener('click', () => {


      item.closest('.custom-popup').classList.remove('active');


    });


  });


  // ESC CLOSE
  document.addEventListener('keydown', (e) => {


    if (e.key === 'Escape') {


      document.querySelectorAll('.custom-popup').forEach(popup => {
        popup.classList.remove('active');
      });


    }


  });


  // VARIANT SWITCHING
  document.querySelectorAll('.custom-popup').forEach(popup => {


    const colorButtons = popup.querySelectorAll('.color-variant-btn');
    const sizeButtons = popup.querySelectorAll('.size-variant-btn');


    const variantsData = JSON.parse(
      popup.querySelector('.product-variants-json').textContent
    );


    let selectedColor = colorButtons[0]?.dataset.color || '';
    let selectedSize = sizeButtons[0]?.dataset.size || '';


    function updateVariant() {


      const matchedVariant = variantsData.find(variant => {


        if (selectedSize) {
          return variant.color === selectedColor && variant.size === selectedSize;
        } else {
          return variant.color === selectedColor;
        }


      });


      if (!matchedVariant) return;


      // UPDATE VARIANT ID
      const variantInput = popup.querySelector('.variant-id-input');


      if (variantInput) {
        variantInput.value = matchedVariant.id;
      }


      // UPDATE PRICE
      const priceBox = popup.querySelector('.popup-price');


      if (priceBox) {
        priceBox.innerHTML = matchedVariant.price;
      }


      // UPDATE IMAGE
      const popupImage = popup.querySelector('.popup-product-image');


      if (popupImage && matchedVariant.image) {
        popupImage.src = matchedVariant.image;
      }


    }


    // COLOR CLICK
    colorButtons.forEach(button => {


      button.addEventListener('click', () => {


        colorButtons.forEach(btn => {
          btn.classList.remove('active');
        });


        button.classList.add('active');


        selectedColor = button.dataset.color;


        updateVariant();


      });


    });


    // SIZE CLICK
    sizeButtons.forEach(button => {


      button.addEventListener('click', () => {


        sizeButtons.forEach(btn => {
          btn.classList.remove('active');
        });


        button.classList.add('active');


        selectedSize = button.dataset.size;


        updateVariant();


      });


    });


    // INITIAL LOAD
    updateVariant();


  });


  // ADD TO CART
  document.querySelectorAll('.product-form').forEach(form => {


    form.addEventListener('submit', async (e) => {


      e.preventDefault();


      const formData = new FormData(form);


      const message = form.parentElement.querySelector('.cart-message');


      try {


        const response = await fetch('/cart/add.js', {
          method: 'POST',
          body: formData
        });


        if (response.ok) {


          message.innerHTML = 'Product added to cart';


        } else {


          message.innerHTML = 'Error adding product';


        }


      } catch(error) {


        message.innerHTML = 'Something went wrong';


      }


    });


  });


});
