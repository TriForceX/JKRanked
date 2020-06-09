$(function() {
    // Document is ready


    paceOptions = {
        // Disable the 'elements' source
        elements: false,
    
        // Only show the progress on regular and ajax-y page navigation,
        // not every request
        restartOnRequestAfter: false
    }

    $('#menu1').metisMenu();

    Waves.init();
    Waves.attach('.btn', ['waves-light']);
    Waves.attach('.has-arrow', ['waves-light']);


    var scroll = getComputedStyle(document.documentElement).getPropertyValue('--main-scroll-color');
    var border = getComputedStyle(document.documentElement).getPropertyValue('--content-border-color');

    activeSidebarScrollbar();

    
    document.documentElement.setAttribute('data-theme', 'theme-default-dark');
        
        
    graph1 = getComputedStyle(document.documentElement).getPropertyValue('--primary');
    graph2 = getComputedStyle(document.documentElement).getPropertyValue('--secondary');
    graph3 = getComputedStyle(document.documentElement).getPropertyValue('--tertiary');
    shadow = getComputedStyle(document.documentElement).getPropertyValue('--main-graph-line-color');
    scroll = getComputedStyle(document.documentElement).getPropertyValue('--main-scroll-color');
    font = getComputedStyle(document.documentElement).getPropertyValue('--main-graph-font-color');


    $("[type=checkbox]#fullscreen").change(function() {
        $checkbox = $(this)

        //Fullscreen
        var elem = document.documentElement;
        $icon = $checkbox.siblings("[class*=-wide]")
        checked = $checkbox.is(":checked")
        $icon.toggleClass('fa-compress-wide', checked).toggleClass('fa-expand-wide', !checked)
        if (checked) {
            openFullscreen(elem)
        } else {
            closeFullscreen(elem)
        }

    });



    function openFullscreen(elem) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE/Edge */
            elem.msRequestFullscreen();
        }

    }

    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

    }

    function activeSidebarScrollbar(){
    
        var h=$(window).height()-175;

        $('.sidebar-fixed #sidebar .sidebar-nav').slimScroll({
            railOpacity: 0,
            wheelStep: 10,
            height: h,
            position: "right",
            color: '#634b79',
            alwaysVisible: 0,
            distance: "0px",
            railVisible: 0,
            allowPageScroll: 0,
            disableFadeOut: 1,
            touchScrollStep: 40,
            size: '5px',
            railColor: '#ececec',
            opacity: 0
        }).mouseover(function() {
            $(this).next('.slimScrollBar').css('opacity', 0.6);
        });

        $('.slimScrollDiv').height(h);
    
    }

    function desactiveSidebarScrollbar(){
        var scrollbar = $("#sidebar div").hasClass("slimScrollDiv");

        if(scrollbar){
            $('#sidebar .sidebar-nav').css("overflow", "visible");
            $("#sidebar .sidebar-nav").unwrap();
            $('#sidebar .slimScrollBar').remove();
            $('#sidebar .slimScrollRail').remove();
        }
        
    }

    function activeMinifiedSidebarAmination(){

        $("#sidebar.desktop.normal .sidebar-header .logo a span").css("animation","0.5s linear 0.2s fadeIn");
        $("#sidebar.desktop.normal .sidebar-header .logo a span").css("animation-fill-mode","forwards");
        $("#sidebar.desktop.normal .sidebar-header .logo a span").css("visibility","hidden");

        $("#sidebar.desktop.normal .metismenu li a span.element").css("animation","0.5s linear 0.2s fadeIn");
        $("#sidebar.desktop.normal .metismenu li a span.element").css("animation-fill-mode","forwards");
        $("#sidebar.desktop.normal .metismenu li a span.element").css("visibility","hidden");

        $("#sidebar.desktop.normal .metismenu li ul li a span").css("animation","0.5s linear 0.2s fadeIn");
        $("#sidebar.desktop.normal .metismenu li ul li a span").css("animation-fill-mode","forwards");
        $("#sidebar.desktop.normal .metismenu li ul li a span").css("visibility","hidden");

        setTimeout(
            function() {
                $("#sidebar.desktop.normal .sidebar-header .logo a span").css("animation","none");
                $("#sidebar.desktop.normal .sidebar-header .logo a span").css("visibility","visible");

                $("#sidebar.desktop.normal .metismenu li a span.element").css("animation","none");
                $("#sidebar.desktop.normal .metismenu li a span.element").css("visibility","visible");

                $("#sidebar.desktop.normal .metismenu li ul li a span").css("animation","none");
                $("#sidebar.desktop.normal .metismenu li ul li a span").css("visibility","visible");
            },
            500
        );

    }


    function desactivateMinifiedSidebarAmination(){

        $("#sidebar.desktop.minified .sidebar-header .logo a span").css("animation","none");
        $("#sidebar.desktop.minified .sidebar-header .logo a span").css("visibility","visible");

        $("#sidebar.desktop.minified .metismenu li a span.element").css("animation","none");
        $("#sidebar.desktop.minified .metismenu li a span.element").css("visibility","visible");

        $("#sidebar.desktop.minified .metismenu li ul li a span").css("animation","none");
        $("#sidebar.desktop.minified .metismenu li ul li a span").css("visibility","visible");

    }


    function sidebarBehavior(mobile){
        
        if(mobile){
            $("#sidebar").removeClass("desktop");
            $("#sidebar").removeClass("normal");
            $("#sidebar").removeClass("minified");
            $("#sidebar").addClass("mobile");
            $("#content").removeClass("desktop");
            $("#content").removeClass("sidebar-minified");
            $("#content").addClass("mobile");
            $("#sidebar").addClass("hidden");
            $(".wrapper").addClass("sidebar-fixed");
            $("#sidebarfixed").prop('checked', true);
            $("#sidebarfixed").attr("disabled", true);

            
            $(".metismenu .mm-active ul").removeClass("mm-show");
            $(".metismenu .mm-active .has-arrow").attr("aria-expanded", "false");
            //$(".metismenu li").removeClass("mm-active");

            $(".has-arrow").attr("aria-disabled", "false");
            $(".metismenu .element.active .has-arrow").attr("aria-expanded", "true");
            $(".metismenu .element.active").addClass("mm-active");
            $(".metismenu .element.active ul").addClass("mm-collapse");
            $(".metismenu .element.active ul").addClass("mm-show");
            $(".metismenu .element.active ul li").addClass("mm-active");
            $(".metismenu .element.active ul").removeAttr("style");

            activeSidebarScrollbar();
        }else{
            $("#content").addClass("desktop");
            $("#sidebar").removeClass("mobile");
            $("#content").removeClass("mobile");
            $("#sidebar").removeClass("hidden");
            $("#sidebar").addClass("desktop");
            
            $("#sidebarfixed").removeAttr("disabled");

            if ($("#sidebar").hasClass("minified")){
                $("#sidebar").removeClass("normal");
            }else{
                $("#sidebar").addClass("normal");
            }
            
            $(".wrapper").addClass("sidebar-fixed");
            activeSidebarScrollbar();
            
        }
    }

    function loadHeaderAnimation(){
        $(".wrapper.header-fixed #content.desktop #header").css("-webkit-transition","margin 0.4s");
        $(".wrapper.header-fixed #content.desktop #header").css("-moz-transition","margin 0.4s");
        $(".wrapper.header-fixed #content.desktop #header").css("-o-transition","margin 0.4s");
        $(".wrapper.header-fixed #content.desktop #header").css("transition","margin 0.4s");

        setTimeout(
            function() {
                $(".wrapper.header-fixed #content.desktop #header").css("-webkit-transition","none");
                $(".wrapper.header-fixed #content.desktop #header").css("-moz-transition","none");
                $(".wrapper.header-fixed #content.desktop #header").css("-o-transition","none");
                $(".wrapper.header-fixed #content.desktop #header").css("transition","none");
            },
            500
        );
    }

    function loadContentAnimation(){

        $(".wrapper.sidebar-fixed #content.desktop").css("-webkit-transition","margin 0.4s");
        $(".wrapper.sidebar-fixed #content.desktop").css("-moz-transition","margin 0.4s");
        $(".wrapper.sidebar-fixed #content.desktop").css("-o-transition","margin 0.4s");
        $(".wrapper.sidebar-fixed #content.desktop").css("transition","margin 0.4s");

        setTimeout(
            function() {
                $(".wrapper.sidebar-fixed #content.desktop").css("-webkit-transition","none");
                $(".wrapper.sidebar-fixed #content.desktop").css("-moz-transition","none");
                $(".wrapper.sidebar-fixed #content.desktop").css("-o-transition","none");
                $(".wrapper.sidebar-fixed #content.desktop").css("transition","none");
            },
            500
        );

    }

    $('#sidebarAction').on('click', function() {
        var normal = $("#sidebar").hasClass("normal");

        var mobile = $("#sidebar").hasClass("mobile");
        var hidden = $("#sidebar").hasClass("hidden");

        if(mobile){
            $("#content").addClass("mobile");
            $("#content").removeClass("desktop");
            $(".wrapper").addClass("sidebar-fixed");
            $("#sidebarfixed").prop('checked', true);
            $("#sidebarfixed").attr("disabled", true);
            if(hidden){
                $("#sidebar").removeClass("hidden");
                $("#sidebar").addClass("over");
                $("body").addClass("sidebar-enabled");
            }else{
                $("#sidebar").removeClass("over");
                $("#sidebar").addClass("hidden");
                $("body").removeClass("sidebar-enabled");
                
            }
        }else{ //Desktop
            loadHeaderAnimation();
            loadContentAnimation()
            $("#content").removeClass("mobile");
            $("#content").addClass("desktop");
            $("#sidebarfixed").removeAttr("disabled");
            if(normal){
                
                $("#sidebar").removeClass("normal");
                $("#sidebar").addClass("minified");
                $("#content").addClass("sidebar-minified");
                $("#content").addClass("desktop");

                desactivateMinifiedSidebarAmination()

                $(".has-arrow").attr("aria-disabled", "true");
                $(".has-arrow").attr("aria-expanded", "false");
                $(".metismenu li ul.mm-show").removeClass("mm-show");
                //$(".metismenu>li.mm-active").removeClass("mm-active");

                desactiveSidebarScrollbar();

            }else{
                
                $("#sidebar").removeClass("minified");
                $("#sidebar").addClass("normal");
                $("#content").removeClass("sidebar-minified");

                activeMinifiedSidebarAmination();

                $(".metismenu .mm-active ul").removeClass("mm-show");
                $(".metismenu .mm-active .has-arrow").attr("aria-expanded", "false");
                //$(".metismenu li").removeClass("mm-active");

                $(".has-arrow").attr("aria-disabled", "false");
                $(".metismenu .element.active .has-arrow").attr("aria-expanded", "true");
                $(".metismenu .element.active").addClass("mm-active");
                $(".metismenu .element.active ul").addClass("mm-collapse");
                $(".metismenu .element.active ul").addClass("mm-show");
                $(".metismenu .element.active ul li").addClass("mm-active");
                $(".metismenu .element.active ul").removeAttr("style");

                

                activeSidebarScrollbar();
            }
        }

    });

    //Resize event
    if (matchMedia) {
        var mq_mobilexs = window.matchMedia("(min-width: 320px) and (max-width: 575px)");
        mq_mobilexs.addListener(function(mql) {
            if (mql.matches) {
                //mobile
                sidebarBehavior(true);
            }
        });

        var mq_mobile = window.matchMedia("(min-width: 576px) and (max-width: 767px)");
        mq_mobile.addListener(function(mql) {
            if (mql.matches) {
                //mobile
                sidebarBehavior(true);
            }
        });

        var mq_tablet = window.matchMedia("(min-width: 768px) and (max-width: 991px)");
        mq_tablet.addListener(function(mql) {
            if (mql.matches) {
                //mobile
                sidebarBehavior(true);
            }
        });

        var mq_desktop = window.matchMedia("(min-width: 992px) and (max-width: 1199px)");
        mq_desktop.addListener(function(mql) {
            if (mql.matches) {
                //mobile
                sidebarBehavior(false);
            }
        });

        var mq_desktopxl = window.matchMedia('(min-width: 1200px)');
        mq_desktopxl.addListener(function(mql) {
            if (mql.matches) {
                //mobile
                sidebarBehavior(false);
            }
        });

        //La primera vez
        if (mq_mobilexs.matches) {
            //mobile
            sidebarBehavior(true);
        }

        if (mq_mobile.matches) {
            //mobile
            sidebarBehavior(true);
        }

        if (mq_tablet.matches) {
            //mobile
            sidebarBehavior(true);
        }

        if (mq_desktop.matches) {
            //mobile
            sidebarBehavior(false);
        }

        if (mq_desktopxl.matches) {
            //mobile
            sidebarBehavior(false);
        }
    }


    $('.settingbar-overlay').on('click', function() {
        var bar = $("body").hasClass("settingbar-enabled");

        if (bar) {
            $("#settings").prop("checked", false);
            $("body").removeClass("settingbar-enabled");
            $(".settingbar").css("right","-230px");
        } 
    });

    $('.sidebar-overlay').on('click', function() {
        var bar = $("body").hasClass("sidebar-enabled");
        var over = $("#sidebar").hasClass("over");

        $("body").removeClass("sidebar-enabled");
        $(".settingbar").css("right","-230px");
        
        if(over){
            $("#sidebar").removeClass("over");
            $("#sidebar").addClass("hidden");
        }
    });

    $(".has-arrow").click(function() {
        var event = $(this);
        $(event).css("pointer-events", "none");
        setTimeout(
            function() {
                $(event).css("pointer-events", "auto");
            },
            250
        );
    });

    $(window).resize(function(){
        var h=$(window).height()-175;
        $('.sidebar-fixed #sidebar .sidebar-nav').height(h);
        $('.slimScrollDiv').height(h);
    });

    $(".metismenu li a").removeAttr("title");



});