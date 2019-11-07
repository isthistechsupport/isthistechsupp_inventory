const low = require('lowdb');
const lodashId = require('lodash-id');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db._.mixin(lodashId);

// Set some defaults (required if your JSON file is empty)
db.defaults({
  items: [],
  user: {},
  counter: 0
});

// Add to items
// db.get('items')
//   .push({ id: 1, title: 'lowdb is awesome' })
//   .write();

// Set a user using Lodash shorthand syntax
// db.set('user.name', 'typicode').write();

// Increment count
//db.update('count', n => n + 1).write();

// More examples here: https://github.com/typicode/lowdb

module.exports = function(app) {
  app.get('/api/items/:id', (req, res) => {
    const { id } = req.params;

    try {
      const item = db
        .get('items')
        .getById(id)
        .value();
      console.log('Item?', id, item);
      res.json(item);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  app.patch('/api/items/:id', (req, res) => {
    const { id } = req.params;

    res.sendStatus(200);
  });

  app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;

    res.sendStatus(200);
  });

  app.get('/api/items', (req, res) => {
    try {
      const items = db.get('items').value();

      res.json(items);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  app.post('/api/items', (req, res) => {
    try {
      const { items } = req.body;

      db.set('items', items).write();

      res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });
};
