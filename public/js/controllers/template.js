export class TemplateController {
  constructor() {}

  renderTemplate(data, templateId, target, place = "beforeend") {
    templateId = "templates__" + templateId;
    const template = document.getElementById(templateId).innerHTML;
    const theTemplate = Handlebars.compile(template);
    const theCompiledHtml = theTemplate(data);
    const elem = document.querySelector(target);
    elem.insertAdjacentHTML(place, theCompiledHtml);
  }

  initEventHandlers() {}

  init() {
    this.initEventHandlers();
  }
}
