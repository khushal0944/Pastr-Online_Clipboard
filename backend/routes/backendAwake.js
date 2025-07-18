function backendAwake(req, res) {
    const currDate = new Date()
    console.log("Backend is Awake at", currDate.toLocaleString())
    return res.json("Backend is Awake Now.")
}
module.exports = backendAwake