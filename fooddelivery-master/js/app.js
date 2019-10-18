  //Initial /firebase 1111111111111
  var firebaseConfig = {
  apiKey: "AIzaSyDIx32uGBJ3GGfRFRAeMyXieh7sg__lQvg",
  authDomain: "foodmonkey-457b5.firebaseapp.com",
  databaseURL: "https://foodmonkey-457b5.firebaseio.com",
  projectId: "foodmonkey-457b5",
  storageBucket: "foodmonkey-457b5.appspot.com",
  messagingSenderId: "924489167542",
  appId: "1:924489167542:web:8c481d88eaec4784886c17"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

//login
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
   // var displayName = user.displayName;
    var email = user.email;
    console.log(email+ "signed in");
    // var emailVerified = user.emailVerified;
    // var photoURL = user.photoURL;
    // var isAnonymous = user.isAnonymous;
    // var uid = user.uid;
    // var providerData = user.providerData;
    // ...
  } else {
    console.log("signed out");

  }
});





document.addEventListener('init', function (event) {
  var page = event.target;




  if (page.id === 'homePage') {
    console.log("homePage");

//fastfood
     $("#btn1").click(function () {
      window.location='fastfood.html'  
       console.log("go");
     });
//dessert
$("#btn2").click(function () {
  window.location='dessert.html'  
   console.log("go");
 });

//Drink
$("#btn3").click(function () {
  window.location='drink.html'  
   console.log("go");
 });

//Islam
$("#btn4").click(function () {
  window.location='islam.html'  
   console.log("go");
 });


    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();      
    });
  
    $("#carousel").empty();
    db.collection("recommended").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var item = `<ons-carousel-item modifier="nodivider" id="${doc.data().id}" class="recomended_item">
        <div class="thumbnail"  style="background-image: url('${doc.data().photoUrl}');background-size: 100%;">
        </div>
        <div class="recomended_item_title" id="item1_name">'${doc.data().name}</div>
    </ons-carousel-item>` ;
        $("#carousel").append(item);
          
      });
  });


  


  




  }

  if (page.id === 'menuPage') {
    console.log("menuPage");

    $("#logout").click(function () {
      window.location='login.html'  
    });

    $("#logout").click(function () {
      firebase.auth().signOut().then(function() {
        $("#content")[0].load("home.html");  
      $("#sidemenu")[0].close();   
      }).catch(function(error) {
        console.log(error.message);
      });
    });

    $("#home").click(function () {
      $("#content")[0].load("home.html");  
      $("#sidemenu")[0].close();   
    });
  }

  if (page.id === 'loginPage') {
    console.log("loginPage");

    $("#signinbtn").click(function () {
     var username = $("#username").val();
     var password = $("#password").val();
     firebase.auth().signInWithEmailAndPassword(username, password)
     .catch(function(error) {
      
       console.log(error.message);
    });
    
    });
    $("#backhomebtn").click(function () {
      $("#content")[0].load("home.html");      
    });
  }
});
