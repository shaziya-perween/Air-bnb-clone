const mongoose = require('mongoose');
const Listing=require("../models/listing.js");
const initData= require("./data.js");

main()
.then((res)=>{
    console.log("connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Airbnb');

}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
      ...obj,
      owner:'6899e0e2f20e088f6b57c1db',
      category:"Hotels"
}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();
