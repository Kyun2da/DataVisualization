//주야 비교 pie chart

var dataset=[];
            var i=0;
            

            var ju_sum =0;
            var ya_sum =0;
             
            d3.csv("/accident.csv", function(data){ 
                dataset.push(data); 
                if(data['주야']=='주')
                    ju_sum++;
                else if(data['주야']=='야')
                    ya_sum++;    
             });


             setTimeout(() => {
                var juya_data=[ju_sum,ya_sum];
                var w = 300;
			    var h = 300;
                var outerRadius = w / 2;
			    var innerRadius = 0;
			    var arc = d3.arc()
						.innerRadius(innerRadius)
						.outerRadius(outerRadius);
                var pie = d3.pie();
                //Easy colors accessible via a 10-step ordinal scale
			    var color = d3.scaleOrdinal(d3.schemeCategory10);

			//부채꼴을 하나씩 담을 그룹을 생성한다
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);
			
			//그룹을 지정한다
			var arcs = svg.selectAll("g.arc")
						  .data(pie(juya_data))
						  .enter()
						  .append("g")
						  .attr("class", "arc")
						  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
			
			//호의 경로를 그린다
			arcs.append("path")
			    .attr("fill", function(d, i) {
			    	return color(i);
			    })
			    .attr("d", arc);
			
			//레이블을 단다
			arcs.append("text")
			    .attr("transform", function(d) {
			    	return "translate(" + arc.centroid(d) + ")";
			    })
			    .attr("text-anchor", "middle")
			    .text(function(d,i) {
                    if(i==0)
                        return "주간\n"+d.value;
                    else
                        return "야간\n"+d.value;
			    });
                
                }, 2000); 