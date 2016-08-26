google.charts.load('current', {'packages':['geochart', 'table', 'line']});

google.charts.setOnLoadCallback(drawUserLocationMap);
google.charts.setOnLoadCallback(drawTable);
google.charts.setOnLoadCallback(drawSessionPageviewChart);

var mockBackendAnalyticsData = {};

function drawUserLocationMap() {
  var jsonData = $.ajax({
    url: "http://localhost:3000/api/v1/analytics/charts/geofreq",
    dataType: "json",
    async: false
    }).responseJSON;

  var data = new google.visualization.DataTable(jsonData);

  var options = {};
  options['colorAxis'] = {colors: ["#aadff3", "#058dc7"]};
  options['defaultColor'] = '0x000000';
  options['dataMode'] = 'regions';

  var container = document.getElementById('regions_div');
  var map = new google.visualization.GeoChart(container);

  map.draw(data, options);
};

function drawTable() {
  var jsonData = $.ajax({
    url: "http://localhost:3000/api/v1/analytics/",
    dataType: "json",
    async: false
    }).responseJSON;

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Name');
  data.addColumn('number', 'Salary');
  data.addColumn('boolean', 'Full Time Employee');
  //data.addRows(jsonData["data"]);

  var options = {};
  options['cssClassNames'] = {headerRow: 'gcharts-thead'};
  options['width'] = '100%';
  options['height'] = '100%';

  var container = document.getElementById('table_div');
  var table = new google.visualization.Table(container);

  table.draw(data, options);
}

function drawSessionPageviewChart() {
  var jsonData = $.ajax({
    url: "http://localhost:3000/api/v1/analytics/charts/sessions",
    dataType: "json",
    async: false
    }).responseJSON;

  var data = new google.visualization.DataTable();
  data.addColumn('number', 'Day');
  data.addColumn('number', 'Sessions');
  data.addColumn('number', 'Pageviews');

  console.log(jsonData);
  for (day in jsonData) {
    console.log(jsonData[day]);
    data.addRow([jsonData[day]._id, jsonData[day]['session-uids'].length, jsonData[day].count]);
  }

  var options = {};
  options['chart'] = {title: 'the title', subtitle: 'sub'};
  options['legend'] = {position: 'none'};
  options['width'] = '100%';
  options['height'] = '100%';

  var container = document.getElementById('linechart_div');
  var chart = new google.charts.Line(container);

  chart.draw(data, options);
}
