/*
 * 滚动GPU加速 v0.0.1
 * Date: 2016-6-3
 * author:大力神
 * http://www.github.com/hehaosen
 */
var scrollGpu = function (element) {
    var _element;

    // 选择需要加速的节点
    _element = element ? document.querySelector(element) : document.querySelector('body');

    // 保存现有的style内联样式
    var _initCssText = _element.style.cssText;
    var _y;

    _element.addEventListener('touchstart',function ( e ) {

        e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
        _y = e.touches[0].clientY;
    });
    _element.addEventListener('touchmove',function ( e ) {
        _element.style.cssText = _initCssText + 'transform: translate3d(0, ' + (e.touches[0].clientY - _y) + 'px, 0)'
    });

    _element.addEventListener('touchend',function ( e ) {
        _y = e.touches[0].clientY;
    });


};