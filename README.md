# css-tree-animatable

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![](https://img.shields.io/npm/v/css-tree-animatable.svg)](https://www.npmjs.com/package/css-tree-animatable)
[![](https://img.shields.io/bundlephobia/minzip/css-tree-animatable.svg)](https://bundlephobia.com/result?p=css-tree-animatable)
[![Depfu](https://badges.depfu.com/badges/017c3c2b9238952382ecc432e9fdbf85/count.svg)](https://depfu.com/github/webanimate/css-tree-animatable?project_id=12847)

This is a fork of [css-tree](https://www.npmjs.com/package/css-tree) with all but animatable CSS properties removed.

# Development

Patch files removing unnecessary properties and syntaxes:

```shell script
yarn gen
```

Lint:

```shell script
yarn lint
```

Patch files, fix linting and style errors and build UMD bundle:

```shell script
yarn fix
```

Build UMD bundle:

```shell script
yarn build
```

Update dependencies:

```shell script
yarn up
```

Generate changelog based on commit messages:

```shell script
yarn c
```

To use the above command [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli) must be installed globally. Follow [the recommended workflow](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli#recommended-workflow).
