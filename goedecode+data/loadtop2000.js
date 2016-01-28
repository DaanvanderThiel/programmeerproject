window.onload = function() {
  // de functies voor de buttons. Selecteert de nummers waarbij het verwante verschil te zien is
  window.selecteerNummers = function(){
      createLine("clickLine", "Mag ik dan bij jou", "Claudia de Breij",true)
      createLine("clickLine", "Redemption Song","Bob Marley",true)
  }
  window.selecteerNummers1999 = function(){
      createLine("clickLine", "Everybody Hurts", "R.E.M.",true)
      createLine("clickLine", "Con te partirò","Andrea Bocelli",true)
  }
  window.selecteerJohn = function(){
      createLine("clickLine", "Imagine", "John Lennon",true)
  }
  //https://github.com/twitter/typeahead.js
  // globale variabelen en arrays
  var dataDict = []
  var allYear = []
  var nummers2 = []
  var nummers = []
  height = 12070
  width = 400
  widthBlock = 20
  heightBlock = 4
  afstandtussenBlock = 2
  breedteBlok = 10
  hoogteBlok = 0.19
  afstandtussenBlok = 0.04

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
    // groen blok voor de legenda
    legenda.append("rect")
                          .attr("x", 300)
                          .attr("y", 15)
                          .attr("width", widthBlock)
                          .attr("height", heightBlock)
                          .attr("fill","Green");
    // rood blok voor de legenda
    legenda.append("rect")
                        .attr("x", 10)
                        .attr("y", 15)
                        .attr("width", widthBlock)
                        .attr("height", heightBlock)
                        .attr("fill","red");
  // text voor de legenda
  legenda.append("text")
                    .text("Nummer kwam het vorige jaar niet voor")
                    .attr("x", 325)
                    .attr("y", 22)
  // text voor de legenda
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
  // text voor het gebruik van de site
  d3.select("body").append("h4").html("beweeg de muis over de rechthoeken voor de artiest en het nummer").attr("class", "p2").style("position", "fixed").style("top", "70px").style("left", "400px")
  // laad de data in
  d3.json("json2000.json", function(data) {
    var data = data.map(function(d) {
      dataDict.push({
        artiest: d[0],
        nummer: d[1],
        jaar: d[2],
        posities: [d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13],
          d[14], d[15], d[16], d[17], d[18], d[19]
        ]
      });
      // array voor zoekfunctie
      nummerArtiest = d[0] + ":" + d[1]
      nummers2.push(d[0])
      nummers2.push(nummerArtiest)
    });
    //http://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
    // zorgt voor geen duplicatin in array
    $.each(nummers2, function(i, el){
    if($.inArray(el, nummers) === -1) nummers.push(el);
    });
    // svg voor hoofd visualisatie
    var svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("border", 1)
      .style("postion","relative")
      .attr("transform", "translate(0,55)");
    // zet alle posities neer
    nummer = 0
    for (var i = 0; i < 2000; i++) {
      nummer += 1
      svg.append("text")
        .attr("y", i * (heightBlock + afstandtussenBlock) + 10)
        .attr("x", "10")
        .attr("class", "positie")
        .attr("font-family", "sans-serif")
        .attr("font-size", "4px")
        .style("fill", "black")
        .text(nummer)
    }

    // kijk of n nummeric is
    //http://stackoverflow.com/questions/9716468/is-there-any-function-like-isnumeric-in-javascript-to-validate-numbers
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    // schrijf de data om zodat dit makkelijk doormiddel van d3 ingeladen en gebruikt kan worden
      for (var p = 3; p < 20; p++) {
        for (var z = 0; z < 4094; z++) {
          if (isNumeric(dataDict[z].posities[p - 3])) {
            allYear.push({
              jaartal: 1996 + p,
              nummer: dataDict[z].nummer,
              artiest: dataDict[z].artiest,
              positie: dataDict[z].posities[p - 3]
            })
          }
        }
      }
      // teken alle rechthoeken en zet attributen bijv. mouseover etc.
      var rectangles = svg.selectAll('rect').data(allYear);
      rectangles.enter().append('rect')
        .attr('x', function(d) {
          return (d.jaartal - 1998) * (widthBlock + 2)
        })
        .attr('y', function(d) {
          return (d.positie * (heightBlock + 2))
        })
        .attr('width', widthBlock)
        .attr('height', heightBlock)
        .attr('fill', function(d) {
          return kleurBlock(d.nummer, d.artiest, d.positie, d.jaartal)
        })
        .attr('class', 'rectLabel')

      .on('mouseover', function(d) {
          d3.select(".p2").html(d.artiest + ":" + d.nummer);
          createLine("path", d.nummer, d.artiest,false)

        })
        .on("click", function(d) {
          createLine("clickLine", d.nummer, d.artiest,true)
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
      // maakt de coordinaten die zo makkelijk doorgegeven kunnen worden aan de d3 functie d3.svg.line()
      window.createLine = function(path, nummer, artiest,tekenKleur) {
        for (var u = 0; u < dataDict.length; u++) {
          // als er geen nummer meegegeven word dan is er een artiest meegegeven en moeten alle nummers van die artiest weergeven worden.
          if (nummer == undefined ? dataDict[u].artiest == artiest : (dataDict[u].nummer == nummer && dataDict[u].artiest == artiest)) {
            if(tekenKleur) {
              // de kleur word random gegenereerd.
              kleur = d3.rgb(Math.floor((Math.random() * 180) + 20), Math.floor((Math.random() * 180) + 20), Math.floor((Math.random() * 180 + 20)))
              d3.select(".tabel").append("li").text(dataDict[u].artiest + ":" + dataDict[u].nummer).style("color", kleur)
            }
            else {
              kleur = "#000000";
            }
            for (var i = 0; i < 17; i++) {
              if (!isNumeric(dataDict[u].posities[i]) || i == 0) { // fout sajfewjoiosfdoijf
                lineData = []
                lineData2 = []
              }
              if (isNumeric(dataDict[u].posities[i])) {
                lineData.push({
                  x: ((i + 1) * (widthBlock + afstandtussenBlock) + widthBlock),
                  y: ((dataDict[u].posities[i]) * (heightBlock + afstandtussenBlock) + heightBlock)
                })
                lineData2.push({
                  x: ((i + 1) * (breedteBlok + afstandtussenBlok) + breedteBlok),
                  y: ((dataDict[u].posities[i]) * (hoogteBlok + afstandtussenBlok) + hoogteBlok)
                })
                // de lijn word zowel in de minimap als in de hoofdvisualisatie gecreeerd
                tekenLine(path, lineData,20, kleur)
                tekenLine(path, lineData2, 10, kleur)
              }
                lineData.push({
                  x: ((i + 1) * (widthBlock + afstandtussenBlock) + widthBlock + afstandtussenBlock),
                  y: ((dataDict[u].posities[i+1]) * (heightBlock + afstandtussenBlock) + heightBlock)
                })
                if (isNumeric(dataDict[u].posities[i + 1]) && i + 1 < 17) {
                  lineData2.push({
                    x: ((i + 1) * (breedteBlok + afstandtussenBlok) + breedteBlok + afstandtussenBlok),
                    y: ((dataDict[u].posities[i + 1]) * (hoogteBlok + afstandtussenBlok) + hoogteBlok)
                  })
                tekenLine(path, lineData, 20, kleur)
                tekenLine(path, lineData2, 10, kleur)
              }
            }
          }
        }
      }
      // hier word de lijn getekend
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
      // dit bepaald welke kleur met een blok meegegeven moet worden
      function kleurBlock(nummer, artiest, positie, jaartal) {
        q = jaartal - 1999
        for (var u = 0; u < dataDict.length; u++) {
          // als het nummer het vorige jaar nog niet voorkwam dan groen
          if (dataDict[u].nummer == nummer && dataDict[u].artiest == artiest) {
            if (q > 0 && !isNumeric(dataDict[u].posities[q - 1])) {
              return "green"
              // als het nummer het volgende jaar niet meer voorkomt dan rood
            } else if (!isNumeric(dataDict[u].posities[q + 1]) && q != 16) {
              return "red"
              // anders grijs
            } else {
              return "grey"
            }
          }
        }
      }
      // maak de minimap aan
        var rectangles = svgslider.selectAll('rect').data(allYear);
        rectangles.enter().append('rect')
          .attr('x', function(d) {
            return (d.jaartal - 1998) * (breedteBlok + afstandtussenBlok)
          })
          .attr('y', function(d) {
            return (d.positie * (hoogteBlok + afstandtussenBlok))
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
          createLine("clickLine", data[1], data[0],true)

        });
// deze funtie verwijderd alle lijnen/text zodra er op de button gedrukt word leeg lijst
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
          .attr("x", i * (widthBlock + afstandtussenBlock) + 24)
          .attr("class", "positie")
          .attr("font-family", "sans-serif")
          .attr("font-size", "4px")
          .style("fill", "black")
          .text(nummer);
      }

}
