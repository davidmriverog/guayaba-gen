drivero-cli
===========

Er Compa

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/drivero-cli.svg)](https://npmjs.org/package/drivero-cli)
[![CircleCI](https://circleci.com/gh/davidmriverog/drivero-cli/tree/master.svg?style=shield)](https://circleci.com/gh/davidmriverog/drivero-cli/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/drivero-cli.svg)](https://npmjs.org/package/drivero-cli)
[![License](https://img.shields.io/npm/l/drivero-cli.svg)](https://github.com/davidmriverog/drivero-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g drivero-cli
$ drivero-cli COMMAND
running command...
$ drivero-cli (-v|--version|version)
drivero-cli/0.0.0 win32-x64 node-v14.17.0
$ drivero-cli --help [COMMAND]
USAGE
  $ drivero-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`drivero-cli hello [FILE]`](#drivero-cli-hello-file)
* [`drivero-cli help [COMMAND]`](#drivero-cli-help-command)

## `drivero-cli hello [FILE]`

describe the command here

```
USAGE
  $ drivero-cli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ drivero-cli hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/davidmriverog/drivero-cli/blob/v0.0.0/src/commands/hello.ts)_

## `drivero-cli help [COMMAND]`

display help for drivero-cli

```
USAGE
  $ drivero-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->
