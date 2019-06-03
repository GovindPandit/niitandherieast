$(document).ready(function()
{
	var firebaseConfig = {
		apiKey: "AIzaSyAHkBIRqbG4brZY3XGHueRa6hTLhNV2j3Q",
		authDomain: "niitfirebaseapp.firebaseapp.com",
		databaseURL: "https://niitfirebaseapp.firebaseio.com",
		projectId: "niitfirebaseapp",
		storageBucket: "niitfirebaseapp.appspot.com",
		messagingSenderId: "467215480390",
		appId: "1:467215480390:web:a54b2bd8ff03830f"
	};
  
	firebase.initializeApp(firebaseConfig);

	firebase.auth().onAuthStateChanged(function(user) {
		  if (user) 
		  {
			// User is signed in.
		  }
		  else 
		  {
			window.location.href="register.html";
		  }
	});
	
	$("#logout").click(function()
	{
		firebase.auth().signOut().then(function()
		{
			window.location.href="register.html";
		},
		function(error)
		{
			alert(error);
		});
	});
});