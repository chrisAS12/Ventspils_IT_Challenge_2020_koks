Chart.defaults.global.defaultFontFamily = 'Helvetica';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';
Chart.defaults.global.responsive = true;
Chart.defaults.global.maintainAspectRatio = false;

let ctx = document.getElementById("chart").getContext('2d');

var i = 1;
var dayArray = new Array();

function addOneLabel() {
    console.log(dayArray.length);
    dayArray[dayArray.length] = 'Day ' + (dayArray.length);
    treeChart.update();
    addDataToLabels(treeChart);
}

function addDataToLabels(chart) {
    noNegativesCheck();
    chart.data.datasets[0].data.push(birch); // Birch Label
    chart.data.datasets[1].data.push(oak); // Oak Label
    chart.data.datasets[2].data.push(spruce); // Spruce Label
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
var oak = 0;
var spruce = 0;

function newParameters() {
    while (dayArray.length > 0) {
        treeChart.data.datasets[0].data.pop();
        treeChart.data.datasets[1].data.pop();
        treeChart.data.datasets[2].data.pop();
        dayArray.pop();
    }
    treeChart.datasets
    treeChart.update();

    area = Math.round(Math.PI * Math.pow(radius, 2));
    console.log("Area: " + area);

    trees = Math.round(area * treesPerSquareMeter);
    console.log("Trees: " + trees);


    let maxChance = parseInt(pineTreePrecentage) + parseInt(birchPercentage) + parseInt(spruceChance);
    console.log(maxChance);
    if (maxChance == 0) {
        maxChance = 1;
    }

    oak = Math.floor((pineTreePrecentage / maxChance) * trees);
    birch = Math.floor((birchPercentage / maxChance) * trees);
    spruce = Math.floor((spruceChance / maxChance) * trees);
    trees = oak + birch + spruce;

    console.log(oak);
    console.log(birch);
    console.log(spruce);
    console.log("Now trees: " + trees);

    simulateADay();

}

function paperCalculation() {
    let cutDownTrees = paperPerDay * 24;

    birch = birch - (cutDownTrees / 2);
    spruce = spruce - (cutDownTrees / 2);

}

function noNegativesCheck() {
    if (birch < 0) {
        birch = 0;
    }
    if (oak < 0) {
        oak = 0;
    }
    if (spruce < 0) {
        spruce = 0;
    }
}

function simulateADay() {
    if (area == 0 || trees == 0) {
        newParameters();
    }
    if (dayArray.length > 0) {
        paperCalculation();
    }
    addOneLabel();
}

// https://www.quora.com/How-many-trees-are-cut-down-a-day-for-paper for paper - I'm gonna use 50% of spruce and 50% of birch for each ton of paper.