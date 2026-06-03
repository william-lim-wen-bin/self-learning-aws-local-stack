# backend

## Overview

![asdf](.assets/overview.jpg)

## Getting Started

First of all, make sure you&#39;ve installed [pnpm](https://pnpm.io/installation).

Then, install dependencies:

```sh
$ pnpm i
```

Second, you will need to register and install LocalStack [here](https://docs.localstack.cloud/aws/getting-started/installation/) for AWS cloud service emulator.

After having your LocalStack running, execute the following commands:

```sh
$ pnpm infra-bootstrap
$ pnpm infra-deploy
```

Then, you will have the API url for your frontend.

## Workflow

Init CDK:

```sh
$ pnpm infra-bootstrap
```

Deploy:

```sh
$ pnpm infra-deploy
```
