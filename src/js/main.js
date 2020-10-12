require.config({
    // baseUrl: '', //公共的路径，基路径，所有模块共有的路径
    paths: { //模块路径,路径引入后缀名必须忽略，配置里面已经存在后缀名（扩展名）。
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        'jq_cookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.0/jquery.cookie.min',
        'jq_lazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.8.3/jquery.lazyload.min'
    },
    shim: { //不支持AMD模块，支持AMD
        'jq_cookie': {
            deps: ['jquery'], //模块的依赖
            exports: 'jq_cookie'
        },
        'jq_lazyload': {
            deps: ['jquery'], //模块的依赖
            exports: 'jq_lazyload'
        }
    }
});

//加载模块
require(['jquery'], function() {
    require(['index1']); //手机二维码显示隐藏
    require(['seclist']); //侧边二级导航
    require(['detail']); //详情页
    require(['lunbo']); //轮播
    require(['guestlove']); //首页渲染的产品 -明星单品
    require(['backtop']); //回到顶部
    require(['list']); //列表页价格排序
    require(['datail_main']); //列表页跳转到详情页
    require(['scale']); //详情页-放大镜效果
    require(['move_nav']); //顶部悬浮-悬浮框
    require(['paging']); //分页效果
    require(['cart']); //购物车
});