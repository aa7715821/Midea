define(['jquery', 'jq_cookie'], function() {
    return {
        cart: ! function() {
            //1.渲染购物车列表
            //获取cookie，进行渲染。
            if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在,获取cookie转成数组
                let sid = $.cookie('cookiesid').split(','); //[1,2,3]
                let num = $.cookie('cookienum').split(','); //[100,200,300]
                for (let i = 0; i < sid.length; i++) {
                    rendercart(sid[i], num[i])
                }
            }

            // 2.封装函数进行渲染
            function rendercart(sid, num) { //sid:渲染的商品编号    num:渲染的商品的数量。
                $.ajax({
                    url: 'http://localhost/8-17_HTML/Midea/php/cart.php',
                    dataType: 'json'
                }).done(function(data) {

                    $.each(data, function(index, value) {
                        if (value.sid == sid) { //数据接口的sid和当前商品的sid进行比较，如果相等，直接赋值。
                            let strhtml = '';
                            strhtml += `
                            <tr v-for="(item,index) in productList":key="index" class="goods">
                                <td class="td-check"><input type="checkbox" class="check-span checked=""  check-true"></td>
                                <td class="td-product"><img src="${value.url}" width="98" height="98">
                                <div class="product-info">
                                    <h3>${value.title}</h3>
                                </div>
                                <div class="clearfix"></div>
                                </td>
                                <td class="td-num">
                                <div class="product-num">
                                    <a href="javascript:;" class="num-reduce num-do fl" @click="minus(index)"><span></span></a>
                                    <input type="text" value="${num}" class="num-input">
                                    <a href="javascript:;" class="num-add num-do fr" @click="add(index)"><span></span></a>
                                </div>
                                 </td>
                                <td class="td-price">
                                <p class="red-text">￥<span class="price-text">${value.price}</span></p>
                                </td>
                            
                                <td class="td-total">
                                <p class="red-text">￥<span class="total-text">${(value.price*num).toFixed(2)}</span></p>
                                </td>
                                </td>
                                <td class="td-do"><a href="javascript:;" class="product-delect"  @click="deleteOneProduct(index)">删除</a></td>
                            </tr>
                        
                         `;
                            $('.cart-product tbody').append(strhtml);
                            // calc(); //总算总价
                        }
                    });
                    // 1,点击全选按钮
                    var all = $('.check-all ');
                    var inputs = $('.check-span').not('.check-all')
                    all.on('click', function() {
                        inputs.prop('checked', $(this).prop('checked'));
                    })

                    //2.下面所有的复选框选中，全选对应的选择
                    //除了全选，选中的长度等于复选框的长度，全选勾选。
                    inputs.on('click', function() {
                        if ($('input:checked').not('.check-all').size() === inputs.length) {
                            all.prop('checked', true);
                        } else {
                            all.prop('checked', false);
                        }
                    });

                    //计算总的商品件数和总价。
                    // function priceall() {
                    //     var $sum = 0;
                    //     var $count = 0;
                    //     $('.goods').each(function(index, element) {
                    //         if ($(element).find('.td-check input').prop('checked')) {
                    //             $sum += parseInt($(element).find('.product-num').find('.num-input').val());
                    //             $count += parseFloat($(element).find('.red-text').find('.total-text').html());
                    //         }
                    //     });

                    //     $('.check-num').find('em').html($sum);
                    //     $('.product-total').html('￥' + $count.toFixed(2));
                    // }


                })
            }

            // 3.购物车其他功能

            // 商品数量加减
            $('.cart-product tbody').on('click', '.num-reduce', function() {
                $('.num-input').val(Number($('.num-input').val()) - 1);
                if ($('.num-input').val() == 0) {
                    $('.num-input').val(1)

                }

            })
            $('.cart-product tbody').on('click', '.num-add', function() {
                $('.num-input').val(Number($('.num-input').val()) + 1);

            })


            // 删除单个商品
            $('.cart-product tbody').on('click', '.product-delect', function() {
                alert('确定要删除嘛？')
                $(this).parent().parent().remove()
            })




        }()
    }
})