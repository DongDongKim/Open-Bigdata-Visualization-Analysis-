function outlierVariable(variable) {
  $('#outlierTable > tbody').empty();

  variable.forEach(function (element) {
    $('#outlierTable > tbody:last').append('<tr><td>' + element + '</td><td><input type="text" name="minValue" /></td><td><input type="text" name="maxValue" /></td>');
  });
}

function outlierBox() {
  $.ajax({
    url: "/outlier/modal",
    success: function (res) {
      data = res.data;
      variable = res.variable;
      outlierVariable(variable)
      showOutlierBox(variable, data);
    },
    error: function (res) {
      console.log(res);
    }
  });
}

function btnOutlierApply() {
  var minArray = new Array();
  $('input:text[name="minValue"]').each(function () {
    minArray.push(this.value);
  });
  var maxArray = new Array();
  $('input:text[name="maxValue"]').each(function () {
    maxArray.push(this.value);
  });
  
  $('#outlierModal').modal('hide');

  $.ajax({
    data: { "minArray": minArray, "maxArray": maxArray },
    url: "/outlier",
    success: function (res) {
      data = res.data;
      showSummary(data);
    },
    error: function (res) {
      console.log(res);
    }
  });
}