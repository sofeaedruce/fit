// Init App
var myApp = new Framework7({
    modalTitle: 'Sukan',
    // Enable Material theme
    material: true,
    cache: true,
    materialRipple: true,
    scrollTopOnNavbarClick: true
});

// Expose Internal DOM library
var $$ = Dom7;

// Add main view
var mainView = myApp.addView('.view-main', {});

// GENERAL
$$('a').on('click', function (e) { //Close panel when you open a new page
    myApp.closePanel();
});

$$('a.home').on('click', function (e) { //Close popover when you open a new page
    myApp.closeModal('.popover-more-home');
});
$$('a.more').on('click', function (e) { //Close popover when you open a new page
    myApp.closeModal('.popover-more');
});
$$(document).on('click', '.logout', function () {
    myApp.modal({
        title: 'Are you sure ?',
        buttons: [{
            text: 'OK',
            onClick: function signOut() {
			var auth2 = gapi.auth2.getAuthInstance();
			auth2.signOut().then(function () {
				console.log('User signed out.');
				window.open("index.html","_self");
			});
		}
    }, {
            text: 'Cancel',
            //            onClick: function () {
            //                myApp.alert('You clicked Cancel!');
            //            }
    }, ]
    });
});
$$(document).on('click', '.book', function () {
    $(this).toggleClass('color-change')
});
$$(document).on('pageInit', function (e) {
    // Do something here when page loaded and initialized
    var mySwiper = myApp.swiper('.swiper-container.swiper-init', {
        pagination: '.swiper-pagination',
        paginationHide: false,
        autoplay: 3000,
        onReachEnd: function (swiper) {
            //callback function code here
        }
    });

});
// ICONS TRANSITIONS
$$('i.material-icons.fav').on('click', function (e) { //Changing color icons onclick
    $$(this).toggleClass('color-change');
});

//-------------------------------------------------------sopia punye-----------------------------------------------------------------------

var name = '';
var id = '';

function reg() {
	mainView.router.loadPage('reg.html');
}
function log() {
	mainView.router.loadPage('index.html');
}
function login() {
	//mainView.router.loadPage('login.html');
	var staff_id = $('#staff_id').val();
	var password = $('#password').val();
	$.ajax({
		url : 'http://52.76.25.67/fit/api_generator.php?api_name=fit_api_login',
		data : {
			staff_id : staff_id,
			password : password
		},
		type : 'POST',
		success : function(res){
			console.log(res.status);
			console.log('berjaya login');
			//console.log(name+id);
			//mainView.router.back();
			if (res.status2 == 'Passed') {
				mainView.router.loadPage('home.html');
			}
			else {
				alert(res.status);
			}
		},
		error : function(err){
			alert(err.statusText);
		}
	});
}
function register() {
	//mainView.router.loadPage('register.html');
	var staff_id = $('#staffid').val();
	var full_name = $('#full_name').val();
	var region = $('#region option:selected').val();
	var src_member_confirm = $('#src_member_confirm option:selected').val();
	var tel_no = $('#tel_no').val();
	var email = $('#email').val();
	var password = $('#password').val();
	var team = $('#team option:selected').val();
	//console.log(staff_id+full_name+region+src_member_confirm+tel_no+email+password+team+'ayam');
	$.ajax({
		url : 'http://52.76.25.67/fit/api_generator.php?api_name=fit_register_staff',
		data : {
			staff_id : staff_id,
			full_name : full_name,
			region : region,
			src_member_confirm : src_member_confirm,
			tel_no : tel_no,
			email : email,
			password : password,
			team : team
		},
		type : 'POST',
		success : function(res){
			console.log(res);
			console.log('berjaya masuk');
			mainView.router.back();
		},
		error : function(err){
			alert(err.statusText);
		}
	});
}
function cancel() {
	mainView.router.back();
}
function forgot() {
	mainView.router.loadPage('forgotPassword.html');
}
function check() {
	
	var staff_id = $('#staffid').val();
	console.log(staff_id+'ayamcantik');
	
	$.ajax({
		url : 'http://52.76.25.67/fit/api_generator.php?api_name=fit_checking_id',
		data : {
			staff_id : staff_id
		},
		type : 'POST',
		success : function(res){
			name = res.name;
			id = res.id;
			console.log(res.status);
			console.log(name+id);
			//mainView.router.back();
			if (res.status == 'Staff ID already existed') {
				mainView.router.loadPage('register.html?');
			}
			else {
				alert(res.status);
			}
		},
		error : function(err){
			alert(err.statusText);
		}
	});
}
myApp.onPageInit('register', function (page) {
	$('#staff_id').val(id);
	$('#full_name').val(name);
});
myApp.onPageInit('home', function (page) {
	console.log('ayam');
	console.log(page);
	$$.get("http://52.76.25.67/fit/api_generator.php?api_name=fit_get_event_bmmb", function( data ) {
		var list = '';
		data = JSON.parse(data);
		console.log(data);
		for (var i in data) {
			list +=
				'<div class="col-50">'+
					'<div class="card ks-facebook-card">'+
						'<a href="event_details.html?id='+data[i].event_id+'">'+
							'<div class="card-content">'+
								'<div class="card-content-inner">'+
									'<div style="color:yellow;" align="left"><i class="fa fa-circle fo-icon-tab" aria-hidden="true"></i></div>'+
									'<img src="img/4.png" width="100%">'+
									'<p class="event_title" >'+data[i].name+'</p>'+
									'<p class="event_title" >'+data[i].region+'</p>'+
									'<p class="event_title" >'+data[i].date+'</p>'+
									'<p class="event_title" >'+data[i].time+'</p>'+
								'</div>'+
							'</div>'+
						'</a>'+
					'</div>'+
				'</div>'
		}
		$( ".event" ).html(list);
		console.log(list+'ayammm');
	});

	
});

$$.get("http://52.76.25.67/fit/api_generator.php?api_name=fit_get_event_bmmb", function( data ) {
		var list = '';
		data = JSON.parse(data);
		console.log(data);
		for (var i in data) {
			list +=
				'<div class="col-50">'+
					'<div class="card ks-facebook-card">'+
						'<a href="event_details.html?id='+data[i].event_id+'">'+
							'<div class="card-content">'+
								'<div class="card-content-inner">'+
									'<div style="color:yellow;" align="left"><i class="fa fa-circle fo-icon-tab" aria-hidden="true"></i></div>'+
									'<img src="img/4.png" width="100%">'+
									'<p class="event_title" >'+data[i].name+'</p>'+
									'<p class="event_title" >'+data[i].region+'</p>'+
									'<p class="event_title" >'+data[i].date+'</p>'+
									'<p class="event_title" >'+data[i].time+'</p>'+
								'</div>'+
							'</div>'+
						'</a>'+
					'</div>'+
				'</div>'
		}
		$( ".event" ).html(list);
		console.log(list+'ayammm');
	});

	
var reader = new FileReader();

function changeImg(input) {
console.log(input);
	reader.onload = function (e) {
		$('#img').attr('src', e.target.result);
	}
	reader.readAsDataURL(input.files[0]);
}



//-----------------------------------------------------------------------------------------------------------------------berakhirnya sopia punye------------------------------------------------------------------
