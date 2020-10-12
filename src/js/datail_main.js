define(['jquery', 'jq_cookie'], function() {
    return {
        main: ! function() {
            let sid = location.search.substring(1).split('=')[1];
            //判断sid是否存在
            if (!sid) {
                sid = 1;
            }
            // 链接数据库，渲染购物车
            $.ajax({
                url: 'http://localhost/8-17_HTML/Midea/php/getsid.php',
                data: {
                    datasid: sid
                },
                dataType: 'json'
            }).done(function(data) {
                $('.spic img').attr('src', data.url);
                $('.bf img').attr('src', data.url);
                $('.loadtitle').html(data.title);
                $('.loadpcp').html(data.price);
                let picarr = data.piclisturl.split(','); //数据转换成数组
                let strhtml = '';
                $.each(picarr, function(index, value) {
                    strhtml += `
                        <li>
                            <img src="${value}"/>
                        </li>
                    `;
                });
                $('.list .Chart').html(strhtml);
            });
        }()
    }
});