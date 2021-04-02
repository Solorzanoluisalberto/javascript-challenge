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
    console.log(DateInput);
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
            Print_(UFO_sighting);
            break;
        default:
            console.log(`it is not a valid date: ${DateInput} `);
            alert("The date entered: " + DateInput + " is not a valid Date \nUse: mm/dd/yyyy format");
            break;
      }
    }
});
// =======================================================================

// =======================================================================
// function to populate ufo-table use d3
function Print_(UFO_sighting){        
    let UFOTab = d3.select('ufo-table');
    let tbody_=d3.select("tbody");
    var tr_ = tbody_.selectAll("tr")._groups;
    // console.log(tr_[0].length);
    // console.log(tr_);
    if (tr_[0].length != 0) { // if the table has rows do
       for (let i = 0; i < tr_[0].length; i++) {
        tr_[0][i].remove();
        }
    }
    UFO_sighting.forEach((sighting) => {
    let row = tbody_.append("tr");
    // Iterate through each key and value
     // TABLE BODY.
    Object.entries(sighting).forEach(([key, value]) => {
        // td = tr.insertCell()
        // let text = value;
        var td = row.append("td");
        td.text(value);
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
