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
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    // var displayName = user.displayName;
    var email = user.email;
    console.log(email + "signed in");
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

function test(id) {
  console.log(id);
  var options = {
    data: {
      shopid: id
    }
  };
  $("#myNavigator")[0].pushPage("Rtamsang.html", options);
}



document.addEventListener('init', function (event) {
  var page = event.target;

  if (page.id === 'restaurantPage') {

    $("#back1").click(function () {
      window.location = 'index.html'
    });



    
    

    var show_shopid = $("#myNavigator")[0].topPage.data.shopid;
    console.log(show_shopid);

    $("#show").empty();
    if (show_shopid == "4") {
      db.collection("restaurant").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var item = `<ons-card>
        <ons-list-item modifier="chevron" tappable> ${doc.data().name} ${doc.data().price}
        </ons-list-item>
        </ons-card> `
            $("#show").append(item);
          });
        });
    }
    $("#show").empty();
    if (show_shopid == "2") {
      db.collection("restaurant2").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var item = `<ons-card ${doc.data().id}>
        <ons-list-item modifier="chevron" tappable> ${doc.data().name} ${doc.data().price}
        </ons-list-item>
        </ons-card> `
            $("#show").append(item);
          });
        });
    }
    $("#show").empty();
    if (show_shopid == "3") {
      db.collection("restaurant4").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var item = `<ons-card ${doc.data().id}>
        <ons-list-item modifier="chevron" tappable> ${doc.data().name} ${doc.data().price}
        </ons-list-item>
        </ons-card> `
            $("#show").append(item);
          });
        });
    }
    $("#show").empty();
    if (show_shopid == "1") {
      db.collection("restaurant3").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var item = `<ons-card ${doc.data().id}>
        <ons-list-item modifier="chevron" tappable> ${doc.data().name} ${doc.data().price}
        </ons-list-item>
        </ons-card> `
            $("#show").append(item);
          });
        });
    }
    $("#show").empty();
    if (show_shopid == "5") {
      db.collection("restaurant1").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var item = `<ons-card ${doc.data().id}>
        <ons-list-item modifier="chevron" tappable> ${doc.data().name} ${doc.data().price}
        </ons-list-item>
        </ons-card> `
            $("#show").append(item);
          });
        });
    }



  }


  if (page.id === 'homePage') {
    console.log("homePage");



    //fastfood
    // $("#btn1").click(function () {
    //window.location='fastfood.html'  
    //console.log("go");
    //});
    //dessert
    //$("#btn2").click(function () {
    //window.location='dessert.html'  
    //console.log("go");
    // });

    //Drink
    //$("#btn3").click(function () {
    //window.location='drink.html'  
    //console.log("go");
    //});

    //Islam
    //$("#btn4").click(function () {
    //window.location='islam.html'  
    //console.log("go");
    //});

    $("#fastfoodbtn").click(function () {
      localStorage.setItem("selectedCategory", "fastfood");
      $("#content")[0].load("category.html");
    });

    $("#dessertbtn").click(function () {
      localStorage.setItem("selectedCategory", "dessert");
      $("#content")[0].load("category.html");
    });

    $("#drinkbtn").click(function () {
      localStorage.setItem("selectedCategory", "drink");
      $("#content")[0].load("category.html");
    });

    $("#islambtn").click(function () {
      localStorage.setItem("selectedCategory", "islam");
      $("#content")[0].load("category.html");
    });





    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();
    });
    //;background-size: 100%; หลัง ) ที่ thumbnail
    $("#carousel").empty();
    db.collection("recommended").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var item = `<ons-carousel-item modifier="nodivider" id="${doc.data().id}" class="recomended_item">
        <div class="thumbnail"  style="background-image: url('${doc.data().photoUrl}');background-size: 180%;">
    
        </div>
        <div class="recomended_item_title" id="item1_name">${doc.data().name}</div>
    </ons-carousel-item>` ;
        $("#carousel").append(item);

      });
    });










  }

  if (page.id === 'menuPage') {
    console.log("menuPage");

    $("#logout").click(function () {
      window.location = 'login.html'
    });

    $("#logout").click(function () {
      firebase.auth().signOut().then(function () {
        $("#content")[0].load("home.html");
        $("#sidemenu")[0].close();
      }).catch(function (error) {
        console.log(error.message);
      });
    });

    $("#home").click(function () {
      $("#content")[0].load("home.html");
      $("#sidemenu")[0].close();
    });
  }

  if (page.id === 'categoryPage') {
    var category = localStorage.getItem("selectedCategory");
    console.log(category);

    $("#header").html(category);

    $("#back").click(function () {
      window.location = 'index.html'
    });


    $("#list").empty();
    db.collection("recommended").where("category", "==", category).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var item = `
        
        <ons-card style="margin-top: 40px;" onclick=test(${doc.data().id});>
        <div  style="height: 200px; background-position: center; background-size: auto 250px; background-image: url('${doc.data().photoUrl}')">
        </div>
      
        <div class="category_title" id="Category_1_name">${doc.data().name}</div>
  
 </div>
    
   </div>   </ons-card>  
         `

          $("#list").append(item);
          console.log(doc.data().name);

        });
      });

  }



  if (page.id === 'loginPage') {
    console.log("loginPage");

    $("#signinbtn").click(function () {
      var username = $("#username").val();
      var password = $("#password").val();
      firebase.auth().signInWithEmailAndPassword(username, password)
        .catch(function (error) {

          console.log(error.message);
        });

    });
    $("#backhomebtn").click(function () {
      $("#content")[0].load("home.html");
    });
  }
});

// function selectid(res_id){
//   localStorage.setItem("selectedCategory", res_id);
//   $("#content")[0].load("Rtamsang.html"); 
// }
