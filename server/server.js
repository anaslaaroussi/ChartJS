


var express = require('express');
var app = express();
var fs = require("fs");
var xls = require('excel');

function convertToJSON(array) {
  var first = array[0].join()
  var headers = first.split(',');

  var jsonData = [];
  for ( var i = 1, length = array.length; i < length; i++ )
  {

    var myRow = array[i].join();
    var row = myRow.split(',');

    var data = {};
    for ( var x = 0; x < row.length; x++ )
    {
      data[headers[x]] = row[x];
    }
    jsonData.push(data);

  }
  return jsonData;
};

// Daily data 
xls('data.xlsx','1', function(err, data) {
  if(err) throw err;
  
  

app.get('/daily', function (req, res) {
list = []       
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

for(var i=0;i<convertToJSON(data).length;i++){
	//console.log(convertToJSON(data)[i])
	list.push(convertToJSON(data)[i])
}



//console.log(convertToJSON(data))
       res.end(JSON.stringify(list));
   	   	

})

});	


// hourly Data 

xls('data.xlsx','2', function(err, data) {
  if(err) throw err;
  
  

app.get('/hourly', function (req, res) {
list = []       
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

for(var i=0;i<convertToJSON(data).length;i++){
	//console.log(convertToJSON(data)[i])
	list.push(convertToJSON(data)[i])
}



//console.log(convertToJSON(data))
       res.end(JSON.stringify(list));
   	   	

})

});	


//



var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})