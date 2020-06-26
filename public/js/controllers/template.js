export class TemplateController {
  renderTemplate(data, templateId, target, place = "beforeend") {
    templateId = "templates__" + templateId;
    const template = document.getElementById(templateId).innerHTML;
    const theTemplate = Handlebars.compile(template);
    const theCompiledHtml = theTemplate(data);
    const elem = document.querySelector(target);
    elem.insertAdjacentHTML(place, theCompiledHtml);
  }
}
