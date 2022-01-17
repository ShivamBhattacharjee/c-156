AFRAME.registerComponent("game-play", {
  schema: {
    elementId: { type: "string", default: "#ring1" },    
  },
  update: function () {
    this.isCollided(this.data.elementId);
  },

  init: function () {
    var duration = 120;
    const timerEl = document.querySelector("#timer");
    this.startTimer(duration, timerEl);
  },
  
  updateTargets:function(){
    var element=document.querySelector("#targets")
    var count=element.getAttribute("text").value
    var currentTarget=parseInt(count)
    currentTarget-=1
    element.setAttribute("text",{value:currentTarget})
  },

  updateScores:function(){
    var element=document.querySelector("#score")
    var count=element.getAttribute("text").value
    var currentScore=parseInt(count)
    currentScore+=50
    element.setAttribute("text",{value:currentScore})
  },
  
  gameOver:function(){
    var planeEl=document.querySelector("#plane_model")
    var element=document.querySelector("#gameOver")
    element.setAttribute("visible",true)
    planeEl.setAttribute("dynamic-body",{mass:1})
  },

  startTimer: function (duration, timerEl) {
    var minutes;
    var seconds;

    var timer = setInterval(countDown, 1000);

    function countDown() {
      if (duration >= 0) {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);

        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        timerEl.setAttribute("text", {
          value: minutes + ":" + seconds,
        });

        duration -= 1;
      } 
      else {
        this.gameOver()      
      }
    }
  },
  isCollided: function (elemntId) {
    const element = document.querySelector(elemntId);
    element.addEventListener("collide", (e) => {
      if (elemntId.includes("#ring")) {
        element.setAttribute("visible",false)
        this.updateScores()
        this.updateTargets()
      } 
      else {
        this.gameOver()
      }
    });
  },
  
});
