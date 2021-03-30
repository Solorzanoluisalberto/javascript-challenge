// from data.js
var tableData = data;

// YOUR CODE HERE!

function DateExist(fecha) {
    var fechaf = fecha.split("/");
    var m = fechaf[0];
    var d = fechaf[1];
    var y = fechaf[2];
    return (m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= 31 && y.length == 4);
}

// console.log(date1)
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
    var DateInput = document.getElementById("datetime").value;
    console.log(DateInput)
    console.log(DateInput.length)
    if (DateInput.length == 0) {
        console.log("sin filtro la tabla");
        Print_(tableData, DateInput);
    } else {
        var sigo = DateExist(DateInput);
        //    console.log(sigo);
        switch(sigo) {
        case true:
            console.log(`si es fecha ${DateInput} `);
            Print_(tableData, DateInput)
            break;
        default:
          // code block 
          console.log(`no es una fecha: ${DateInput} `);
          break;
      }
    }
});


// function Print_(tableData1, startDate){
    
// var resultProductData = tableData1.filter(a => {
//     var date = new Date(a.datetime).toLocaleDateString("en-US");
//         console.log(date);
//         console.log(new Date(startDate).toLocaleDateString("en-US"));
//       return (date == new Date(startDate).toLocaleDateString("en-US"));
//     });
    
//     console.log(resultProductData);
// }

function Print_(tableData1, startDate){
    
var resultProductData =  tableData1.filter(a => {
    var date = new Date(a.datetime).toLocaleDateString("en-US");
        // console.log(date);
        // console.log(new Date(startDate).toLocaleDateString("en-US"));
        if (startDate.length != 0) {
            return (date == new Date(startDate).toLocaleDateString("en-US"));
        } else {
            return (date == date);
        }
    });
    console.log(resultProductData);
}


// d3.select("datetime").setAttribute('value','My default value');