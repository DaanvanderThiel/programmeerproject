window.onload = function() {
  var dataDict = []
  var oneYear = []
  var allYear = []
  jaren = [1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015]
  d3.json("json2000.json", function(data) {
  var data = data.map(function(d) {

      dataDict.push({
        artiest: d[0],
        nummer: d[1],
        jaar: d[2],
        posities : [d[3],d[4],d[5],d[6],d[7],d[8],d[9],d[10],d[11],d[12],d[13],
        d[14],d[15],d[16],d[17],d[18],d[19]]
      });
      //console.log(dataDict)
  });
  l = dataDict[0]
  console.log(dataDict[0])
  console.log(l.j2009)
  for (var i = 0; i < dataDict.length ; i++){
    if (dataDict[i].posities[0] != "*" && dataDict[i].posities[0] != "-"){
      oneYear.push({
        jaartal: 1999,
        nummer: dataDict[i].nummer,
        positie:dataDict[i].posities[0]
      })

    }

  }
  console.log(oneYear)
  HEIGHT = 40100
  WIDTH = 1500
  WIDTHBLOCK = 50
  HEIGHTBLOCK = 10
  var svg = d3.select("body")
                       .append("svg")
                       .attr("width", WIDTH)
                       .attr("height", HEIGHT)
                       .attr("border",1)
                       ;

           var borderPath = svg.append("rect")
           .attr("x", 0)
           .attr("y", 0)
           .attr("height",HEIGHT)
           .attr("width",WIDTH)
           .style("stroke", "black")
           .style("fill", "none")
           .style("stroke-width", 1);
           function isNumeric(n) {
             return !isNaN(parseFloat(n)) && isFinite(n);
           }

  maakKolom(dataDict)
  //console.log(dataDict)
  function maakKolom(data) {
console.log("hier");
   // zelfde nummer :(
    var rectangles = svg.selectAll('rect').data(dataDict);
   for(var m = 0; m < dataDict.length; m++){
     for (var l = 0; l < 17; l++){
       console.log((dataDict[m].posities[l]))
       if(isNumeric(dataDict[m].posities[l])){
       console.log((l+1) * 65)

       rectangles.append('rect')
        .attr('x', 65)
        .attr('y', 20)
        .attr('width', WIDTHBLOCK)
        .attr('height', HEIGHTBLOCK)
        .attr('fill', 'gray')
        .attr('class', 'rectLabel')
        .text(function(d) { return d.nummer })
        .on('mouseover', function(d) {
          svg.append("text")
            .attr("y", "30")
            .attr("x", "300")
            .attr("class", "hover")
            .attr("font-family", "sans-serif")
            .attr("font-size", "48px")
            .style("fill", "red")
            .text ("hello aanpassen")
        })
        .on("mouseout", function(d) {
            svg.selectAll(".hover").remove();
          })
}
}
}
// function coordinates(dataDict,path,nummer){
//   lineData = []
//   for( var u= 0; u<dataDict.length; u++){
//     if (dataDict[u].nummer == nummer){
//   for (var i = 0; i < 17; i++) {
//     if (isNumeric(dataDict[u].posities[i])){
//     lineData.push({
//       x: ((i+ 1) * 65 + WIDTHBLOCK),
//       y: ((dataDict[u].posities[i]) * 20 + HEIGHTBLOCK)
//     })
//       }
//     if (isNumeric(dataDict[u].posities[i+1]) && i+1 < 17){
//     lineData.push({
//       x: ((i+1) * 65 + WIDTHBLOCK +15),
//       y:  ((dataDict[u].posities[i+1]) * 20 + HEIGHTBLOCK)
//     })
//   }
//
//   var line = d3.svg.line()
//       .x(function(d){return d.x;})
//       .y(function(d){return d.y;})
//       .interpolate("linear");
//   svg.append("path")
//       .attr("d", function(d) { return line(lineData)})
//       .attr("transform", "translate(0,0)")
//       .classed(path, true)
//       .style("stroke-width", 2)
//           .style("stroke", "black")
//           .style("fill", "none");
//   svg.append("text")
//           .attr("y", "30")
//           .attr("x", "30")
//           .classed(path, true)
//           .attr("font-family", "sans-serif")
//           .attr("font-size", "48px")
//           .style("fill", "red")
//           .text (nummer)
//   }
// }
// }
// }

console.log(allYear , "allyear")
console.log(dataDict , "dataDict")
  }

});



}
