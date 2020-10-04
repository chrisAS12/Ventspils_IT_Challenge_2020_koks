Chart.defaults.global.defaultFontFamily = 'Helvetica';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';
Chart.defaults.global.responsive = true;
Chart.defaults.global.maintainAspectRatio = false;

let ctx = document.getElementById("chart").getContext('2d');


var simulationState = 0; // If the simulation state is 0 then simulation
                         // is paused, if it's 1 then it's going.


var i = 1;
var dayArray = new Array();

function addOneLabel() {
    console.log(dayArray.length);
    dayArray[dayArray.length] = 'Day ' + (dayArray.length);
    treeChart.update();
    addDataToLabels(treeChart);
}

function calculateTotalNumberOfTrees(){
    trees = birch + pineTree + spruce;
}

function addDataToLabels(chart) {
    noNegativesCheck();
    calculateTotalNumberOfTrees();
    chart.data.datasets[0].data.push(birch); // Birch label
    chart.data.datasets[1].data.push(pineTree); // pineTree label
    chart.data.datasets[2].data.push(spruce); // Spruce label
    chart.data.datasets[3].data.push(stumps); // Stumps label
    chart.update();
}

var treeChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dayArray,
        datasets: [{
                label: 'Birch',
                data: [

                ],
                backgroundColor: 'darkwhite',
                borderradius: 1,
                borderColor: '#777',
                hoverBorderradius: 3,
                hoverBorderColor: '#ffffff'
            },
            {
                label: 'Pine tree',
                data: [

                ],
                backgroundColor: '#654321',
                borderradius: 1,
                borderColor: '#777',
                hoverBorderradius: 3,
                hoverBorderColor: '#ffffff'
            },
            {
                label: 'Spruce',
                data: [

                ],
                backgroundColor: 'darkgreen',
                borderradius: 1,
                borderColor: '#777',
                hoverBorderradius: 3,
                hoverBorderColor: '#ffffff'
            },
            {
                label: 'Stumps',
                data: [

                ],
                backgroundColor: 'gray',
                borderradius: 1,
                borderColor: '#777',
                hoverBorderradius: 3,
                hoverBorderColor: '#ffffff'
            }

        ]
    },
    options: {
        title: {
            display: true,
            text: 'Ventspils ITC simulācija',
            fontSize: 25,
            fontColor: '#FBEEC1'
        },
        legend: {
            labels: {
                fontColor: 'white'
            }
        },
        scales: {
            xAxes: [{
                stacked: true,
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 20
                }
            }],
            yAxes: [{
                stacked: true
            }]
        },
    }
});


var area = 0;
var trees = 0;

var birch = 0;
var pineTree = 0;
var spruce = 0;
var stumps = 0;


function newParameters() {
    while (dayArray.length > 0) {
        treeChart.data.datasets[0].data.pop();
        treeChart.data.datasets[1].data.pop();
        treeChart.data.datasets[2].data.pop();
        treeChart.data.datasets[3].data.pop();
        dayArray.pop();
    }
    treeChart.update();

    area = Math.round(Math.PI * Math.pow(radius, 2));
    console.log("Area: " + area);

    trees = Math.round((area * treesPerSquareMeter) * 100000);
    console.log("Trees: " + trees);


    let maxPercentage = parseInt(pineTreePrecentage) + parseInt(birchPercentage) + parseInt(sprucePercentage);
    console.log(maxPercentage);
    if (maxPercentage == 0) {
        maxPercentage = 1;
    }

    stumps = 0;
    pineTree = Math.floor((pineTreePrecentage / maxPercentage) * trees);
    birch = Math.floor((birchPercentage / maxPercentage) * trees);
    spruce = Math.floor((sprucePercentage / maxPercentage) * trees);
    calculateTotalNumberOfTrees();
    oldTreeCount = trees;
    console.log(pineTree);
    console.log(birch);
    console.log(spruce);
    console.log("Now trees: " + trees);

    simulateADay();

}


// Trees are usually made from birch, spruce and pine tree, so I'll use them all.
function paperCalculation() {
    let cutDownTrees = Math.floor((Math.random() * (maxPaperPerDay-minPaperPerDay) + minPaperPerDay)) * 24;
    console.log(cutDownTrees);
    if(birch > 0 && pineTree > 0 && spruce > 0){
        let howManyTreesToCut = chanceDivision(cutDownTrees, 3);
        birch -= howManyTreesToCut[0];
        pineTree -= howManyTreesToCut[1];
        spruce -= howManyTreesToCut[2];
    }
    else if(birch > 0 && pineTree > 0){
        let howManyTreesToCut = chanceDivision(cutDownTrees, 2);
        birch -= howManyTreesToCut[0];
        pineTree -= howManyTreesToCut[1];
    } 
    else if (birch > 0 && spruce > 0){
        let howManyTreesToCut = chanceDivision(cutDownTrees, 2);
        birch -= howManyTreesToCut[0];
        spruce -= howManyTreesToCut[1];
    } 
    else if (spruce > 0 && pineTree > 0){
        let howManyTreesToCut = chanceDivision(cutDownTrees, 2);
        spruce -= howManyTreesToCut[0];
        pineTree -= howManyTreesToCut[1];
    }
    else if(spruce > 0){
        spruce -= cutDownTrees;
    }
    else if(birch > 0){
        birch -= cutDownTrees;
    }
    else if(pineTree > 0){
        pineTree -= cutDownTrees;
    }

}
 // Doesn't allow values to go into negatives, if something goes wrong.
function noNegativesCheck() {
    if (birch < 0) {
        birch = 0;
    }
    if (pineTree < 0) {
        pineTree = 0;
    }
    if (spruce < 0) {
        spruce = 0;
    }
    if (stumps < 0){
        stumps = 0;
    }
}

// CAN ADD A SLIDER WHICH CORRECTS HOW FAST THE SIMULATIONS SIMULATES!
var simulationInterval = setInterval(simulateADay, 0);
clearInterval(simulationInterval);


function startSimulation(){
    if(simulationState == 0) {
        simulationState = 1;
        buttonTextToStop();
        disableFixedSliders(true);
        if(matchOldFixedValuesWithNewOnes()){
            newParameters();
        }
        simulationInterval = setInterval(simulateADay, 50);
    }
    else{
        simulationState = 0;
        buttonTextToStart();
        disableFixedSliders(false);
        clearInterval(simulationInterval);
    }
}


let oldTreeCount = trees;
function treesToStumps(){
    possibleStumps = trees - oldTreeCount;
    if(possibleStumps < 0 ){
        stumps += Math.abs(possibleStumps);
    }
    oldTreeCount = trees;
}

function simulateADay() {

    if (area == 0 && trees == 0) {
        newParameters();
    }
    if (dayArray.length > 0) {
        paperCalculation();
    }
    treesToStumps();
    addOneLabel();
}

// Divides how many of each of kind of tree gets cut down in the certain type
// of simulation.

function chanceDivision(maxNumber, count) {
    var division = [];
    var currentSum = 0;
    for(var i=0; i<count; i++) {
        division.push(Math.random());
        currentSum += division[i];
    }
    for(var i=0; i<division.length; i++) {
        division[i] = Math.round(division[i] / currentSum * maxNumber);
    }
    return division;
}


// http://www.conservatree.org/learn/EnviroIssues/TreeStats.shtml#:~:text=He%20calculated%20that%2C%20based%20on,chemical%20(freesheet)%20pulping%20process