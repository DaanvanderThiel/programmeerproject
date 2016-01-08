window.onload = function() {
  delay = 2000
  mapYear = 1987
  years = [1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,
    1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013]

  d3.select("body").append("h1").html("press a country for life expectancy per year").attr("class","p2")
  d3.select(".p2").style("position","fixed").style("top", "20px").style("right", "10px").style("left", "900px")

  var dataDict = []

  d3.select("#nRadius-value").text(mapYear);
  d3.json("allDataWithout0.json", function(data) {
  var data = data.map(function(d) {

    k = 0
    var l = []
    for (var p = 0; p < years.length;p++){

      dataDict.push( {
        year: years[k],
        countryCode: (d[0]),
        lifeExpectancy: d[k+1]

      });
      k++
      console.log(dataDict)
    }
  });
  console.log(dataDict[0])
  lengthdataDict = dataDict.length
  var map = new Datamap({
          element: document.getElementById('container'),
          fills: {
              HIGH: '#afafaf',
              LOW: '#123456',
              MEDIUM: 'blue',
              UNKNOWN: 'rgb(0,0,0)',
              defaultFill: 'grey'
          },
          done: function(map) {
              map.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                  createLinegraph(geography.id,geography.properties.name);
              })
          },
          geographyConfig: {
        popupTemplate: function(geo, data) {
            return ['<div class="hoverinfo"><strong>',
                      geo.properties.name, // geo.id geeft de key bijv. USA
                    '</strong></div>'].join('');
        }

    }
      });
      function drawMap(mapYear){
    for(var i = 0;i<lengthdataDict; i++ ){
      if (dataDict[i].year == mapYear){
        if (dataDict[i].lifeExpectancy <= 45){
            map.updateChoropleth({
                [dataDict[i].countryCode] : 'DarkRed' // vrange waarom een [] element?? http://stackoverflow.com/questions/2274242/using-a-variable-for-a-key-in-a-javascript-object-literal
            })
        }
        else if (dataDict[i].lifeExpectancy <= 50 && dataDict[i].lifeExpectancy > 45) {
          map.updateChoropleth({
              [dataDict[i].countryCode] : 'red',
              lifeExpectancy: dataDict[i].lifeExpectancy
          })
        }
        else if (dataDict[i].lifeExpectancy <= 55 && dataDict[i].lifeExpectancy > 50) {
          map.updateChoropleth({
              [dataDict[i].countryCode] : 'orangeRed',
              lifeExpectancy: dataDict[i].lifeExpectancy
          })

        }

        else if (dataDict[i].lifeExpectancy <= 60 && dataDict[i].lifeExpectancy > 55) {
          map.updateChoropleth({
              [dataDict[i].countryCode] : 'orange'
          })
        }
        else if (dataDict[i].lifeExpectancy <= 65 && dataDict[i].lifeExpectancy > 60) {
          map.updateChoropleth({
              [dataDict[i].countryCode] : 'yellow'
          })
        }
        else if (dataDict[i].lifeExpectancy <= 70 && dataDict[i].lifeExpectancy > 65) {
          map.updateChoropleth({
              [dataDict[i].countryCode] : 'YellowGreen'
          })
        }
        else if (dataDict[i].lifeExpectancy <= 75 && dataDict[i].lifeExpectancy > 70) {
          map.updateChoropleth({
              [dataDict[i].countryCode] : 'lightgreen'
          })
        }
        else if (dataDict[i].lifeExpectancy <= 80 && dataDict[i].lifeExpectancy > 75) {
          map.updateChoropleth({
              [dataDict[i].countryCode] : 'green'
          })
        }
        else if (dataDict[i].lifeExpectancy > 80) {
          map.updateChoropleth({
              [dataDict[i].countryCode] : 'DarkGreen'
          })
        }
      }
    }
    }
  drawMap(mapYear)
  // update the map when a different country is selected
  d3.select("#nRadius").on("input", function() {
    mapYear = this.value
    d3.select("#nRadius-value").text(mapYear);;
    drawMap(mapYear)
      });

// This function creates the line graph
  function createLinegraph(countryId,countryName){
  d3.select(".svgmap").remove()
  d3.select(".p2").html("life expectancy of" +  ' ' + countryName +' ' +  "from 1960-2013");
  allYear = []
  values = []
  // get the data for the given country
    for( var z = 0; z < dataDict.length; z++){
      if (dataDict[z].countryCode == countryId){
        values.push(dataDict[z].lifeExpectancy)
        allYear.push({
          year: dataDict[z].year,
          lifeExpectancy: dataDict[z].lifeExpectancy
        }

        )
      }
    }

    var margin = {top: 40, right: 80, bottom: 60, left: 50},
        width = 700 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width])
        .domain([1960,2013]);

    var y = d3.scale.linear()
        .range([height, 0])
        .domain([d3.min(values),d3.max(values)]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.format("d"));
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .x(function(d) { return x(d.year); }) // >>>????
        .y(function(d) { return y(d.lifeExpectancy); });

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("position", "absolute")
        .style("top", "40px")
        .style("right", "10px")
        .style("left", "800px")
        .attr("class", "svgmap")
        .on("mousemove", mousemove)
        .on("mouseover",function() { focus.style("display", null) ; focus2.style("display",null);lineX.style("display",null);})
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("average life expectancy");

    svg.append("path")
        .attr("class", "line")
        .attr("d", line(allYear));

        var focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("text")
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("y",-20)
        var focus2 = svg.append("g")
            .attr("class","focus2")
            .style("display","none")

        focus2.append("text")
            .attr("x", 30)
            .attr("dy", ".35em")
            .attr("y", 20)

        var lineX = svg.append("line")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .style("display","none");

        var lineY = svg.append("line") // x-as durp
            .attr("y1", 0)
            .attr("y2", height)
            .attr("stroke-width", 2)
            .attr("stroke", "black");

        function mousemove() {

          hardx = d3.mouse(this)[0] - margin.left
          var x0 = Math.round(x.invert(d3.mouse(this)[0] - margin.left))
          for( var v = 0; v < allYear.length; v++){
            if (allYear[v].year == x0){
              y0 = allYear[v].lifeExpectancy
            }
          }

          focus.attr("transform", "translate(" +  hardx + "," + y(y0) + ")");
          focus2.attr("transform", "translate(" +  hardx + "," + y(y0) + ")");

          lineX.attr("y1",y(y0));
          lineX.attr("y2",y(y0));

          lineY.attr("x1",hardx);
          lineY.attr("x2",hardx);
          focus.select("text").text("");
          focus2.select("text").text("");
          timeOut = setTimeout(function() {
            focus.select("text").text(y0);
            focus2.select("text").text(x0);
          },delay)

        }

}

});
function getLifeExpectation(country){
  for(var i = 0;i < lengthdataDict; i++ ){

if (dataDict[i].countryCode == country && dataDict[i].year == mapYear){
return dataDict[i].lifeExpectancy;

}
}
};
}
