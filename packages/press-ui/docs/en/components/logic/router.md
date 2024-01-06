# Router

Routing core logic.

## Basic usage

According to the routing table, match the corresponding route `name`.

```ts
import { findRouteName } from 'press-ui/common/router-helper/find-router-name';

const { name, params, path, meta } = findRouteName(rawPath, ALL_ROUTES) || {};
```

## common problem

### Implementation principle

The core is regular matching. With the help of `path-to-regexp` library, the routing table will be converted into corresponding regular rules, and then which route is matched will be returned.