var express = require('express');
var router = express.Router();
var database = require('../lib/DBConnecter.js');
var summary = require('../lib/summary.js')
var showData = require('../lib/showData.js')
const axios = require('axios');


router.post('/', function(req, res, next) {

	let expression = req.body.expression;
	const derName = req.body.derName;
	const uid = req.body.uid;
	expression = expression.replace(/`/gi, "");
	console.log("expression = " + expression)
	console.log("derName = " + derName)
	const db = new database(uid);
	db.load('tmp', function(data) {
		var df = new DataFrame(data);
		seqNames = df.columns;
		var variable = new Array();
		seqNames.forEach(function(element) {
			if (expression.match(element)) {
				variable.push(element);
			}
		});
		console.log("variabe = " + variable)
		var data = new Array();
		variable.forEach(function(element) {
			data.push(df.get(element).to_json({
				orient: "records"
			}))
		})
		var derData = new Array();
		for (let i = 0; i < df.length; i++) {
			var tempExp = expression;
			variable.forEach(function(element, index) {
				tempExp = tempExp.replace(element, data[index][i])
			})
			//console.log()
			derData.push(parseFloat(eval(tempExp).toFixed(4)));
		}
		var ds = new Series(derData);
		df = df.set(derName, ds);
		db.save(df.to_json({
			orient: 'records'
		}))
		var sumData = summary(df);
		var data2 = showData(df)

		res.json({
			data: sumData,
			data2: data2,
			variable: df.columns
		})

	});
});

module.exports = router;
