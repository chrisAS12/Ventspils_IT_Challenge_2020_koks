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
    chart.data.datasets[0].data.push(Math.floor(birch)); // Birch label
    chart.data.datasets[1].data.push(Math.floor(pineTree)); // pineTree label
    chart.data.datasets[2].data.push(Math.floor(spruce)); // Spruce label
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
            }

        ]
    },
    options: {
        title: {
            display: true,
            text: 'Trees',
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

function clearGraph(){
    while (dayArray.length > 0) {
        treeChart.data.datasets[0].data.pop();
        treeChart.data.datasets[1].data.pop();
        treeChart.data.datasets[2].data.pop();
        dayArray.pop();
    }
    treeChart.update();
}


function resetSimulation(){
    simulationState = 1;
    startStopSimulation();
    resetButtonState(false);
    clearGraph();
    newParameters(false);
}


// This function runs only once, at the start of the simulation, so we can get the start parameters.
function newParameters(started) {
  
    clearGraph();

    area = Math.round(Math.PI * Math.pow(radius, 2));

    trees = Math.round((area * treesPerSquareMeter) * 100000);

    let percentages = getPercentages();

    stumps = 0;
    pineTree = Math.floor(percentages[0] * trees);
    birch = Math.floor(percentages[1] * trees);
    spruce = Math.floor(percentages[2] * trees);
    calculateTotalNumberOfTrees();
    oldTreeCount = trees;
    if(started == true){
      simulateADay();
    }

}


// Trees are usually made from birch, spruce and pine tree, so I'll use them all.
function paperCalculation() {
    let cutDownTrees = Math.floor((Math.random() *
         (maxPaperPerDay-minPaperPerDay) + minPaperPerDay)) * 24;
    removeAllTreeTypes(cutDownTrees);
}

// This functions lets us evenly remove all trees. 
function removeAllTreeTypes(cutDownTrees){
    if(birch > 0 && pineTree > 0 && spruce > 0){
        let howManyTreesToCut = chanceDivision(cutDownTrees, 3);
        console.log(howManyTreesToCut[0] + " " + howManyTreesToCut[1] + " " + howManyTreesToCut[2]);
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

// Creates the interval element, which is cleared, so we can use it throughout our
// application.

var simulationInterval = setInterval(simulateADay, 0);
clearInterval(simulationInterval);

// Defines how fast our simulation is.
var simulationSpeed = 50;

// If the simulation state is 1 then simulation is not running.
function startStopSimulation(){
    if(simulationState == 0) {
        simulationState = 1;
        buttonTextToStop();
        disableFixedSliders(true);
        if(matchOldFixedValuesWithNewOnes()){
            newParameters(true);
        }
        simulationInterval = setInterval(simulateADay, simulationSpeed);
        resetButtonState(true);
    }
    else{
        simulationState = 0;
        buttonTextToStart();
        disableFixedSliders(false);
        clearInterval(simulationInterval);
        if(stumps > 0){
            resetButtonState(true);
        }
        else{
            resetButtonState(false);
        }
    }
}



// Calculates how many trees to cut down for daily energy usage.
function energyCalculation(){
    let energyToday = (Math.random() * 
        (maxPetajouleEnergyPerDay-minPetajouleEnergyPerDay) + minPetajouleEnergyPerDay);
    // Divide by 0.0000036 to get MWh
    energyMWhFormatToday = (energyToday /0.0000036);
    // Times the trees per 1 MWh
    treesTodayForEnergy = energyMWhFormatToday * 1.75;
    removeAllTreeTypes(treesTodayForEnergy);
}

function woodfarmCalculation(){
    let woodfarmHectares = (Math.random() * 
        (maxWoodfarmsHectaresPerDay-minWoodfarmsHectaresPerDay) + minWoodfarmsHectaresPerDay);
    woodfarmTreesPerDay = (woodfarmHectares * 10000) * treesPerSquareMeter;
    removeAllTreeTypes(woodfarmTreesPerDay);
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
        newParameters(true);
    }
    if (dayArray.length > 0) {
        paperCalculation();
        energyCalculation();
        woodfarmCalculation();
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