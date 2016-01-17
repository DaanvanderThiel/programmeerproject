window.onload = function() {
  var DATADICT = []
  var allYear = []
  jaren = [1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015]
  d3.json("json2000.json", function(data) {
  var data = data.map(function(d) {

      DATADICT.push({
        artiest: d[0],
        nummer: d[1],
        jaar: d[2],
        posities : [d[3],d[4],d[5],d[6],d[7],d[8],d[9],d[10],d[11],d[12],d[13],
        d[14],d[15],d[16],d[17],d[18],d[19]]
      });
      //console.log(DATADICT)
  });

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

  maakKolom(DATADICT)
  //console.log(DATADICT)
  function maakKolom(data) {
    for (var p = 3; p <jaren.length+3; p++){
        for (var i = 0; i < DATADICT.length ; i++){

        if (isNumeric(DATADICT[i].posities[p-3])){
          allYear.push({
            jaartal: 1996+p,
            nummer: DATADICT[i].nummer,
            artiest: DATADICT[i].artiest,
            positie:DATADICT[i].posities[p-3]
        })
      }

     }
   }
   // zelfde nummer :(
       var rectangles = svg.selectAll('rect').data(allYear);
       rectangles.enter().append('rect')
        .attr('x', function(d) { return (d.jaartal - 1998) * 65})
        .attr('y', function(d)  { return (d.positie * 20) } )
        .attr('width', WIDTHBLOCK)
        .attr('height', HEIGHTBLOCK)
        .attr('fill', function(d){return kleurBlock(d.nummer,d.artiest,d.positie,d.jaartal)})
        .attr('class', 'rectLabel')
        .text(function(d) { return d.nummer })
        .on('mouseover', function(d) {
          svg.append("text")
            .attr("y", "30")
            .attr("x", "300")
            .attr("class", "hover")
            .attr("font-family", "sans-serif")
            .attr("font-size", "48px")
            .style("position", "absolute")
            .style("fill", "red")
            .text (d.artiest + ":" + d.nummer);
            creatLine("path",d.nummer,d.artiest)

        })
        .on("click", function(d) {
        creatLine("clickLine",d.nummer,d.artiest)
         })
        .on("mouseout", function(d) {
            svg.selectAll(".hover").remove();
            svg.selectAll(".path").remove()
          })
          .on("dblclick", function(d) {
            document.getElementById('audioElement').play()
           })
function creatLine(path,nummer,artiest){
  lineData = []
  for( var u= 0; u<DATADICT.length; u++){
    if (DATADICT[u].nummer == nummer && DATADICT[u].artiest == artiest){
  for (var i = 0; i < 17; i++) {
    if (!isNumeric(DATADICT[u].posities[i])){
    lineData = []
  }
    if (isNumeric(DATADICT[u].posities[i])){
    lineData.push({
      x: ((i+ 1) * 65 + WIDTHBLOCK),
      y: ((DATADICT[u].posities[i]) * 20 + HEIGHTBLOCK)
    })
    tekenLine(path,lineData)
      }
    if (isNumeric(DATADICT[u].posities[i+1]) && i+1 < 17){
    lineData.push({
      x: ((i+1) * 65 + WIDTHBLOCK +15),
      y:  ((DATADICT[u].posities[i+1]) * 20 + HEIGHTBLOCK)
    })
    tekenLine(path,lineData)
  }
}
}
}
}
  function tekenLine(path,lineData){
  var line = d3.svg.line()
      .x(function(d){return d.x;})
      .y(function(d){return d.y;})
      .interpolate("linear");
  svg.append("path")
      .attr("d", function(d) { return line(lineData)})
      .attr("transform", "translate(0,0)")
      .classed(path, true)
      .style("stroke-width", 2)
          .style("stroke", "black")
          .style("fill", "none");
  svg.append("text")
          .attr("y", "30")
          .attr("x", "30")
          .classed(path, true)
          .attr("font-family", "sans-serif")
          .attr("font-size", "48px")
          .style("fill", "red")
          // aanpassen!!

}
function kleurBlock(nummer,artiest,positie,jaartal){
  q = jaartal - 1999
  for( var u= 0; u<DATADICT.length; u++){
    if (DATADICT[u].nummer == nummer && DATADICT[u].artiest == artiest){
      if (q > 0 && !isNumeric(DATADICT[u].posities[q-1])){
        return "green"
      }
        else if (!isNumeric(DATADICT[u].posities[q+1]) && q != 16){
          return "red"
      }
        else {
          return "grey"
        }
      }
  }
}
console.log(allYear , "allyear")
console.log(DATADICT , "DATADICT")
  }

});


}
