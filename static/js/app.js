window.fbAsyncInit = function() { 
FB.init({ 
appId      : '375092569306818', 
xfbml      : true, 
version    : 'v2.1' }); 
start(); };

 (function(d, s, id){ 
 	var js, fjs = d.getElementsByTagName(s)[0]; 
 	if (d.getElementById(id)) {return;}
 	js = d.createElement(s); 
 	js.id = id; 
	js.src = "//connect.facebook.net/en_US/sdk.js";
 	fjs.parentNode.insertBefore(js, fjs); 
 }(document, 'script', 'facebook-jssdk')); 

 function start() { 
 	var user; 
 	var baseUrl = "https://graph.facebook.com/v2.1/"; 
 	getLoginStatus(); 

 $("#fb-login").click(function(){
 	getLoginStatus(login); 
 });
 
 $("#fb-logout").click(logout); 
 
 $("#postmessage").submit(function(){ 
 	if(user){
 		var msg = $("#postmessage textarea").val(); 
 		postToFB(msg);
 		return false; 
 	}
 	else{ 
 		alert("YOU ARE NOT LOGGED IN!")
 		return false; 
 	} 
 });

 function getLoginStatus(callback){ 
 	FB.getLoginStatus(function(response){ 
 		if(response.status=="connected"){ 
 			getFBresponse(response); 
 			toggleLogin(); 
 		}
 		else if(typeof callback === 'function' && callback()){
 			callback(response); 
 		} 
 	}); 
 }; 

 function postToFB(msg){ 
 var url = baseUrl + user.userID + "/feed/"; 
 var data = { 
 	method: "post", 
 	message: msg, 
 	access_token: user.accessToken }; 

 	$.get(url,data,function(response){ 
 		if(response.id){ 
 			alert('Another status updated!');
 			var msg = $("#postmessage textarea").val(""); 
 		}
 		else{ 
 			alert('Alert Alert Alert');
 		}
 	}); 
 }; 

 function getFBresponse(response)
 { 
 	user=response.authResponse; 
 };  

 function login(){ 
 	FB.login(function(response){ 
 		if(response.authResponse){ 
 			getFBresponse(response); 
 			toggleLogin(); 
 		} 
 	}, {scope: 'publish_actions',return_scopes:true}); 
 };  

 function logout(){ 
 	FB.logout(function(){ 
 		toggleLogin(); 
 		user=null; 
 	}); 
 };  

 function toggleLogin(){
  $("#fb-login,#fb-logout").toggle(); 
}; 
};

 