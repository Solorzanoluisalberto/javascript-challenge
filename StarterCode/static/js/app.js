// from data.js
var tableData = data;

// var tableData = [{
//     datetime: "1/1/2010",
//     city: "benton",
//     state: "ar",
//     country: "us",
//     shape: "circle",
//     durationMinutes: "5 mins.",
//     comments: "4 bright green circles high in the sky going in circles then one bright green light at my front door."
//   }
// ]

// YOUR CODE HERE!

function DateExist(fecha) {
    var fechaf = fecha.split("/");
    var m = fechaf[0];
    var d = fechaf[1];
    var y = fechaf[2];
    return (m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= 31 && y.length == 4);
}

var Boton_Filter = d3.select(".btn-default");

Boton_Filter.on("click", function() {
    // Select the current count
    console.log("hizo click");
    var DateInput = document.getElementById("datetime").value;
    console.log(DateInput)
    console.log(DateInput.length)
    if (DateInput.length == 0) { // date value empty
        console.log("sin filtro la tabla");
        Print_(DateInput);
    } else {
        var go_ = DateExist(DateInput); // valid date?
        //    console.log(go_);
        switch(go_) {
        case true:
            console.log(`si es fecha ${DateInput} `);
            Print_(DateInput)
            break;
        default:
          // code block 
          console.log(`no es una fecha: ${DateInput} `);
          break;
      }
    }
});

function Print_(UFO_Date){    
    console.log(UFO_Date);
    var UFO_sighting = tableData.filter(Filter_UFO_sighting, fechas= UFO_Date);
    console.log(UFO_sighting);
    
    let UFOTab = document.getElementById('ufo-table');
    let tbody_ = document.getElementById("ufo-table").tBodies[0]
    // 
    if (tbody_ != null) {
        console.log("exist <tr> in <tbody>");
        UFOTab.removeChild(tbody_);
		tbody_ = document.createElement('tbody')
        UFOTab.append(tbody_)
        // tbody_.Child.remove();
        // document.getElementById("ufo-table").tBodies[0].remove();
    }
    // $("#Your_Table tr>td").remove();
    console.log(tbody_);
    // var rowCnt = tbody_.rows.length;    // get the number of rows.
    // table row.
    // tr = empTab.insertRow(rowCnt);
    UFO_sighting.forEach((sighting) => {
        let tr = tbody_.insertRow(); 
        // Iterate through each key and value
        var td = document.createElement('td');  // TABLE BODY.
        Object.entries(sighting).forEach(([key, value]) => {
            td = tr.insertCell();
            let text = document.createTextNode(value);
            td.appendChild(text);
            // console.log(value);
          // Use the key to determine which array to push the value to
        });
    });
}

// var empTab = document.getElementById('ufo-table');
// var tbody_ = document.getElementById("ufo-table").tBodies[0];

// tableData.forEach((view) => {
//     // Iterate through each key and value
//     var tr = tbody_.insertRow();
//     var td = document.createElement('td');  // TABLE BODY.
//     Object.entries(view).forEach(([key, value]) => {
//         td = tr.insertCell();
//         let text = document.createTextNode(value);
//         td.appendChild(text);
//         // console.log(value);
//       // Use the key to determine which array to push the value to
//     });

// });

// =======================================
Filter_UFO_sighting(fechas = '');
function Filter_UFO_sighting(sighting) {
    var date = new Date(sighting.datetime).toLocaleDateString("en-US");
    if (fechas.length==0) { //If the date value is blank, I present all the data in the dataset.
        return (date == date);
    } else {
        var date1 = new Date(fechas).toLocaleDateString("en-US"); // comparitiondate
        return (date == date1);
    } 
  }
  
