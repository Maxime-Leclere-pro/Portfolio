function addScrollAnimation(link, target, header = false) {
    link.click(() => {
        $("html").animate({
            scrollTop: target.offset().top - (header ? 90 : 0)
        }, 'slow');
    });
}

$(function () {
    "use strict";
    console.log("ready!!");

    // add loader
    window.addEventListener('load', loader);
    
    let slidePage = document.querySelector('div#slidePage');
    let allImgBox = document.querySelectorAll(".imgBox");
    
    // click project
    allImgBox.forEach( imgBox => imgBox.addEventListener("click", e => {
        let itemProject = imgBox.parentElement;
        
        let selectProject = document.querySelector(".selectProject");
        if(updateSelectProject(selectProject, imgBox.parentElement))
        e.stopPropagation();
        
        // open slide
        if(openSlide(slidePage))
        e.stopPropagation();
        
        // update slide
        let infoProject = getInfoProject(itemProject);
        insertInfoInSlide(slidePage, infoProject);
    }) );
    
    // click project select
    document.addEventListener("click", e => {
        let selectProject = e.target.closest(".selectProject");
        if (e.target)
        {
            if (selectProject)
                closeSlide(slidePage);
            // click link Project
            if (e.target.classList.contains('btnLink'))
                e.target.querySelector('a').click();
        } 
    } );
    
    // Button Slide
    // Button close Slide
    document.querySelector("button#btnCloseSlide").addEventListener("click", () => closeSlide(slidePage));
    // button Pagination
    document.querySelectorAll("button.btnPagination").forEach( btn => btn.addEventListener( "click", e => {
        let string = btn.id.includes('Next') ? "next" : "previous";
        let selectProject = document.querySelector(".selectProject");
        let newSelectProject = selectProject[string+"ElementSibling"];
        
        if (!newSelectProject) {
            let stringNull = string == "next" ? "first" : "last";
            newSelectProject = selectProject.parentElement[stringNull+"ElementChild"];
        }
        updateSelectProject(selectProject, newSelectProject);

        insertInfoInSlide(slidePage, getInfoProject(newSelectProject));
    }) );
    
    // hoverProject
    allImgBox.forEach( imgBox => {
        let hoverDiv = imgBox.querySelector(".hoverImgBox");
        imgBox.addEventListener("mouseover", () => {
            hoverDiv.classList.add("hoverJs");
            imgBox.classList.add("hoverJs");
        });
        imgBox.addEventListener("mouseout", () => {
            hoverDiv.classList.remove("hoverJs");
            imgBox.classList.remove("hoverJs");
        });
    } );
    
    // open/close side bar
    let buttonSideMenu = document.querySelector("button#buttonSideMenu");
    
    buttonSideMenu.addEventListener("click", () => {
        buttonSideMenu.firstElementChild.classList.toggle('active');
        // display side bar
        document.querySelector("div#sideBar").classList.toggle("visible");
        document.querySelectorAll("header#menu, main").forEach( (el) => {
            el.classList.toggle("sideBarVisible");
        } );
    })
    
    const { scrollTop } = document.documentElement;
    let header = document.querySelector("header#menu");
    let sideBar = document.querySelector("div#sideBar");
    
    // hide menu for slide full width
    window.addEventListener('resize', () => slideFullPage(slidePage, header));

    // init Header & sideBar
    // state Home
    if (!scrollTop) {
        header.classList.add("transparant");
        document.querySelectorAll("#imgHome, #imgMenu").forEach( (el) => {
            el.classList.add("invert");
        });
    }
    // state scrolling
    else {
        header.classList.add("visible", "scrolling");
        document.querySelectorAll("header#menu nav#navMenu ul li a, div#sideBar, div#slidePage, .front, .back").forEach( (el) => {
            el.classList.add("scrolling");
        });
        document.querySelectorAll("#imgHome, #imgMenu, .b1, .b2, .b3, .b-back1, .b-back2").forEach( (el) => {
            el.classList.add("contrast");
        });
    }

    // Scroll
    addScrollAnimation($(".linkHome"), $("body"));
    addScrollAnimation($(".linkLink"), $("section#linkPart"), true);
    addScrollAnimation($(".linkProject"), $("section#projectPart"), true);

    // scroll animation
    window.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        // header
        if (scrollTop == 0) {
            header.classList.replace("visible", "transparant");
            header.classList.remove("scrolling");
            sideBar.classList.remove("scrolling");
            slidePage.classList.remove("scrolling");
            document.querySelectorAll("#imgHome, #imgMenu").forEach( (el) => {
                el.classList.replace("contrast", "invert");
            });
            document.querySelectorAll("header#menu nav#navMenu ul li a, .front, .back").forEach( (el) => {
                el.classList.remove("scrolling");
            } );
            document.querySelectorAll(".b1, .b2, .b3, .b-back1, .b-back2").forEach( (el) => {
                el.classList.remove("contrast");
            } );
        }
        else if (header.classList.contains("transparant")) {
            header.classList.replace("transparant", "visible");
            header.classList.add("scrolling");
            sideBar.classList.add("scrolling");
            slidePage.classList.add("scrolling");
            document.querySelectorAll("#imgHome, #imgMenu").forEach( (el) => {
                el.classList.replace("invert", "contrast");
            });
            document.querySelectorAll("header#menu nav#navMenu ul li a, .front, .back").forEach( (el) => {
                el.classList.add("scrolling");
            } );
            document.querySelectorAll(".b1, .b2, .b3, .b-back1, .b-back2").forEach( (el) => {
                el.classList.add("contrast");
            } );
        }
        
        let linkPart = document.querySelector("section#linkPart");
        let hideElement = document.querySelectorAll("section#linkPart ul li");
        
        let linkPartTop = (linkPart.getBoundingClientRect().top + scrollTop).toFixed();
        let linkPartBottom = (linkPart.getBoundingClientRect().bottom + scrollTop).toFixed();
        
        // link
        hideElement.forEach( function(el) {
            if ( 
                ( 
                    scrollTop + 90 >= linkPartTop && ( scrollTop + 90 >= linkPartTop && scrollTop + 90 < linkPartBottom ) 
                )
                // A voir si je supprime
                /*&& scrollTop + 90 + (clientHeight / 2) >= $(this).offset().top && (
                    scrollTop + 90 + (clientHeight / 2) >= $(this).offset().top && scrollTop + 90 < $(this).offset().top + this.offsetHeight
                    )*/
                )
                el.classList.add("active");
            else
                el.classList.remove("active");
        });
    });


    // Animation Hover link
    let spanContainer = document.querySelectorAll(".textAnimated div");
    spanContainer.forEach( function (el) {
        let that = el;
        let tabLetters = that.firstElementChild.textContent.split('');
        that.innerHTML = '';

        tabLetters.forEach( (el, index) => {
            let letterNode = document.createElement( "span" );
            letterNode.setAttribute('style', `transition-delay: ${0.07 * index}s`);
            letterNode.textContent = el;            
            that.append(letterNode);
        });
    } );

});