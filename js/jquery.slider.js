
(($) => {
    'use strict';

    $.fn.viewComments = function (options = {}) {
        // настройки по умолчанию
        let defaults = {
            current: 0,            
            keysScroll: false           
        };
        // Объединяет содержимое двух или более заданных javascript-объектов
        options = $.extend(defaults, options);
        
        
        return this.each((i, element) => {
            let $comments = $(element),
                $commentsItems = $comments.children(); // нашли дочерние элементы  
                
            let $backBtn = $('.reviews__back-btn'),
                $nextBtn = $('.reviews__next-btn');
       
            $comments.addClass('comments');
            $commentsItems.addClass('comments-item');

            $commentsItems
                .eq(options.current)
                .addClass('current');            
            
            $comments.attr('tabindex', 0);
            

            // обработчики события "клик" по навигационным кнопкам
            $backBtn.on('click', function (event){
                let index = $comments.find('.current').index();
                $comments.find('.current').removeClass('current');

                if (index - 1 < $commentsItems.length) {
                    $commentsItems.eq(index - 1).addClass('current');
                } else {
                    $commentsItems.eq(-1).addClass('current');
                }                
            });

            $nextBtn.on('click', function (event) {
                
                let index = $comments.find('.current').index();
                $comments.find('.current').removeClass('current');

                if (index + 1 < $commentsItems.length) {
                    $commentsItems.eq(index + 1).addClass('current');
                } else {
                    $commentsItems.eq(0).addClass('current');
                }
            });
        
            if (options.keysScroll === true) {
                // обработчик события "нажатие кнопок вправо-влево"
                $comments.on('keyup', function (event) {
                    if (event.which !== 39 && event.which !== 37) return;

                    let index = $comments.find('.current').index();
                    $comments.find('.current').removeClass('current');

                    if (event.which === 39) {

                        if (index + 1 < $commentsItems.length) {
                            $commentsItems.eq(index + 1).addClass('current');
                        } else {
                            $commentsItems.eq(0).addClass('current');
                        }
                        
                    } else if (event.which === 37) {
                        if (index - 1 < $commentsItems.length) {
                            $commentsItems.eq(index - 1).addClass('current');
                        } else {
                            $commentsItems.eq(-1).addClass('current');
                        }
                    }
                });
            }
            
        });
    };

})(jQuery);


