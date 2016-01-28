
colors = ["wheat", "sandyBrown", "seaGreen", "grey", "steelBlue", "YellowGreen", "Teal", "red", "green", "yellow", "purple", "orange", "blue", "Turquoise"]
d3.hsl
window.onload = function() {
  //https://github.com/twitter/typeahead.js
  var DATADICT = []
  var allYear = []
  var nummers2 = []
  var nummers = [];
  HEIGHT = 12070
  WIDTH = 400
  WIDTHBLOCK = 20
  HEIGHTBLOCK = 4
  AFSTANDTUSSENBLOCK = 2
  breedteBlok = 10
  hoogteBlok = 0.19
  afstandTussenBlok = 0.04

  //console.log(document.getElementById("searchfield").innerHTML)
  // maak div voor de slider
  d3.select("body").append("div").attr("class", "slider").style("position", "fixed").style("top", "100px").style("left", "400px")
  // maak div voor de legenda
  d3.select("body").append("div").attr("class", "legenda").style("position", "fixed").style("top", "50px").style("left", "400px")
    //tabel
  d3.select("body").append("ul").attr("class", "tabel").style("position", "fixed").style("top", "100px").style("left", "560px")
  // maak de legenda
  var legenda = d3.select(".legenda")
    .append("svg")
    .attr("width", "600")
    .attr("height","50")
    legenda.append("rect")
                          .attr("x", 300)
                          .attr("y", 15)
                          .attr("width", WIDTHBLOCK)
                          .attr("height", HEIGHTBLOCK)
                          .attr("fill","Green");
    legenda.append("rect")
                        .attr("x", 10)
                        .attr("y", 15)
                        .attr("width", WIDTHBLOCK)
                        .attr("height", HEIGHTBLOCK)
                        .attr("fill","red");
  legenda.append("text")
                    .text("Nummer kwam het vorige jaar niet voor")
                    .attr("x", 325)
                    .attr("y", 22)
  legenda.append("text")
                    .text("Nummer komt het volgende jaar niet terug")
                    .attr("x", 35)
                    .attr("y", 22)
  // maak slider aan
  var svgslider = d3.select(".slider")
    .append("svg")
    .attr("width", "600")
    .attr("height", "500")
    .attr("border", 1)
    .attr("class", "slidersvg");
    // zet er een lijn omheen
  var borderPath = svgslider.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", "500")
    .attr("width", "600")
    .style("stroke", "black")
    .style("fill", "none")
    .style("stroke-width", 1);

  d3.select("body").append("h4").html("beweeg de muis over de rechthoeken voor de artiest en het nummer").attr("class", "p2")
  d3.select(".p2").style("position", "fixed").style("top", "70px").style("left", "400px")
  // laad de data in
  d3.json("json2000.json", function(data) {
    var data = data.map(function(d) {
      DATADICT.push({
        artiest: d[0],
        nummer: d[1],
        jaar: d[2],
        posities: [d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13],
          d[14], d[15], d[16], d[17], d[18], d[19]
        ]
      });
      nummerArtiest = d[0] + ":" + d[1]
      nummers2.push(d[0])
      nummers2.push(nummerArtiest)
    });
    //http://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
    $.each(nummers2, function(i, el){
    if($.inArray(el, nummers) === -1) nummers.push(el);
    });
    var svg = d3.select("body")
      .append("svg")
      .attr("width", WIDTH)
      .attr("height", HEIGHT)
      .attr("border", 1)
      .style("postion","relative")
      .attr("transform", "translate(0,55)");
    // zet alle posities neer
    nummer = 0
    for (var i = 0; i < 2000; i++) {
      nummer += 1
      svg.append("text")
        .attr("y", i * (HEIGHTBLOCK + AFSTANDTUSSENBLOCK) + 10)
        .attr("x", "10")
        .attr("class", "positie")
        .attr("font-family", "sans-serif")
        .attr("font-size", "4px")
        .style("fill", "black")
        .text(nummer)
    }


    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }


      //console.log(DATADICT)
      for (var p = 3; p < 20; p++) {
        for (var z = 0; z < 4094; z++) {
          if (isNumeric(DATADICT[z].posities[p - 3])) {
            allYear.push({
              jaartal: 1996 + p,
              nummer: DATADICT[z].nummer,
              artiest: DATADICT[z].artiest,
              positie: DATADICT[z].posities[p - 3]
            })
          }
        }
      }
      console.log(allYear)
      var rectangles = svg.selectAll('rect').data(allYear);
      rectangles.enter().append('rect')
        .attr('x', function(d) {
          return (d.jaartal - 1998) * (WIDTHBLOCK + 2)
        })
        .attr('y', function(d) {
          return (d.positie * (HEIGHTBLOCK + 2))
        })
        .attr('width', WIDTHBLOCK)
        .attr('height', HEIGHTBLOCK)
        .attr('fill', function(d) {
          return kleurBlock(d.nummer, d.artiest, d.positie, d.jaartal)
        })
        .attr('class', 'rectLabel')

      .on('mouseover', function(d) {
          d3.select(".p2").html(d.artiest + ":" + d.nummer);
          creatLine("path", d.nummer, d.artiest,false)

        })
        .on("click", function(d) {
          creatLine("clickLine", d.nummer, d.artiest,true)
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

      function creatLine(path, nummer, artiest,tekenKleur) {
        for (var u = 0; u < DATADICT.length; u++) {
          if (nummer == undefined ? DATADICT[u].artiest == artiest : (DATADICT[u].nummer == nummer && DATADICT[u].artiest == artiest)) {
            if(tekenKleur) {
              kleur = d3.rgb(Math.floor((Math.random() * 180) + 20), Math.floor((Math.random() * 180) + 20), Math.floor((Math.random() * 180 + 20)))
              d3.select(".tabel").append("li").text(DATADICT[u].artiest + ":" + DATADICT[u].nummer).style("color", kleur)
            }
            else {
              kleur = "#000000";
            }
            for (var i = 0; i < 17; i++) {
              if (!isNumeric(DATADICT[u].posities[i]) || i == 0) { // fout sajfewjoiosfdoijf
                lineData = []
                lineData2 = []
              }
              if (isNumeric(DATADICT[u].posities[i])) {
                lineData.push({
                  x: ((i + 1) * (WIDTHBLOCK + AFSTANDTUSSENBLOCK) + WIDTHBLOCK),
                  y: ((DATADICT[u].posities[i]) * (HEIGHTBLOCK + AFSTANDTUSSENBLOCK) + HEIGHTBLOCK)
                })
                lineData2.push({
                  x: ((i + 1) * (breedteBlok + afstandTussenBlok) + breedteBlok),
                  y: ((DATADICT[u].posities[i]) * (hoogteBlok + afstandTussenBlok) + hoogteBlok)
                })
                tekenLine(path, lineData,20, kleur)
                tekenLine(path, lineData2, 10, kleur)
              }
                lineData.push({
                  x: ((i + 1) * (WIDTHBLOCK + AFSTANDTUSSENBLOCK) + WIDTHBLOCK + AFSTANDTUSSENBLOCK),
                  y: ((DATADICT[u].posities[i+1]) * (HEIGHTBLOCK + AFSTANDTUSSENBLOCK) + HEIGHTBLOCK)
                })
                if (isNumeric(DATADICT[u].posities[i + 1]) && i + 1 < 17) {
                  lineData2.push({
                    x: ((i + 1) * (breedteBlok + afstandTussenBlok) + breedteBlok + afstandTussenBlok),
                    y: ((DATADICT[u].posities[i + 1]) * (hoogteBlok + afstandTussenBlok) + hoogteBlok)
                  })
                tekenLine(path, lineData, 20, kleur)
                tekenLine(path, lineData2, 10, kleur)
              }
            }
          }
        }
      }

      function tekenLine(path, data, breedteBlok, kleur) {
        var line = d3.svg.line()
          .x(function(d) {return d.x;})
          .y(function(d) {return d.y;})
          .interpolate("linear");
        if (breedteBlok > 15) { // error
          svg.append("path")
            .attr("d", function(d) {return line(data)})
            .attr("transform", "translate(0,0)")
            .classed(path, true)
            .style("stroke-width", 2)
            .style("stroke", kleur)
            .style("fill", "none");
        } else {
          svgslider.append("path")
            .attr("d", function(d) {return line(data)})
            .attr("transform", "translate(0,0)")
            .classed(path, true)
            .style("stroke-width", 1)
            .style("stroke", kleur)
            .style("fill", "none");
        }

      }

      function kleurBlock(nummer, artiest, positie, jaartal) {
        q = jaartal - 1999
        for (var u = 0; u < DATADICT.length; u++) {
          if (DATADICT[u].nummer == nummer && DATADICT[u].artiest == artiest) {
            if (q > 0 && !isNumeric(DATADICT[u].posities[q - 1])) {
              return "green"
            } else if (!isNumeric(DATADICT[u].posities[q + 1]) && q != 16) {
              return "red"
            } else {
              return "grey"
            }
          }
        }
      }
      console.log(allYear, "allyear")
      console.log(DATADICT, "DATADICT")
        // maak de minimap

      minimap()

      function minimap() {
        var rectangles = svgslider.selectAll('rect').data(allYear);
        rectangles.enter().append('rect')
          .attr('x', function(d) {
            return (d.jaartal - 1998) * (breedteBlok + afstandTussenBlok)
          })
          .attr('y', function(d) {
            return (d.positie * (hoogteBlok + afstandTussenBlok))
          })
          .attr('width', breedteBlok)
          .attr('height', hoogteBlok)
          .attr('fill', function(d) {
            return kleurBlock(d.nummer, d.artiest, d.positie, d.jaartal)
          })
          .attr('class', 'rectLabel')

        // zoek functie
        // https://github.com/twitter/typeahead.js
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
        }, {
          name: 'nummers',
          source: substringMatcher(nummers)
        });
        $('input.typeahead').on('typeahead:selected', function(event, selection) {

          data = selection.split(":")
          console.log(data[0], data[1])
          kleurklik = colors[Math.floor((Math.random() * 7))]
          creatLine("clickLine", data[1], data[0],true)

        });
      }

  window.verwijderLijnen = function(){
    svg.selectAll(".clickLine").remove()
    svgslider.selectAll(".clickLine").remove()
    d3.select(".tabel").selectAll("li").remove()
  }
      });
      // zet alle jaren neer
      d3.select("body").append("div").attr("class", "jaartal").style("position", "fixed").style("top", "50px").style("left", "5px")
      nummer = 1998
      var svgjaartal = d3.select(".jaartal")
        .append("svg")
        .attr("width", "500")
        .attr("height", "20")
        .attr("border", 1)
        .attr("class", "slidersvg");
      for (var i = 0; i < 17; i++) {
        nummer += 1
        svgjaartal.append("text")
          .attr("y", "7")
          .attr("x", i * (WIDTHBLOCK + AFSTANDTUSSENBLOCK) + 24)
          .attr("class", "positie")
          .attr("font-family", "sans-serif")
          .attr("font-size", "4px")
          .style("fill", "black")
          .text(nummer);
      }
}
