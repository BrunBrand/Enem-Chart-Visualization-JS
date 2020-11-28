//const CSVToJSON = require("csvtojson");
const d3 = require('d3');
const csv = require('fast-csv');
const fs = require("fs");
var path = require("path");

/*
CSVToJSON().fromFile("./data/DataEnem.csv", encoding='utf-8')
        .then(source => {
            console.log(source);
        });*/

const stream = fs.createReadStream("./data/DataEnem.csv");

const streamCsv = csv.parse().on('data', data => console.log(data));

//stream.pipe(streamCsv);

const fsArchive = fs.appendFile('DataEnem.txt','erer' , (err) => {
    if(err) throw err;
    console.log('saved');
})

if(path.isAbsolute(fsArchive)){
    console.log(path);
}

