/*
 * 滚动GPU加速 v0.0.1
 * Date: 2016-6-3
 * author:大力神
 * http://www.github.com/hehaosen
 */
var scrollGpu = function (element, callback) {
    var _element;

    // 选择需要加速的节点
    _element = element ? document.querySelector(element) : document.querySelector('body');

    // 创建滚动区域
    var _scrollElement = document.createElement('div');
    _scrollElement.id = 'J_scrollGpu';

    // clone节点，跳过回车节点
    var _elemChild = _element.childNodes;
    for(var i = 0; i < _elemChild.length; i++){
        if (!(_elemChild[i].nodeName == "#text" && !/\s/.test(_elemChild.nodeValue)))
        {
            _scrollElement.appendChild(_elemChild[i].cloneNode(true));
            _element.removeChild(_elemChild[i]);
        }
    }
    _element.appendChild(_scrollElement);

    // 保存现有的style内联样式
    var _y = 0, _my;

    _scrollElement.addEventListener('touchstart',function ( e ) {

        e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
            _my = e.touches[0].clientY;
    });
    _scrollElement.addEventListener('touchmove',function ( e ) {
        _scrollElement.style.cssText = 'transform: translate3d(0, ' + (e.touches[0].clientY - _my + _y) + 'px, 0)'
    });

    _scrollElement.addEventListener('touchend',function ( e ) {
        _y = e.changedTouches[0].clientY - _my + _y;
    });

    // 回调函数
    callback();
};