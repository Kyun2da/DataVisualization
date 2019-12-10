var w = 960, h = 500;
    
    var proj = d3.geoMercator()
      .center([128.0, 35.9])
      .scale(4000)
      .translate([w/2, h/2]);

    var path = d3.geoPath().projection(proj);

    var svg = d3.select("body").append("svg")
      .attr("width", w)
      .attr("height", h);
    var promises = [
      d3.json("skorea-provinces-2018-topo-simple.json")
    ]
    
    Promise.all(promises).then(ready)
    
    function ready([data]){
      var provinces = topojson.feature(data, data.objects['skorea_provinces_2018_geo']);

      svg.append("path")
          .datum(provinces)
          .attr("class", "province")
          .attr("d", path);

      svg.selectAll("text")
        .data(provinces.geometries)
        .enter().append("text")
          .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .text(function(d) { return d.properties.name; });

    };