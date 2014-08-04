jQuery(document).ready(function ($) {


    //initialise Stellar.js
    $(window).stellar();

    //Cache some variables
    var links = $('#nav ul').find('li');
    slide = $('.slide');
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');
    var menu = false;


    //var menuCookie = readCookie("menu");

    if (document.cookie.indexOf("menu") >= 0) {
      if(readCookie("menu") == 1){
        $('#menubutton').hide();
        $('#nav').show();
      }else{
        $('#nav').hide();
        $('#menubutton').show();
      }
    }

    $('#menubutton').click(function (e) {
      $(this).fadeOut('400', function () {
        $('#nav').slideDown("400", "easeOutCubic");
        menu = true;
        createCookie("menu", "1", 30);
      });
    });

    $('#menu').click(function (e) {
      $('#nav').slideUp('200', "easeOutCubic", function () {
        $('#menubutton').fadeIn();
        menu = false;
        createCookie("menu", "0", 30);
      });
    });

    //Setup waypoints plugin
    /*slide.waypoint(function (event, direction) {

        //cache the variable of the data-slide attribute associated with each slide
        dataslide = $(this).attr('data-slide');

        //If the user scrolls up change the navigation link that has the same data-slide attribute as the slide to active and
        //remove the active class from the previous navigation link
        if (direction === 'down') {
            $('#nav li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
        }
        // else If the user scrolls down change the navigation link that has the same data-slide attribute as the slide to active and
        //remove the active class from the next navigation link
        else {
            $('#nav li[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
        }

    });*/

    slide.waypoint({

        // offset: +59,

        handler: function(event, direction) {
          //cache the variable of the data-slide attribute associated with each slide
          dataslide = $(this).attr('data-slide');

          //If the user scrolls up change the navigation link that has the same data-slide attribute as the slide to active and
          //remove the active class from the previous navigation link
          if (direction === 'down') {
            $('#nav li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
          }
          // else If the user scrolls down change the navigation link that has the same data-slide attribute as the slide to active and
          //remove the active class from the next navigation link
          else {
            $('#nav li[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
          }
        }


    });

    //waypoints doesnt detect the first slide when user scrolls back up to the top so we add this little bit of code, that removes the class
    //from navigation link slide 2 and adds it to navigation link slide 1.
    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('#nav li[data-slide="1"]').addClass('active');
            $('#nav li[data-slide="2"]').removeClass('active');
        }
    });

    //Create a function that will be passed a slide number and then will scroll to that slide using jquerys animate. The Jquery
    //easing plugin is also used, so we passed in the easing method of 'easeInOutQuint' which is available throught the plugin.
    function goToByScroll(dataslide) {
        if(menu)
          coordinates = ($('.slide[data-slide="' + dataslide + '"]').offset().top)+1;//-60;
        else
          coordinates = $('.slide[data-slide="' + dataslide + '"]').offset().top;
        htmlbody.animate({
            //scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
            scrollTop: coordinates
        }, 2000, 'easeInOutQuint');
    }



    //When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });

    //When the user clicks on the button, get the get the data-slide attribute value of the button and pass that variable to the goToByScroll function
    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });

    //$("#slide3).attr("src","/img/newimage.jpg").stop(true,true).hide().fadeIn();
    //$("#slide3").css('background-image', 'url(img-children1.jpg)');

});



function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
