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
    console.log("con boton: " + sql_);
    // console.log(sighting);
    console.log(DateInput);
    // sql_ = "sighting.city ===" + '"searcy"'
    var date = formatTime(new Date(sighting.datetime));
    // console.log(date == date1 && sql_)
    // return (date == date1 && sql_);
    // console.log("otros: " + otros);
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
        case "Date1":
            let unique_datetime = Dataset_Filtered.map(ele =>ele.datetime).filter((v, i, a) => a.indexOf(v) === i);
            unique_datetime.unshift("...");
            console.log(unique_datetime);
            lista(select, unique_datetime);
            break;
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
// console.log(ul_.nodeChild.length);
// d3.select(this).selectAll('div > ul');

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

// function slect_Option (){
//     var select = d3.select('body')
//     .append('select')
//         .attr('class','select')
//       .on('change',onchange)
//   var options = select
//     .selectAll('option')
//       .data(data).enter()
//       .append('option')
//           .text(function (d) { return d; });
// }  
/* <ul class="list-group" id="filters">
                      <li class="filter list-group-item">
                        <label for="date">Enter a Date</label> */

//   d3.select("#objectID").property("value")
// d3.select('#myselect').node().value = 'France';
// var select_city = d3.select("#City")

// console.log("city selected: "+ select_city);
function F_change(value_) {
    DateTimeBox = d3.select("#datetime").property("value");
    var select_city = d3.select('#City option:checked').text();
    var select_state = d3.select('#State option:checked').text();
    var select_country = d3.select('#Country option:checked').text();
    var select_shape = d3.select('#Shape option:checked').text();
    console.log(select_city);
    console.log(select_state);
    console.log(select_country);
    console.log(select_shape);
// if (DateTimeBox.length == 0) {
//     DateTimeBox = '01/11/2010';
// }

if (DateTimeBox.length == 0) {
    switch (value_) {
        case "City":
            UFO_sighting = tableData.filter(data => data.city === select_city);
        break;

        case "State":
            UFO_sighting = tableData.filter(data => data.state === select_state);
        case "Country":
            UFO_sighting = tableData.filter(data => data.country === select_country);
        case "Shape":
            UFO_sighting = tableData.filter(data => data.shape === select_shape);
            
        default:
            break;
    }
} else {
    var dateBool = DateExist(DateTimeBox);
    if (dateBool) {
        DateInput = formatTime(new Date(DateTimeBox));
    
        switch (value_) {
            case "City":
                UFO_sighting = tableData.filter(data => formatTime(new Date(data.datetime)) === DateInput && data.city ===  select_city ); 
                break;
             case "State":
                UFO_sighting = tableData.filter(data => formatTime(new Date(data.datetime)) === DateInput && data.state ===  select_state ); 
             
             case "Country":
    
             default:
             break;
        }
    } else {
        console.log("fecha invalida");
    }    
}
Print_(UFO_sighting);



// console.log(d3.select('#City option:checked').text());
// alert(d3.select('#City option:checked').text()+' \n' + 'date: '+ DateInput );
// console.log(UFO_sighting);

// var select_city = d3.select("#City");
// var select_state1 = d3.select('#State option:checked').text();
// console.log(select_state1);
// var select_country = d3.select("#Country");
// var select_shape = d3.select("#Shape");

// sql_ = "";
// if (select_city !="City") {
//     sql_ = sql_ + ' date.city== "' + select_city + '"';
//     // UFO_sighting = tableData.filter(data => data.datetime == data.datetime && data.city =='');
// }
// if (select_state != "State") {
//     sql_ = sql_ + ' date.state == "' + select_state + '"';
//     }
// if (select_country != "Country") {
//     sql_ = sql_ + ' date.country == "' + select_country + '"';
//     }
// if (select_shape != "Shape") {
//     sql_ = sql_ + ' date.shape == "' + select_shape + '"';
// }

}