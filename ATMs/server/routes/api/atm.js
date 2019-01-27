const express = require('express')
const router = express.Router()
const Atm = require('../../models/atm')

router.get('/', (req, res) => {
  Atm
    .find()
    .sort({ date: -1 })
    .then(atm => res.json(atm))
    .catch(err => res.status(404).json({ error: "No atms found" }))
})

router.post('/data', (req, res) => {
  Atm.findOne({ id: req.body.id })
    .then(data => {
      if (data) {
        return res.status(400).json({ atm: 'Atm already existed'})
      } else {
        const newAtm = new Atm({
          id: req.body.id,
          counter: req.body.counter
        })
        newAtm.save()
          .then(data => {
            res.json(data)
          })
      }
    })
    .catch(err => res.json({ atm: "Error" }))
})

router.put('/data', (req, res) => {
  Atm.findOne({ id: req.body.id })
    .then(data => {
      if (data) {
        data.counter = req.body.counter
        data.save()
          .then(data => res.json(data))
          .catch(err => res.json({ error: "element wasn't saved" }))
      }
    })
    .catch(err => res.json({ error: "Error" }))
})

router.delete('/data/:id', (req, res) => {
  Atm.findOne({ id: req.params.id })
    .then(data => {
      data.remove()
        .then(data => res.json({ atm: "was deleted"}))
        .catch(err => res.json({ error: "atm is not deleted" }))
    })
    .catch(err => res.json({ error: "Error with getting data" }))
})

module.exports = router
