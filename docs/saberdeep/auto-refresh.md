# Auto Refresh

`Auto Refresh` controls whether an attribute recomputes `Final` automatically after common mutations.

It is enabled by default.

With `Auto Refresh` enabled, operations such as inserting factors, removing factors, clearing factors, setting origin, or resetting the attribute refresh the final value immediately.

For normal gameplay changes, this is convenient and keeps `Final` up to date.

## Batch Updates

For batch updates, temporarily disable `Auto Refresh`, perform all changes, call `Refresh` once, then enable `Auto Refresh` again.

This avoids recalculating the attribute after every intermediate operation.

Use this pattern when one code path:

- adds many factors at once
- removes many factors at once
- rebuilds equipment modifiers
- reapplies a full buff list
- changes multiple factor values or `Force` values

## Example Flow

1. Set `Auto Refresh` to `false`.
2. Remove old factors.
3. Change factor values or `Force`.
4. Insert the new factor set.
5. Call `Refresh`.
6. Set `Auto Refresh` back to `true`.

While `Auto Refresh` is disabled, `Final` may be stale until you call `Refresh`.

## Blueprint

Use:

- `Set Auto Refresh`
- `Refresh`
- `Is Auto Refresh`

## C++

```cpp
Health->SetAutoRefresh(false);

Health->RemoveFactor(OldBonus);
Health->RemoveFactor(OldMultiplier);

NewBonus->SetValue(50.f);
NewMultiplier->SetValue(1.2f);

Health->InsertFactor(NewBonus);
Health->InsertFactor(NewMultiplier);

Health->Refresh();
Health->SetAutoRefresh(true);
```

If `Auto Broadcast` is enabled, the manual `Refresh` broadcasts only when `Final` changes.
