export default class Object {
    name = "default-object"
    pos = { x: 0, y: 0 }
    vel = { x: 0, y: 0 }

    log = false

    render() {
        if(this.log) {
            console.log("empty render from", this.name)
        }
    }

    update(objects) {
        if(this.log) {
            console.log("empty update from", this.name)
        }
    }
}