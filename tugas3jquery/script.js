$(function () {
  let ekspresi = "";
  const layar = $(".layar");

  $(".number").on("click", function () {
    let nilai = $(this).text();

    let bagianAngkaTerakhir = ekspresi.split(/[\+\-\*\/]/).pop();
    if (nilai == "." && bagianAngkaTerakhir.includes(".")) {
      return;
    }

    ekspresi += nilai;
    layar.val(ekspresi);
  });

  $(".operator").on("click", function () {
    let op = $(this).text();
    let lastInput = ekspresi.slice(-1);

    if (ekspresi === "" && op !== "-") {
      return;
    }

    if (["+", "-", "/", "*"].includes(lastInput)) {
      ekspresi = ekspresi.slice(0, -1) + op;
    } else {
      ekspresi += op;
    }

    layar.val(ekspresi);
  });

  $(".AC").on("click", function () {
    ekspresi = "";
    layar.val("");
  });


  $(".equals").on("click", function () {
    if (ekspresi === "") return;

    try {
      let hasil = eval(ekspresi);

      if (!isFinite(hasil)) {
        layar.val("Error");
        ekspresi = "";
      } else {
        ekspresi = hasil.toString();
        layar.val(ekspresi);
      }
    } catch (error) {
      layar.val("Error");
      ekspresi = "";
    }
  })
});

// Heart
$(function () {
  const $container = $("#heart-container");

  function createHeart() {
    const duration = Math.random() * 3 + 2;

    const $heart = $("<div>")
      .addClass("falling-heart")
      .html("❤️")
      .css({
        left: Math.random() * 100 + "vw",
        animationDuration: duration + "s",
        fontSize: Math.random() * 15 + 15 + "px",
        opacity: Math.random() * 0.5 + 0.5,
      });

    $container.append($heart);

    setTimeout(() => {
      $heart.remove();
    }, duration * 1000);
  }

  setInterval(createHeart, 300);
});
