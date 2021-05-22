export default class Manager {
    rooms = []

    add(room) {
        this.rooms.push(room)
    }

    find(roomID) {
        return this.rooms.filter(room => room.id == roomID)[0]
    }
}