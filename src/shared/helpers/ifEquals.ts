import * as Handlebars from 'handlebars'

export const ifEquals = Handlebars.registerHelper('ifEquals', function (this: typeof Handlebars.registerHelper, arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});
