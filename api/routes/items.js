const express = require('express')
const router = express.Router()
const Item = require('../models/item')

//Gettin all items
router.get('/', async (req, res) => {
    try{
        const items = await Item.find()
        res.json(items)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Gettin one item
router.get('/:id', getItem, (req, res) => {
    res.json(res.item)
})
//Create one item
router.post('/', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        category: req.body.category
    })
    try{
        const newItem = await item.save()
        res.status(201).json(newItem)
    } catch(err) { 
        res.status(400).json({ message: err.message })
    }
})
//Updating one item
router.patch('/:id', getItem, async (req, res) => {
    if (req.body.name != null){
        res.item.name = req.body.name
    }
    if (req.body.quantity != null){
        res.item.quantity = req.body.quantity
    }
    if (req.body.price != null){
        res.item.price = req.body.price
    }
    if (req.body.category != null){
        res.item.category = req.body.category
    }
    try{
        const updatedItem = await res.item.save()
        res.json(updatedItem)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})
//Deleteing one item
router.delete('/:id', async (req, res) => {
    let item
    try{
        item = await Item.findById(req.params.id)
        if (item == null){
            return res.status(404).json({ message: "Cannot find Item" })
        }
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }

    try{
        const result = await Item.deleteOne(item);

    if (result.deletedCount === 1) {
      res.status(200).json(result);
    } else {
        res.status(400).json({ message: "No documents matched the query. Deleted 0 documents." }); 
    }
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

async function getItem(req, res, next) {
    let item
    try{
        item = await Item.findById(req.params.id)
        if (item == null){
            return res.status(404).json({ message: "Cannot find Item" })
        }
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }

    res.item = item
    next()
}

module.exports = router