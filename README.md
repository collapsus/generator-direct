# generator-direct [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

>  scaffolding инструмент для yandex.direct


# Direct generator

Direct генератор для Yeoman берет на себя рутинные действия при создании блоков, элементов и модификаторов.
В работе генератор использует самостоятельные саб-генераторы для создания файлов технологий, это позволяет создавать как наборы  так и отдельные файлы.

## Использование

Рекомендуется использовать основной генератор с указание списка технологий

```
yo direct b-block-name —tech js,css,deps
```

Также возможно использование сад-генератора напрямую
```
yo direct:css b-some
```


## Саб-Генераторы

доступные генераторы технологий:

- direct:js
- direct:model
- direct:interface - Экспериментальный генератор!
- direct:bemhtml
- direct:bemtree
- direct:css
- direct:test
- direct:md
- direct:utils
- direct:deps

## Аргументы

* `blockName` - имя блока

## Параметры


* `—elem`

  Название элемента.

* `—modName`

  Название модификатора.

* `—modVal`

  Значение модификатора (если не указано, генератор уточнит его).

* `—baseBlock`

  Название базового блока.
  Если создается deps файл, то базовый блок будет автоматически включен в секцию mustDeps

* `—baseModel`

  Название базовой модели.
  Если создается deps файл, то базовая модель будет автоматически включена в секцию mustDeps

* `—implements`

  Название интерфейса.
  Если создается deps файл, то интерфейс будет автоматически включен в секцию mustDeps

## Создание сущностей

создать блока

```
yo direct b-some
```

создать модификатор блока

```
yo direct b-some —modName muted —modVal yes
```

создать элемент блока

```
yo direct b-some —elem child
```

создать модифицированный элемент блока

```
yo direct b-some —elem child —modName view —modVal inline
```

## Прикладные примеры

При генерации файла модели учитывается имя блока

```
yo direct dm-model —tech model // dm-model/dm-model.js
```

```
yo direct b-some —tech model // b-some/b-some.vm.js
```

создать модель с базовой моделью

```
yo direct b-some —tech model,deps —baseModel m-some
```

создать блок с i-glue

```
yo direct b-some —tech js,deps —baseBlock i-glue
```

создать интерфейс (Экспериментальный генератор)

```
yo direct i-interface —tech interface,deps
```


[npm-image]: https://badge.fury.io/js/generator-direct.svg
[npm-url]: https://npmjs.org/package/generator-direct
[travis-image]: https://travis-ci.org/jeka1985/generator-direct.svg?branch=master
[travis-url]: https://travis-ci.org/jeka1985/generator-direct
[daviddm-image]: https://david-dm.org/jeka1985/generator-direct.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/jeka1985/generator-direct
[coveralls-image]: https://coveralls.io/repos/jeka1985/generator-direct/badge.svg
[coveralls-url]: https://coveralls.io/r/jeka1985/generator-direct
