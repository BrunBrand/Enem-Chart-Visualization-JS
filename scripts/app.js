const CSVToJSON = require("csvtojson");
const FileSystem = require("fs");
const d3 = require("../scripts/d3js/d3.js");

CSVToJSON().fromFile("./data/DataEnem.csv").then( source => {
    console.log(source);
})

// import CSVToJSON from "../node_modules/csvtojson";
// import FileSystem from "../node_modules/";

const canvas = d3.select(".canvas")

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
    })