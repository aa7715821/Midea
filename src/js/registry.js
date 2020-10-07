//表单验证
var oInput = document.querySelectorAll("input"); //获取元素对象
var oSpan = document.querySelectorAll("span"); //获取元素对象
var oBt = document.querySelector("button"); //获取元素对象

//设置全部验证通过可提交
let yz = true;
let yz1 = true;
let yz2 = true;

// 用户名
oInput[0].onfocus = function() { //获得焦点时提示
    oSpan[0].innerHTML = "包含数字、字母、下划线，长度不小于6位"
    oSpan[0].style.color = "#999";
    yz = false;
}
oInput[0].onblur = function() {
    if (oInput[0].value != "") { //当内容不为空时
        oSpan[0].innerHTML = "";
        var len = this.value.replace(/[\u4e00-\u9fa5]/g, "**").length;
        if (len >= 4 && len <= 20) {
            var namebox = /^[\da-zA-Z\u4e00-\u9fa5]+$/; //中英文都可以
            if (namebox.test(this.value)) { //判断格式是否正确
                console.log(1);
                oSpan[0].innerHTML = "√";
                oSpan[0].style.color = "green";
                yz = true;

            } else {
                oSpan[0].innerHTML = "格式有误";
                oSpan[0].style.color = "red";
                yz = false;
            }

        } else {
            oSpan[0].innerHTML = "长度有误";
            oSpan[0].style.color = "red";
            yz = false;
        }

    } else { //当内容为空时
        oSpan[0].innerHTML = "用户名不能为空";
        oSpan[0].style.color = "red";
        yz = false;

    }
}

//密码验证
oInput[1].onfocus = function() { //获得焦点时提示
    oSpan[1].innerHTML = "请输入6-12位字符的密码";
    oSpan[1].style.color = "#999";
    yz = false;
}
oInput[1].oninput = function() { //判断密码强度   oninput文本框内容发生改变触发事件
    if (oInput[1].value != "") {
        var one = /\d+/g; //分别列出类型  4种可能  当有两种或以上 依次往上叠加
        var two = /[a-z]+/g;
        var three = /\W\_+/g;
        var four = /[A-Z]+/g;
        var jsy = 0 //叠加初始值为0
        if (one.test(oInput[1].value)) { //每满足一个条件 计数用JSY++
            jsy++
        }
        if (two.test(oInput[1].value)) {
            jsy++
        }
        if (three.test(oInput[1].value)) {
            jsy++
        }
        if (four.test(oInput[1].value)) {
            jsy++
        }
        if (jsy == 1) { //判断jsy的值  1为弱 2,3为中,4为强
            oSpan[1].innerHTML = "弱";
            oSpan[1].style.color = "red";
            yz = false;
        } else if (jsy == 2 || jsy == 3) {
            oSpan[1].innerHTML = "中";
            oSpan[1].style.color = "orange";
            yz = true;
        } else if (jsy == 4) {
            oSpan[1].innerHTML = "强";
            oSpan[1].style.color = "green";
            yz = true;
        }
    }
}
oInput[1].onblur = function() { //失去焦点  判断
    if (oInput[1].value != "") { //当内容不为空时
        var Len = oInput[1].value.replace(/[\u4e11-\u9fa5]/g, 'aa').length //取内容字符长度
        if (Len >= 6 && Len <= 12) { //判断长度格式是否正确
            oSpan[1].innerHTML = "√";
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
        yz = false;
    }
}

// 确认密码验证
oInput[2].onfocus = function() { //获得焦点时提示
    oSpan[2].innerHTML = "请确认密码";
    oSpan[2].style.color = "#999";
    yz = false;
}
oInput[2].onblur = function() { //失去焦点  判断
    if (oInput[2].value != "") { //当内容不为空时
        if (oInput[2].value == oInput[1].value) {
            oSpan[2].innerHTML = "√";
            oSpan[2].style.color = "green";
            yz = true;
        } else {
            oSpan[2].innerHTML = "密码与第一次输入不同";
            oSpan[2].style.color = "red";
            yz = false;
        }
    } else { //当内容为空时
        oSpan[2].innerHTML = "请输入密码";
        oSpan[2].style.color = "red";
        yz = false;
    }
}

//电子邮箱
// 获得焦点 
oInput[3].onfocus = function() {
    oSpan[3].innerHTML = '请输入电子邮箱';
    oSpan[3].style.color = '#999';
    yz = false;
}

//失去焦点
oInput[3].onblur = function() {
    if (oInput[3].value != "") {
        var reg = /^\w+([+.-]\w+)*@(\w+([.-]\w+)*)\.(\w+([.-]\w+)*)$/;
        if (reg.test(this.value)) {
            oSpan[3].innerHTML = '√';
            oSpan[3].style.color = 'green'
            yz = true;
        } else {
            oSpan[3].innerHTML = '邮箱格式有误';
            oSpan[3].style.color = 'reed'
            yz = false;
        }
    } else {
        oSpan[3].innerHTML = "邮箱不能为空";
        oSpan[3].style.color = "red";
        yz = false;
    }
}

//真实姓名
// 取得焦点
oInput[4].onfocus = function() {
        oSpan[4].innerHTML = '请输入真实姓名';
        oSpan[4].style.color = '#999';
        yz = false;
    }
    // 失去焦点
oInput[4].onblur = function() {
    if (oInput[4].value != "") {
        var reg = /^[\u4e00-\u9af5]{1,}$/g;
        if (reg.test(this.value)) {
            oSpan[4].innerHTML = '√';
            oSpan[4].style.color = 'green'
            yz = true;
        } else {
            oSpan[4].innerHTML = '名称有误';
            oSpan[4].style.color = 'reed'
            yz = false;
        }

    } else {
        oSpan[4].innerHTML = "姓名不能为空";
        oSpan[4].style.color = "red";
        yz = false;
    }
}

// 中奖手机号码
// 取得焦点
oInput[5].onfocus = function() {
        oSpan[5].innerHTML = '请输入中奖手机号';
        oSpan[5].style.color = '#999';
        yz = false;
    }
    // 失去焦点
oInput[5].onblur = function() {
        if (oInput[5].value != "") {
            var reg = /^1[365]\d{9}$/;
            if (reg.test(this.value)) {
                oSpan[5].innerHTML = '√';
                oSpan[5].style.color = 'green'
                yz = true;
            } else {
                oSpan[5].innerHTML = '手机号码有误';
                oSpan[5].style.color = 'reed'
                yz = false;
            }

        } else {
            oSpan[5].innerHTML = "手机号不能为空";
            oSpan[5].style.color = "red";
            yz = false;
        }
    }
    // 手机验证码
oInput[6].onfocus = function() { //获得焦点时提示
        oSpan[6].innerHTML = "";
        oSpan[6].style.color = "#999";
        yz = false;
    }
    //失去焦点时
oInput[6].onblur = function() {
    if (oInput[6].value != "") {
        if (this.value == oInput[4].value) { //判断图片验证码的值是否是手机验证码
            oSpan[6].innerHTML = "√"
            oSpan[6].style.color = "green";
            yz = true;
        } else {
            oSpan[6].innerHTML = "手机验证码有误";
            oSpan[6].style.color = "red";
            yz = false;
        }


    } else { //内容为空时
        oSpan[6].innerHTML = '';
        oSpan[6].style.color = "red";
        yz = false;
    }
}

function fn() { //随机4位数
    return arr = `${parseInt(Math.random()*10)}${parseInt(Math.random()*10)}${parseInt(Math.random()*10)}${parseInt(Math.random()*10)}`
}
oSpan[6].innerHTML = fn();
oSpan[6].style.margin = "1px auto"
oSpan[6].onclick = function() { //点击更换
    fn();
    oSpan[6].innerHTML = arr;
}
oInput[6].onfocus = function() { //获得焦点时提示
    fn();
    oSpan[6].innerHTML = arr;
    oSpan[6].style.color = "red";
}
oInput[6].onblur = function() { //失去焦点  判断
        if (oInput[6].value != "") { //当内容不为空时
            if (this.value == oSpan[6].innerHTML) {
                oSpan[6].innerHTML = arr;
                oSpan[6].style.color = "green";
                yz = true;
            } else {
                oSpan[6].innerHTML = "验证码错误";
                oSpan[6].style.color = "red";
                yz = false;
            }
        } else { //当内容为空时
            oSpan[6].innerHTML = arr;
            oSpan[6].style.color = "red";
            yz = false;
        }
    }
    //提交检测
oBt.onmousedown = function() {
    if (yz == true) {
        //满足条件
        alert("注册成功")

    } else {
        //不满足条件
        alert("请确认是否正确")
    }
}