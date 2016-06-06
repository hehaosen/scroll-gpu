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

    // 点击事件监控
    var _timer;

    _scrollElement.addEventListener('touchstart',function ( e ) {

        e.preventDefault(); // 阻止触摸时浏览器的缩放、滚动条滚动等
        _my = e.touches[0].clientY;
        _timer = new Date().getTime();
        //_scrollElement.style.cssText = 'transform: translate3d(0, ' +  + ', 0)'
    });
    _scrollElement.addEventListener('touchmove',function ( e ) {

        if (e.touches[0].clientY - _my + _y > 0 || e.touches[0].clientY - _my + _y < _element.offsetHeight - _scrollElement.offsetHeight) {
            // 如果超出滚动范围，不进行动画
            _scrollElement.style.cssText = 'transform: translate3d(0, ' + (e.touches[0].clientY - _my + _y) + 'px, 0);';
        } else {
            _scrollElement.style.cssText = 'transform: translate3d(0, ' + (e.touches[0].clientY - _my + _y) + 'px, 0);';
        }
    });

    var _yAdd = 0, _speedTimer= '';

    _scrollElement.addEventListener('touchend',function ( e ) {
        _y = e.changedTouches[0].clientY - _my + _y;
        _timer = new Date().getTime() - _timer;
        if ( _y > 0) {
            _y = 0;
            _scrollElement.style.cssText = 'transform: translate3d(0, 0, 0)'
        } else if ( _y < _element.offsetHeight - _scrollElement.offsetHeight) {
            _y = _element.offsetHeight - _scrollElement.offsetHeight;
            _scrollElement.style.cssText = 'transform: translate3d(0, ' +  _y + 'px, 0)'
        } else {
            if ( _timer < 500 ) { // 500毫秒内滑动有动画
                if ( _my <= e.changedTouches[0].clientY ) {
                    // 下滑操作
                    _yAdd = 500 / _timer * (e.changedTouches[0].clientY -_my);
                    _y = _y + _yAdd;

                    // 如果动画超出范围，动画事件特殊计算
                    if (_y >= 0) {
                        _y = 0;
                        _yAdd = 300 / _timer * _my;
                    }
                } else {
                    // 上滑操作
                    _yAdd = 500 / _timer * (_my - e.changedTouches[0].clientY);
                    _y = _y - _yAdd;

                    // 如果动画超出范围，动画事件特殊计算
                    if (_y < _element.offsetHeight - _scrollElement.offsetHeight) {
                        _y = _element.offsetHeight - _scrollElement.offsetHeight;
                        _yAdd = 300 / _timer * (_element.offsetHeight  - _my);
                    }
                }
            }
            _scrollElement.style.cssText = 'transform: translate3d(0, ' +  _y + 'px, 0);' + 'transition: -webkit-transform ' + ((_yAdd / 1500) < 0.45 ? 0.45 : (_yAdd / 1500)) + 's cubic-bezier(0.333333, 0.666667, 0.666667, 1) 0s;';
        }

    });

    // 回调函数
    callback();
};