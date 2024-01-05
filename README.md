# @hyperdx/transport-tslog

## Overview

Transport adapter for shipping logs from [tslog](https://tslog.js.org/) to [HyperDX](https://www.hyperdx.io/)

## Installation & Usage

Install the library.
```bash
pnpm i @hyperdx/transport-tslog
```

Instantiate & attach the the transport adapter.
```ts
const options = { ... }
const transport = new HyperDXtslog(options)
const logger = new tslog({
  name: options.service,
});

logger.attachTransport(transport.registerTransport);
```