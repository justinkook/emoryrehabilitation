var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var InsuranceSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true
        },
    }
)

var Insurance = mongoose.model("Insurance", InsuranceSchema);

module.exports = Insurance;