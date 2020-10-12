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
            console.log(2);

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
                            <td class="td-product"><img src="${value.url}" width="98" height="98">
                                <div class="product-info">
                                    <h3>${value.title}</h3>
                                </div>
                                <div class="clearfix"></div>
                            </td>
                            <td class="td-num">
                                <div class="product-num">
                                    <a href="javascript:;" class="num-reduce num-do fl" @click="minus(index)"><span></span></a>
                                    <input type="text" class="num-input" v-model="item.pro_num" @input="search($event,index)" @blur="check($event,index)">
                                    <a href="javascript:;" class="num-add num-do fr" @click="add(index)"><span></span></a>
                                </div>
                            </td>
                            <td class="td-price">
                             
                                <p class="red-text">￥<span class="price-text">${value.price}</span></p>
                            </td>
                            <td class="td-total">
                            
                                <p class="red-text">￥<span class="total-text">${(value.price*num).toFixed(2)}</span></p>
                            </td>
                         `;
                            $('.fr check-num').append(strhtml);
                            calc(); //总算总价


                        }
                    });
                })
            }

        }()
    }
})