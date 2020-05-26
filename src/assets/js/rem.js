setRem()
function setRem() {
	const baseSize = 32
  const scale = document.documentElement.clientWidth / 750
  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
}
window.onresize = function () {
  setRem()
}
