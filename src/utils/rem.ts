;(function (doc, win) {
  const docEl = doc.documentElement
  const recalc = function () {
    const clientWidth = docEl.clientWidth
    const MAX_WIDTH = 750 // 设计稿宽度为750px，html设置字体大小100px，设计稿上30px相当于页面上0.3rem；
    if (!clientWidth) {
      return
    }
    if (clientWidth >= MAX_WIDTH) {
      docEl.style.fontSize = '100px'
    } else {
      docEl.style.fontSize = 100 * (clientWidth / MAX_WIDTH) + 'px'
    }
    ;(window as any).rem = {
      baseSize: 100,
      rate: clientWidth / MAX_WIDTH,
    }
  }
  recalc()
  if (!doc.addEventListener) return

  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
