'use strict';

var Base = require('../../common/classes/BaseGenerator');

module.exports = Base.extend({

    prompting: {
        askName: function() {
            this.askName();
        },
        askModVal: function() {
            this.askModVal();
        }
    },

    /**
     * Готовит данные для шаблонизации
     * @returns {Object}
     * @private
     */
    _getData: function() {
        return {
            declaration: this.getName()
        }
    },

    writing: function () {
        this.fs.copyTpl(
            this.templatePath('index.txt'),
            this.destinationPath(this._getPath('.interface.js')),
            this._getData());
    }
});
