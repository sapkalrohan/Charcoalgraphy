const uuid = require('uuid/v4')
const tablename = 'drawings'
const getTableData = (req, res, db) => {
  db.select('*')
    .from(tablename)
    .then(items => {
      if (items.length) {
        res.json(items)
      } else {
        res.json({ dataExists: 'false' })
      }
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }))
}

const postTableData = (req, res, db) => {
  const { name, filename, desc, iscontract } = req.body
  const date = new Date()
  const id = uuid()
  db(tablename)
    .insert({ id, name, filename, desc, iscontract, date })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => {
      res.status(400).json({ dbError: err })
    })
}

const putTableData = (req, res, db) => {
  const { id, first, last, email, phone, location, hobby } = req.body
  db(tablename)
    .where({ id })
    .update({ first, last, email, phone, location, hobby })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }))
}

const deleteTableData = (req, res, db) => {
  const { id } = req.body
  db('testtable1')
    .where({ id })
    .del()
    .then(() => {
      res.json({ delete: 'true' })
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }))
}

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData
}
