const version = localStorage.getItem("version") || "1.0.0"

const versionOK = async () => {
    const fetchedVersion = await fetch("/version").then(res => res.text())
    return fetchedVersion == version
}

const config = {
    resolution: {
        width: 500,
        height: 500
    },
    color: {
        background: "#EEE",
        snake: "#DDB38C",
        food: "#9F454B"
    },
    grid: 25
}

export default config
export { versionOK }