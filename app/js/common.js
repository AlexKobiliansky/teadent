$(document).ready(function(){
    /**
     * mobile-mnu customization
     */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            // "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */

    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    $('.services-slider').owlCarousel({
        loop:true,
        nav:true,
        // items: 1,
        dots: false,
        navText: ['', ''],
        margin: 30,
        autoWidth: true,
        responsive: {
            0: {
                margin: 10,
            },
            400: {
                margin: 30
            }
        }
    });


    $('.stocks-slider').owlCarousel({
        loop:true,
        nav:true,
        items: 4,
        dots: false,
        navText: ['', ''],
        margin: 30,
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 2,
            },
            768: {
                items: 3,
            },
            1200: {
                items: 4,
            }
        }
    });

    $('.about-slider').owlCarousel({
        loop:true,
        nav:true,
        items: 1,
        dots: true,
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        mouseDrag: false,
        navText: ['', ''],
    });

    $('.serts-slider').owlCarousel({
        loop:false,
        nav:false,
        items: 2,
        dots: true,
        navText: ['', ''],
        margin: 45,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 2,
                margin: 25
            },
            480: {
                margin: 45,
            }
        }
    });

    $('.serts-slider').photoswipe();

    $('.prices-tabs').tabs();

    $('.s-intro').enllax();

    function heightses() {
        if ($(window).width()>480) {
        }

        $('.service-slide-content').equalHeights();
    }

    $(window).resize(function() {
        heightses();
    });

    heightses();

    $('.preloader').fadeOut();

    $(".main-mnu a, .footer-nav a").mPageScroll2id();


    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

    var uPhone = $('.user-phone');
    uPhone.mask("+7 (999) 999-99-99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(4,4);
        needelem.focus();
    });

    $('input[type="checkbox"]').styler();


    $("a[href='#popup-form-service']").on('click', function(){
        let value = $(this).data('val');
        let img = $(this).data('img');

        $('#popup-service-val').val(value);
        $('#popup-service-title').text(value);
        $('#popup-img').attr('src', img);
    });

    $("a[href='#popup-form-stock']").on('click', function(){
        let value = $(this).data('val');

        $('#popup-stock-val').val(value);
        $('#popup-stock-title').text(value);
    })

    $(function() {
        $("a[href='#popup-form'], a[href='#popup-form-service'], a[href='#popup-form-order'], a[href='#popup-form-stock']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in"
        })
    });

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);
        th.find('.btn').prop('disabled','disabled');

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            $.magnificPopup.open({
                items: {
                    src: '#popup-greeting'
                },
                type: 'inline',

                fixedContentPos: false,
                fixedBgPos: true,

                overflowY: 'auto',

                closeBtnInside: true,
                preloader: false,

                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-zoom-request'
            }, 0);

            setTimeout(function(){
                $.magnificPopup.close();
            }, 2000);

            th.find(".btn").removeAttr('disabled');
            th.trigger("reset");
        });
        return false;
    });





    function loadScript(url, callback){
        var script = document.createElement("script");

        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Другие браузеры
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }


    function initMap() {
        ymaps.ready(function(){
            var mapId = $('#map'),
                attitude = mapId.data("att"),
                longtitude = mapId.data("long"),
                zoom = mapId.data("zoom"),
                marker = mapId.data("marker"),
                map = new ymaps.Map("map", {
                    center: [attitude, longtitude],
                    controls: ['zoomControl'],
                    zoom: zoom
                }),

                myPlacemark = new ymaps.Placemark(map.getCenter(), {}, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: marker,
                    // Размеры метки.
                    iconImageSize: [30, 52],
                });

            map.geoObjects.add(myPlacemark);
        });
    }

    if( $('#map').length )         // use this if you are using id to check
    {
        setTimeout(function(){
            loadScript("https://api-maps.yandex.ru/2.1/?apikey=e470b388-a1d0-4edf-acdc-34b4bc5bedee&lang=ru_RU&loadByRequire=1", function(){
                initMap();
            });
        }, 2000);
    }






});
