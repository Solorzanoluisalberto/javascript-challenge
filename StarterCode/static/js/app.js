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

function Print_(tableData1, startDate){    
    var resultData = tableData1.filter(a => {
    var date = new Date(a.datetime).toLocaleDateString("en-US");
        // console.log(date);
        // console.log(new Date(startDate).toLocaleDateString("en-US"));
        if (startDate.length != 0) {
            return (date == new Date(startDate).toLocaleDateString("en-US"));
        } else {
            return (date == date);
        }
    });
    console.log(resultData);
    
    let empTab = document.getElementById('ufo-table');
    let tbody_ = document.getElementById("ufo-table").tBodies[0]
    tbody_.lastChild.remove();
    // $("#Your_Table tr>td").remove();
    
    console.log(tbody_)
    // var rowCnt = tbody_.rows.length;    // get the number of rows.
    let tr = tbody_.insertRow(); // table row.
    // tr = empTab.insertRow(rowCnt);

    resultData.forEach((view) => {
        // Iterate through each key and value
        var td = document.createElement('td');  // TABLE BODY.
        Object.entries(view).forEach(([key, value]) => {
            td = tr.insertCell();
            let text = document.createTextNode(value);
            td.appendChild(text)
            // console.log(value);
          // Use the key to determine which array to push the value to
        });
    });
}

var empTab = document.getElementById('ufo-table');
var tbody_ = document.getElementById("ufo-table").tBodies[0]

tableData.forEach((view) => {
    // Iterate through each key and value
    var tr = tbody_.insertRow();
    var td = document.createElement('td');  // TABLE BODY.
    Object.entries(view).forEach(([key, value]) => {
        td = tr.insertCell();
        let text = document.createTextNode(value);
        td.appendChild(text)
        // console.log(value);
      // Use the key to determine which array to push the value to
    });
    
});

// =======================================








