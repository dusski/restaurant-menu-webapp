var artikli = $.parseJSON('[{"tip":{"id_tipa":1,"tip":"hrana","kategorija":[{"id_kategorije":6,"kategorija":"Rostilj","id_tipa":1,"vrsta":[]},{"id_kategorije":7,"kategorija":"Riba","id_tipa":1,"vrsta":[]},{"id_kategorije":9,"kategorija":"Poslastice","id_tipa":1,"vrsta":[{"id_vrste":25,"vrsta":"kolaci","id_kategorije":9,"proizvod":[{"id_proizvoda":6,"proizvod":"baklava","cena":70,"id_vrste":25}]},{"id_vrste":26,"vrsta":"palacinke","id_kategorije":9,"proizvod":[{"id_proizvoda":7,"proizvod":"sa kremom","cena":100,"id_vrste":26}]}]}]}},{"tip":{"id_tipa":2,"tip":"pice","kategorija":[{"id_kategorije":3,"kategorija":"vina","id_tipa":2,"vrsta":[{"id_vrste":19,"vrsta":"bela vina","id_kategorije":3,"proizvod":[{"id_proizvoda":3,"proizvod":"grasevina","cena":500,"id_vrste":19}]},{"id_vrste":20,"vrsta":"crna vina","id_kategorije":3,"proizvod":[{"id_proizvoda":1,"proizvod":"vranac","cena":500,"id_vrste":20},{"id_proizvoda":2,"proizvod":"tamjanika","cena":500,"id_vrste":20}]}]},{"id_kategorije":5,"kategorija":"Sokovi","id_tipa":2,"vrsta":[{"id_vrste":23,"vrsta":"gazirani","id_kategorije":5,"proizvod":[{"id_proizvoda":4,"proizvod":"coca cola","cena":120,"id_vrste":23}]},{"id_vrste":24,"vrsta":"gusti","id_kategorije":5,"proizvod":[{"id_proizvoda":5,"proizvod":"borovnica","cena":120,"id_vrste":24}]}]}]}}]');
//

$(document).ready(function () {


  // generiše listu kategorija, tipova i proizvoda
  artikli.forEach(function (element) {
    var tip_class = "tip" + element.tip.id_tipa;
    $(".accordion").append('<li><button class="toggle btn btn-lg btn-primary btn-block tip" onclick="javascript:void(0);">' + element.tip.tip + '</button><ul class="inner panel panel-default ' + tip_class + '">');
    element.tip.kategorija.forEach(function (element) {
      //		
      var kat_class = "kat" + element.id_kategorije;
      //		console.log(element.id_kategorije);
      $("." + tip_class).append('<li><button class="toggle btn btn-lg btn-primary btn-block kategorija" onclick="javascript:void(0);">' + element.kategorija + '</button><ul class="inner panel panel-default ' + kat_class + '">');

      //				console.log(element.vrsta);
      element.vrsta.forEach(function (element) {
        //					console.log(element.vrsta);
        var vr_class = "vr" + element.id_vrste;
        //		console.log(element.id_kategorije);
        $("." + kat_class).append('<li><button class="toggle btn btn-lg btn-primary btn-block vrsta" onclick="javascript:void(0);">' + element.vrsta + '</button><ul class="inner panel panel-default ' + vr_class + '">');
        element.proizvod.forEach(function (element) {
          //					console.log(element.vrsta);
          //          var pro_id = "pro" + element.id_proizvoda;
          //		console.log(element.id_kategorije);
          $("." + vr_class).append('<li><div class="input-group"><span class="input-group-btn"><button type="button" class="btn btn-primary btn-block btn-lg proizvod val" onclick="sub();">-</button></span><input type="text" id="' + element.proizvod + '" class="form-control btn btn-lg proizvod" value="' + element.proizvod + '" readonly><input type="number" class="narudzbina" hidden="hidden" id="' + element.id_proizvoda + '" value="0"><span class="input-group-btn"><button type="button" class="btn btn-primary btn-lg proizvod val" role="button" onclick="add();">+</button> </span> ');

          // to generate a ghost input field, hoes after first input field
          // '<input type="number" hidden="hidden" id="' + element.proizvod + '" value="0">'

        });
      });
    });
    $(".accordion").append("</ul>");
  });

  // accordion javascript deo
  $('.toggle').click(function (e) {
    e.preventDefault();
    var $this = $(this);
    if ($this.next().hasClass('show')) {
      //			$this.next().slideUp(350);
      $this.next().removeClass('show');
    }
    else {
      //						$this.parent().parent().find('li .inner').slideUp(350);
      $this.parent().parent().find('li .inner').removeClass('show');
      //						$this.next().slideToggle(350);
      $this.next().toggleClass('show');
    }
  });


  // Stolovi, da div bude iste širine i visine
  //	$(window).resize(function(){
  //    // If there are multiple elements with the same class, "main"
  //    $('.sto').each(function() {
  //        $(this).height($(this).width());
  //    });
  //}).resize();



  //	Generating elements
  //		for (var i = 0; i < artikli.artikl.length; i++) {
  //			var node = document.createElement("li"); //creates li node
  //			var but = document.createElement("button");
  //			var textnode = document.createTextNode(artikli.artikl[i].naziv); //creates text node
  //			but.appendChild(textnode); // appends text to button
  //			node.appendChild(but); //appends button to li
  //			$("#articles").append(node); //appends li to ul #articles
  //			var listItem = document.getElementsByTagName("LI");
  //			var buttonItem = document.getElementsByTagName("BUTTON");
  //			listItem[i].className = "list-item";
  //buttonItem[i].className = "btn btn-lg btn-primary btn-category";
  //        document.getElementsByTagName("BUTTON")[i].addEventListener("click", counterUp);
  //		}

  $(".val").click(function (e) {
    var $this = $(this);
    //    var form_el = $("#order").children();‚‚


    //    var $clone = $("#"+id).clone(false,false);
    var plus = $this.parent().prev()[0];
    var minus = $this.parent().next().next()[0];
    var item_name = typeof ($this.parent().prev().prev()[0]) == "undefined" ? $this.parent().next()[0] : $this.parent().prev().prev()[0];




    if (this.innerHTML == "+") {
      // if plus clicked

      plus.value++;

      console.log(plus.value);

      item_name.value = item_name.id + " (" + plus.value + ")"

      /*    
    
    
               $("#"+plus)[0].value++;
               
               console.log($("#"+plus)[0].value);
               
    
    
               $("#"+id)[0].value++;
               
               console.log($("#"+id)[0].value);
               
               
               $("#order").append($clone);
    
    
    
    */

      // treba da iskenira order i da vidi da ne postoji već element sa istim id-jem,
      // ako postoji, njega zameni, a ako ne postoji, kreira ga
      // var forma = $("#order")[0];
      console.log(plus.id);


    } else if (this.innerHTML == "-") {
      // if minus clicked

      console.log(minus.value);

      if (minus.value > 1) {
        minus.value--;
        item_name.value = item_name.id + " (" + minus.value + ")";
        console.log(minus.id);
      } else {
        minus.value = 0;
        item_name.value = item_name.id;
      }

      //      $("#"+minus)[0].value--;
      //      
      //      console.log($("#"+minus)[0].value);

    } else {
      // else

    }
    //    console.log(item_name.id);

  });

});

function Naruci() {
  var naruci = $(".narudzbina");
  for (var i = 0; i < naruci.length; i++) {
    if (naruci[i].value > 0) {
      // console.log(naruci[i]);
      // console.log(naruci[i].value);

      $this = $(naruci[i]);

      $this.clone()
        .appendTo("#order")
        .removeClass("narudzbina")
        .insertBefore(".order-submit");

    }
  }

  var forma = $("#order")[0];
  for (var j = 0; j < forma.length - 1; j++) {
    // console.log($this);
    console.log(forma[j].id);
    // forma.forEach(function(element) {
    //   console.log(this.id);
    // }, this);

    // forma.forEach(function (element) {
    //   console.log(element.id);
    // })


  }



}




function add() {










  //	$("#coca_cola")[0].value = "test1";
  //  $("#coca_cola")[0].value = "Coca Cola (" + item[0].value + ")";
  //	console.log(item);
  //  console.log(item[0].value);
}

function sub() {
  //		console.log(item[0].value);
  //  if (item[0].value > 1) {
  //    item[0].value--;
  //    $("#coca_cola")[0].value = "Coca Cola (" + item[0].value + ")";
  //		console.log(item);
  //    console.log(item[0].value);
  //  }
  //  else {
  //    item[0].value = 0;
  //    $("#coca_cola")[0].value = "Coca Cola";
  //		console.log("Item number: " + item[0].value + "\nCoca Cola value: " + $("#coca_cola")[0].value);
  //		console.log(item);
  //    console.log(item[0].value);
  //  }
  //	console.log($("#coca_cola")[0].value);
  //	if (cValue <= 0){
  //		item[0].value = "0";
  //	} else {
  ////		cValue--;
  //		
  //	}
  //	item[0].value--;
}
