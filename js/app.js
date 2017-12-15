window.addEventListener('load', function() {
	var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);

	// buttons
	var btn_login = document.getElementById('btn-login');
	var btn_logout = document.getElementById('btn-logout');

	btn_login.addEventListener('click', function() {
		lock.show();
	});

	/* btn_logout.addEventListener('click', function() {
		logout();
	}); */

	lock.on("authenticated", function(authResult) {
		lock.getProfile(authResult.idToken, function(error, profile) {
			if (error) {
				// Handle error
				return;
			}
			localStorage.setItem('id_token', authResult.idToken);
			// Display user information
			//show_profile_info(profile);
			
			//insert into database
			var user_fullname = profile.name;
			var user_pic = profile.picture;
			var user_email = profile.email;
			login_email = profile.email;
			$.ajax({
				url : 'api/login.php',
				data : {
					user_fullname : user_fullname,
					user_pic : user_pic,
					user_email : user_email
				},
				type : 'POST',
				success : function(res){
					mainView.router.loadPage('home.html');
				},
				error : function(err){
					alert(err.statusText);
				}
			});
		});
	});
  
	/* //retrieve the profile:
	var retrieve_profile = function() {
		var id_token = localStorage.getItem('id_token');
		if (id_token) {
			lock.getProfile(id_token, function (err, profile) {
				if (err) {
					return alert('There was an error getting the profile: ' + err.message);
				}
			});
		}
	}; */

  /* var show_profile_info = function(profile) {
    var avatar = document.getElementById('avatar');
    document.getElementById('nickname').textContent = profile.nickname;
    btn_login.style.display = "none";
    avatar.src = profile.picture;
    avatar.style.display = "block";
    btn_logout.style.display = "block";
  }; */

  var logout = function() {
    localStorage.removeItem('id_token');
    window.location.href = "/";
  };

  //retrieve_profile();
});
