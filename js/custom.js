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
      $(plus).clone()
        .appendTo("#order")
        .removeClass("narudzbina");

      // Naruci(plus.id);


    } else if (this.innerHTML == "-") {
      // if minus clicked



      if (minus.value > 1) {
        minus.value--;
        item_name.value = item_name.id + " (" + minus.value + ")";
        console.log(minus.id);
      } else {
        minus.value = 0;
        item_name.value = item_name.id;
      }
      console.log(minus.value);

      //      $("#"+minus)[0].value--;
      //      
      //      console.log($("#"+minus)[0].value);
      console.log(minus.id);
      $("#" + minus.id).remove();
      // ovo uklanja input element iza dugmeta
      // promeniti da uklanja isti input element u formi
      // http://stackoverflow.com/questions/2176986/jquery-add-id-instead-of-class

    } else {
      // else

    }
    //    console.log(item_name.id);

  });

});

function Naruci(element_id) {
  /*var naruci = $(".narudzbina");
  for (var i = 0; i < naruci.length; i++) {
    if (naruci[i].value > 0) {
      // console.log(naruci[i]);
      // console.log(naruci[i].value);
      $this = $(naruci[i]);

      var forma = $("#order")[0];
      // $(forma).shift();

      $this.clone()
        .appendTo("#order")
        .removeClass("narudzbina");

      // ovaj deo je problematičan, ako ukloniš "- 1" nastaje beskonačna petlja
      // ako ostaviš "- 1", preskače skroz i ne klonira element
      for (var j = 1; j < forma.length; j++) {
        // console.log($this);

        // .insertBefore(".order-submit");

        if (element_id == forma[j].id) {
          console.log("već postoji");

        } else {
          console.log("ne postoji");





        }
      }


    }
  }







  // forma.forEach(function(element) {
  //   console.log(this.id);
  // }, this);

  // forma.forEach(function (element) {
  //   console.log(element.id);
  // })
*/

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
