fetch("navigation.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    let cityArray = data.cities.map((cityNames) => cityNames.label);

    function makeUL(array) {
      // Create the list element:
      let list = document.createElement("ul");
      list.classList.add("navbar-body");

      for (var i = 0; i < array.length; i++) {
        // Create the list item:
        let item = document.createElement("li");

        let link = document.createElement("a");
        // Set its contents:
        link.appendChild(document.createTextNode(array[i]));
        // Add it to the list:
        item.appendChild(link);
        list.appendChild(item);
      }

      // Finally, return the constructed list:
      return list;
    }

    document.getElementById("nav").appendChild(makeUL(cityArray));
  });

// Waits until the dom is ready and then adds class active
$(document).ready(function () {
  $("navbar ul.navbar-body li:first").addClass("active");
});

// Adds class active on click and remove from previously selected element
$(document).on("click", "navbar ul.navbar-body li a", function () {
  var $this = $(this);
  TabHighlighter.set($this);
  $this.closest("li").siblings(".active").removeClass("active");
  $this.closest("li").addClass("active");
});

//calculates size and position of of tabhighlighter
var TabHighlighter = {
  set: function ($this) {
    $(".tab-highlighter").css({
      left: $this.closest("li").offset().left,
      width: $this.closest("li").outerWidth(),
    });
  },
  refresh: function () {
    var $this = $(".tabs ul.navbar-body li.active a");
    $(".tab-highlighter").css({
      left: $this.closest("li").offset().left,
      width: $this.closest("li").outerWidth(),
    });
  },
};

//calculates tabhighlighter based on window resize
$(window).resize(function () {
  TabHighlighter.refresh();
});

$(document).ready(function () {
  TabHighlighter.refresh();
});
