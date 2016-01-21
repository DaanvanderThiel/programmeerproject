
breedteblokje = 10
hoogteblockje = 0.19
afstandtussenblokje = 0.04
counter = 0
colors = ["wheat","sandyBrown","seaGreen","grey","steelBlue","YellowGreen","Teal","red","green","yellow","purple","orange","blue","Turquoise"]
d3.hsl
window.onload = function() {
//https://github.com/twitter/typeahead.js
  var DATADICT = []
  var allYear = []
  var nummers = []
  HEIGHT = 12040
  WIDTH = 400
  WIDTHBLOCK = 20
  HEIGHTBLOCK = 4
  AFSTANDTUSSENBLOCK = 2
  breedteblokje = 10
  hoogteblockje = 0.19
  afstandtussenblokje = 0.04

  //console.log(document.getElementById("searchfield").innerHTML)
  d3.select("body").append("div").attr("class","slider").style("position","fixed").style("top", "100px").style("left", "400px")
  //tabel
  d3.select("body").append("ul").attr("class","tabel").style("position","fixed").style("top", "200px").style("left", "600px")

  var svgslider = d3.select(".slider")
                          .append("svg")
                          .attr("width", "600")
                          .attr("height", "500")
                          .attr("border",1)
                          .attr("class","slidersvg")
                          ;
                          var borderPath = svgslider.append("rect")
                          .attr("x", 0)
                          .attr("y", 0)
                          .attr("height","500")
                          .attr("width","600")
                          .style("stroke", "black")
                          .style("fill", "none")
                          .style("stroke-width", 1);

  jaren = [1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015]
  d3.select("body").append("h4").html("beweeg de muis over de rectangle voor de artiest en het nummer").attr("class","p2").style("padding-top","40px")
  d3.select(".p2").style("position","fixed").style("top", "30px").style("left", "400px")
  d3.json("json2000.json", function(data) {
  var data = data.map(function(d) {

      DATADICT.push({
        artiest: d[0],
        nummer: d[1],
        jaar: d[2],
        posities : [d[3],d[4],d[5],d[6],d[7],d[8],d[9],d[10],d[11],d[12],d[13],
        d[14],d[15],d[16],d[17],d[18],d[19]]
      });
      nummerArtiest = d[0]+ ":"+d[1]

      nummers.push(nummerArtiest)
      //console.log(DATADICT)
  });
  var svg = d3.select("body")
                       .append("svg")
                       .attr("width", WIDTH)
                       .attr("height", HEIGHT)
                       .attr("border",1)
                       .attr("transform","translate(0,30)")
                       ;
                       // zet alle posities neer
                       nummer = 0
                       for(var i = 0; i< 2000;i++){
                       nummer += 1
                       svg.append("text")
                         .attr("y", i*(HEIGHTBLOCK+AFSTANDTUSSENBLOCK)+10)
                         .attr("x", "10")
                         .attr("class", "positie")
                         .attr("font-family", "sans-serif")
                         .attr("font-size", "4px")
                         .style("position", "absolute")
                         .style("fill", "black")
                         .text(nummer)
                       }
                       // zet alle jaren neer
                       nummer = 1998
                       for(var i = 0; i< 17;i++){
                       nummer += 1
                       svg.append("text")
                         .attr("y", "4")
                         .attr("x", i*(WIDTHBLOCK+AFSTANDTUSSENBLOCK)+ 24)
                         .attr("class", "positie")
                         .attr("font-family", "sans-serif")
                         .attr("font-size", "4px")
                         .style("position", "fixed") // WERKT NIET ?? APARTE DIV AANMAKEN
                         .style("fill", "black")
                         .text(nummer)
                       }
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
       var rectangles = svg.selectAll('rect').data(allYear);
       rectangles.enter().append('rect')
        .attr('x', function(d) { return (d.jaartal - 1998) * (WIDTHBLOCK+2)})
        .attr('y', function(d)  { return (d.positie * (HEIGHTBLOCK+2)) } )
        .attr('width', WIDTHBLOCK)
        .attr('height', HEIGHTBLOCK)
        .attr('fill', function(d){return kleurBlock(d.nummer,d.artiest,d.positie,d.jaartal)})
        .attr('class', 'rectLabel')

        .on('mouseover', function(d) {
          d3.select(".p2").html(d.artiest + ":" + d.nummer);
            creatLine("path",d.nummer,d.artiest,WIDTHBLOCK,HEIGHTBLOCK,AFSTANDTUSSENBLOCK,"black")
            creatLine("path",d.nummer,d.artiest,breedteblokje,hoogteblockje,afstandtussenblokje,"black")

        })
        .on("click", function(d) {
          //kleurklik = colors[Math.floor((Math.random() * 7) )]
          kleurklik = d3.rgb(Math.floor((Math.random() * 245) +10),Math.floor((Math.random() * 245)+10 ),Math.floor((Math.random() * 245)+10 ))

          creatLine("clickLine",d.nummer,d.artiest,WIDTHBLOCK,HEIGHTBLOCK,AFSTANDTUSSENBLOCK,kleurklik)
          creatLine("clickLine",d.nummer,d.artiest,breedteblokje,hoogteblockje,afstandtussenblokje,kleurklik)
          d3.select("body").append("div").attr("class","clickShow").style("position","fixed").style("top", "150px").style("left", "650px")
          d3.select(".clickShow").html(d.artiest + ":" + d.nummer)
          d3.select(".tabel").append("li").text(d.artiest + ":" + d.nummer).style("color", kleurklik)
         })
        .on("mouseout", function(d) {
            svg.selectAll(".hover").remove();
            svg.selectAll(".path").remove()
            svgslider.selectAll(".path").remove()
            svgslider.selectAll(".hover").remove();
          })
          .on("dblclick", function(d) {
            document.getElementById('audioElement').play()
           })
function creatLine(path,nummer,artiest,breedteBlok,hoogteBlok,afstandTussenBlok,kleur){

  lineData = []
  for( var u= 0; u<DATADICT.length; u++){
    if (DATADICT[u].nummer == nummer && DATADICT[u].artiest == artiest){
  for (var i = 0; i < 17; i++) {
    if (!isNumeric(DATADICT[u].posities[i])){
    lineData = []
  }
    if (isNumeric(DATADICT[u].posities[i])){
    lineData.push({
      x: ((i+ 1) * (breedteBlok+afstandTussenBlok) + breedteBlok),
      y: ((DATADICT[u].posities[i]) * (hoogteBlok+afstandTussenBlok) + hoogteBlok)
    })
    tekenLine(path,lineData,breedteBlok,kleur)
      }
    if (isNumeric(DATADICT[u].posities[i+1]) && i+1 < 17){
    lineData.push({
      x: ((i+1) * (breedteBlok+afstandTussenBlok) + breedteBlok +afstandTussenBlok),
      y:  ((DATADICT[u].posities[i+1]) * (hoogteBlok+afstandTussenBlok) + hoogteBlok)
    })
    tekenLine(path,lineData,breedteBlok,kleur)
  }
}
}
}
}
  function tekenLine(path,lineData,breedteBlok,kleur){
  var line = d3.svg.line()
      .x(function(d){return d.x;})
      .y(function(d){return d.y;})
      .interpolate("linear");
 if (breedteBlok > 15){ // error
  svg.append("path")
      .attr("d", function(d) { return line(lineData)})
      .attr("transform", "translate(0,0)")
      .classed(path, true)
      .style("stroke-width", 2)
          .style("stroke", kleur)
          .style("fill", "none");
        }
  else{
    svgslider.append("path")
        .attr("d", function(d) { return line(lineData)})
        .attr("transform", "translate(0,0)")
        .classed(path, true)
        .style("stroke-width", 1)
            .style("stroke", kleur)
            .style("fill", "none");
  }

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
// maak de minimap

minimap()
function minimap(){
  var rectangles = svgslider.selectAll('rect').data(allYear);
  rectangles.enter().append('rect')
   .attr('x', function(d) { return (d.jaartal - 1998) * (breedteblokje+afstandtussenblokje)})
   .attr('y', function(d)  { return (d.positie * (hoogteblockje+afstandtussenblokje)) } )
   .attr('width', breedteblokje)
   .attr('height', hoogteblockje)
   .attr('fill', function(d){return kleurBlock(d.nummer,d.artiest,d.positie,d.jaartal)})
   .attr('class', 'rectLabel')

// zoek functie
   var substringMatcher = function(strs) {
     return function findMatches(q, cb) {
       var matches, substringRegex;

       // an array that will be populated with substring matches
       matches = [];

       // regex used to determine if a string contains the substring `q`
       substrRegex = new RegExp(q, 'i');

       // iterate through the pool of strings and for any string that
       // contains the substring `q`, add it to the `matches` array
       $.each(strs, function(i, str) {
         if (substrRegex.test(str)) {
           matches.push(str);
         }
       });

       cb(matches);
     };
   };

   $('#the-basics .typeahead').typeahead({
     hint: true,
     highlight: true,
     minLength: 1
   },
   {
     name: 'nummers',
     source: substringMatcher(nummers)
   });
   $('input.typeahead').on('typeahead:selected', function(event, selection) {
     data = selection.split(":")
       kleurklik = colors[Math.floor((Math.random() * 7) )]
     creatLine("clickLine",data[1],data[0],WIDTHBLOCK,HEIGHTBLOCK,AFSTANDTUSSENBLOCK,kleurklik)
     creatLine("clickLine",data[1],data[0],breedteblokje,hoogteblockje,afstandtussenblokje,kleurklik)
     d3.select(".tabel").append("li").text(data[1] + ":" + data[0]).style("color", kleurklik)
});
}
  }

});
}
