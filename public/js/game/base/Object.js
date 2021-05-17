export default class Object {
    name = "default-object"
    pos = { x: 0, y: 0 }
    vel = { x: 0, y: 0 }

    render() {
        console.log("empty render from", this.name)
    }

    update(objects) {
        console.log("empty update from", this.name)
    }
}