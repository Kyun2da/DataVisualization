let condition = "";

function readAndDraw() {
  dataset_6 = {
    children: [
      { Name: "승용차", Count: 0 },
      { Name: "이륜차", Count: 0 },
      { Name: "화물차", Count: 0 },
      { Name: "승합차", Count: 0 },
      { Name: "자전거", Count: 0 },
      { Name: "기타", Count: 0 }
    ]
  };

  d3.csv("./accident.csv")
    .then(data => {
      data.map(val => {
        console.log(val["법규위반"]);
        if (condition === "") {
          if (val["가해자_당사자종별_대분류"] === "승용차") {
            dataset_6.children[0].Count++;
          } else if (val["가해자_당사자종별_대분류"] === "이륜차") {
            dataset_6.children[1].Count++;
          } else if (val["가해자_당사자종별_대분류"] === "화물차") {
            dataset_6.children[2].Count++;
          } else if (val["가해자_당사자종별_대분류"] === "승합차") {
            dataset_6.children[3].Count++;
          } else if (val["가해자_당사자종별_대분류"] === "자전거") {
            dataset_6.children[4].Count++;
          } else {
            dataset_6.children[5].Count++;
          }
        } else {
          if (
            val["가해자_당사자종별_대분류"] === "승용차" &&
            val["법규위반"] === condition
          ) {
            dataset_6.children[0].Count++;
          } else if (
            val["가해자_당사자종별_대분류"] === "이륜차" &&
            val["법규위반"] === condition
          ) {
            dataset_6.children[1].Count++;
          } else if (
            val["가해자_당사자종별_대분류"] === "화물차" &&
            val["법규위반"] === condition
          ) {
            dataset_6.children[2].Count++;
          } else if (
            val["가해자_당사자종별_대분류"] === "승합차" &&
            val["법규위반"] === condition
          ) {
            dataset_6.children[3].Count++;
          } else if (
            val["가해자_당사자종별_대분류"] === "자전거" &&
            val["법규위반"] === condition
          ) {
            dataset_6.children[4].Count++;
          } else if (val["법규위반"] === condition) {
            dataset_6.children[5].Count++;
          }
        }
      });
    })
    .then(() => {
      var diameter = 600;
      var color = d3.scaleOrdinal(d3.schemeCategory10);

      var bubble = d3
        .pack(dataset_6)
        .size([diameter, diameter])
        .padding(1.5);

      var svg = d3
        .select("#bubble-chart")
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

      var nodes = d3.hierarchy(dataset_6).sum(function(d) {
        return d.Count;
      });

      var node = svg
        .selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d) {
          return !d.children;
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

      node.append("title").text(function(d) {
        return d.Name + ": " + d.Count;
      });

      node
        .append("circle")
        .attr("r", function(d) {
          return d.r;
        })
        .style("fill", function(d, i) {
          return color(i);
        });

      node
        .append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function(d) {
          return d.data.Name.substring(0, d.r / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d) {
          return d.r / 5;
        })
        .attr("fill", "white");

      node
        .append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function(d) {
          return d.data.Count;
        })
        .attr("font-family", "Gill Sans", "Gill Sans MT")
        .attr("font-size", function(d) {
          return d.r / 5;
        })
        .attr("fill", "white");

      d3.select(self.frameElement).style("height", diameter + "px");
    });
}
readAndDraw();
