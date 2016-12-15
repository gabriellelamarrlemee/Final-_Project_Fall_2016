console.log('final_project');

var m = {t:50,r:25,b:25,l:0},
    w = document.getElementById('canvas').clientWidth - m.l - m.r,
    h = document.getElementById('canvas').clientHeight - m.t - m.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width', w + m.l + m.r)
    .attr('height', h + m.t + m.b)
    .append('g').attr('class','plot')
    .attr('transform','translate('+ m.l + ',' + m.t + ')');

var cities = d3.set();
var permits = d3.set();

//Mapping specific functions
var projection = d3.geoAlbersUsa(),
    path = d3.geoPath().projection(projection);

//scales
var scaleX = d3.scaleTime()
    .domain( [new Date(2015, 0, 1), new Date(2015, 11, 1)] )
    .range([w/1.5,w]);

var scaleColor = d3.scaleOrdinal()
    .range(['#ed6545','#792777','#9acb42','#438ac9','#dbcc24','#3fbb91']);

var scaleY = d3.scaleLinear()
    .domain([0,600])
    .range([h/1.2,h/2]);

//axis
var axisX = d3.axisBottom()
    .scale(scaleX)
    .tickFormat(function(d){ return d3.timeFormat('%b')(d); })
    .tickSize(0);

var axisY = d3.axisLeft()
    .scale(scaleY)
    .tickSize(-w/1.5);

//line generator
var lineGenerator = d3.line()
    .x(function(d){ return scaleX(new Date(d.key))})
    .y(function(d){ return scaleY(d.totalPermits)})
    .curve(d3.curveCardinal);

d3.queue()
  .defer(d3.json,'../data/bos_neighborhoods.json')
  .defer(d3.csv,'../data/Boston_Permits_15_Final.csv',parseData)
  .await(function (err, geo, data){
    //console.log(geo); //This is a Topojson data
    //console.table(data); //This is permit data

    //Mine the data to set the scales
    scaleColor.domain( permits.values() );

    var roslindale = geo.features.filter(function(d) { return d.properties.Name == "Roslindale"; });
    var jamaicaPlain = geo.features.filter(function(d) { return d.properties.Name == "Jamaica Plain"; });
    var missionHill = geo.features.filter(function(d) { return d.properties.Name == "Mission Hill"; });
    var longwoodMedicalArea = geo.features.filter(function(d) { return d.properties.Name == "Longwood Medical Area"; });
    var bayVillage = geo.features.filter(function(d) { return d.properties.Name == "Bay Village"; });
    var leatherDistrict = geo.features.filter(function(d) { return d.properties.Name == "Leather District"; });
    var chinatown = geo.features.filter(function(d) { return d.properties.Name == "Chinatown"; });
    var northEnd = geo.features.filter(function(d) { return d.properties.Name == "North End"; });
    var roxbury = geo.features.filter(function(d) { return d.properties.Name == "Roxbury"; });
    var southEnd = geo.features.filter(function(d) { return d.properties.Name == "South End"; });
    var backBay = geo.features.filter(function(d) { return d.properties.Name == "Back Bay"; });
    var eastBoston = geo.features.filter(function(d) { return d.properties.Name == "East Boston"; });
    var charlestown = geo.features.filter(function(d) { return d.properties.Name == "Charlestown"; });
    var westEnd = geo.features.filter(function(d) { return d.properties.Name == "West End"; });
    var beaconHill = geo.features.filter(function(d) { return d.properties.Name == "Beacon Hill"; });
    var downtown = geo.features.filter(function(d) { return d.properties.Name == "Downtown"; });
    var fenway = geo.features.filter(function(d) { return d.properties.Name == "Fenway"; });
    var brighton = geo.features.filter(function(d) { return d.properties.Name == "Brighton"; });
    var westRoxbury = geo.features.filter(function(d) { return d.properties.Name == "West Roxbury"; });
    var hydePark = geo.features.filter(function(d) { return d.properties.Name == "Hyde Park"; });
    var mattapan = geo.features.filter(function(d) { return d.properties.Name == "Mattapan"; });
    var dorchester = geo.features.filter(function(d) { return d.properties.Name == "Dorchester"; });
    var southBostonWaterfront = geo.features.filter(function(d) { return d.properties.Name == "South Boston Waterfront"; });
    var southBoston = geo.features.filter(function(d) { return d.properties.Name == "South Boston"; });
    var allston = geo.features.filter(function(d) { return d.properties.Name == "Allston"; });
    var harborIslands = geo.features.filter(function(d) { return d.properties.Name == "Harbor Islands"; });


    data.forEach(function(d){
      var point = { "type": "Feature", "geometry": { "type": "Point", "coordinates": d.location }};
      //console.log(point);

      if(turf.inside(point, roslindale[0])){ d.city = 'Roslindale'; }
      else if(turf.inside(point, jamaicaPlain[0])){ d.city = 'Jamaica Plain'; }
      else if(turf.inside(point, missionHill[0])){ d.city = 'Mission Hill'; }
      else if(turf.inside(point, longwoodMedicalArea[0])){ d.city = 'Longwood Medical Arena'; }
      else if(turf.inside(point, bayVillage[0])){ d.city = 'Bay Village'; }
      else if(turf.inside(point, leatherDistrict[0])){ d.city = 'Leather District'; }
      else if(turf.inside(point, chinatown[0])){ d.city = 'Chinatown'; }
      else if(turf.inside(point, northEnd[0])){ d.city = 'North End'; }
      else if(turf.inside(point, roxbury[0])){ d.city = 'Roxbury'; }
      else if(turf.inside(point, southEnd[0])){ d.city = 'South End'; }
      else if(turf.inside(point, backBay[0])){ d.city = 'Back Bay'; }
      else if(turf.inside(point, eastBoston[0])){ d.city = 'East Boston'; }
      else if(turf.inside(point, charlestown[0])){ d.city = 'Charlestown'; }
      else if(turf.inside(point, westEnd[0])){ d.city = 'West End'; }
      else if(turf.inside(point, beaconHill[0])){ d.city = 'Beacon Hill'; }
      else if(turf.inside(point, downtown[0])){ d.city = 'Downtown'; }
      else if(turf.inside(point, fenway[0])){ d.city = 'Fenway'; }
      else if(turf.inside(point, brighton[0])){ d.city = 'Brighton'; }
      else if(turf.inside(point, westRoxbury[0])){ d.city = 'West Roxbury'; }
      else if(turf.inside(point, hydePark[0])){ d.city = 'Hyde Park'; }
      else if(turf.inside(point, mattapan[0])){ d.city = 'Mattapan'; }
      else if(turf.inside(point, dorchester[0])){ d.city = 'Dorchester'; }
      else if(turf.inside(point, southBostonWaterfront[0])){ d.city = 'South Boston Waterfront'; }
      else if(turf.inside(point, southBoston[0])){ d.city = 'South Boston'; }
      else if(turf.inside(point, allston[0])){ d.city = 'Allston'; }
      else if(turf.inside(point, harborIslands[0])){ d.city = 'Harbor Islands'; }
      else {d.city = 'Other'};
    });

  //filter points by city
  var roslindalePoints = data.filter(function(d) { return d.city == "Roslindale"; });
  var jamaicaPlainPoints = data.filter(function(d) { return d.city == "Jamaica Plain"; });
  var missionHillPoints = data.filter(function(d) { return d.city == "Mission Hill"; });
  var longwoodMedicalAreaPoints = data.filter(function(d) { return d.city == "Longwood Medical Area"; });
  var bayVillagePoints = data.filter(function(d) { return d.city == "Bay Village"; });
  var leatherDistrictPoints = data.filter(function(d) { return d.city == "Leather District"; });
  var chinatownPoints = data.filter(function(d) { return d.city == "Chinatown"; });
  var northEndPoints = data.filter(function(d) { return d.city == "North End"; });
  var roxburyPoints = data.filter(function(d) { return d.city == "Roxbury"; });
  var southEndPoints = data.filter(function(d) { return d.city == "South End"; });
  var backBayPoints = data.filter(function(d) { return d.city == "Back Bay"; });
  var eastBostonPoints = data.filter(function(d) { return d.city == "East Boston"; });
  var charlestownPoints = data.filter(function(d) { return d.city == "Charlestown"; });
  var westEndPoints = data.filter(function(d) { return d.city == "West End"; });
  var beaconHillPoints = data.filter(function(d) { return d.city == "Beacon Hill"; });
  var downtownPoints = data.filter(function(d) { return d.city == "Downtown"; });
  var fenwayPoints = data.filter(function(d) { return d.city == "Fenway"; });
  var brightonPoints = data.filter(function(d) { return d.city == "Brighton"; });
  var westRoxburyPoints = data.filter(function(d) { return d.city == "West Roxbury"; });
  var hydeParkPoints = data.filter(function(d) { return d.city == "Hyde Park"; });
  var mattapanPoints = data.filter(function(d) { return d.city == "Mattapan"; });
  var dorchesterPoints = data.filter(function(d) { return d.city == "Dorchester"; });
  var southBostonWaterfrontPoints = data.filter(function(d) { return d.city == "South Boston Waterfront"; });
  var southBostonPoints = data.filter(function(d) { return d.city == "South Boston"; });
  var allstonPoints = data.filter(function(d) { return d.city == "Allston"; });
  var harborIslandsPoints = data.filter(function(d) { return d.city == "Harbor Islands"; });


  //map stuff
  projection
      .fitExtent([[0,0],[w/1.4,h]],geo);

  //draw the map of Boston
  var features = plot.selectAll('.features')
      .data(geo.features)
      .enter()
      .append('path').attr('class','features')
      .attr('d',path)
      .style('fill','white')
      .style('stroke','rgb(200,200,200)')
      .style('stroke-width','1px')
      .on('click', function(d,i){
        //d3.select(this).style('fill','rgb(200,200,200)');
        //d3.select('.city-label').html(d.properties.Name);

        if(d.properties.Name == "Roslindale"){ draw(roslindalePoints); }
        else if(d.properties.Name == 'Jamaica Plain'){ d.city = draw(jamaicaPlainPoints); }
        else if(d.properties.Name == 'Mission Hill'){ d.city = draw(missionHillPoints); }
        else if(d.properties.Name == 'Longwood Medical Arena'){ d.city = draw(longwoodMedicalArenaPoints); }
        else if(d.properties.Name == 'Bay Village'){ d.city = draw(bayVillagePoints); }
        else if(d.properties.Name == 'Leather District'){ d.city = draw(leatherDistrictPoints); }
        else if(d.properties.Name == 'Chinatown'){ d.city = draw(chinatownPoints); }
        else if(d.properties.Name == 'North End'){ d.city = draw(northEndPoints); }
        else if(d.properties.Name == 'Roxbury'){ d.city = draw(roxburyPoints); }
        else if(d.properties.Name == 'South End'){ d.city = draw(southEndPoints); }
        else if(d.properties.Name == 'Back Bay'){ d.city = draw(backBayPoints); }
        else if(d.properties.Name == 'East Boston'){ d.city = draw(eastBostonPoints); }
        else if(d.properties.Name == 'Charlestown'){ d.city = draw(charlestownPoints); }
        else if(d.properties.Name == 'West End'){ d.city = draw(westEndPoints); }
        else if(d.properties.Name == 'Beacon Hill'){ d.city = draw(beaconHillPoints); }
        else if(d.properties.Name == 'Downtown'){ d.city = draw(downtownPoints); }
        else if(d.properties.Name == 'Fenway'){ d.city = draw(fenwayPoints); }
        else if(d.properties.Name == 'Brighton'){ d.city = draw(brightonPoints); }
        else if(d.properties.Name == 'West Roxbury'){ d.city = draw(westRoxburyPoints); }
        else if(d.properties.Name == 'Hyde Park'){ d.city = draw(hydeParkPoints); }
        else if(d.properties.Name == 'Mattapan'){ d.city = draw(mattapanPoints); }
        else if(d.properties.Name == 'Dorchester'){ d.city = draw(dorchesterPoints); }
        else if(d.properties.Name == 'South Boston Waterfront'){ d.city = draw(southBostonWaterfrontPoints); }
        else if(d.properties.Name == 'South Boston'){ d.city = draw(southBostonPoints); }
        else if(d.properties.Name == 'Allston'){ d.city = draw(allstonPoints); }
        else if(d.properties.Name == 'Harbor Islands'){ d.city = draw(harborIslandsPoints); }
        else {};

      });

      //create data set for buttons
      data.forEach(function(d){ if(!cities.has(d.city)){ cities.add(d.city); }});
      cities.remove('Other');

      //create data set for pie
      data.forEach(function(d){ if(!permits.has(d.permit)){ permits.add(d.permit); }});

      //Add city buttons
      d3.select('#btn-group-A')
          .selectAll('a')
          .attr('href','#')
          .attr('class','btn btn-default')
          .style('color','white')
          .style('background','rgb(200,200,200)')
          .style('border-color','white')
          .on('click',function(d){ draw(data); });

      //Add all button
      d3.select('#btn-group-B')
          .selectAll('.btn')
          .data( cities.values() )
          .enter()
          .append('a')
          .html(function(d){return d})
          .attr('href','#')
          .attr('class','btn btn-default')
          .style('color','white')
          .style('background','rgb(200,200,200)')
          .style('border-color','white')
          .on('click',function(d){
              //filter data by city
              var dataFiltered = data.filter(function(e){ return d == e.city; });
              //How do we then update the dots?
              draw(dataFiltered);
          });

      //Add permit type buttons
      d3.select('#btn-group-C')
          .selectAll('.btn')
          .data( permits.values() )
          .enter()
          .append('a')
          .html(function(d){return d})
          .attr('href','#')
          .attr('class','btn btn-default')
          .style('color','white')
          .style('background',function(d){return scaleColor(d)})
          .style('border-color','white')
          .on('click',function(d){
              //filter data by city
              var dataFiltered = data.filter(function(e){ return d == e.permit; });
              //How do we then update the dots?
              draw(dataFiltered);
          });

      //draw axis
      plot.append('g').attr('class','axis axis-x')
          .attr('transform','translate(0,'+h/1.2+')')
          .call(axisX);
      /*plot.append('g').attr('class','axis','axis-y')
          .attr('transform','translate('+w+'0)')
          .call(axisY)
        .append('text')
          .attr('transform','rotate(-90)')*/
      //append path
      plot.append('path').attr('class','time-series');

      draw(data);
});

function draw(rows){

      rows.sort(function(a,b){ return a.issuedDate - b.issuedDate });
      var permitsByIssueDate = d3.nest().key(function(d){ return d3.timeWeek(d.issuedDate) })
          .entries(rows);
      permitsByIssueDate.forEach(function(week){
        week.averageFee = d3.mean(week.values, function(d){ return d.totalFees });
        week.totalPermits = week.values.length;
        week.location = function(d){ return d.location; };
        //console.log(permitsByIssueDate);
      });

      //draw the permit points on the map
      var update = plot.selectAll('.node')
          .data(rows);

      var enter = update.enter()
      .append('circle').attr('class','node')
      .on('click mouseenter mouseleave mousemove', function(d,i){
        d3.select(this).style('stroke','black');
      })
      .on('click mouseenter', function(d,i){
        var tooltip = d3.select('.custom-tooltip');
        tooltip.select('.title').html(d.permit)
        tooltip.select('.value').html(d.comments);
        tooltip
          .style('visibility','visible')
          .transition()
          .style('opacity',1);
          d3.select(this).style('stroke','black');
      })
      .on('mousemove', function(d,i){
        var xy = d3.mouse(d3.select('.container').node());
        d3.select('.custom-tooltip')
          .style('left',xy[0]+10+'px')
          .style('top',xy[1]+10+'px');
      })
      .on('mouseleave',function(d,i){
        d3.select('.custom-tooltip')
        .transition()
        .style('opacity',0);
        d3.select(this).style('stroke','none');
      });

      update.merge(enter)
      .attr('transform', function(d){
        var xy = projection(d.location);
        return 'translate('+xy[0]+','+xy[1]+')';
      })
      .attr('r',2)
      .style('fill',function(d,i){ return scaleColor(d.permit) })
      .style('opacity',.5);

      var exit = update.exit().remove();

      //draw line graph nodes
      var lineNode = plot.selectAll('.line-node')
          .data(permitsByIssueDate);

      var nodeEnter = lineNode.enter()
          .append('circle').attr('class','line-node')
          .on('click mouseenter', function(d,i){
            var tooltip = d3.select('.custom-tooltip');
            tooltip.select('.title')
              .html(d.key);
            tooltip.select('.value')
              .html(d.totalPermits);
            tooltip
              .style('visibility','visible')
              .transition()
              .style('opacity',1);
              d3.select(this).attr('r',6);
          })
          .on('mousemove', function(d,i){
            var xy = d3.mouse(d3.select('.container').node());
            d3.select('.custom-tooltip')
              .style('left',xy[0]+10+'px')
              .style('top',xy[1]+10+'px');
          })
          .on('mouseleave',function(d,i){
            d3.select('.custom-tooltip')
            .transition()
            .style('opacity',0);
            d3.select(this).attr('r',3);
          });

      nodeEnter
          .merge(lineNode)
          .attr('r',3)
          .attr('cx',function(d){ return scaleX(new Date(d.key))})
          .attr('cy',function(d){ return scaleY(d.totalPermits)})
          .style('fill','black');

      lineNode.exit().remove();


      //draw line graph
      plot.select('.time-series')
          .datum(permitsByIssueDate)
          .transition()
          .attr('d',function(array){ return lineGenerator(array); })
          .style('stroke-width','2px')
          .style('stroke','black')
          .style('fill','none');


      //create d3.arc() generator
      var arc = d3.arc()
          .startAngle(function(d){ return d.startAngle })
          .endAngle(function(d){ return d.endAngle })
          .innerRadius(40)
          .outerRadius(80);

      //data transformation
      var permitsByType = d3.nest()
          .key(function(d){ return d.permit }).sortKeys(d3.ascending)
          .entries(rows);
          permitsByType.forEach(function(type){
            type.totalPermitTypes = type.values.length;
          });

      //create a d3.pie() layout function to transform the data
      var pie = d3.pie()
          .value(function(d){ return d.totalPermitTypes; })
          .sort(null);

      //draw enter set
      var slicesUpdate = plot.selectAll('.path')
          .data(pie(permitsByType));

      var slicesEnter = slicesUpdate.enter()
          .append('path').attr('class','pie-chart')
          .on('mouseenter',function(d,i){
              var tooltip = d3.select('.custom-tooltip');

              tooltip.select('.title').html(d.data.key);
              tooltip.select('.value').html(d.value);

              tooltip
                .style('visibility','visible')
                .transition()
                .style('opacity',1);

              d3.select(this).transition().style('stroke','black');
          }).on('mousemove',function(d,i){
              var xy = d3.mouse(d3.select('.container').node());

              var tooltip = d3.select('.custom-tooltip')
                  .style('left',xy[0]+20+'px')
                  .style('top',xy[1]+20+'px');
          }).on('mouseleave',function(d,i){
              var tooltip = d3.select('.custom-tooltip');

              tooltip
                .style('visibility','hidden')
                .style('opacity',0);

              d3.select(this).transition().style('stroke','none');
          });

      slicesEnter
          .merge(slicesUpdate)
          .attr('d',arc)
          .attr('transform','translate('+(w/1.25)+','+h/4+')')
          .style('fill',function(d,i){ return scaleColor(d.data.key); })
          .style('stroke','none');

      slicesUpdate.exit().remove();

      //console.log(permitsByType);
      //console.log(pie(permitsByType));

}

function parseData(d){

  return {
    permit: d.PermitTypeDescr,
    declaredValue: +d.DECLARED_VALUATION,
    totalFees: +d.TOTAL_FEES,
    issuedDate: new Date(d.ISSUED_DATE),
    expirationDate: new Date(d.EXPIRATION_DATE),
    address: d.ADDRESS,
    city: d.CITY,
    location: [+d.Longitude,+d.Latitude],
    comments: d.Comments
  }
}
