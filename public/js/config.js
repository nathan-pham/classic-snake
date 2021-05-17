const version = "1.0.0"

const checkVersion = async () => {
    const fetchedVersion = await fetch("/version").then(res => res.text())
    return fetchedVersion == version
}

const config = {
    resolution: {
        width: 500,
        height: 500
    },
    color: {
        background: "#231f20",
        snake: "#c2c2c2",
        food: "#e66916"
    },
    grid: 20
}

export default config
export { version, checkVersion }