var minPaperPerDay = 0;
var maxPaperPerDay = 0;


$( function() {
    $( "#slider-range-paperPerDay" ).slider({
      range: true,
      min: 0,
      max: 1500,
      values: [ 0, 0 ],
      slide: function( event, ui ) {
        $( "#amount-paperPerDay" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] + " TONS");
        minPaperPerDay = ui.values[0];
        maxPaperPerDay = ui.values[1];
        console.log(minPaperPerDay + " " + maxPaperPerDay);
      }
    });
    $( "#amount-paperPerDay" ).val( $( "#slider-range-paperPerDay" ).slider( "values", 0 ) +
      " - " + $( "#slider-range-paperPerDay" ).slider( "values", 1 ) + " TONS");
  } );