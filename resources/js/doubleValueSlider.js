var minPaperPerDay = 300;
var maxPaperPerDay = 500;


$(function () {
  $("#slider-range-paperPerDay").slider({
    range: true,
    min: 0,
    max: 1500,
    values: [300, 500], // Average Latvia's usage daily.
    slide: function (event, ui) {
      $("#amount-paperPerDay").val(ui.values[0] + " - " + ui.values[1] + " TONS");
      minPaperPerDay = ui.values[0];
      maxPaperPerDay = ui.values[1];
    }
  });
  $("#amount-paperPerDay").val($("#slider-range-paperPerDay").slider("values", 0) +
    " - " + $("#slider-range-paperPerDay").slider("values", 1) + " TONS");
});

var minPetajouleEnergyPerDay = 0.14;
var maxPetajouleEnergyPerDay = 0.2;
let divideToGetPetajoules = 1000;
$(function () {
  $("#slider-range-petajouleEnergyPerDay").slider({
    range: true,
    min: 0,
    max: 1000,
    values: [140, 200], // Average Latvia's usage daily. It is caluclated to be around 0.17 petajoules.
    slide: function (event, ui) {
      $("#amount-petajouleEnergyPerDay").val(ui.values[0]/divideToGetPetajoules + " - " + ui.values[1]/divideToGetPetajoules+ " PETAJOULES");
      minPetajouleEnergyPerDay = ui.values[0] / divideToGetPetajoules;
      maxPetajouleEnergyPerDay = ui.values[1] / divideToGetPetajoules;
    }
  });
  $("#amount-petajouleEnergyPerDay").val($("#slider-range-petajouleEnergyPerDay").slider("values", 0)/1000 +
    " - " + $("#slider-range-petajouleEnergyPerDay").slider("values", 1)/divideToGetPetajoules + " PETAJOULES");
});