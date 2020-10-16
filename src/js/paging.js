define(['jquery', 'jq_lazyload', 'pagination'], function() {
    return {
        list: ! function() {
            // 1.鼠标滑过price，价格选择框显示，滑出隐藏
            $(".price").hover(function() {
                    $(".Price_choice").show();
                }, function() {
                    $(".Price_choice").hide();
                })
                // 2.鼠标滑到Price_choice价格选择框不消失，滑出消失
            $(".Price_choice").hover(function() {
                $(this).show();
            }, function() {
                $(this).hide();
                // $(this).removeClass('.Price_choice') //此行代码作废-暂不删除
            });
            //排序
            var array_default = []; //排序前的li数组
            var array = []; //排序中的数组
            //冒泡排序，比较相邻的两个数字。
            var prev = null; //前一个商品价格
            var next = null; //后一个商品价格

            //1.渲染列表页的数据-默认渲染第一页
            var $list = $('.list .list-detail');
            $.ajax({
                url: 'http://localhost/8-17_HTML/Midea/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                var $strhtml = '<ul>';
                $.each(data, function(index, value) {
                    $strhtml +=

                        ' <a href="detail.html?sid=${value.sid}"> <li><img class="lazy" data-original=' + value.url + ' width="200" height="200" ><p>' + value.title + '</p><span class="price">￥' + value.price + '</span><span>销量：' + value.sailnumber + '件</span><em>自营</em><i>用券减50</i></li></a>';
                });
                $strhtml += '</ul>';
                $list.html($strhtml);
                //添加懒加载
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });

                array_default = []; //排序前的li数组
                array = []; //排序中的数组
                //冒泡排序，比较相邻的两个数字。
                prev = null; //前一个商品价格
                next = null; //后一个商品价格
                //将页面的li元素加载到两个数组中
                $('.list li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            });

            //2.分页思路:根据传输的页码，后端返回对应的接口数据，渲染出来。
            $('.page').pagination({
                pageCount: 3, //总的页数
                jump: true, //是否开启跳转到指定的页数，布尔值。
                prevContent: '上一页', //将图标改成上一页下一页。
                nextContent: '下一页',
                callback: function(api) {
                    console.log(api.getCurrent()); //获取当前的点击的页码。
                    $.ajax({
                        url: 'http://localhost/8-17_HTML/Midea/php/listdata.php',
                        data: {
                            page: api.getCurrent() //传输数据
                        },
                        dataType: 'json'
                    }).done(function(data) {
                        var $strhtml = '<ul>';
                        $.each(data, function(index, value) {
                            $strhtml +=
                                '<li><a href="detail.html?sid=${value.sid}" target="_blank"><img src="${value.url}"/><p>' + value.sid + '' + value.title + '</p><span class="price">￥' + value.price + '</span><span>' + value.sailnumber + '</span><em>自营</em><i>用券减50</i></a></li>';
                        });
                        $strhtml += '</ul>';
                        $list.html($strhtml);

                        //将页面的li元素加载到两个数组中
                        array_default = []; //排序前的li数组
                        array = []; //排序中的数组
                        //冒泡排序，比较相邻的两个数字。
                        prev = null; //前一个商品价格
                        next = null; //后一个商品价格
                        $('.list li').each(function(index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        });
                    });
                }

            });



            // 升序

            $('.Price_choice li').eq(0).on('click', function() {

                for (var i = 0; i < array.length - 1; i++) {
                    for (var j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.price').html().substring(1)); //取上个价格
                        next = parseFloat(array[j + 1].find('.price').html().substring(1)); //下一个的价格
                        //通过价格的判断，改变的是数组li的位置。
                        if (prev > next) {
                            var temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                console.log(array);
                console.log(array_default);
                $('.list ul').empty(); //清空原来的列表
                $.each(array, function(index, value) {
                    $('.list ul').append(value);
                });
            });

            // 降序

            $('.Price_choice li').eq(1).on('click', function() {
                for (var i = 0; i < array.length - 1; i++) {
                    for (var j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.price').html().substring(1)); //取上个价格
                        next = parseFloat(array[j + 1].find('.price').html().substring(1)); //下一个的价格
                        //通过价格的判断，改变的是数组li的位置。
                        if (prev < next) {
                            var temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $('.list ul').empty(); //清空原来的列表
                $.each(array, function(index, value) {
                    $('.list ul').append(value);
                });
            });
        }()
    }
});