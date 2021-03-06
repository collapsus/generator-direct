'use strict';
var test = require('./helper.js'),
    assert = require('yeoman-assert'),
    path = require('path'),
    root = './desktop.blocks';

describe('Генератор direct:js', function () {
    [
        {

            title: 'Без параметров',
            params: {},
            path: 'foo/foo.js',
            decl: 'BEM.DOM.decl({ name: \'foo\' }'
        },
        {

            title: 'С параметрами --modName muted --modVal yes',
            params: {
                modName: 'muted',
                modVal: 'yes'
            },
            path: 'foo/_muted/foo_muted_yes.js',
            decl: 'BEM.DOM.decl({ name: \'foo\', modName: \'muted\', modVal: \'yes\' }'
        },
        {

            title: 'С параметром --elem',
            params: { elem: 'item' },
            path: 'foo/__item/foo__item.js',
            decl: 'BEM.DOM.decl({ name: \'foo\', elem: \'item\' }'
        },
        {

            title: 'С параметрами --elem --modName --modVal',
            params: {
                elem: 'item',
                modName: 'view',
                modVal: 'inline'
            },
            path: 'foo/__item/_view/foo__item_view_inline.js',
            decl: 'BEM.DOM.decl({ name: \'foo\', elem: \'item\', modName: \'view\', modVal: \'inline\' }'
        },
        {

            title: 'С параметром --baseBlock',
            params: { baseBlock: 'i-glue' },
            path: 'foo/foo.js',
            decl: 'BEM.DOM.decl({ name: \'foo\', baseBlock: \'i-glue\' }'
        },
        {

            title: 'С параметром --implements',
            params: { implements: 'i-interface' },
            path: 'foo/foo.js',
            decl: 'BEM.DOM.decl({ name: \'foo\', implements: \'i-interface\' }'
        }
    ].forEach(function(desc) {
        describe(desc.title, function () {
            beforeEach(function (done) {
                test.prepare(done, desc.params, 'js');
            });

            it('файл именован и размещен согласно БЕМ нотации', function () {
                assert.file(path.join(root, desc.path));
            });

            it('декларация соответсвует параметрам', function () {
                assert.fileContent(path.join(root, desc.path), desc.decl);
            });
        });
    });
});
