const mongoose = require('mongoose');

const setupDb = () => mongoose.connect(process.env.RFS_CNST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

module.exports = { setupDb };