const app = require("./config/app.config")

const { port } = require('./config/environment.config');

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});