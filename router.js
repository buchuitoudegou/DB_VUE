const express = require('express')
const router = express.Router()
// const model = require('./model')

router.get('*', (req, res, next)=>{
	//console.log(req.path)
	let path = req.path.substring(1, req.path.length - 1)
	console.log(req.query)
})

module.exports = router