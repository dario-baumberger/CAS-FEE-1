"use strict";

Handlebars.registerHelper("select", function (value, options) {
  return options
    .fn()
    .split("\n")
    .map(function (v) {
      let t = 'value="' + value + '"';
      return RegExp(t).test(v) ? v.replace(t, t + ' selected="selected"') : v;
    })
    .join("\n");
});

Handlebars.registerHelper("times", function (n, block) {
  let accum = "";
  for (let i = 0; i < n; ++i) accum += block.fn(i);
  return accum;
});

Handlebars.registerHelper("matches", function (arg1, arg2, options) {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("notmatches", function (arg1, arg2, options) {
  return arg1 !== arg2 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("formatDate", function (datetime, format = "short") {
  if (moment) {
    const DateFormats = {
      short: "DD. MMMM YYYY",
      long: "DD. MMMM YYYY HH:mm",
    };

    format = DateFormats[format] || format;

    return moment(datetime).format(format);
  } else {
    return datetime;
  }
});

Handlebars.registerHelper("multiline", function (line) {
  line = line.replace(/(?:\r\n|\r|\n)/g, "<br>");
  return new Handlebars.SafeString(line);
});
