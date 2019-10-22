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

$("#back2").click(function () {
  window.location = 'index.html'
});

function Confirm_mony() {
  console.log("Confirm_mony");

  $("#myNavigator")[0].pushPage("payment.html");
}

$("#con").click(function () {
  window.location = 'index.html'
});

var keep = [];
var store = [];
var prices = parseInt(0);
function keepprice(namep, pricep, imgp) {
  console.log("ชื่อรายการอาหาร " + namep + "   เงิน " + pricep + "    รูป" + imgp);

  localStorage.setItem("namep_1", namep);
  localStorage.setItem("imgp_1", imgp);

  var namep_1 = localStorage.getItem("namep_1");

  price = parseInt(pricep);
  

  prices = prices + parseInt(price);

  const array_order = [imgp];
  for (let i = 0; i < array_order.length; i++) {
    keep.push(namep_1);
    store.push(price);
  }
  console.log(keep);
  console.log("store  " + store);
  console.log("sum: " + prices);
}



document.addEventListener('init', function (event) {
  var page = event.target;

  if(page.id === 'payment'){
    var show_main_menu = (imgp_1 = localStorage.getItem("imgp_1"));
    console.log("show_main_menu: " + show_main_menu);

    var show_keep = keep;
    console.log("show_sub_menu_id :" + show_keep);

    // var sum_mony = prices;
    // console.log("sum_mony :" + sum_mony);

    var Address_use = "หอพักชาย 80/1 ม.1 ถ.วิชิตสงคราม....";
    var Contact = "080-8624087";
    var payment = "Cach of delivery" ;

    $(".address").empty();
    var sumprice1 = `<ons-list-item>
    <ons-row>
        <b style="width: 40%; font-size: 12px;">Address : </b>
        <b style="width: 60%; font-size: 12px;">` + Address_use + `</b>
    </ons-row>
    <ons-row>
    <b style="width: 40%; font-size: 12px;">Contact : </b>
    <b style="width: 60%; font-size: 12px;">` + Contact + `</b>
</ons-row>
<ons-row>
<b style="width: 40%; font-size: 12px;">Payment : </b>
<b style="width: 60%; font-size: 12px;">` + payment + `</b>
</ons-row>
</ons-list-item>`;
$(".address").append(sumprice1);
    
    
    
    
    $(".sumprice").empty();
    var sumprice1 = `<ons-list-item>
    <ons-row>
        <b style="width: 70%; font-size: 12px;">Total : </b>
        <b style="width: 30%; font-size: 12px;">` + prices + `</b>
    </ons-row>
    
</ons-list-item>`;
$(".sumprice").append(sumprice1);

    $(".show_sub").empty();
    var subhas = `<ons-list-item>
    <ons-row>
        <b style="width: 70%; font-size: 12px;">Name of Dish</b>
        <b style="width: 30%; font-size: 12px;">Price</b>
    </ons-row>
</ons-list-item>`;
    $(".showmenu").append(subhas);
    for (var i = 0; i < show_keep.length; i++) {
      var subitem =
        `<ons-list-item>
          <ons-row>
          <div style="width: 70%; font-size: 12px;"> <b>` +
          show_keep[i] +
        `</b></div>
          <div style="width: 30%; font-size: 12px;"> <b>$` +
          store[i] +
        `</b></div>
          </ons-row>
      </ons-list-item>`;
      $(".show_sub").append(subitem);
    }



    if(show_main_menu == 4){

      $("#imgpayment").empty();
      db.collection("recommended")
        .where("id", "==", "0004")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            var item = ` <ons-card style="margin-top: 40px;">
            <div  style="height: 200px; background-position: center; background-size: auto 250px; background-image: url('${doc.data().photoUrl}')">
            </div>
            </ons-card>`;
            $("#imgpayment").append(item);
          });
        });



    }


  }

  if (page.id === 'restaurantPage') {

    $("#back1").click(function () {
      window.location = 'index.html'
    });

    var show_shopid = $("#myNavigator")[0].topPage.data.shopid;
    console.log(show_shopid);

    $("#Confirm").empty();
    var Confirm = `<ons-card style="background-color: rgb(185, 185, 15);" onclick="Confirm_mony()">
    <ons-list-header style="text-align:center; padding: 8px; font-size:20px;" > Confirm
    </ons-list-header>
</ons-card> `
    $("#Confirm").append(Confirm);


    if (show_shopid == "4") {
      $("#imgmenu").empty();
      db.collection("recommended")
        .where("id", "==", "0004")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            
            var item = `<ons-card style="background-color: rgb(252, 252, 116);">
          <div>
              <div style="text-align:center; font-size: 50px; color: black;" class="font">${
              doc.data().name
              }</div>
          </div>
          <div style="text-align:center;">
                <img src="${doc.data().photoUrl}" style="width: 150px;">
            </div>
          <ons-row style="width: 100%;">
            <div style="width: 12%;">
              <p style="color: black; font-size: 15px;" class="font">
                ที่อยู่: </p>
            </div>
            <div style="width: 88%;">
              <p style="color: black; font-size: 15px;" class="font">
                ${doc.data().address} </p>
            </div>
          </ons-row>
          <ons-row style="width: 100%;">
            <div style="width: 35%;">
              <p style="color: black; font-size: 15px;" class="font">
              เวลาเปิดบริการ: </p>
            </div>
            <div style="width: 50%;">
            <p style="color: black; font-size: 15px;" class="font">
              ${doc.data().time} </p>
          </div>
          </ons-row>
      </ons-card>`;
            $("#imgmenu").append(item);
          });
        });

      $("#show").empty();
      db.collection("restaurant").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var item = `<ons-card onclick="keepprice('${doc.data().name}', '${doc.data().price}', ${show_shopid});">
        <ons-list-item modifier="chevron" tappable> ${doc.data().name} ${doc.data().price}
        </ons-list-item>
        </ons-card> `
            $("#show").append(item);
          });
        });
    }
    if (show_shopid == "2") {
      $("#imgmenu").empty();
      db.collection("recommended")
        .where("id", "==", "0002")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            
            var item = `<ons-card style="background-color: rgb(252, 252, 116);">
          <div>
              <div style="text-align:center; font-size: 50px; color: black;" class="font">${
              doc.data().name
              }</div>
          </div>
          <div style="text-align:center;">
                <img src="${doc.data().photoUrl}" style="width: 150px;">
            </div>
          <ons-row style="width: 100%;">
            <div style="width: 12%;">
              <p style="color: black; font-size: 15px;" class="font">
                ที่อยู่: </p>
            </div>
            <div style="width: 88%;">
              <p style="color: black; font-size: 15px;" class="font">
                ${doc.data().address} </p>
            </div>
          </ons-row>
          <ons-row style="width: 100%;">
            <div style="width: 35%;">
              <p style="color: black; font-size: 15px;" class="font">
              เวลาเปิดบริการ: </p>
            </div>
          </ons-row>
      </ons-card>`;
            $("#imgmenu").append(item);
          });
        });
      }
    $("#show").empty();
    if (show_shopid == "2") {
      db.collection("restaurant2").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var item = `<ons-card onclick="keepprice('${doc.data().name}', '${doc.data().price}', ${show_shopid});">
            
        <ons-list-item modifier="chevron" tappable> ${doc.data().name} ${doc.data().price}
        </ons-list-item>
        </ons-card> `
            $("#show").append(item);
          });
        });
    }

    if (show_shopid == "3") {
      $("#imgmenu").empty();
      db.collection("recommended")
        .where("id", "==", "0003")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            
            var item = `<ons-card style="background-color: rgb(252, 252, 116);">
          <div>
              <div style="text-align:center; font-size: 50px; color: black;" class="font">${
              doc.data().name
              }</div>
          </div>
          <div style="text-align:center;">
                <img src="${doc.data().photoUrl}" style="width: 150px;">
            </div>
          <ons-row style="width: 100%;">
            <div style="width: 12%;">
              <p style="color: black; font-size: 15px;" class="font">
                ที่อยู่: </p>
            </div>
            <div style="width: 88%;">
              <p style="color: black; font-size: 15px;" class="font">
                ${doc.data().address} </p>
            </div>
          </ons-row>
          <ons-row style="width: 100%;">
            <div style="width: 35%;">
              <p style="color: black; font-size: 15px;" class="font">
              เวลาเปิดบริการ: </p>
            </div>
          </ons-row>
      </ons-card>`;
            $("#imgmenu").append(item);
          });
        });
      }
    $("#show").empty();
    if (show_shopid == "3") {
      db.collection("restaurant4").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var item = `<ons-card onclick="keepprice('${doc.data().name}', '${doc.data().price}', ${show_shopid});">
        <ons-list-item modifier="chevron" tappable> ${doc.data().name} ${doc.data().price}
        </ons-list-item>
        </ons-card> `
            $("#show").append(item);
          });
        });
    }


    if (show_shopid == "1") {
      $("#imgmenu").empty();
      db.collection("recommended")
        .where("id", "==", "0001")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            
            var item = `<ons-card style="background-color: rgb(252, 252, 116);">
          <div>
              <div style="text-align:center; font-size: 50px; color: black;" class="font">${
              doc.data().name
              }</div>
          </div>
          <div style="text-align:center;">
                <img src="${doc.data().photoUrl}" style="width: 150px;">
            </div>
          <ons-row style="width: 100%;">
            <div style="width: 12%;">
              <p style="color: black; font-size: 15px;" class="font">
                ที่อยู่: </p>
            </div>
            <div style="width: 88%;">
              <p style="color: black; font-size: 15px;" class="font">
                ${doc.data().address} </p>
            </div>
          </ons-row>
          <ons-row style="width: 100%;">
            <div style="width: 35%;">
              <p style="color: black; font-size: 15px;" class="font">
              เวลาเปิดบริการ: </p>
            </div>
          </ons-row>
      </ons-card>`;
            $("#imgmenu").append(item);
          });
        });
      }
    $("#show").empty();
    if (show_shopid == "1") {
      db.collection("restaurant3").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var item = `<ons-card onclick="keepprice('${doc.data().name}', '${doc.data().price}', ${show_shopid});">
        <ons-list-item modifier="chevron" tappable> ${doc.data().name} ${doc.data().price}
        </ons-list-item>
        </ons-card> `
            $("#show").append(item);
          });
        });
    }

    if (show_shopid == "5") {
      $("#imgmenu").empty();
      db.collection("recommended")
        .where("id", "==", "0002")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            
            var item = `<ons-card style="background-color: rgb(252, 252, 116);">
          <div>
              <div style="text-align:center; font-size: 50px; color: black;" class="font">${
              doc.data().name
              }</div>
          </div>
          <div style="text-align:center;">
                <img src="${doc.data().photoUrl}" style="width: 150px;">
            </div>
          <ons-row style="width: 100%;">
            <div style="width: 12%;">
              <p style="color: black; font-size: 15px;" class="font">
                ที่อยู่: </p>
            </div>
            <div style="width: 88%;">
              <p style="color: black; font-size: 15px;" class="font">
                ${doc.data().address} </p>
            </div>
          </ons-row>
          <ons-row style="width: 100%;">
            <div style="width: 35%;">
              <p style="color: black; font-size: 15px;" class="font">
              เวลาเปิดบริการ: </p>
            </div>
          </ons-row>
      </ons-card>`;
            $("#imgmenu").append(item);
          });
        });
      }
    $("#show").empty();
    if (show_shopid == "5") {
      db.collection("restaurant1").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var item = `<ons-card onclick="keepprice('${doc.data().name}', '${doc.data().price}', ${show_shopid});">
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
