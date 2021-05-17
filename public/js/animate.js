let fps = 60
let frame = 0
let interval, start, now, then, elapsed, update

const startAnimation = (loop) => {
    update = loop

    interval = 1000 / fps
    then = Date.now()
    start = then

    animationLoop()
}

const animationLoop = () => {
    requestAnimationFrame(animationLoop)
    
    now = Date.now()
    elapsed = now - then

    if(elapsed > interval) {
        then = now - (elapsed % interval)
        update(frame ++ % ( Number.MAX_SAFE_INTEGER - 1 ))
    }
}

const animate = (loop) => {
    if(typeof loop == "function") {
        startAnimation(loop)
    } else {
        throw new Error("animation loop must be a function")
    }
}

export default animate