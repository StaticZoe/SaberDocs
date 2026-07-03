# Force Order

`Force` controls the order in which factors are applied.

SaberDeep sorts factors by ascending `Force`. Lower force values run earlier; higher force values run later.

Example:

| Factor | Force | Operation |
| --- | --- | --- |
| Base bonus | `10` | Add `20` |
| Multiplier | `20` | Multiply by `2` |
| Cap | `100` | Clamp or override later |

## Max HP Example

Suppose `MaxHP` has origin `100`.

Two buffs are active:

| Buff | Factor | Value |
| --- | --- | --- |
| Vitality buff | `USaberDeepIntAdd` | `+50` |
| Power buff | `USaberDeepIntMul` | `x1.2` |

If the add factor runs first:

```text
100 + 50 = 150
150 x 1.2 = 180
Final = 180
```

If the multiply factor runs first:

```text
100 x 1.2 = 120
120 + 50 = 170
Final = 170
```

Both results are valid depending on your design. Use `Force` to make that design explicit.

When either buff is removed, SaberDeep refreshes from `Origin` and the remaining factors. Removing the add buff leaves only the multiplier, so `Final` becomes `120`. Removing the multiplier leaves only the add buff, so `Final` becomes `150`. Removing both returns `Final` to `100`.

This is the main benefit of keeping modifiers as factors instead of writing directly into the final value.

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
