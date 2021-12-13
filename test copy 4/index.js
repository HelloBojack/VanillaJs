let fps = 0, last = Date.now(), offest = 0

const showFps = () => {
  offest = Date.now() - last
  fps++;
  if (offest >= 1000) {
    last += offest
    console.log('fps:' + fps)
    fps = 0
  }
  requestAnimationFrame(showFps)
}

showFps()