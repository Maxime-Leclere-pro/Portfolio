function openSlide(slidePage) {
    if (slidePage.classList.contains("closeSlide"))
    {
        slidePage.classList.remove("closeSlide");
        document.body.style.overflow = 'hidden';
        slideFullPage(slidePage, document.querySelector('header#menu'));
        slideEffectPage();
        return true;
    }
    return false;
}

function closeSlide(slidePage) {
    if (!slidePage.classList.contains("closeSlide"))
    {
        slidePage.classList.add("closeSlide");
        document.body.style.overflow = "initial";
        slideFullPage(slidePage, document.querySelector('header#menu'));
        slideEffectPage();
        return true;
    }
    return false;
}

function slideEffectPage() {
    document.querySelectorAll("header#menu, main").forEach( (el) => {
        el.classList.toggle("slidePageVisible");
    } );
}

function slideFullPage(slidePage, header) {
    console.log('resize', window.innerWidth, window.innerWidth <= 950, slidePage.classList.contains('closeSlide'), window.innerWidth != 0)
    if (window.innerWidth <= 950 && !slidePage.classList.contains('closeSlide')) {
        slidePage.classList.remove("scrolling")
        header.classList.add("slideFullSize");
        return true
    }
    else
    {
        if (header.classList.contains('scrolling'))
            slidePage.classList.add("scrolling");
        header.classList.remove("slideFullSize");
        return false;
    }

}

function updateSelectProject(selectProject, newSelectProject) {
    if (selectProject === newSelectProject)
        return false;
    if (selectProject)
        selectProject.classList.remove("selectProject");
    if (newSelectProject)
        newSelectProject.classList.add("selectProject");
    return true;
}

function getInfoProject(itemProject) {
    if (!itemProject.classList.contains("gridItem"))
        return {};
    let returnFn = {};

    returnFn.titleProject = itemProject.querySelector(".titleWork").textContent;
    returnFn.typeProject = itemProject.querySelector(".typeWork").textContent;
    let {src, alt} = itemProject.querySelector("img");
    returnFn.src = src;
    returnFn.alt = alt;

    returnFn.titlePresentation = itemProject.dataset.titlePresentation;
    returnFn.presentation = itemProject.dataset.presentation;
    returnFn.listPresentation = itemProject.dataset.listPresentation;
    
    returnFn.time = itemProject.dataset.time;
    returnFn.skill = itemProject.dataset.skill;
    returnFn.listUrl = itemProject.dataset.listUrl;

    return returnFn;
}

function insertInfoInSlide(slidePage, info) {
    slidePage.querySelector("h2#titleSlide").textContent = info.titleProject;
    slidePage.querySelector('section#imgSlide').innerHTML = `<img src="${info.src}" alt="${info.alt}">`;

    let presentationSlide = slidePage.querySelector("div#presentationSlide");

    let infoSlide = slidePage.querySelector("div#infoSlide");

    // Presentation Slide
    presentationSlide.innerHTML = '';

    // title Presentation
    if ( info.titlePresentation != undefined )
    {
        let titlePresentation = document.createElement('h3');
        titlePresentation.classList.add("titlePresentation");
        titlePresentation.textContent = info.titlePresentation;

        presentationSlide.append(titlePresentation);
    }

    // presentation
    if ( info.presentation != undefined )
    {
        let presentation = document.createElement('p');
        presentation.textContent = info.presentation;

        presentationSlide.append(presentation);
    }

    // list presentation
    if ( info.listPresentation != undefined )
    {
        presentationSlide.append(document.createElement('hr'));

        let listPresentation = document.createElement('ul');

        let tabElement = info.listPresentation.split(';');

        tabElement.forEach( el => {
            let elementList = document.createElement('li');
            let span = document.createElement('span');
            span.classList.add('listStyleSpan');
            span.textContent = "\u2713";
            elementList.innerHTML = span.outerHTML + el;

            listPresentation.append(elementList);
        } );

        presentationSlide.append(listPresentation);
    }

    // Info Slide
    // info Project
    if (info.time != undefined && info.typeProject != undefined)
    {
        infoSlide.querySelector('span#timeProject').textContent = info.time;
        infoSlide.querySelector('span#categProject').textContent = info.typeProject;
    }

    // skill Project
    let skillProject = slidePage.querySelector("div#skillProject");
    if (skillProject)
    {
        let hr = skillProject.previousElementSibling;
        hr.remove();
        skillProject.remove();
    }
    skillProject = document.createElement('div');
    skillProject.id = "skillProject";

    if (info.skill != undefined)
    {
        infoSlide.append(document.createElement('hr'));
        let tabSkill = info.skill.split(';');
        tabSkill.forEach( skill => {
            let skillHtml = document.createElement('div');
            skillHtml.classList.add("infoSkill");
            skillHtml.textContent = skill;
            skillProject.append(skillHtml);
        } );
        infoSlide.append(skillProject);
    }

    // link url project [github, site]
    let urlProject = slidePage.querySelector("div#urlProject");
    if (urlProject)
    {
        let hr = urlProject.previousElementSibling;
        hr.remove();
        urlProject.remove();
    }
    urlProject = document.createElement('div');
    urlProject.id = "urlProject";

    if (info.listUrl != undefined)
    {
        infoSlide.append(document.createElement('hr'));
        let tabUrl = info.listUrl.split(';');
        tabUrl.forEach( url => {
            const [textData, urlData] = url.split('!');

            let btnLink = document.createElement('button');
            btnLink.classList.add('btnLink');
            btnLink.classList.add('btnSlide');
            btnLink.textContent = textData;
            let link = document.createElement('a');
            link.href = urlData;
            link.target = "_blank";
            btnLink.append(link);

            urlProject.append(btnLink);
        } );
        infoSlide.append(urlProject);
    }
}