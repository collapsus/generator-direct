'use strict';
var yeoman = require('yeoman-generator'),
    _ = require('lodash'),
    path = require('path'),
    fs = require('fs'),
    yosay = require('yosay'),
    utils = require('../utils');

module.exports = yeoman.generators.Base.extend({

    constructor: function() {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('blockName', { desc: 'Название блока', required: false });

        this.option('elem', { desc:'Имя элемента блока' });
        this.option('modName', { desc:'Имя модификатора блока' });
        this.option('modVal', { desc:'Значение модификатора блока' });
        this.option('tech', { desc: 'Список создаваемых технологий для блока' });
        this.option('baseBlock', { desc:'Имя базового блока' });
        this.option('baseModel', { desc:'Имя базовой модели' });
        this.option('implements', { desc:'Имя интерфейса блока' });

        this.root = this.config.get('root');
        this.techParams = this.config.get('techParams');
    },

    /**
     * Уточняет имя блока
     * @protected
     */
    askName: function() {
        this._ask([
            {
                type : 'input',
                name : 'blockName',
                message : 'Название блока',
                when: !this.blockName
            }
        ], function (answers) {
            if (answers.blockName) this.blockName = answers.blockName.trim();
        });
    },

    /**
     * Уточняет значение модификатора
     * @protected
     */
    askModVal: function() {
        this._ask([
            {
                type : 'input',
                name : 'modVal',
                message : 'Значение модификатора',
                when: !!this.options.modName && !this.options.modVal
            }
        ], function (answers) {
            if (answers.modVal) this.options.modVal = answers.modVal.trim();
        });
    },

    /**
     * Уточняет набор технологий
     * @protected
     */
    askTech: function() {
        this._ask([
            {
                type: 'checkbox',
                name: 'tech',
                message: 'Выберите технологии',
                when: !this.options.tech,
                choices: Object.keys(this.techParams).map(function(opt) {
                    return {
                        name: opt,
                        value: opt,
                        checked: this.techParams[opt].byDefault
                    }
                }, this)
            }
        ], function (answers) {
            if (answers.tech) this.options.tech = answers.tech;
        });
    },

    /**
     * Спрашивает подтверждение сохранения
     * @protected
     */
    askApproval: function() {
        this._ask([
            {
                type: 'confirm',
                name: 'approve',
                message: yosay('Все готово, сохраняем ?')
            }
        ], function (answers) {
            !answers.approve && this.removePath(path.join(this.root, this.getFolder()))
        });
    },

    /**
     * Возвращает имя файла в БЭМ нотации по заданым параметрам
     * @returns {String}
     * @protected
     */
    getName: function() {

        return utils.getBemName(this.blockName, this.options.elem, this.options.modName, this.options.modVal);
    },

    /**
     * Возвращает имя папки в БЭМ нотации по заданым параметрам
     * @returns {String}
     * @protected
     */
    getFolder: function() {

        return utils.getBemFolder(this.blockName, this.options.elem, this.options.modName);
    },

    /**
     * Возвращает массив технологий
     * @param {String|Array} input - набор технологий
     * @returns {Array}
     * @protected
     */
    getValidTechList: function(input) {
        var rawArray = typeof input == 'string' ? input.split(',') : input,
            validTech = Object.keys(this.techParams);

        return (rawArray.reduce(function(arr, item) {

            if(validTech.indexOf(item) >= 0 && arr.indexOf(item) < 0) {
                arr.push(item);
            }

            return arr;

        }, []));
    },

    /**
     * Удаляет папку
     * @param {String} path - путь до папки
     * @protected
     */
    removePath: function(path) {
        if( fs.existsSync(path) ) {
            fs.readdirSync(path).forEach(function(file){
                var curPath = path + "/" + file;
                if(fs.lstatSync(curPath).isDirectory()) {
                    this.removePath(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            }, this);
            fs.rmdirSync(path);
        }
    },

    /**
     * Хелпер для задания вопросов пользователю
     * @protected
     */
    isTechSelected: function(tech) {
        return this.options.tech && this.getValidTechList(this.options.tech).indexOf(tech) >= 0;
    },

    /**
     * Возвращает путь до файла по заданым параметрам
     * @param {String} ext - расширение файла
     * @returns {String}
     * @protected
     */
    getPath: function(ext) {

        return path.join(this.root, this.getFolder(), this.getName() + ext);
    },

    /**
     * Хелпер для задания вопросов пользователю
     * @private
     */
    _ask: function(questions, callback) {
        var done = this.async();

        this.prompt(questions, function (answers) {

            callback.call(this, answers);

            done();
        }.bind(this));
    }
});