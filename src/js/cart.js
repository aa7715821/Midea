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

                    // 3.商品数量的加减

                    $('.num-add').on('click', function() {
                        var $count = $(this).parents('.product-num').find('.num-input').val(); //值
                        $count++;
                        if ($count >= 99) {
                            $count = 99;
                        }
                        $(this).parents('.product-num').find('.num-input').val($count); //赋值回去
                        $(this).parents('.product-num').find('.total-text').html(singlegoodsprice($(this))); //改变后的价格
                        priceall(); //重新计算总和。
                        setcookie($(this)); //将改变的数量重新添加到cookie

                    });
                    $('.num-reduce').on('click', function() {
                        var $count = $(this).parents('.product-num').find('.num-input').val(); //值
                        $count--;
                        if ($count <= 1) {
                            $count = 1;
                        }
                        $(this).parents('.product-num').find('.num-input').val($count); //赋值回去
                        $(this).parents('.product-num').find('.total-text').html(singlegoodsprice($(this))); //改变后的价格
                        priceall(); //重新计算总和。
                        setcookie($(this)); //将改变的数量重新添加到cookie

                    });




                    4. //计算总的商品件数和总价。
                    function priceall() {
                        var $sum = 0;
                        var $count = 0;
                        $('.cart-product tbody').each(function(index, element) {
                            if ($(element).find('.td-check input').prop('checked')) {
                                $sum += parseInt($(element).find('.product-num').find('.num-input').val());
                                $count += parseFloat($(element).find('.td-total').find('.total-text').html());
                            }
                        });

                        $('.check-num').find('span').html($sum);
                        $('.product-total').html($count.toFixed(2));
                    }
                    // 5.单个价格
                    function singlegoodsprice(obj) { //obj:当前元素
                        var $dj = parseFloat(obj.parents('.cart-product tbody').find('.red-text').html()); //单价
                        var $cnum = parseInt(obj.parents('.cart-product tbody').find('.product-num').find('.num-input').val()); //数量
                        return ($dj * $cnum).toFixed(2); //结果
                    }



                    //8.将改变后的数量的值存放到cookie
                    //点击按钮将商品的数量和id存放cookie中
                    var arrsid = []; //商品的id
                    var arrnum = []; //商品的数量
                    //提前获取cookie里面id和num
                    function cookietoarray() {
                        // if (getcookie('cookiesid') && getcookie('cookienum')) {
                        arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
                        arrnum = getcookie('cookienum').split(','); //cookie商品的num
                    }


                    function setcookie(obj) { //obj:当前操作的对象
                        cookietoarray(); //得到数组
                        var $index = obj.parents('.goods-item').find('img').attr('sid'); //通过id找数量的位置
                        arrnum[$.inArray($index, arrsid)] = obj.parents('.goods-item').find('.quantity-form input').val();
                        addcookie('cookienum', arrnum.toString(), 7);
                    }


                })
            }

            // 3.购物车其他功能
            // 删除单个商品
            $('.cart-product tbody').on('click', '.product-delect', function() {
                alert('确定要删除嘛？')
                $(this).parent().parent().remove()

            })

            // function calc() {
            //     let allprice = 0; //总价
            //     let allcount = 0; //总的数量
            //     $('.cart-product tbody').each(function(index, element) {
            //         if ($(element).find('.td-check input').prop('checked')) { //复选框选中。
            //             allcount += parseInt($(this).find('.num-input').val()); //总的件数
            //             allprice += parseInt($(this).find('.total-text').html()); //总价
            //         }
            //     });
            //     $('.amount-sum em').html(allcount);
            //     $('.totalprice').html(allprice.toFixed(2));

            //     $('.check-num').html(allcount);
            //     $('.product-total').html(allprice.toFixed(2));
            // }



        }()
    }
})