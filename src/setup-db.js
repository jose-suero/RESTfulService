const mongoose = require('mongoose');
console.log(process.env.RFS_CNST);
const setupDb = () => mongoose.connect(process.env.RFS_CNST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

module.exports = { setupDb };