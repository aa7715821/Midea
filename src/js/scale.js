define(['jquery'], function() {
    return {
        scale: ! function() {
            $('.sf').width($('.spic').width() * $('.bf').width() / $('.bpic').width());
            $('.sf').height($('.spic').height() * $('.bf').height() / $('.bpic').height());
            var bili = $('.bpic').width() / $('.spic').width();

            $('.spic').hover(function() {
                $('.sf').css('visibility', 'visible');
                $('.bf').css('visibility', 'visible');

                $(this).on('mousemove', function(ev) {

                    var $left = ev.pageX - $('.goodsinfo').offset().left - $('.sf').width() / 2;
                    var $top = ev.pageY - $('.goodsinfo').offset().top - $('.sf').height() / 2;
                    if ($left < 0) {
                        $left = 0;
                    } else if ($left >= $('.spic').width() - $('.sf').width()) {
                        $left = $('.spic').width() - $('.sf').width();
                    }
                    if ($top < 0) {
                        $top = 0;
                    } else if ($top >= $('.spic').height() - $('.sf').height()) {
                        $top = $('.spic').height() - $('.sf').height();
                    }

                    $('.sf').css('left', $left);
                    $('.sf').css('top', $top);
                    $('.bpic').css('left', -$left * bili);
                    $('.bpic').css('top', -$top * bili);
                });
            }, function() {
                $('.sf').css('visibility', 'hidden');
                $('.bf').css('visibility', 'hidden');
            });


            //点击小图切换
            // $('.list ul').on('click', 'li', function() {
            //     var $imgurl = $(this).find('img').attr('src');
            //     // $('.smallpic').attr('src', $imgurl);
            //     // $('.spic').attr('src', $imgurl);
            // });
            $('.list ul').hover(function() {
                var $imgurl = $(this).find('img').attr('src');
                $('.spic img').attr('src', $imgurl)
            })
        }()
    }
});