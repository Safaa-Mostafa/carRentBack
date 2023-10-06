const PORT = process.env.PORT || 4000
const app = require("./app/src")
app.listen(PORT,()=>console.log(`http://localhost:${PORT}`))


