//데이터셋 만들기
dataset_5 = [];
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
var colors = [
  "pink",
  "salmon",
  "orangered",
  "yellow",
  "darkkhaki",
  "sandybrown",
  "maroon",
  "lime",
  "aqua",
  "lightsteelblue",
  "mediumblue",
  "darkviolet",
  "indigo",
  "mediumslateblue",
  "beige",
  "silver",
  "black"
];
function pad(n, width) {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}
var k = 0;
for (var y = 2012; y <= 2018; y++) {
  for (var i = 0; i < 17; i++) {
    dataset_5[k] = {
      Date: y,
      지역: string[i],
      사망자수: 0,
      사고수: 0,
      사상자수: 0
    };
    k++;
  }
}

//2018년 데이터파싱
d3.csv("./accident.csv", function(d) {
  for (
    var i = 102;
    i <= 118;
    i++ //2018년 인덱스가 102부터 118임
  )
    if (d["발생지시도"] == string[i - 102]) {
      dataset_5[i].사고수 += 1;
      dataset_5[i].사상자수 += parseInt(d["사상자수"]);
      dataset_5[i].사망자수 += parseInt(d["사망자수"]);
      break;
    }
});
//2012~2014년 데이터 파싱
d3.csv("./accident_2012to2014.csv", function(d) {
  for (var i = 0; i <= 16; i++)
    if (d["발생지시도"] == string[i] && d["발생년"] == 2012) {
      dataset_5[i].사고수 += 1;
      dataset_5[i].사상자수 += parseInt(d["사상자수"]);
      dataset_5[i].사망자수 += parseInt(d["사망자수"]);
      break;
    }
  for (var i = 17; i <= 33; i++)
    if (d["발생지시도"] == string[i % 17] && d["발생년"] == 2013) {
      dataset_5[i].사고수 += 1;
      dataset_5[i].사상자수 += parseInt(d["사상자수"]);
      dataset_5[i].사망자수 += parseInt(d["사망자수"]);
      break;
    }
  for (var i = 34; i <= 50; i++)
    if (d["발생지시도"] == string[i % 17] && d["발생년"] == 2014) {
      dataset_5[i].사고수 += 1;
      dataset_5[i].사상자수 += parseInt(d["사상자수"]);
      dataset_5[i].사망자수 += parseInt(d["사망자수"]);
      break;
    }
});

//2015년 데이터파싱
d3.csv("./accident_2015.csv", function(d) {
  for (var i = 51; i <= 67; i++)
    if (d["발생지시도"] == string[i - 51]) {
      dataset_5[i].사고수 += 1;
      dataset_5[i].사상자수 += parseInt(d["사상자수"]);
      dataset_5[i].사망자수 += parseInt(d["사망자수"]);
      break;
    }
});

//2016년 데이터파싱
d3.csv("./accident_2016.csv", function(d) {
  for (var i = 68; i <= 84; i++)
    if (d["발생지시도"] == string[i - 68]) {
      dataset_5[i].사고수 += 1;
      dataset_5[i].사상자수 += parseInt(d["사상자수"]);
      dataset_5[i].사망자수 += parseInt(d["사망자수"]);
      break;
    }
});

//2017년 데이터 파싱
d3.csv("./accident_2017.csv", function(d) {
  for (var i = 85; i <= 101; i++)
    if (d["발생지시도"] == string[i - 85]) {
      dataset_5[i].사고수 += 1;
      dataset_5[i].사상자수 += parseInt(d["사상자수"]);
      dataset_5[i].사망자수 += parseInt(d["사망자수"]);
      break;
    }
});

setTimeout(() => {
  const dataset_52 = Array(17)
    .fill(null)
    .map(() => Array());
  for (var i = 0; i <= 16; i++) {
    for (var j = 0; j < 7; j++) dataset_52[i][j] = "0";
  }
  for (var i = 0; i <= 118; i++) {
    if (i <= 16) dataset_52[i % 17][0] = dataset_5[i].사고수;
    else if (i <= 33) dataset_52[i % 17][1] = dataset_5[i].사고수;
    else if (i <= 50) dataset_52[i % 17][2] = dataset_5[i].사고수;
    else if (i <= 67) dataset_52[i % 17][3] = dataset_5[i].사고수;
    else if (i <= 84) dataset_52[i % 17][4] = dataset_5[i].사고수;
    else if (i <= 101) dataset_52[i % 17][5] = dataset_5[i].사고수;
    else if (i <= 118) dataset_52[i % 17][6] = dataset_5[i].사고수;
  }

  var w = 1300;
  var h = 1100;
  var padding = 30;

  var svg = d3
    .select(".section-5")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
  //Create scale functions
  var xScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(dataset_5, function(d) {
        return d[0];
      })
    ])
    .range([padding, w - padding * 2]);

  var yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(dataset_5, function(d) {
        return d[1];
      })
    ])
    .range([h - padding, padding]);

  var formatAsPercentage = d3.format(".1%");

  //Define X axis
  var xAxis = d3
    .axisBottom()
    .scale(xScale)
    .ticks(5)
    .tickFormat(formatAsPercentage);

  //Define Y axis
  var yAxis = d3
    .axisLeft()
    .scale(yScale)
    .ticks(5)
    .tickFormat(formatAsPercentage);
  //Create X axis
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

  //Create Y axis
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

  //점 생성
  svg
    .selectAll("circle")
    .data(dataset_5)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return (d.Date - 2011) * 150;
    })
    .attr("cy", function(d) {
      return h - d.사고수 - 100;
    })
    .attr("r", function(d) {
      return 10;
    })
    .attr("fill", function(d, i) {
      return colors[i % 17];
    })
    .on("mouseover", function(d) {
      var xPosition = parseFloat(d3.select(this).attr("x")) + 14;
      var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

      d3.select("#tooltip3")
        .style("left", 500 + "px")
        .style("top", 50 + "px")
        .select("#value")
        .text(
          "지역 :" +
            d.지역 +
            ", 사고수 : " +
            " " +
            d.사고수 +
            "개, 사상자수 : " +
            d.사상자수 +
            "명, 년도 : " +
            d.Date +
            "년"
        );

      d3.select("#tooltip3").classed("hidden", false);
    })
    .on("mouseout", function() {
      d3.select("#tooltip3").classed("hidden", true);
    });

  //선 그리기
  var dataset_53 = [2012, 2013, 2014, 2015, 2016, 2017, 2018];
  for (var i = 0; i <= 15; i++) {
    for (var j = 0; j < 6; j++) {
      var x1 = (dataset_53[j] - 2011) * 150;
      var x2 = (dataset_53[j + 1] - 2011) * 150;
      var y1 = h - dataset_52[i][j] - 100;
      var y2 = h - dataset_52[i][j + 1] - 100;
      svg
        .append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("style", "stroke:" + colors[i])
        .attr("stroke-width", 2);
    }
  }

  //색깔에 대한 설명을 위한 circle 레이블 달기
  for (var k = 0; k < 17; k++) {
    svg
      .append("circle")
      .attr("cx", 50 * k + 450)
      .attr("cy", 25)
      .attr("r", 25)
      .attr("fill", colors[k]);

    svg
      .append("text")
      .text(dataset_5[k].지역)
      .attr("x", 50 * k + 427)
      .attr("y", 75)
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px")
      .attr("fill", "black");
  }

  svg
    .append("text")
    .text("사고수")
    .attr("x", 0)
    .attr("y", 25)
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "black");

  svg
    .append("text")
    .text("년도")
    .attr("x", 1200)
    .attr("y", 1060)
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "black");

  for (var k = 0; k < 7; k++) {
    svg
      .append("text")
      .text(dataset_53[k])
      .attr("x", 150 * k + 120)
      .attr("y", 1100)
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px")
      .attr("fill", "black");
  }
}, 3000);
