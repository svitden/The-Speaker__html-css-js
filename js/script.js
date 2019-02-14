
$(document).ready(function () {
    let $mainNav = $('.main-nav');
    let $mainNavToggle = $('.main-nav__toggle');

    let $requestForm = $('.request-form');    
    let $reviewsWriteBtn = $('.reviews__write-button');

    let $modalReviews = $('.modal-reviews');
    let $modalGratitude = $('.modal-gratitude');
    let $modalReviewsOverlay = $('.modal-reviews .modal__overlay');
    let $modalGratitudeOverlay = $('.modal-gratitude .modal__overlay');


    let $modalGratitudeClose = $('.modal-gratitude__close');
    let $modalReviewsClose = $('.modal-reviews__close');

    let $modalReviewsNameField = $('.modal-reviews__user-name');
    let $modalReviewsForm = $('.modal-reviews__form');
    let $modalReviewsField = $('.modal-reviews__reviews-field');


    // Открытие, закрытие меню
    $mainNav.removeClass('main-nav--nojs');
    $mainNavToggle.on('click', function (event) {
        
        if ($mainNav.hasClass('main-nav--closed')) {
            $mainNav.addClass('main-nav--opened');
            $mainNav.removeClass('main-nav--closed');
        } else {
            $mainNav.addClass('main-nav--closed');
            $mainNav.removeClass('main-nav--opened');
        }
    });


    // Аниимация скрола
    $('.main-features__scroll').on('click', function (event) {
        event.preventDefault();        
        let $top = $('.hits').offset().top;

        $('html, body').animate({
            scrollTop: $top
        }, 1000, 'swing'); 
    });

    //
    $requestForm.on('submit', function(event) {
        
        event.preventDefault();              
        $modalGratitude.addClass('modal--show');
        $modalGratitudeOverlay.addClass('modal__overlay--show');
      
    });

    // Закрытие модального окна "Благодарность"
    $modalGratitudeClose.on("click", function (event) { 
        event.preventDefault();
        $modalGratitude.removeClass('modal--show');
        $modalGratitudeOverlay.removeClass('modal__overlay--show');
    });

    // Появление модального окна "Отправить отзыв"
    $reviewsWriteBtn.on('click', function (event) {
        event.preventDefault(); 
        $modalReviews.addClass('modal-reviews--show');
        $modalReviewsOverlay.addClass('modal__overlay--show');

        // фокус в первом поле
        $modalReviewsNameField.focus(); 
    });

    // Закрытие модального окна "Отправить отзыв"
    $modalReviewsClose.on("click", function (event) {        
        event.preventDefault();
        $modalReviews.removeClass('modal-reviews--show');
        $modalReviewsOverlay.removeClass('modal__overlay--show');
        $modalReviews.removeClass('modal-error');
    });

    // Закрытие модального окна кнопкой Esc
    $('body').on('keyup', function (event) {
        
        if (event.which === 27) {            
            event.preventDefault();

            if ($modalGratitude.hasClass('modal--show')) {
                $modalGratitude.removeClass('modal--show');
                $modalGratitudeOverlay.removeClass('modal__overlay--show');                
            }

            if ($modalReviews.hasClass('modal-reviews--show')) {
                $modalReviews.removeClass('modal-reviews--show');
                $modalReviewsOverlay.removeClass('modal__overlay--show');
                $modalReviews.removeClass('modal-error');
            }
        }
    });

    // Закрытие модального окна при клике на область за модальным окном
    $('body').on('click', '.modal__overlay', function () {
        if ($modalGratitude.hasClass('modal--show')) {
            $modalGratitude.removeClass('modal--show');
            $modalGratitudeOverlay.removeClass('modal__overlay--show');
        }

        if ($modalReviews.hasClass('modal-reviews--show')) {
            $modalReviews.removeClass('modal-reviews--show');
            $modalReviewsOverlay.removeClass('modal__overlay--show');
            $modalReviews.removeClass('modal-error');
        }
    });

    // плагин jQuery для пролистывания комментариев
    $('#comments').viewComments({
        current: 0,        
        keysScroll: true        
    });

    // Submit на кнопке Отправить modal-reviews__send-button
    $modalReviewsForm.on('submit', function (event) {                

        if ( !$modalReviewsNameField.val() || !$modalReviewsField.val() ) {
            event.preventDefault();            
            $modalReviews.removeClass('modal-error');

            setTimeout(() => {
                $modalReviews.addClass('modal-error');  
            }, 0);     
        } else {  
            event.preventDefault();        
            $modalReviews.removeClass('modal-reviews--show');
            $modalReviewsOverlay.removeClass('modal__overlay--show');
            $modalReviews.removeClass('modal-error');
            console.log($modalReviewsNameField[0]);
            $modalReviewsNameField.val('');
            $modalReviewsField.val('');
        }
    });



});



