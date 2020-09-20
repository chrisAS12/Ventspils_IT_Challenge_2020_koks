var radius = 500;
var treesPerSquareMeter = 0.5;

var birchPercentage = 50;
var pineTreePrecentage = 50;
var spruceChance = 50;

var paperPerDay = 0;


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

var spruceChanceSlider = document.getElementById('spruceChance');
spruceChanceSlider.oninput = function () {
    spruceChance = this.value;
    console.log(spruceChance);
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

var paperPerDayValue = document.getElementById('paperPerDayValue');
var paperPerDaySlider = document.getElementById('paperPerDay');
paperPerDaySlider.oninput = function () {
    paperPerDay = this.value;
    paperPerDayValue.innerHTML = "VALUE: " + paperPerDay + " (TONS)";
    console.log(paperPerDay);
}