window.onload = function() {
    //表单验证
    var oInput = document.querySelectorAll("input"); //获取元素对象
    var oSpan = document.querySelectorAll("span"); //获取元素对象
    var oBt = document.querySelector(".login_button"); //获取元素对象
    var form = document.querySelector('form');

    //设置全部验证通过可提交
    var yz = true;


    // 用户名

    oInput[0].onblur = function() {
            if (oInput[0].value != "") { //当内容不为空时
                oSpan[0].innerHTML = "";
                var len = this.value.replace(/[\u4e00-\u9fa5]/g, "**").length;
                if (len >= 4 && len <= 20) {
                    var namebox = /^[\da-zA-Z\u4e00-\u9fa5]+$/; //中英文都可以
                    if (namebox.test(this.value)) { //判断格式是否正确
                        console.log(1);
                        oSpan[0].innerHTML = "";
                        oSpan[0].style.color = "green";


                    } else {
                        oSpan[0].innerHTML = "格式有误";
                        oSpan[0].style.color = "red";

                    }

                } else {
                    oSpan[0].innerHTML = "长度有误";
                    oSpan[0].style.color = "red";

                }

            } else { //当内容为空时
                oSpan[0].innerHTML = "用户名不能为空";
                oSpan[0].style.color = "red";

            }
        }
        //密码验证
    oInput[1].onblur = function() { //失去焦点  判断
        if (oInput[1].value != "") { //当内容不为空时
            var Len = oInput[1].value.replace(/[\u4e11-\u9fa5]/g, 'aa').length //取内容字符长度
            if (Len >= 6 && Len <= 12) { //判断长度格式是否正确
                oSpan[1].innerHTML = "";
                oSpan[1].style.color = "green";
                yz = true;
            } else {
                oSpan[1].innerHTML = "格式错误：长度为6~12字符";
                oSpan[1].style.color = "red";
                yz = false;
            }
        } else { //当内容为空时
            oSpan[1].innerHTML = "请输入密码";
            oSpan[1].style.color = "red";


        }
    }

    // 点击登录的时候
    oBt.onclick = function(ev) {
        var ev = ev || window.event;
        if (oInput[0].value == "" || oInput[1].value == "") {
            oSpan[0].innerHTML = "用户名不能为空";
            oSpan[0].style.color = "red";
            oSpan[1].innerHTML = "请输入密码";
            oSpan[1].style.color = "red";
            // return false;
        } else {
            return true;
        }
    }
}