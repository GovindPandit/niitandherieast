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
			window.location.href="welcome.html";
		  }
		  else 
		  {
			
		  }
	});
	
	document.querySelector(".file-select").addEventListener("change",m1);
		
	function m1(e)
	{
		selectedFile=e.target.files[0];
	}
		

	$("#login").click(function()
	{
		$(".loader").css("display","block");
		var email=$("#loginemail").val();
		var pass=$("#loginpassword").val();
		
		firebase.auth().signInWithEmailAndPassword(email,pass).then(function()
		{
			$(".loader").css("display","none");
			alert("Welcome user");
			window.location.href="welcome.html";	
		},
		function(error)
		{
			$(".loader").css("display","none");	
			alert(error);
		});
	});
	
	$("#forget").click(function()
	{
		$(".loader").css("display","block");
		
		if($("#loginemail").val()=="")
		{
			$(".loader").css("display","none");
			alert("Please enter your email address and then click forget password");
		}
		else
		{
			firebase.auth().sendPasswordResetEmail($("#loginemail").val()).then(function()
			{
				$(".loader").css("display","none");
				alert("Reset link has been sent to your email!!!");
			},
			function(error)
			{
				$(".loader").css("display","none");
				alert(error);
			});
		}
	});
	
	$("#register").click(function()
	{
		$(".loader").css("display","block");
		var si=$("#studentid").val();
		var fn=$("#firstname").val();
		var ln=$("#lastname").val();
		var em=$("#email").val();
		var db=$("#dob").val();
		var cn=$("#contact").val();
		var ps=$("#password").val();
		var cs=$("#confirmpassword").val();
		
		
		firebase.auth().createUserWithEmailAndPassword(em,ps).then(function()
		{
			storageRef=firebase.storage().ref("/images/"+selectedFile.name);
			var uploadTask=storageRef.put(selectedFile);
			
			uploadTask.on("state_changed",function(snapshot)
			{
				
				
			},
			function(error)
			{
				alert(error);
			},
			function()
			{
				var userref=firebase.database().ref("students");
				var user=userref.push();
				user.set({
					studentid:si,
					firstname:fn,
					lastname:ln,
					email:em,
					dob:db,
					contact:cn,
					password:ps,
					confirmpassword:cs,
				});
				$(".loader").css("display","none");
				alert("Registered successfully!!!")	
				});
		},
		function(error)
		{
			alert(error);
			$(".loader").css("display","none");
		});
		
		
	});
});