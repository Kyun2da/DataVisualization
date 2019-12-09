var width = 2000,
height = 2000;
var svg = d3.select("#chart").append("svg")
.attr("width", width)
.attr("height", height);
var projection = d3.geoMercator()
.center([128, 36])
.scale(15000)
.translate([width/2, height/2]);
var path = d3.geoPath()
.projection(projection);
var quantize = d3.scaleQuantize()
.domain([0, 1000])
.range(d3.range(9).map(function(i) { return "p" + i; }));
var popByName = d3.map();
queue()
.defer(d3.json, "./municipalities-topo-simple.json")
.defer(d3.csv, "./population-edited.csv", function(d) {
    popByName.set(d.name, +d.population);
})
.await(ready);
function ready(error, data) {
var features = topojson.feature(data, data.objects["municipalities-geo"]).features;
features.forEach(function(d) {
d.properties.population = popByName.get(d.properties.name);
d.properties.density = d.properties.population*10000 / path.area(d);
d.properties.quantized = quantize(d.properties.density);
});
svg.selectAll("path")
  .data(features)
.enter().append("path")
  .attr("class", function(d) { return "municipality " + d.properties.quantized; })
  .attr("d", path)
  .attr("id", function(d) { return d.properties.name; })
.append("title")
.text(function(d) { return d.properties.name + ": " + d.properties.population+ "명" });
svg.selectAll("text")
  .data(features.filter(function(d) { return d.properties.name.endsWith("시"); }))
.enter().append("text")
  .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
  .attr("dy", ".35em")
  .attr("class", "region-label")
  .text(function(d) { return d.properties.name; });
}