var radius = 20;
var treesPerSquareMeter = 0.5;

var birchPercentage = 50;
var pineTreePrecentage = 50;
var sprucePercentage = 50;

var paperPerDay = 0;

var startStopButton = document.getElementById('startStopButton');
var resetButton = document.getElementById('resetButton');

var birchPercentageSlider = document.getElementById('birchPercentage');
birchPercentageSlider.oninput = function () {
    birchPercentage = this.value;
    changeSliderPercentageValue();
}

var pineTreePrecentageSlider = document.getElementById('pineTreePrecentage');
pineTreePrecentageSlider.oninput = function () {
    pineTreePrecentage = this.value;
    changeSliderPercentageValue();
}

var sprucePercentageSlider = document.getElementById('sprucePercentage');
sprucePercentageSlider.oninput = function () {
    sprucePercentage = this.value;
    changeSliderPercentageValue();
}

var radiusValue = document.getElementById('forestRadiusValue');
var radiusSlider = document.getElementById('forestRadius');
radiusSlider.oninput = function () {
    radius = this.value;
    radiusValue.innerHTML = "VALUE: " + radius + " (KM)";
}

var treesPerSquareMeterValue = document.getElementById('treesPerSquareMeterValue');
var treesPerSquareMeterSlider = document.getElementById('treesPerSquareMeter');
treesPerSquareMeterSlider.oninput = function () {
    treesPerSquareMeter = this.value / 100;
    treesPerSquareMeterValue.innerHTML = "VALUE: " + treesPerSquareMeter + " (N/M^2)";
}

var fixedSliderArray = [birchPercentageSlider, pineTreePrecentageSlider,
    sprucePercentageSlider, radiusSlider, treesPerSquareMeterSlider ];


var percentageValue = document.getElementById("percentageValue");
function changeSliderPercentageValue(){
    let percentages = getPercentages();
    percentageValue.innerHTML = "SPRUCE: " + percentageRounding(percentages[2]) + "%" + "<br>" +
        "PINE: " + percentageRounding(percentages[0]) + "%" + "<br>" + 
        "BIRCH: " + percentageRounding(percentages[1]) + "%" + "<br>";
}

function percentageRounding(percentage){
    return (Math.round(percentage * 1000)/10);
}
function loadScript(){
    resetButtonState(false);
    changeSliderPercentageValue();
}

// State defines if the button is active
function resetButtonState(state){
    if(state == true){
        resetButton.style.display = 'inline-block';
    }
    else{
        resetButton.style.display = 'none';
    }
}

// Returns percentage in such array: [0] - pine tree, [1] - birch, [2] - spruce
function getPercentages(){
    let maxPercentage = parseInt(pineTreePrecentage) + 
    parseInt(birchPercentage) + parseInt(sprucePercentage);
    if (maxPercentage == 0) {
        maxPercentage = 1;
    }

    var percentages = [(pineTreePrecentage / maxPercentage),
        (birchPercentage / maxPercentage), (sprucePercentage / maxPercentage)];
    
    return percentages;
}

function disableFixedSliders(stateOfSliders){
   for(var b = 0; b < fixedSliderArray.length; b++){
       fixedSliderArray[b].disabled = stateOfSliders;
       if(stateOfSliders){
        fixedSliderArray[b].style.backgroundColor = 'black';
       }
       else{
        fixedSliderArray[b].style.backgroundColor = 'white';
       }
   }
}

function buttonTextToStop(){
    startStopButton.innerHTML = "STOP SIMULATION!";
}

function buttonTextToStart(){
    startStopButton.innerHTML = "START SIMULATION!";
}

let oldFixedVariables = [];
function matchOldFixedValuesWithNewOnes(){
    let currentFixedVariables =  [birchPercentage, pineTreePrecentage, sprucePercentage,
        radius, treesPerSquareMeter];
    for(var b = 0; b < currentFixedVariables.length; b++){
        if(!(oldFixedVariables[b] == currentFixedVariables[b])){
            oldFixedVariables = Array.from(currentFixedVariables);
            return true;
        }
    }
    return false;
    
}

