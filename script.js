/*$(window).on('scroll', function() {
    if (window.body.scrollTop > 80 || window.documentElement.scrollTop > 80) {
        $('nava').addclass('yapıskan');
    } else {
        $('nava').remove('yapıskan');
    }
})*/

$(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.nava').addClass('yapıskan');
        } else {
            $('.nava').removeClass('yapıskan');
        }
    })
});
$(function() {
    var $carousel = $('#carousel'),
        $pager = $('#pager');

    function getCenterThumb() {
        var $visible = $pager.triggerHandler('currentVisible'),
            center = Math.floor($visible.length / 2);

        return center;
    }

    $carousel.carouFredSel({
        responsive: true,
        items: {
            visible: 1,
            width: 800,
            height: (500 / 800 * 100) + '%'
        },
        scroll: {
            fx: 'crossfade',
            onBefore: function(data) {
                var src = data.items.visible.first().attr('src');
                src = src.split('/large/').join('/small/');

                $pager.trigger('slideTo', ['img[src="' + src + '"]', -getCenterThumb()]);
                $pager.find('img').removeClass('selected');
            },
            onAfter: function() {
                $pager.find('img').eq(getCenterThumb()).addClass('selected');
            }
        }
    });
    $pager.carouFredSel({
        width: '100%',
        auto: false,
        height: 120,
        items: {
            visible: 'odd'
        },
        onCreate: function() {
            var center = getCenterThumb();
            $pager.trigger('slideTo', [-center, {
                duration: 0
            }]);
            $pager.find('img').eq(center).addClass('selected');
        }
    });
    $pager.find('img').click(function() {
        var src = $(this).attr('src');
        src = src.split('/small/').join('/large/');
        $carousel.trigger('slideTo', ['img[src="' + src + '"]']);
    });
});