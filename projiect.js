var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnimation(){
    var tl = gsap.timeline();
    tl.from("#nav",{
        y:"-10",
        opacity:0,
        ease:Expo.easeInOut,
        duration:1.5,
    })
        .to(".boundingelem",{
        y: 0,
        ease:Expo.easeInOut,
        duration: 2,
        stagger: .2,
        delay:-1,
    });
        tl.from("#herofooter",{
        y: -10,
        opacity:0,
        duration:1.5,
        ease:Expo.easeInOut,
        delay: -1,
    });
}
firstPageAnimation();


// for mouse resising during the movement
// how fast we are moving our mouse doesn't mean anything, the defined max and min values will only be followed and we will convert the values within this range
// taking max=1.2 and min=0.8


function circleResizing(){
    var xscale = 1;
    var yscale = 1;
    var xprevious = 0;
    var yprevious = 0;
    window.addEventListener("mousemove", function(details){
        clearTimeout(timeout)

        var xdiff = details.clientX - xprevious
        var ydiff = details.clientY - yprevious

        xscale=gsap.utils.clamp(0.8,1.2,xdiff)
        yscale=gsap.utils.clamp(0.8,1.2,ydiff)

        xprevious = details.clientX
        yprevious = details.clientY

        circleMouseFollower(xscale, yscale);

         timeout = setTimeout(function () {
             document.querySelector(
            "#minicircle"
            ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
  });
    
}
// for the circular mouse

function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove",function(details){
        document.querySelector("#minicircle").style.transform=`translate(${details.clientX}px, ${details.clientY}px`;
    });
}
circleResizing();
circleMouseFollower();

// for images

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate =0;
    var diff =0;

    elem.addEventListener("mousemove",function(details){
        var difference = details.clientY - elem.getBoundingClientRect().top;
        diff = details.clientX - rotate;
        rotate=details.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            left: details.clientX,
            top :difference,
            rotate: gsap.utils.clamp(-20,20,diff),
        });
    });
    elem.addEventListener("mouseleave",function(details){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power3,
            duration: 0.5,
        });
    });
});

