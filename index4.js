//캘린더 뷰
dataset_3 = [];
dataset_3_1 = [];

//모달
var modal = document.getElementById("myModal");

//span
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var modaltext = document.getElementsByClassName("modal-text")[0];

//여기까지가 모달에관한내용

var i = 0;
var week = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
function pad(n, width) {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}
var k = 0;
for (var i = 1; i <= 12; i++) {
  if (i == 1 || i == 3 || i == 5 || i == 7 || i == 8 || i == 10 || i == 12) {
    for (var j = 1; j <= 31; j++) {
      dataset_3[k] = {
        Date: 2018 + "-" + pad(i, 2) + "-" + pad(j, 2),
        사고수: 0,
        사상자수: 0
      };
      k++;
    }
  } else if (i == 2) {
    for (var j = 1; j <= 28; j++) {
      dataset_3[k] = {
        Date: 2018 + "-" + pad(i, 2) + "-" + pad(j, 2),
        사고수: 0,
        사상자수: 0
      };
      k++;
    }
  } else {
    for (var j = 1; j <= 30; j++) {
      dataset_3[k] = {
        Date: 2018 + "-" + pad(i, 2) + "-" + pad(j, 2),
        사고수: 0,
        사상자수: 0
      };
      k++;
    }
  }
}

d3.csv("/accident.csv", function(d) {
  //dataset_3.push(d);
  for (var i = 0; i < 365; i++)
    if (d["발생년월일시분"] == dataset_3[i].Date) {
      dataset_3[i].사고수 += 1;
      dataset_3[i].사상자수 += parseInt(d["사상자수"]);
    }
});

d3.csv("/accident.csv", function(d) {
  dataset_3_1.push(d);
});
setTimeout(() => {
  // console.log(dataset_3);
  // console.log(dataset_3_1);
  var count = 0;
  for (var i = 0; i < 365; i++) {
    var today = new Date(dataset_3[i].Date).getDay();
    dataset_3[i].요일 = week[today];
    dataset_3[i].weeknum = today;
    if (dataset_3[i].Date.substr(8, 2) == "01")
      //1일로 나오면 초기화
      var count = 0;

    dataset_3[i].y_weeknum = count;
    if (today == 6) count += 1;
  }
  // const svg = d3.create("svg")
  //    .attr("viewBox", [0, 0, width, 1])
  //    .attr("font-family", "sans-serif")
  //    .attr("font-size", 10);

  var w_1 = 1000;
  var h_1 = 1500;
  var margin = [100, 100, 100, 100];
  var color = [
    [165, 0, 38],
    [215, 48, 39],
    [244, 109, 67],
    [253, 174, 97],
    [254, 224, 139],
    [255, 255, 191]
  ];
  var label = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var label_pos = [
    [100, 100],
    [350, 100],
    [600, 100],
    [100, 350],
    [350, 350],
    [600, 350],
    [100, 600],
    [350, 600],
    [600, 600],
    [100, 850],
    [350, 850],
    [600, 850]
  ];
  var barPadding = 1;
  var y = 100;
  var svg = d3
    .select(".section-3")
    .append("svg")
    .attr("width", w_1)
    .attr("height", h_1);
  svg
    .selectAll("rect")
    .data(dataset_3)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
      //x좌표
      return d.weeknum * 30 + ((d.Date.substr(5, 2) - 1) % 3) * 250 + margin[0];
    })
    .attr("y", function(d, i) {
      //y좌표
      return (
        parseInt((d.Date.substr(5, 2) - 1) / 3) * 250 +
        d.y_weeknum * 30 +
        margin[1]
      );
    })
    .attr("width", w_1 / 31) //넓이
    .attr("height", 30) //길이
    .attr("fill", function(d, i) {
      if (d.사상자수 == 5)
        return (
          "rgb(" + color[5][0] + "," + color[5][1] + "," + color[5][2] + ")"
        );
      else if (d.사상자수 <= 10)
        return (
          "rgb(" + color[4][0] + "," + color[4][1] + "," + color[4][2] + ")"
        );
      else if (d.사상자수 <= 15)
        return (
          "rgb(" + color[3][0] + "," + color[3][1] + "," + color[3][2] + ")"
        );
      else if (d.사상자수 <= 20)
        return (
          "rgb(" + color[2][0] + "," + color[2][1] + "," + color[2][2] + ")"
        );
      else if (d.사상자수 <= 25)
        return (
          "rgb(" + color[1][0] + "," + color[1][1] + "," + color[1][2] + ")"
        );
      else
        return (
          "rgb(" + color[0][0] + "," + color[0][1] + "," + color[0][2] + ")"
        );
    })
    .on("mouseover", function(d) {
      var xPosition = parseFloat(d3.select(this).attr("x")) + 14;
      var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

      d3.select("#tooltip__1")
        .style("left", xPosition + "px")
        .style("top", yPosition + 300 + "px")
        .select("#value")
        .text(d.사상자수 + "명" + "    " + d.Date + " " + d.요일);

      d3.select("#tooltip__1").classed("hidden", false);
    })
    .on("mouseout", function() {
      d3.select("#tooltip__1").classed("hidden", true);
    })
    .on("click", function(d) {
      modal.style.display = "block";
      var text1 = "";
      var count = 0;
      for (var i = 0; i < 3657; i++) {
        if (d.Date == dataset_3_1[i].발생년월일시분) {
          count++;
          console.log(dataset_3_1[i]);
          text1 = text1.concat(
            "　" +
              count +
              ". " +
              dataset_3_1[i].주야 +
              "간 " +
              dataset_3_1[i].발생지시도 +
              " " +
              dataset_3_1[i].발생지시군구 +
              " " +
              dataset_3_1[i].도로형태 +
              "에서 " +
              dataset_3_1[i].가해자_당사자종별 +
              "가 " +
              dataset_3_1[i].피해자_당사자종별 +
              "를침 " +
              dataset_3_1[i].사망자수 +
              "명이 죽고 " +
              +dataset_3_1[i].중상자수 +
              "명이 중상이고 " +
              dataset_3_1[i].경상자수 +
              "명이 다침" +
              "<br></br>"
          );
        }
      }
      console.log(text1);
      modaltext.innerHTML = text1;
    });
  //modaltext.innerText("굿");
  //텍스트 달기
  svg
    .selectAll("text")
    .data(dataset_3)
    .enter()
    .append("text")
    .text(function(d, i) {
      if (d.Date.substr(8, 2) <= 7)
        return week[parseInt(d.Date.substr(8, 2) - 1)];
    })
    .attr("font-size", 13)
    .attr("x", function(d, i) {
      //x좌표
      return (
        ((d.Date.substr(8, 2) - 1) % 7) * 30 +
        ((d.Date.substr(5, 2) - 1) % 3) * 250 +
        margin[0]
      );
    })
    .attr("y", function(d, i) {
      //y좌표
      return (
        parseInt((d.Date.substr(5, 2) - 1) / 3) * 250 +
        parseInt(d.Date.substr(8, 2) / 7.1) * 30 +
        margin[1]
      );
    });

  //월 라벨달기

  for (var i = 0; i < 12; i++) {
    svg
      .append("text")
      .text(label[i])
      .attr("fill", "black")
      .attr("font-size", 20)
      .attr("x", label_pos[i][0])
      .attr("y", label_pos[i][1] - 20);
  }

  //색깔에 대한 설명을 위한 rect
  for (var i = 0; i < 6; i++) {
    svg
      .append("rect")
      .attr("x", 30 * i + 5)
      .attr("y", 20)
      .attr("width", 30)
      .attr("height", 30)
      .attr(
        "fill",
        "rgb(" +
          color[5 - i][0] +
          "," +
          color[5 - i][1] +
          "," +
          color[5 - i][2] +
          ")"
      );
  }

  svg
    .append("text")
    .text("5명단위로 색깔이바뀜 ex: 가장 밝은 노란색이 0명부터 5명")
    .attr("x", 0)
    .attr("y", 15)
    .attr("font-size", 12);

  for (var i = 0; i < 6; i++) {
    svg
      .append("text")
      .text(i * 5)
      .attr("x", i * 30)
      .attr("y", 65);
  }
}, 2000);
