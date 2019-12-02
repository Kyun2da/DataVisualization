
//데이터셋 만들기
dataset=[];
function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }
  var k=0;
for(var y=2012; y<=2018; y++)
{
  for(var i =1; i<=12; i++)
  {
     if(i==1 || i==3 || i==5 || i==7 || i==8 || i==10 || i==12)
     {
        for(var j =1; j<=31; j++)
        {
           dataset[k]={'Date' : y+'-'+pad(i,2)+'-'+pad(j,2), '사망자수':0, '사고수' : 0, '사상자수' : 0};
           k++;
        }
     }
     else if (i==2)
     {
         if(y!=2012 && y!=2016)
         {
            for(var j =1; j<=28; j++)
            {
                dataset[k]={'Date' : y+'-'+pad(i,2)+'-'+pad(j,2), '사망자수':0, '사고수' : 0, '사상자수' : 0};
                k++;
            }
        }
        else{
            for(var j =1; j<=29; j++)
            {
                dataset[k]={'Date' : y+'-'+pad(i,2)+'-'+pad(j,2), '사망자수':0, '사고수' : 0, '사상자수' : 0};
                k++;
            }
        }
     }
     else{
        for(var j =1; j<=30; j++)
        {
           dataset[k]={'Date' : y+'-'+pad(i,2)+'-'+pad(j,2), '사망자수':0, '사고수' : 0, '사상자수' : 0};
           k++;
        }
     }
    
  }
}

 //2018년 데이터파싱
 d3.csv("/accident.csv", function(d){
                    
   
    for(var i =0; i<2557; i++)
       if(d['발생년월일시분']==dataset[i].Date)
       {
          dataset[i].사고수+=1;
          dataset[i].사상자수+=parseInt(d['사상자수']);
          dataset[i].사망자수+=parseInt(d['사망자수']);
          break;
       }  
  });
  //2012~2014년 데이터 파싱
  d3.csv("/accident_2012to2014.csv", function(d){
                    
   
    for(var i =0; i<2557; i++)
       if(d['발생년월일시분']==dataset[i].Date)
       {
          dataset[i].사고수+=1;
          dataset[i].사상자수+=parseInt(d['사상자수']);
          dataset[i].사망자수+=parseInt(d['사망자수']);
          break;
       }  
  });

  //2015년 데이터파싱
  d3.csv("/accident_2015.csv", function(d){
                    
   
    for(var i =0; i<2557; i++)
       if(d['발생년월일시분']==dataset[i].Date)
       {
          dataset[i].사고수+=1;
          dataset[i].사상자수+=parseInt(d['사상자수']);
          dataset[i].사망자수+=parseInt(d['사망자수']);
          break;
       }  
  });

  //2016년 데이터파싱
  d3.csv("/accident_2016.csv", function(d){
                    
   
    for(var i =0; i<2557; i++)
       if(d['발생년월일시분']==dataset[i].Date)
       {
          dataset[i].사고수+=1;
          dataset[i].사상자수+=parseInt(d['사상자수']);
          dataset[i].사망자수+=parseInt(d['사망자수']);
          break;
       }  
  });

  //2017년 데이터 파싱
  d3.csv("/accident_2017.csv", function(d){
                    
   
    for(var i =0; i<2557; i++)
       if(d['발생년월일시분']==dataset[i].Date)
       {
          dataset[i].사고수+=1;
          dataset[i].사상자수+=parseInt(d['사상자수']);
          dataset[i].사망자수+=parseInt(d['사망자수']);
          break;
       }  
  });
  var color=['red','orange','yellow','springgreen','dodgerblue','purple','lightgrey'];
  var year_name=['2012','2013','2014','2015','2016','2017','2018'];
  var w=4000;
  var h=3000;
  setTimeout(() => {
    console.log(dataset);
    // var svg = d3.select("body")
    //             .append("svg")
    //             .attr("width",w)
    //             .attr("height",h);

    // svg.selectAll("circle")
    //     .data(dataset)
    //     .enter()
    //     .append("circle")

    //     .attr("cx",function(d,i){
    //         return Math.sqrt();
    //     })
    //     .attr("cy",function(d,i){
    //         return i*5;
    //     })
    //     .attr("r",function(d){
    //         return d.사상자수/2;
    //     });
    
    //시뮬레이션은 힘의 집합이다 즉 원들을 모아줄수있게해줌
    var simulation = d3.forceSimulation()
        .force("x",d3.forceX(w/2).strength(0.05))
        .force("y",d3.forceY(h/2).strength(0.05))
        .force("collide",d3.forceCollide(function(d){
            return d.사상자수;
        }))

    var radiusScale = d3.scaleSqrt().domain([1,300]).range([10,80])
    var svg = d3.select("#chart")
        .append("svg")
        .attr("height",h)
        .attr("width",w)
        .append("g")
        .attr("transform","translate(0,0)");

    var circles= svg.selectAll(".artist")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("class","artist")
        .attr("r",function(d){
            return d.사상자수/2;
        })
        .attr("fill",function(d){
            if(d.Date.substr(0,4)=='2012')
            {
                return color[0];
            }
            else if(d.Date.substr(0,4)=='2013')
            {
                return color[1];
            }
            else if(d.Date.substr(0,4)=='2014')
            {
                return color[2];
            }
            else if(d.Date.substr(0,4)=='2015')
            {
                return color[3];
            }
            else if(d.Date.substr(0,4)=='2016')
            {
                return color[4];
            }
            else if(d.Date.substr(0,4)=='2017')
            {
                return color[5];
            }
            else if(d.Date.substr(0,4)=='2018')
            {
                return color[6];
            }
            
        })
        .on("mouseover",function(d){
            var xPosition = parseFloat(d3.select(this).attr("x"))+ 14;
            var yPosition = parseFloat(d3.select(this).attr("y")) + 14;
   
            d3.select("#tooltip2")
                           .style("left", 1800 + "px")
                           .style("top", 100 + "px")						
                           .select("#value")
                     .text(d.사고수+"개   "+d.사상자수+"명   "+d.Date);
   
            d3.select("#tooltip2").classed("hidden", false);
         })
         .on("mouseout",function(){
            d3.select("#tooltip2").classed("hidden", true);
         });

    simulation.nodes(dataset)
        .on('tick',ticked);
    function ticked(){
        circles
            .attr("cx",function(d){
                return d.x
            })
            .attr("cy",function(d){
                return d.y
            })
    };

    //색깔에 대한 설명을 위한 circle 레이블 달기
    for(var i=0; i<7; i++)
    {
       svg.append("circle")
       .attr("cx",200*i+200)
       .attr("cy",100)
       .attr("r",100)
       .attr("fill",color[i]);
      
       svg.append("text")
       .text(year_name[i])
       .attr("x",200*i+150)
       .attr("y",100)
       .attr("font-family","sans-serif")
       .attr("font-size","50px")
       .attr("fill","black");
    }
}, 2000);