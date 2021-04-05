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
 // one time (upload page)
function Print_2(){
    d3.select("#datetime").property("value","");
    Print_(tableData);
}
// =======================================
var formatTime = d3.timeFormat("%m/%d/%Y");
var tie = '1/1/2010'
var tiempo = formatTime(new Date(tie)); // "June 30, 2015"
console.log(tiempo);
var button_Filter = d3.select("#filter-btn"); // select element buton filter
var DateInput = ""
var sql_ = ""
var form_ = d3.select(".panel-body");
var button_ = form_.append('button');
    button_.attr("id", "Reset1");   // insert element buton Reset
    button_.attr("class", "btn btn-default");
    button_.text("Reset");
    button_.attr('onclick', "Print_2()")
//     console.log(form_);
// var button_Reset = d3.select("#Reset1");// select element buton reset
// console.log(button_Reset)
//     button_Reset.on("click", Print_());
// =============================================================================
// onclick function to get date and filter the sightings that match in the dataset
var otros = 0;
button_Filter.on("click", function() {
// ======================================================

// =======================================================
    // Select the current count
    console.log("clicked");
    DateInput = d3.select("#datetime").property("value");
    // console.log(DateInput);
    if (DateInput.length == 0) { // date value empty
        console.log("without filter the dataset");
        console.log(DateInput);
        var UFO_sighting = tableData.filter(Filter_UFO_sighting, DateInput);
        console.log(UFO_sighting);
        Print_(UFO_sighting);
        // fill_select_options(UFO_sighting); // to fill select options
    } else {
        var go_ = DateExist(DateInput); // valid date?
        switch(go_) { // case valid date
        case true:
            console.log(`date ok! ${DateInput}`);
            var UFO_sighting = tableData.filter(Filter_UFO_sighting, DateInput);
            console.log(UFO_sighting);
            Print_(UFO_sighting);
            // fill_select_options(UFO_sighting); // to fill select options
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
    tbody_.html("");
    UFO_sighting.forEach((sighting) => {
        let row = tbody_.append("tr");
        // Iterate through each key and value
        // TABLE BODY.
        Object.entries(sighting).forEach(([key, value]) => {
        var td = row.append("td");
        td.text(value);
        });
    });
    fill_select_options(UFO_sighting); // to fill select options
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
    var date = formatTime(new Date(sighting.datetime));
    if (DateInput.length==0) { //If the date value is blank, I present all the data in the dataset.
       return (date == date);
       
    } else {
        var date1 = formatTime(new Date(DateInput)); // comparitiondate
        return (date == date1);
    } 

} 
// ==============================================================
// var list_ = d3.selectAll("th")._groups.text();
function fill_select_options(Dataset_Filtered){
var filters_ = [];
const tds = d3.selectAll("th")
  tds.each(function() {
    let select = d3.select(this);
    let opt_ = d3.select(this).text()
   
    switch (opt_) {
        case "City":
            let unique_cities = Dataset_Filtered.map(ele =>ele.city).filter((v, i, a) => a.indexOf(v) === i);
            unique_cities.unshift("City");
            // d3.select(this).text("");
            lista(select, unique_cities, "City");
            break;
        case "State":
            let unique_state = Dataset_Filtered.map(ele =>ele.state).filter((v, i, a) => a.indexOf(v) === i);
            unique_state.unshift("State");
            // d3.select(this).text("");
            lista(select, unique_state, "State");
            break;
        case "Country":
            let unique_countries = Dataset_Filtered.map(ele =>ele.country).filter((v, i, a) => a.indexOf(v) === i);
            unique_countries.unshift("Country");
            // d3.select(this).text("");
            lista(select, unique_countries,"Country");
            break;
        case "Shape":
            let unique_shape = Dataset_Filtered.map(ele =>ele.shape).filter((v, i, a) => a.indexOf(v) === i);
            unique_shape.unshift("Shape");
            // d3.select(this).text("");
            lista(select, unique_shape,"Shape");
            break;             
        default:
            break;
    }
  })
}
// ==========================================================================
function lista(para1, para2, id){
var ul_ = d3.select(".list-group");

if (d3.selectAll(`.list-group > .${id}`)) {
    // console.log("tiene valor");
    d3.selectAll(`.list-group > .${id}`).remove(); // remove if exist
}
var str_Class = "filter list-group-item " + id;
var li_ = ul_.append('li');
    li_.attr("class", str_Class);
//
var select_ = li_.append("select")
 // var select_ = para1.append("select");
    var options = select_
    .attr("id", id)
    .attr("width", "10")
    .attr("class", "custom-select")
    .attr('onchange','F_change("'+id+'")')
  	.selectAll('option')
	.data(para2).enter()
	.append('option')
	.text(function (d) { return d; });
} 
// ================================================================
function F_change(value_) {
    DateTimeBox = d3.select("#datetime").property("value");
    var select_city = d3.select('#City option:checked').text();
    var select_state = d3.select('#State option:checked').text();
    var select_country = d3.select('#Country option:checked').text();
    var select_shape = d3.select('#Shape option:checked').text();
    // console.log(select_city);
    // console.log(select_state);
    // console.log(select_country);
    // console.log(select_shape);
// if (DateTimeBox.length == 0) {
//     DateTimeBox = '01/11/2010';
// }

if (DateTimeBox.length == 0) {
    switch (value_) {
        case "City":
            UFO_sighting = tableData.filter(data => data.city.trim() === select_city.trim());
            break;
        case "State":
            UFO_sighting = tableData.filter(data => data.state.trim() === select_state.trim());
            break;
        case "Country":
            UFO_sighting = tableData.filter(data => data.country.trim() == select_country.trim());
            console.log("paso por aca" + select_country);
            break;
        case "Shape":
            UFO_sighting = tableData.filter(data => data.shape.trim() === select_shape.trim());
            break;
        default:
            break;
    }
} else {
    var dateBool = DateExist(DateTimeBox);
    if (dateBool) {
        DateInput = formatTime(new Date(DateTimeBox));
    
        switch (value_) {
            case "City":
                UFO_sighting = tableData.filter(data => formatTime(new Date(data.datetime)) === DateInput && data.city.trim() ===  select_city.trim() ); 
                break;
             case "State":
                UFO_sighting = tableData.filter(data => formatTime(new Date(data.datetime)) === DateInput && data.state.trim() ===  select_state.trim() ); 
                break;
            case "Country":
                UFO_sighting = tableData.filter(data => formatTime(new Date(data.datetime)) === DateInput && data.country.trim() ===  select_country.trim() ); 
                break;
            case "Shape":
                UFO_sighting = tableData.filter(data => formatTime(new Date(data.datetime)) === DateInput && data.shape.trim() ===  select_shape.trim()); 
                break;
             default:
                 break;
        }
    } else {
        console.log("fecha invalida");
    }    
}
Print_(UFO_sighting);
console.log(UFO_sighting);
}