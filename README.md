# nestjs-demo1

#### 介绍
NestJs 上手之路之一 【快速完成CRUD】

#### 软件架构
Nest 是一个用于构建高效，可扩展的 [Node.js](http://nodejs.cn/) 服务器端应用程序的框架。它使用渐进式 JavaScript，内置并完全支持 [TypeScript](https://www.tslang.cn/)（但仍然允许开发人员使用纯 JavaScript 编写代码）并结合了 OOP（面向对象编程），FP（函数式编程）和 FRP（函数式响应编程）的元素。
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 部署上线
```bash
# unit tests
$ npm run build

# 将dist和package.json都放在服务器上一个文件夹

$ npm install
$ cd dist
$ NODE_ENV=production node main.js

```

## 项目目录

```
nestjs-demo1
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc
├─ LICENSE
├─ README.md
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ src
│  ├─ app.controller.spec.ts
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ common
│  │  ├─ common
│  │  │  ├─ dto
│  │  │  │  ├─ base.dto.ts
│  │  │  │  ├─ pagination.dto.ts
│  │  │  │  └─ result.dto.ts
│  │  │  └─ entity
│  │  │     └─ base.entity.ts
│  │  ├─ config
│  │  ├─ exception
│  │  │  └─ error.code.ts
│  │  ├─ filters
│  │  │  └─ http-execption.filters.ts
│  │  ├─ interceptor
│  │  │  └─ transform.interceptor.ts
│  │  ├─ pipe
│  │  │  └─ validate.pipe.ts
│  │  └─ utils
│  │     ├─ convert.utils.ts
│  │     ├─ cryptogram.util.ts
│  │     ├─ page.util.ts
│  │     └─ regex.util.ts
│  ├─ main.ts
│  └─ modules
│     └─ users
│        ├─ dto
│        │  ├─ create-user.dto.ts
│        │  ├─ list-user.dto.ts
│        │  └─ update-user.dto.ts
│        ├─ entities
│        │  └─ user.entity.ts
│        ├─ users.controller.ts
│        ├─ users.module.ts
│        └─ users.service.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
├─ tsconfig.json
├─ webpack-hmr.config.js
└─ yarn.lock
