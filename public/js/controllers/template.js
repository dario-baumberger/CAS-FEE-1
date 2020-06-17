export class Template {
    constructor() {

    }

    renderTemplate(data, id, target, place = 'beforeend'){
       // console.log(id, data, target)
        id = 'templates__'+id;
        const template = document.getElementById(id).innerHTML;
        const theTemplate = Handlebars.compile(template);
        const theCompiledHtml = theTemplate(data);
        const elem = document.querySelector ( target )
        elem.insertAdjacentHTML(place, theCompiledHtml);
    }

    initEventHandlers() {

    }

    init(){
        this.initEventHandlers();
    }
}
