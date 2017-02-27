var artikli = $.parseJSON('[{"tip":{"id_tipa":1,"tip":"hrana","kategorija":[{"id_kategorije":6,"kategorija":"Rostilj","id_tipa":1,"vrsta":[]},{"id_kategorije":7,"kategorija":"Riba","id_tipa":1,"vrsta":[]},{"id_kategorije":9,"kategorija":"Poslastice","id_tipa":1,"vrsta":[{"id_vrste":25,"vrsta":"kolaci","id_kategorije":9,"proizvod":[{"id_proizvoda":6,"proizvod":"baklava","cena":70,"id_vrste":25}]},{"id_vrste":26,"vrsta":"palacinke","id_kategorije":9,"proizvod":[{"id_proizvoda":7,"proizvod":"sa kremom","cena":100,"id_vrste":26}]}]}]}},{"tip":{"id_tipa":2,"tip":"pice","kategorija":[{"id_kategorije":3,"kategorija":"vina","id_tipa":2,"vrsta":[{"id_vrste":19,"vrsta":"bela vina","id_kategorije":3,"proizvod":[{"id_proizvoda":3,"proizvod":"grasevina","cena":500,"id_vrste":19}]},{"id_vrste":20,"vrsta":"crna vina","id_kategorije":3,"proizvod":[{"id_proizvoda":1,"proizvod":"vranac","cena":500,"id_vrste":20},{"id_proizvoda":2,"proizvod":"tamjanika","cena":500,"id_vrste":20}]}]},{"id_kategorije":5,"kategorija":"Sokovi","id_tipa":2,"vrsta":[{"id_vrste":23,"vrsta":"gazirani","id_kategorije":5,"proizvod":[{"id_proizvoda":4,"proizvod":"coca cola","cena":120,"id_vrste":23}]},{"id_vrste":24,"vrsta":"gusti","id_kategorije":5,"proizvod":[{"id_proizvoda":5,"proizvod":"borovnica","cena":120,"id_vrste":24}]}]}]}}]');

$(document).ready(function () {
  
  

  // $.getJSON("final.json", function (data) {
  //   var artikli = data;
  // });

  // generiše listu kategorija, tipova i proizvoda
  artikli.forEach(function (element) {
    var tip_class = "tip" + element.tip.id_tipa;
    $(".accordion").append('<li><button class="toggle btn btn-lg btn-primary btn-block tip" onclick="javascript:void(0);">' + element.tip.tip + '</button><ul class="inner panel panel-default ' + tip_class + '">');
    element.tip.kategorija.forEach(function (element) {
      var kat_class = "kat" + element.id_kategorije;
      $("." + tip_class).append('<li><button class="toggle btn btn-lg btn-primary btn-block kategorija" onclick="javascript:void(0);">' + element.kategorija + '</button><ul class="inner panel panel-default ' + kat_class + '">');
      element.vrsta.forEach(function (element) {
        var vr_class = "vr" + element.id_vrste;
        $("." + kat_class).append('<li><button class="toggle btn btn-lg btn-primary btn-block vrsta" onclick="javascript:void(0);">' + element.vrsta + '</button><ul class="inner panel panel-default ' + vr_class + '">');
        element.proizvod.forEach(function (element) {
          $("." + vr_class).append('<li><div class="input-group"><span class="input-group-btn"><button type="button" class="btn btn-primary btn-block btn-lg proizvod val">-</button></span><input type="text" id="' + element.proizvod + '" class="form-control btn btn-lg proizvod" value="' + element.proizvod + '" readonly><input type="number" class="narudzbina" hidden="hidden" id="' + element.id_proizvoda + '" value="0"><span class="input-group-btn"><button type="button" class="btn btn-primary btn-lg proizvod val" role="button">+</button> </span> ');
        });
      });
    });
    $(".accordion").append("</ul>");
  });

  // accordion
  $('.toggle').click(function (e) {
    e.preventDefault();
    var $this = $(this);
    if ($this.next().hasClass('show')) {
      //	$this.next().slideUp(350);
      $this.next().removeClass('show');
    } else {
      //	$this.parent().parent().find('li .inner').slideUp(350);
      $this.parent().parent().find('li .inner').removeClass('show');
      //	$this.next().slideToggle(350);
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
    console.log(this);
    var $this = $(this);
    var plus = $this.parent().prev()[0];
    var minus = $this.parent().next().next()[0];
    var item_name = typeof ($this.parent().prev().prev()[0]) == "undefined" ? $this.parent().next()[0] : $this.parent().prev().prev()[0];
    var postoji = [];

    if (this.innerHTML == "+") {
      // if plus clicked
      plus.value++;
      console.log(plus.value);
      item_name.value = item_name.id + " (" + plus.value + ")"
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
    } else {
      // else
    }
  });

  

});

function Naruci() {

   

  var naruci = $(".narudzbina");
  var narudzbina = [];
  for (var i = 0; i < naruci.length; i++) {

    if (naruci[i].value > 0) {

      narudzbina.push({ "proizvod": $(naruci[i]).prev().attr('id'), "id_proizvoda": naruci[i].id, "kolicina": naruci[i].value });
    }
  } 

   

  if (narudzbina != '') {
    $('.bs-example-modal-sm').modal('toggle');
    // $('.modal-body').text(JSON.stringify(narudzbina));
    $('#narudzbina').html('<tr><th>proizvod</th><th>količina</th><th>cena</th></tr>');
    narudzbina.forEach(function (element) {
      $('#narudzbina').append('<tr><td>' + element.proizvod + '</td><td><button class="btn btn-default " onclick="console.log(\'hello world\');" type="button" role="button">+</button>' + element.kolicina + '<button class="btn btn-default " onclick="" type="button" role="button">-</button></td></tr>');
    })
  }

  // da resetuje vrednost polja, ali mora i da ažurira natpis i prikaže nulu
  // for (var i = 0; i < naruci.length; i++) {
  //   naruci[i].value = 0;
  // }

}

// function Naruci() {


/*

var loop = [];
for(var x = 0; x < 10; x++){
loop.push({value1: "value_a_" + x , value2: "value_b_" + x});
}
JSON.stringify({array: loop});
*/

// console.log(narudzbina);
// console.log($("#kon")[0].value);
// console.log($("#sto")[0].value);

// console.log(porudzbenica);



function Poruci() {

  var naruci = $(".narudzbina");
  var narudzbina = [];
  for (var i = 0; i < naruci.length; i++) {

    if (naruci[i].value > 0) {

      narudzbina.push({ "idProizvoda": naruci[i].id, "Kolicina": naruci[i].value });
    }
  }

  var idKonobara = $("#kon")[0].value;
  var idStola = $("#sto")[0].value;

  var porudzbenica = {
    "porudzbenica":
    {
      "idKonobara": idKonobara,
      "idStola": idStola
    },
    "detaljiPorudzbine": narudzbina
  };

  if (porudzbenica != '') {
    // console.log(JSON.stringify(porudzbenica));
    $.ajax({
      // url: 'stolovi.html',
      type: 'post',
      dataType: 'json',
      success: function (data) {
        alert(data.msg);
      },
      data: JSON.stringify(porudzbenica)
    });
  }
}


// http://stackoverflow.com/questions/8517071/send-json-data-via-post-ajax-and-receive-json-response-from-controller-mvc
// http://www.w3schools.com/jquerymobile/jquerymobile_popups.asp