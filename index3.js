//인구밀도가 많은 순으로 교통사고도 많이 났을 것이다.

var population = [
  16034,
  4416,
  2773,
  2764,
  2980,
  2813,
  1088,
  653,
  1279,
  90,
  219,
  265,
  226,
  145,
  141,
  318,
  353
];

var i = 0;

var string = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주"
];
var dataset = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var w = 800;
var h = 400;
var margin = 20;
var padding = 20;
// 데이터 받기
d3.csv("/accident.csv", function(d) {
  for (var i = 0; i < 17; i++) {
    if (d["발생지시도"] == string[i]) dataset[i]++;
  }
});

setTimeout(() => {
  var xScale = d3
    .scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w - margin])
    .paddingInner(0.05);

  var yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

  var x_axis = d3.axisBottom().scale(xScale);

  var y_axis = d3.axisLeft().scale(yScale);

  //SVG 원소 생성
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .append("g");

  //SVG에대하여 막대를 만든다
  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
      return xScale(i) + margin;
    })
    .attr("y", function(d) {
      return h - yScale(d) - margin;
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
      return yScale(d);
    })
    .attr("fill", function(d) {
      return "rgb(0, 0, " + Math.round(d * 10) + ")";
    })
    .on("mouseover", function(d, i) {
      //Get this bar's x/y values, then augment for the tooltip
      var xPosition =
        parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
      var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

      //Update the tooltip position and value
      d3.select("#tooltip")
        .style("left", xPosition + "px")
        .style("top", yPosition + "px")
        .select("#value")
        .text(string[i] + " : " + d);

      //Show the tooltip
      d3.select("#tooltip").classed("hidden", false);
    })
    .on("mouseout", function() {
      //Hide the tooltip
      d3.select("#tooltip").classed("hidden", true);
    })
    .on("click", function() {
      sortBars();
    });

  //x축
  svg
    .append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + margin + "," + (h - margin) + ")")
    .style("fill", "red")
    .call(x_axis);

  //y축
  svg
    .append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin + "," + -margin + ")")
    .style("fill", "red")
    .call(y_axis);

  //Define sort order flag
  var sortOrder = false;

  //Define sort function
  var sortBars = function() {
    //Flip value of sortOrder
    sortOrder = !sortOrder;

    svg
      .selectAll("rect")
      .sort(function(a, b) {
        if (sortOrder) {
          return d3.ascending(a, b);
        } else {
          return d3.descending(a, b);
        }
      })
      .transition()
      .delay(function(d, i) {
        return i * 50;
      })
      .duration(500)
      .attr("x", function(d, i) {
        return xScale(i) + margin;
      });
  };
}, 2000);
