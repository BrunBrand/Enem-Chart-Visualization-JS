// const {format} = require('@fast-csv/format');
// const d3 = require('d3');
// const csv = require('fast-csv/parse');
 const fs = require("fs");
// var path = require("path");

/*
CSVToJSON().fromFile("./data/DataEnem.csv", encoding='utf-8')
        .then(source => {
            console.log(source);
        });*/

// const stream = fs.createReadStream("./data/DataEnem.csv");

// const streamCsv = csv.format({
//     headers: true,
//     delimiter: ';',
//     quote: '"'
// }).parse().on('data', data => console.log(data));

// stream.pipe("DataEnem.json",streamCsv);

// const fsArchive = fs.appendFile('DataEnem.json','erer' , (err) => {
//     if(err) throw err;
    
//     console.log('saved');
// })

// if(path.isAbsolute(fsArchive)){
//     console.log(path);
// }



/*
const getData = () => {
    fs.readFile('./data/DataEnem.csv', 'utf8', (err, data) => {
        console.log(data)
        if(err) console.log(err);
    })
}*/


