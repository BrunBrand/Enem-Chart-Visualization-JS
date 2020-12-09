import Chart from 'chart.js';
import { index } from 'd3';
import { type } from 'os';
    
const getData = async () => {
    const response = await fetch('./data/DataEnem.csv');
    const data = await response.text();
    //console.log(data);

    var i = 0;
    var counter = 0;

     const table = data.split('\n').slice(1);
     table.forEach((row, index) => {
        const columns = row.split(',');
        const year = columns[0];
        xlabels.push(year);
        const sgUF = columns[2];
        const numMunicipio = columns[4];
        const nomeEscola = columns[6]; //NO_ESCOLA_EDUCACENSO
        labelEscola.push(nomeEscola);
        const numTaxaAprova = columns[23]; // NU_TAXA_APROV
        ytaxaAprov.push(numTaxaAprova);
        const numTaxaReprov = columns[24]; // NU_TAXA_REPROV
        const numTaxaAbando = columns[25]; // NU_TAXA_ANADONO
        /*console.log(year, sgUF, numMunicipio,
        nomeEscola, numTaxaAprova, numTaxaReprov, numTaxaAbando);*/
      
        console.log(xlabels[counter] + " and " + xlabels[counter - 1])
        if(xlabels[counter] == xlabels[counter - 1]){
            //console.log("Before sum " + ytaxaAprovUnique[i])
            ytaxaAprovUnique[i] += parseInt(ytaxaAprov[counter]);
            console.log("After SUM " + ytaxaAprovUnique[i])
            //console.log(ytaxaAprovUnique);
        } else {
            i++;
            ytaxaAprovUnique[i] += ytaxaAprov[i];
        }
        counter++;
     })

        labelEscolaUnique = labelEscola.filter((value, index, self) => {
            return self.indexOf(value) === index;
        })

        /*xlabelsUnique = xlabels.filter((value, index, self) => {
            if(self.indexOf(value) === index){
                return ytaxaAprovUnique[index] += ytaxaAprov[index]/ labelEscolaUnique.length + 1
            }
        //return self.indexOf(value) === index;
    });*/

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

var labelEscola = [];
var labelEscolaUnique = [];

const ytaxaAprov = [];

let label = "Aprovador por ano";

const drawChart = async () => {
    await getData();
    
    var ctx = document.getElementById('chart');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xlabelsOrdered,
            datasets: [{
                label: `${label}`,
                data: ytaxaAprov,
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