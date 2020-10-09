require(['config'], function() {
        require(['jquery', 'jq_lazyload'], function() {
            // console.log(1);
            ;
            ! function($) {
                const list = $('.floor_goodss .floor_goods1');
                $.ajax({ //获取远程接口的值
                    url: 'http://localhost/8-17_HTML/Midea/php/index1.php',
                    dataType: 'json'
                }).done(function(data) {
                    console.log(data);
                    let strhtml = '';
                    $.each(data, function(index, value) { //遍历数组和对象
                        strhtml += `
                       <div class="floor_goods1">
                                <a href="detail.html?sid=${value.sid}">
                                    <div class="product">
                                        <div class="tag_wrap">
                                            <i class="goods_sign"></i>
                                        </div>
                                         <img class="lazy" data-original="${value.url}"  alt="">
                                        <div class="goods_test">${value.title}</div>
                                        <div class="price">
                                            <span>
                                            "￥"
                                            <span class="price_1">${value.price}</span>
                                            </span>
                                            <span class="price_pro">
                                            "￥"
                                            <em>${value.sailnumber}</em> 
                                            </span>
                                        </div>
                                        </div>
                                </a>
                            </div>
                    `;
                    });
                    list.html(strhtml); //追加数据
                    //实现懒加载效果
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //图片显示方式
                    });
                })
            }(jQuery);
        })
    })
    /*  */