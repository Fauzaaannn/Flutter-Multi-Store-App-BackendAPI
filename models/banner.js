const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    }
});

const Banner = mongoose.model("Banner", bannerSchema); // mongoose will pluralize this to "banners" as the collection name

module.exports = Banner;