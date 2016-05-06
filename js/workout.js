var workout = function() {
  this.arrWorkout = [],
    this.insert = function(data) {
        this.arrWorkout.push(data);
        this.select();
    };
  this.select = function() {
    var workout = this.arrWorkout;
    var table = document.getElementById("Table").getElementsByTagName('tbody')[0];
    var resultTotalHours = document.getElementById("resultTotalHours");
    var totalHours = 0;
    table.innerHTML = "";
    for (w in workout) {
      var row = table.insertRow();
      totalHours += parseInt(workout[w]['Time']);
      row.insertCell(0).innerHTML = workout[w]['Time'] + 'h';
      row.insertCell(1).innerHTML = workout[w]['Type'];
      row.insertCell(2).innerHTML = decodeURIComponent(workout[w]['Date']);
      row.insertCell(3).innerHTML = '<button  type=\'button\' class=\'delete\' value=' + w + '> &#x268A; </button>';
    }
    resultTotalHours.innerHTML = '<h1 class=\'text-center\'>' + totalHours + ' Hours of exercicies<\h1>';

    var del = document.getElementsByClassName("delete");
    var w = this;
    for (var i = 0; i < del.length; i++) {
      del[i].addEventListener("click", function() {
        w.detele(this.value);
      });
    }
  };
  this.detele = function(index) {
    var workout = this.arrWorkout;
    for (var w in workout) {
      if (w === index) {
        workout.splice(index, 1);
      }
    }
    this.select();
  };
  this.init = function() {
    var w = this;
    w.select();
    var form = document.getElementById("Form");
    var time = document.getElementById("Time");
    form.onsubmit = function() {
      var data = serialize(form);
      w.insert(data);
      this.reset();
      time.focus();
      return false;
    };
  };
  this.init();
};

workout();
