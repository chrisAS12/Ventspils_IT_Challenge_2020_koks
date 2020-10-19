var radius = 20;
var treesPerSquareMeter = 0.5;

var birchPercentage = 50;
var pineTreePrecentage = 50;
var sprucePercentage = 50;

var paperPerDay = 0;

var startStopButton = document.getElementById('startStopButton');

var birchPercentageSlider = document.getElementById('birchPercentage');
birchPercentageSlider.oninput = function () {
    birchPercentage = this.value;
    console.log(birchPercentage);
}

var pineTreePrecentageSlider = document.getElementById('pineTreePrecentage');
pineTreePrecentageSlider.oninput = function () {
    pineTreePrecentage = this.value;
    console.log(pineTreePrecentage);
}

var sprucePercentageSlider = document.getElementById('sprucePercentage');
sprucePercentageSlider.oninput = function () {
    sprucePercentage = this.value;
    console.log(sprucePercentage);
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
    startStopButton.innerHTML = "STOP SIMULATION";
}
function buttonTextToStart(){
    startStopButton.innerHTML = "START SIMULATION";
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

