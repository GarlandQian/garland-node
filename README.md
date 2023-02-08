# garland-node

#### 介绍

NestJs 新手上路

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

# 将dist,public和package.json都放在服务器上一个文件夹

$ npm install
$ cd dist
$ NODE_ENV=production node main.js

```

## 项目目录

```
garland-node
├── .eslintrc.js  
├── .gitignore
├── .prettierrc
├── README.md
├── nest-cli.json
├── package.json
├── pnpm-lock.yaml
├── public
│   └── upload
├── src
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── common
│   │   ├── common
│   │   │   ├── dto
│   │   │   │   ├── base.dto.ts
│   │   │   │   ├── pagination.dto.ts
│   │   │   │   └── result.dto.ts
│   │   │   └── entity
│   │   │       └── base.entity.ts
│   │   ├── config
│   │   │   ├── env.development.ts
│   │   │   ├── env.production.ts
│   │   │   └── index.ts
│   │   ├── decorator
│   │   │   └── public.decorator.ts
│   │   ├── exception
│   │   │   └── error.code.ts
│   │   ├── filters
│   │   │   └── uinify-exception.filter.ts
│   │   ├── guards
│   │   │   └── auth.guard.ts
│   │   ├── interceptor
│   │   │   └── unify-response.interceptor.ts
│   │   ├── logger
│   │   │   └── logger.middleware.ts
│   │   ├── pipe
│   │   │   └── validate.pipe.ts
│   │   └── utils
│   │       ├── convert.utils.ts
│   │       ├── cryptogram.util.ts
│   │       ├── dirop.utils.ts
│   │       ├── fileSize.utils.ts
│   │       ├── index.util.ts
│   │       ├── regex.util.ts
│   │       └── reqMainInfo.untils.ts
│   ├── main.ts
│   └── modules
│       ├── auth
│       │   ├── auth.module.ts
│       │   ├── auth.service.ts
│       │   ├── constants.ts
│       │   ├── jwt.strategy.ts
│       │   └── local.strategy.ts
│       ├── download
│       │   ├── download.controller.ts
│       │   ├── download.module.ts
│       │   ├── download.service.ts
│       │   └── dto
│       │       └── down-file.dto.ts
│       ├── login
│       │   ├── login.controller.ts
│       │   ├── login.module.ts
│       │   └── login.service.ts
│       ├── upload
│       │   ├── dto
│       │   │   └── upload-file.dto.ts
│       │   ├── entities
│       │   │   └── upload.entities.ts
│       │   ├── upload.controller.ts
│       │   ├── upload.module.ts
│       │   └── upload.service.ts
│       └── users
│           ├── dto
│           │   ├── create-user.dto.ts
│           │   ├── list-user.dto.ts
│           │   ├── update-user.dto.ts
│           │   └── user-login.dto.ts
│           ├── entities
│           │   └── user.entity.ts
│           ├── users.controller.ts
│           ├── users.module.ts
│           └── users.service.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
└── webpack-hmr.config.js
```
