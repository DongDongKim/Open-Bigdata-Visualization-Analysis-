function dropLogin(std) {
  if (std) {
    $('#signIn').hide();
    $('#signUp').hide();
    $('#signOutLi').show();
  } else {
    $('#signIn').show();
    $('#signUp').show();
    $('#signOutLi').hide();
  }
}
if (loginCheck()) {
  $('#signIn').hide();
  $('#signUp').hide();
  $('#signOutLi').show();

} else {
  $('#signIn').show();
  $('#signUp').show();
  $('#signOutLi').hide();
}

$('.modal').on('hidden.bs.modal', function(e) {

  $(this).find('#signInPassword').val('')
  $(this).find('#inputName').val('')
  $(this).find('#inputLastName').val('')
  $(this).find('#inputEmail').val('')
  $(this).find('#inputPassword').val('')
  $(this).find('#confirmPassword').val('')

});
$('#exampleModalCenter').on('shown.bs.modal', function(e) {
  if (loginCheck()) {

  } else {
    alert("Please login first")
    $('#close-modal').trigger('click');
  }
});


function loginCheck() {
  try {
    var uid = firebase.auth().currentUser.uid;
    return true;
  } catch (error) {
    //alert("Please login first")
    //$('#close-modal').trigger('click');
    return false;
  }
}

function bodyLogin() {
  // console.log("body")
  if (self.screenTop > 9000) {
    $('#signOut').trigger('click');
  } else {
    if (document.readyState == "complete" || document.readyState == "loading") {
      if (loginCheck()) {
        $('#signIn').hide();
        $('#signUp').hide();
        // $('.fa-user').hide();
        // $('.fa-gear').hide();
        $('#signOutLi').show();
        // $('.fa-sign-out').show();

      } else {
        $('#signIn').show();
        $('#signUp').show();
        // $('.fa-user').show();
        // $('.fa-gear').show();
        $('#signOutLi').hide();
      }
    }
  }
}
