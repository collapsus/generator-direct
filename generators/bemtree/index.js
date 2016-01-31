'use strict';

var Base = require('../../common/classes/BaseGenerator'),
    utils = require('../../common/utils');

module.exports = Base.extend({

    prompting: {
        askName: function() {
            this.askName();
        },
        askModVal: function() {
            this.askModVal();
        }
    },

    writing: function () {
        this.fs.copyTpl(
            this.templatePath('index.txt'),
            this.destinationPath(this._getPath('.bemtree.xjst')),
            this._getData());
    },

    /**
     * Готовит данные для шаблонизации
     * @returns {Object}
     * @private
     */
    _getData: function() {
        return {
            declaration: utils.getBemTplDecl(this.blockName, this.options)
        };
    }
});
