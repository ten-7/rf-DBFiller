const mongoose = require('mongoose');
const CHOSEN_DB = 'SDC';
mongoose.connect('mongodb://localhost:27017/' + CHOSEN_DB, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // console.log('MongoDB connection established!');
  db.items.drop();
});

/*
  drop `items` table on startup
*/

/*
  Mongoose schema and model
*/

const itemSchema = {
  count: Number
}

const Item = mongoose.model('Items', itemSchema);

/*
  Database CRUD queries
*/

const addItem = (data) => {
  const newItem = new Item(data);

  newItem.save((err, res) => {
    if (err){
      console.log(err);
      cb(error);
    } else {
      // console.log('Item saved successfully!');
    }
  })
}


const massSave = (n) => {
  for (let i = 0; i < n; i++){
    addItem({count: i});
  }
}

const nSeeds = 100000;


console.time(`massSave(${nSeeds})`);
massSave(nSeeds);
console.timeEnd(`massSave(${nSeeds})`);
