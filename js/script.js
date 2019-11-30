var chatContainer = document.querySelector(".staff-chat"),
  primaryNavigation = document.querySelector(".navigation--primary "),
  boards = Array.from(document.querySelectorAll(".board")),
  activeBoard = document.querySelector(".board.active"),
  activeNav = document.querySelector(".active "),
  fiche = document.querySelector(".card"),
  ruleExpandBtn = document.querySelector(".expand-btn");
  charts = Array.from(document.querySelectorAll('.chart'));

function handelClassNavigation(currentElem, newElem) {
  currentElem.classList.remove("active");
  newElem.classList.add("active");
  return newElem;
}

function boardNavigationHandler(elem) {
  var index = elem.dataset.index;
  activeBoard = handelClassNavigation(activeBoard, elem);
  activeNav = handelClassNavigation(activeNav, boards[index]);
}

function addChat(elem) {
  if (_userdata.user_level === 1 || _userdata.user_level === 2) {
    var fragment = document.createDocumentFragment(),
      chatbox = document.createElement("div"),
      chatContent =
        '<iframe allowtransparency="true" style="width: 402px; height: 132px;" src="http://www.i-tchat.com/shoutbox/shoutbox.php?idShoutbox=79015" frameborder="0">Votre navigateur semble incompatible, essayez d\'ouvrir le <a href="http://www.i-tchat.com" onClick="window.open(this.href+\'?79015\');">tchat</a>, ou rencontrez le webmaster pour plus d\'informations.</iframe><br />Agrandir le <a href="http://www.i-tchat.com" onclick="window.open(this.href+\'?79015\');return false;">chat</a> .';
    fragment.appendChild(chatbox);
    elem.appendChild(fragment);
  } else {
    return;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  /*primaryNavigation.addEventListener("click", function(ev) {
    ev.preventDefault();
    if (ev.target.tagName === "A") {
      var elem = ev.target;
      boardNavigationHandler(elem);
    }
    return;
  });*/
  if (fiche) {
    fiche.addEventListener("click", function(ev) {
      ev.preventDefault();
      if (ev.target.parentElement.classList.contains("content-section--fold")) {
        var elem = ev.target.parentElement;
        toggleSection(elem);
      }
      return;
    });
  }
  if (ruleExpandBtn) {
    var page = document.querySelector('.index');

    ruleExpandBtn.addEventListener("click", function(ev) {
      
      ev.preventDefault();
      if (page) {
        page.classList.toggle("expanded");
      }
      return;
    });
  }

  //addChat(chatContainer);

  if(charts){
    for(var i = 0; i < charts.length; i++){ 
      createChart(charts[i]);
    }
  }
});

function toggleSection(elem) {
  elem.classList.toggle("content-section--folded");
}

function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
  ctx.fillStyle =  color;
  ctx.beginPath();
  ctx.moveTo(centerX,centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();
}

function createChart(chart){
  var totalValue = chart.dataset.total || 0;
  if(chart.dataset.type === "bar"){
    var item = chart.querySelector('.chart__item');
    var actuel = chart.dataset.actuel;
    var val = (((chart.offsetWidth / totalValue) * actuel) / totalValue *100)
    item.style.width =  val +"%";

  }
  if(chart.dataset.type === "doughnut"){

    var canvas = chart,
    ctx = canvas.getContext("2d"),
    data = canvas.dataset.values.split(','),
    colors = canvas.dataset.colors.split(','),
    holeColor = chart.dataset.hole;
    canvas.width = 100;
    canvas.height = 100;
    (function(){
        var totalValue = 0,
         start_angle = 0;

         for (var i = 0 ; i <  data.length; i++){
          var val = data[i]*1;
          totalValue += val;
      }


        for (var i = 0 ; i <  data.length; i++){
            var val = data[i]*1;
            var slice_angle = 2 * Math.PI * val / totalValue;
            drawPieSlice(
                ctx,
                canvas.width/2,
                canvas.height/2,
                Math.min(canvas.width/2,canvas.height/2),
                start_angle,
                start_angle+slice_angle,
                colors[i]
            );
 
            start_angle += slice_angle;
        }
 
        //drawing a white circle over the chart
        //to create the doughnut chart
        if (true){
            drawPieSlice(
                ctx,
                canvas.width/2,
                canvas.height/2,
                .5 * Math.min(canvas.width/2,canvas.height/2),
                0,
                2 * Math.PI,
                holeColor
            );
        }
 
    })()
  }
}

