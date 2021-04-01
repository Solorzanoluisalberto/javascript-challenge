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

// =======================================
Print_(tableData); // one time (upload page)
// =======================================

var button_Filter = d3.select(".btn-default"); // select element buton
var DateInput = ""

// =============================================================================
// onclick function to get date and filter the sightings that match in the dataset
button_Filter.on("click", function() {
    // Select the current count
    console.log("clicked");
    DateInput = document.getElementById("datetime").value;
    console.log(DateInput)
    console.log(DateInput.length)
    if (DateInput.length == 0) { // date value empty
        console.log("without filter the dataset");
        console.log(DateInput);
        var UFO_sighting = tableData.filter(Filter_UFO_sighting, DateInput);
        console.log(UFO_sighting);
        Print_(UFO_sighting);
    } else {
        var go_ = DateExist(DateInput); // valid date?
        switch(go_) { // case valid date
        case true:
            console.log(`date ok! ${DateInput}`);
            var UFO_sighting = tableData.filter(Filter_UFO_sighting, DateInput);
            console.log(UFO_sighting);
            Print_(UFO_sighting)
            break;
        default:
            console.log(`no es una fecha: ${DateInput} `);
            break;
      }
    }
});
// =======================================================================

// =======================================================================
// function to populate ufo-table in DOM
function Print_(UFO_sighting){        
    let UFOTab = document.getElementById('ufo-table');
    let tbody_ = document.getElementById("ufo-table").tBodies[0]
    // 
    if (tbody_ != null) {
        console.log("exist <tr> in <tbody>");
        UFOTab.removeChild(tbody_);
		tbody_ = document.createElement('tbody')
        UFOTab.append(tbody_)
    }
    console.log(tbody_);
    UFO_sighting.forEach((sighting) => {
        let tr = tbody_.insertRow(); 
        // Iterate through each key and value
        var td = document.createElement('td');  // TABLE BODY.
        Object.entries(sighting).forEach(([key, value]) => {
            td = tr.insertCell();
            let text = document.createTextNode(value);
            td.appendChild(text);
        });
    });
}
// ================================================================

// ==============================================================
// function to validate input date
function DateExist(fecha) {
    var fechaf = fecha.split("/");
    var m = fechaf[0];
    var d = fechaf[1];
    var y = fechaf[2];
    return (m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= 31 && y.length == 4);
}
// ===============================================================

// ===============================================================
// function to filter sighting by input date (DateInput)
function Filter_UFO_sighting(sighting) {
    var date = new Date(sighting.datetime).toLocaleDateString("en-US");
    if (DateInput.length==0) { //If the date value is blank, I present all the data in the dataset.
        return (date == date);
    } else {
        var date1 = new Date(DateInput).toLocaleDateString("en-US"); // comparitiondate
        return (date == date1);
    } 
  }
// ==============================================================
