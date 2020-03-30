// import the data from data.js
const tableData = data;

let filters = {}
function buildTable(data) {
  // First, clear out any existing data
  const tbody = d3.select("tbody")
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {

    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
      }
    );
  });
}

applyFilters = () => {
  d3.event.preventDefault()
  
  let filteredData = tableData;

  // If we have any filters saved 
  // apply them
  const filtersExist = !!Object.keys(filters).length && Object.keys(filters).filter( key => !!filters[key]).length > 0

  if (filtersExist) {
    // Apply filters to the table data
    filteredData = filteredData.filter(row => {
      return Object.keys(filters).every(filterKey => row[filterKey].toLowerCase() === filters[filterKey].toLowerCase())
    });
  }
  
  // Rebuild the table using the filtered data
  // @NOTE: If no date was entered, then filteredData will
  // just be the original tableData.
  buildTable(filteredData);
};

saveInput = () => {
  // saving the value of the input being filled
  filters[d3.event.target.name] = d3.event.target.value
}

clearFilters = () => {
  // removing the input values and the filter data
  Object.keys(filters).forEach( filterKey => {
    console.log(filters[filterKey])
    // if we have value saved for that filter
    if (filters[filterKey]) {
      // find the input with that id and clear the value
      document.getElementById(filterKey).value = ""
      // clear the value in the filter object
      filters[filterKey] = ""
    }
  })
  // a fresh search without filters
  buildTable(tableData)
}

d3.select("#filter-btn").on("click", applyFilters);
d3.select("#clear-filter-btn").on("click", clearFilters);
d3.selectAll("input").on("keyup", saveInput)

buildTable(tableData);