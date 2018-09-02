function correlation() {
  $('#corrTable > tbody').empty();
  var variable = new Array();
  var example = new Array();
  $('#summaryTable tr').each(function () {
    variable.push($(this).find("td:first").text())
  })
  for (i = 1; i < variable.length; i++) {
    $('#corrTable > tbody:last').append('<tr><td>' + variable[i] + '</td><td><input type="checkbox" name="corrSelect" value=' + variable[i] + ' /></td></tr>');
  }
  // var currentUser = firebase.auth().currentUser;
  // var uid = currentUser.uid;

  // $.ajax({
  //   data:{"uid":uid},
  //   url: "/correlation",
  //   beforeSend: function () {
  //     loading();
  //   },
  //   complete: function () {
  //     complete()
  //   },
  //   success: function (res) {
  //     data = res.data;
  //     variable = res.variable
  //     showCorrelation(data, variable);
  //   },
  //   error: function (res) {
  //     // console.log(res);
  //   }
  // });

}
function btnCorrApply(){
  var select = new Array();
  $('input:checkbox[name="corrSelect"]').each(function () {
      if (this.checked) {
          select.push(this.value)
      }
  });
  $('#corrModal').modal('hide');
  var currentUser = firebase.auth().currentUser;
  var uid = currentUser.uid;

  $.ajax({
    data: { "uid": uid,"select":select },
    url: "/correlation",
    beforeSend: function () {
      loading();
    },
    complete: function () {
      complete()
    },
    success: function (res) {
      data = res.data;
      variable = res.variable
      showCorrelation(data, variable);
    },
    error: function (res) {
      // console.log(res);
    }
  });
}
function showCorrelation(data, variable) {
  //$('#analysis').empty();
  if(analIndex==0){
    $('#analysis').empty();  
  }
  var name = "analysis" + analIndex;
  analIndex++;
  var btnName = "btn" + name;
  var btn = $('<input type="button" id=' + btnName + ' class="btn btn-outline-danger btn-sm" onclick="plotlyClose(this.id)" value="X"/>');
  $('#analysis').append(btn);
  var div = $('<div id=' + name + '/>');
  $('#analysis').append(div);


  //$('#analysis').append($('<div>').attr('id', 'analysisGraph'));
  var heatData = new Array();
  for (i = 0; i < variable.length; i++) {
    heatData.push(data[i]);
  }
  var trace = [
    {
      z: heatData,
      x: variable,
      y: variable,
      type: 'heatmap'
    }
  ];

  Plotly.newPlot(name, trace);

}
