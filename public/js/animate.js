let fps = 60
let interval, start, now, then, elapsed, update, rID

const startAnimation = (loop) => {
    update = loop

    interval = 1000 / fps
    then = Date.now()
    start = then

    animationLoop()
}

const animationLoop = () => {
    try {
        rID = requestAnimationFrame(animationLoop)
    
        now = Date.now()
        elapsed = now - then

        if(elapsed > interval) {
            then = now - (elapsed % interval)
            update()
        }
    } catch(e) {
        cancelAnimationFrame(rID)
        console.log(e)
        throw new Error("failed to start animation")
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