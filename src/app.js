 //const CSVToJSON = require("../node_modules/csvtojson/src/Converter.ts");
// const FileSystem = require("fs");
// const d3 = require("../node_modules/d3");
//import * as CSVToJSON from '../node_modules/csvtojson/bin/csvtojson.js'
//import * as CSVToJSON from '../node_modules/csvtojson/src/Converter.ts'

//const getCanvas = document.querySelector(".canvas");

// CSVToJSON.fromFile("./data/DataEnem.csv").then( source => {
//     console.log(source);
// })


// import CSVToJSON from "../node_modules/csvtojson";
// import FileSystem from "../node_modules/";

/*
const canvas = d3.select(getCanvas)

let dataArray = [
    {width: 25, height: 4, fill: "pink"},
    {width: 25, height: 14, fill: "purple"},
    {width: 25, height: 44, fill: "orange"},
    {width: 25, height: 124, fill: "green"},
    {width: 25, height: 12, fill: "grey"},
]

const svg = canvas.append("svg")
                .attr("width", "600")
                .attr("height", "600")
;
        

const rect = svg.selectAll("rect");

rect.data(dataArray)
    .enter().append("rect")
    .attr("width", "24")
    .attr("height", (d,i) =>{
        return d.height*3;
    })
    .attr("fill", (d) => {
        return d.fill;
    })
    .attr("x", (d, i) => {return i*35})
    .attr("y", (d,i) => {
        return 100 - (d.height*3);
    })*/

import Chart from 'chart.js';
    
const getData = async () => {
    const response = await fetch('./data/DataEnem.csv');
    const data = await response.text();
    console.log(data);

     const table = data.split('\n').slice(1);
     table.forEach(row => {
         const columns = row.split(';');
         const year = columns[0];
         xlabels.push(year);
         const sgUF = columns[2];
         const numMunicipio = columns[4];
         const nomeEscola = columns[6]; //NO_ESCOLA_EDUCACENSO
         const numTaxaAprova = columns[23]; // NU_TAXA_APROV
         ytaxaAprov.push(numTaxaAprova);
         const numTaxaReprov = columns[24]; // NU_TAXA_REPROV
         const numTaxaAbando = columns[25]; // NU_TAXA_ANADONO
         console.log(year, sgUF, numMunicipio,
            nomeEscola, numTaxaAprova, numTaxaReprov, numTaxaAbando);
     })
}

const xlabels = [];
const ytaxaAprov = [];

const drawChart = async () => {
    await getData();
    
    var ctx = document.getElementById('chart');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xlabels,
            datasets: [{
                label: 'Dados por Escola',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
    });
}




export {getData, drawChart};