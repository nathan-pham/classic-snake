export default class Object {
    name = "default-object"

    render() {
        console.log("empty render from", this.name)
    }

    update(objects) {
        console.log("empty update from", this.name)
    }
}