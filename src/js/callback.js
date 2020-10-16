function ajax(option) { //option:对象参数
    var ajax = new XMLHttpRequest();

    //1.配置请求方式参数，默认为get
    option.type = (option.type || 'get').toLowerCase(); //转换小写。


    //2.配置接口地址(数据接口,接收数据)，不能为空。
    if (!option.url) {
        throw new Error('接口不能为空');
    }

    //3.是否异步。默认是异步
    if (option.async === 'false' || option.async === false) {
        option.async = false;
    } else {
        option.async = true;
    }

    //4.发送数据get - 数据存在发送。
    function objtostring(obj) { //对象转后端能够识别的字符串。
        var objarr = [];
        for (var i in obj) {
            objarr.push(i + '=' + obj[i]);
        }
        return objarr.join('&')
    }

    if (option.data) { //数据存在，格式转换
        if (Object.prototype.toString.call(option.data) === '[object Object]') { //对象格式
            option.data = objtostring(option.data); //转换后赋值
        }
    }

    if (option.data && option.type === 'get') { //数据存在+get请求，数据拼接到地址栏的后面
        option.url += '?' + option.data
    }

    ajax.open(option.type, option.url, option.async);

    //5.发送数据post - 数据存在发送。
    if (option.data && option.type === 'post') {
        ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded'); //设置请求头
        ajax.send(option.data);
    } else {
        ajax.send();
    }

    //6..是否异步，同步无需监听，异步监听
    if (option.async) { //异步
        ajax.onreadystatechange = function() {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) { //http的状态码（ajax.status）接口地址请求成功，http请求成
                    //重要：
                    //函数内部的数据，通过回调函数获取
                    //option.success存在，并且是函数，调用option.success()
                    var data = ajax.responseText; //存储当前的数据
                    if (option.dataType === 'json') {
                        data = JSON.parse(data); //数据转换成对象
                    }
                    option.success && typeof option.success === 'function' && option.success(data);
                } else { //接口地址请求失败
                    option.error && typeof option.error === 'function' && option.error('接口地址有误' + ajax.status)
                }
            }
        }
    } else { //同步
        if (ajax.status === 200) { //http的状态码（ajax.status）接口地址请求成功，http请求成
            option.success && typeof option.success === 'function' && option.success(ajax.responseText);
        } else { //接口地址请求失败
            throw new Error('接口地址有误' + ajax.status);
        }
    }

}