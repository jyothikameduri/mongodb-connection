const mongoose = require('mongoose');
const chat = require('./models/chats.js');

main()
.then(()=>{
    console.log("connection successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats = [
    {
        from:'jyo',
        to:'abhi',
        msg:'vanakkam',
        created_at:new Date(),
    },
    {
        from:'karthi',
        to:'chinnu',
        msg:'call me again',
        created_at:new Date(),
    },
    {
        from:'abhi',
        to:'vysh',
        msg:'i will teach u a lesson',
        created_at:new Date(),
    },
    {
        from:'vysh',
        to:'sana',
        msg:'yaya ! i know your next move',
        created_at:new Date(),
    },
]

chat.insertMany(allchats)
  .then(() => {
    console.log("Chats inserted successfully");
  })
  .catch(err => {
    console.error("Error inserting chats:", err);
  });
