import { Swipe } from './swipe';

class Slider {
  constructor(slider) {
    // if (typeof slider === 'string') {
    //   this._slider = document.querySelector(slider);
    //   this._selector = slider;
    // }

    // if (typeof slider === 'object') {
    //   this._slider = slider;
    //   this._selector = `#${this._slider.querySelector('.slider__container').id}`;
    // }

    this._slider = slider;
    this._selector = `#${slider.id}`;

    this._element = document.querySelector(this._selector);

    if (!this._element) {
      return false;
    }

    this.sliderContainer = this._element.querySelector(`${this._selector} .slider__container`);
    this._sliderWrapper = this.sliderContainer.querySelector(`${this._selector} .slider__wrapper`);
    this.buttonSlidePrev = this.sliderContainer.querySelector(`${this._selector} .slider__button-prev`);
    this.buttonSlideNext = this.sliderContainer.querySelector(`${this._selector} .slider__button-next`);

    this._buttonDisabledClass = 'button--disabled';
    this._slideActiveClass = 'slider__slide--active';

    this._slides = [...this.sliderContainer.querySelectorAll(`${this._selector} .slider__slide`)];

    // отрицательное значение прячет слайдер вверх
    this._slideTransitionSignPolarity = -1;
    this._slideIndex = 0;
    this._sliderHeight = this.sliderContainer.offsetHeight;

    this._slideHidingClass = 'slider__slide--hiding';
    this._slideHiding = this.sliderContainer.querySelector(`${this._selector} .${this._slideHidingClass}`);

    this.togglePrevSlide = this.togglePrevSlide.bind(this);
    this.toggleNextSlide = this.toggleNextSlide.bind(this);
    this._onResize = this._onResize.bind(this);

    this._swipeComponent = new Swipe(this);
  }

  init() {
    this._slides[0].classList.add(this._slideActiveClass);
    this._disableButton(this.buttonSlidePrev);

    // выходим, если слайд один и нет прячущегося слайда
    if (this._slides.length === 1 && !this._slideHiding) {
      this._disableButton(this.buttonSlideNext);
      return;
    }

    this.buttonSlidePrev.addEventListener('click', this.togglePrevSlide);
    this.buttonSlideNext.addEventListener('click', this.toggleNextSlide);

    this._changeSlidesBecauseSlideHiding();

    // отслеживаем ресайз окна
    // !NB: debounce не добавляю, так как ресайз в
    // инструментах разработчика не важен для пользователя
    document.addEventListener('DOMContentLoaded', () => {
      window.addEventListener('resize', this._onResize);
    });

    this._swipeComponent.init();
  }

  _onResize() {
    this._sliderHeight = this.sliderContainer.offsetHeight;
    this._changeSlidesBecauseSlideHiding();
    this._setTranslateProperty();
  }

  // сценарии
  _disableButton(button) {
    button.classList.add(this._buttonDisabledClass);
    button.setAttribute('disabled', 'disabled');
  }

  _activateButton(button) {
    button.classList.remove(this._buttonDisabledClass);
    button.removeAttribute('disabled');
  }

  _disableTabindex(slideIndexPrev) {
    const buttons = this._slides[slideIndexPrev].querySelectorAll('.people__link');
    for (const button of buttons) {
      button.setAttribute('tabindex', -1);
    }
  }

  _activateTabindex(slideIndexCurrent) {
    const buttons = this._slides[slideIndexCurrent].querySelectorAll('.people__link');
    for (const button of buttons) {
      button.setAttribute('tabindex', 0);
    }
  }

  _checkIndexForButtonSlidePrev() {
    if (this._slideIndex === 0) {
      this._disableButton(this.buttonSlidePrev);
    }

    if (this._slideIndex === this._slides.length - 2) {
      this._activateButton(this.buttonSlideNext);
    }
  }

  _checkIndexForButtonSlideNext() {
    if (this._slideIndex === 1) {
      this._activateButton(this.buttonSlidePrev);
    }

    if (this._slideIndex === this._slides.length - 1) {
      this._disableButton(this.buttonSlideNext);
    }
  }

  _removeActiveClass(slideIndexPrev) {
    this._slides[slideIndexPrev].classList.remove(this._slideActiveClass);
  }

  _addActiveClass(slideIndexCurrent) {
    this._slides[slideIndexCurrent].classList.add(this._slideActiveClass);
  }

  // группируем сценарии
  _doBeforeIndexChange() {
    this._disableTabindex(this._slideIndex);
    this._removeActiveClass(this._slideIndex);
  }

  _doAfterIndexChange() {
    this._activateTabindex(this._slideIndex);
    this._addActiveClass(this._slideIndex);
  }

  // переключаем слайды
  togglePrevSlide() {
    this._doBeforeIndexChange();

    this._slideIndex--;

    this._checkIndexForButtonSlidePrev();
    this._setTranslateProperty();
    this._doAfterIndexChange();
  }

  toggleNextSlide() {
    this._doBeforeIndexChange();

    this._slideIndex++;

    this._checkIndexForButtonSlideNext();
    this._setTranslateProperty();
    this._doAfterIndexChange();
  }

  // переход слайда
  _setTranslateProperty() {
    // console.log(this._slideIndex)
    // console.log(this._sliderHeight)
    const translateProperty = `translateY(${this._slideTransitionSignPolarity * this._slideIndex * this._sliderHeight}px)`;
    this._sliderWrapper.style.transform = translateProperty;

    // console.log(this._sliderWrapper)
  }

  // актуально только если количество слайдов на телефоне и десктопе различается
  _changeSlidesBecauseSlideHiding() {
    if (this._slideHiding) {
      const isHidingSlideInSlides = (this._slides[this._slides.length - 1].classList.contains(this._slideHidingClass));
      const isDisplayNone = (getComputedStyle(this._slideHiding).display === 'none');

      if (this._slideHiding.classList.contains(this._slideActiveClass)) {
        this._doBeforeIndexChange();
        this._slideIndex--;
        this._doAfterIndexChange();
      }

      if (isHidingSlideInSlides && isDisplayNone) {
        // console.log('добавлен в массив и скрыт');
        this._slides.splice(this._slides.length - 1, 1);
      }

      if (!isHidingSlideInSlides && !isDisplayNone) {
        // console.log('не добавлен в массив и показан');
        this._slides.push(this._slideHiding);
      }

      this._checkIndexForButtonSlidePrev();
      this._checkIndexForButtonSlideNext();
    }
  }
}

export { Slider };