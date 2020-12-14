import Chart from 'chart.js';
import { index } from 'd3';
import { type } from 'os';
    
const getData = async () => {
    const response = await fetch('./data/DataEnem.csv');
    const data = await response.text();
    //console.log(data);

    var i = 0;
    var counter = 0;
    contarDenominador = 0;

     const table = data.split('\n').slice(1);
     table.forEach((row, index) => {
        const columns = row.split(',');
        const year = columns[0];
        if (year == "end"){
            xlabels.push(year);
            xlabels.pop(year)
        } else {
            xlabels.push(year);
        }
        
        const sgUF = columns[2];
        const numMunicipio = columns[4];
        const nomeEscola = columns[6]; //NO_ESCOLA_EDUCACENSO
        labelEscola.push(nomeEscola);
        const numTaxaAprova = columns[23]; // NU_TAXA_APROV
        ytaxaAprov.push(numTaxaAprova);
        //console.log("Taxa Aprov " + ytaxaAprov)
        const numTaxaReprov = columns[24]; // NU_TAXA_REPROV
        const numTaxaAbando = columns[25]; // NU_TAXA_ANADONO
        /*console.log(year, sgUF, numMunicipio,
        nomeEscola, numTaxaAprova, numTaxaReprov, numTaxaAbando);*/



        console.log(xlabels[counter] + " and " + xlabels[counter - 1])
        if(xlabels[counter] == xlabels[counter - 1]){ //caso o label atual seja igual ao anterior (mesmo ano)
            //console.log("Before sum " + ytaxaAprovUnique[i])
            contarDenominador++;
            ytaxaAprovUnique[i] += parseFloat(ytaxaAprov[counter]);
            console.log("After SUM " + ytaxaAprovUnique[i])
            //console.log(ytaxaAprovUnique);
        } else if(xlabels[counter - 1] == undefined){ // caso label anterior seja undefined (começo do array)
            contarDenominador++;
            console.log("Time runned")
            ytaxaAprovUnique[i] = parseFloat(ytaxaAprov[counter]);
            console.log("After SUM " + ytaxaAprovUnique[i])
            //console.log("Undefined Value? " + ytaxaAprovUnique[i])
        } else if (xlabels[counter] != xlabels[counter - 1]){ // caso o label atual seja diferente do label anterior (inicialia o proximo array)
            ytaxaAprovDivided[i] = Math.floor(ytaxaAprovUnique[i]/contarDenominador);
            console.log("YTAXA no valor", ytaxaAprovUnique[i],
            "dividido por",contarDenominador, "resulta em", ytaxaAprovDivided[i])
            i++;
            contarDenominador = 0;
            ytaxaAprovUnique[i] = parseFloat(ytaxaAprov[counter]);
            contarDenominador++;
            console.log("After SUM " + ytaxaAprovUnique[i])
            
        }
        //console.log("Valor Counter " + ytaxaAprov[counter])
        counter++;
     })
        
        labelEscolaUnique = labelEscola.filter((value, index, self) => {
            return self.indexOf(value) === index;
        })

    xlabelsUnique = xlabels.filter((value, index, self) =>{
        return self.indexOf(value) === index;
    })


    
    xlabelsOrdered = xlabelsUnique.sort()
    //console.log(xlabelsOrdered);
    //console.log(ytaxaAprovUnique);
    //console.log(typeof ytaxaAprovUnique);
}

const xlabels = [];
var xlabelsUnique = [];
var xlabelsOrdered = [];

var ytaxaAprovUnique = [];
var ytaxaAprovDivided = [];
var contarDenominador;

var labelEscola = [];
var labelEscolaUnique = [];

const ytaxaAprov = [];

let label = "Aprovador por ano";

const drawChart = async () => {
    await getData();
   
    //console.log(typeof(parseInt(ytaxaAprovUnique)))
    
    var ctx = document.getElementById('chart');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xlabelsOrdered,
            datasets: [{
                label: `${label}`,
                data: ytaxaAprovDivided,
                backgroundColor: 
                    'rgba(137, 221, 151, 0.7)',
                borderColor: 
                    'rgba(137, 221, 151, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}




export {getData, drawChart};