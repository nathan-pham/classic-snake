export default class Manager {
    rooms = []

    add(room) {
        this.rooms.push(room)
    }

    find(id) {
        return this.rooms.filter(roomID => roomID == id)[0]
    }
}