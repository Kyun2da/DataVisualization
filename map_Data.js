//모달
var modal_1 = document.getElementById("myModal2");

//span
var span_1 = document.getElementsByClassName("close2")[0];

// When the user clicks on <span> (x), close the modal
span_1.onclick = function() {
  modal_1.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal_1) {
    modal_1.style.display = "none";
  }
};

var modaltext_1 = document.getElementsByClassName("modal-text2")[0];

var width = 700,
  height = 700,
  centered;

var svg = d3
  .select("#map-chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// to preserve layer order
var map = svg.append("g").attr("id", "map"),
  points = svg.append("g").attr("id", "cities");

var projection = d3
  .geoMercator()
  .center([128, 35.9])
  .scale(4000)
  .translate([width / 2, height / 2]);

var path = d3.geoPath().projection(projection);

// draw map
var promises = [d3.json("skorea-provinces-2018-topo.json")];
Promise.all(promises).then(ready);

function ready([data]) {
  map
    .selectAll("path")
    .data(
      topojson.feature(data, data.objects.skorea_provinces_2018_geo).features
    )
    .enter()
    .append("path")
    .attr("class", "province")
    .attr("class", function(d) {
      return "province c" + d.properties.code;
    })
    .attr("d", path)
    .on("click", clicked);
}

d3.csv("/DataVisualization/accident.csv").then(function(data) {
  points
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return projection([d.경도, d.위도])[0];
    })
    .attr("cy", function(d) {
      return projection([d.경도, d.위도])[1];
    })
    .attr("r", 0.7)
    .attr("fill", "red")
    .on("click", function(d) {
      modal_1.style.display = "block";
      var text1 = "";
      text1 = text1.concat(
        d.주야 +
          "간 " +
          d.발생지시도 +
          " " +
          d.발생지시군구 +
          " " +
          d.도로형태 +
          "에서 " +
          d.가해자_당사자종별 +
          "가 " +
          d.피해자_당사자종별 +
          "를침 " +
          d.사망자수 +
          "명이 죽고 " +
          +d.중상자수 +
          "명이 중상이고 " +
          d.경상자수 +
          "명이 다침" +
          "<br></br>"
      );
      console.log(text1);
      modaltext_1.innerHTML = text1;
    });
});

function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  map.selectAll("path").classed(
    "active",
    centered &&
      function(d) {
        return d === centered;
      }
  );

  map
    .transition()
    .duration(750)
    .attr(
      "transform",
      "translate(" +
        width / 2 +
        "," +
        height / 2 +
        ")scale(" +
        k +
        ")translate(" +
        -x +
        "," +
        -y +
        ")"
    )
    .style("stroke-width", 1.5 / k + "px");

  points.selectAll("circle").classed(
    "active",
    centered &&
      function(d) {
        return d === centered;
      }
  );

  points
    .transition()
    .duration(750)
    .attr(
      "transform",
      "translate(" +
        width / 2 +
        "," +
        height / 2 +
        ")scale(" +
        k +
        ")translate(" +
        -x +
        "," +
        -y +
        ")"
    )
    .style("stroke-width", 1.5 / k + "px");
}
