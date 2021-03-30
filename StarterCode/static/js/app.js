// from data.js
var tableData = data;

// YOUR CODE HERE!

var date_ = "1/1/2010";

var date1 = DateExist(date_);

function DateExist(fecha) {
    var fechaf = fecha.split("/");
    var m = fechaf[0];
    var d = fechaf[1];
    var y = fechaf[2];
    return (m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= 31 && y.length == 4);
}

console.log(date1)


// id=ufo-table class = table table-striped (table)
// class = form-control, id= datetime (button)
// id: filter-btn class: btn btn-default
// var table_ = d3.select('#ufo-table');
// // var boton = d3.select('luis');
// d3.select('luis').value="01/02/2021";
// var boton = document.getElementById('luis');
// boton.text = "yo soy"
// console.log(boton);
// var clase = table_.attr("class");
// console.log(clase);

var Boton_Filter = d3.select(".btn-default");

Boton_Filter.on("click", function() {
    // Select the current count
    console.log("hizo click");
    var DateInput = document.getElementById("luis").value;
    console.log(DateInput)
});
  


// d3.select("datetime").setAttribute('value','My default value');