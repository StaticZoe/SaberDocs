# Force Order

`Force` controls the order in which factors are applied.

SaberDeep sorts factors by ascending `Force`. Lower force values run earlier; higher force values run later.

Example:

| Factor | Force | Operation |
| --- | --- | --- |
| Base bonus | `10` | Add `20` |
| Multiplier | `20` | Multiply by `2` |
| Cap | `100` | Clamp or override later |

## Recommended Practice

Use clear force bands in your project:

| Band | Suggested meaning |
| --- | --- |
| `0` to `99` | Base modifiers |
| `100` to `199` | Equipment modifiers |
| `200` to `299` | Temporary buffs and debuffs |
| `900` and above | Final overrides or caps |

These bands are only a convention. SaberDeep only reads the integer value.

## Same Force Values

Do not rely on execution order between different factors with the same `Force`.

If two factors must run in a deterministic order, give them different force values.

## Changing Force After Insert

Set `Force` before inserting a factor.

If you need to change `Force` after insertion:

1. Remove the factor from the attribute.
2. Change `Force`.
3. Insert the factor again.

This keeps the sorted factor container correct.

## Factor Lifetime

SaberDeep stores weak references to factors.

The caller that creates or inserts a factor is responsible for keeping that factor alive and removing it when it is no longer needed.

During refresh, invalid weak references are removed automatically.
