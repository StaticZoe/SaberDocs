# API Reference

This page summarizes the public runtime types in SaberDeep 1.0.

## Attributes

| Class | Value type | Default origin/final |
| --- | --- | --- |
| `USaberDeepInt` | `int32` | `0` |
| `USaberDeepFloat` | `float` | `0.0` |
| `USaberDeepBool` | `bool` | `false` |
| `USaberDeepEnum` | `uint8` | `0` |
| `USaberDeepTag` | `FGameplayTag` | `FGameplayTag::EmptyTag` |
| `USaberDeepTags` | `FGameplayTagContainer` | `FGameplayTagContainer::EmptyContainer` |

Common C++ operations:

| Function | Purpose |
| --- | --- |
| `GetOrigin()` | Returns the origin value by value. |
| `GetOriginRef()` | Returns the origin value by const reference. |
| `GetFinal()` | Returns the final value by value. |
| `GetFinalRef()` | Returns the final value by const reference. |
| `SetOrigin(Value)` | Sets origin and refreshes when enabled if the value changed. |
| `Reset(Value)` | Clears factors, sets origin, and refreshes when enabled. |
| `InsertFactor(Factor)` | Inserts a valid factor if it is not already present. |
| `RemoveFactor(Factor)` | Removes an inserted factor. |
| `ClearAllFactors()` | Removes every factor. |
| `Refresh()` | Recomputes final and broadcasts on change when enabled. |
| `SetAutoRefresh(bool)` | Enables or disables automatic refresh. |
| `SetAutoBroadcast(bool)` | Enables or disables change broadcasts. |

## Factor Base API

All factor classes expose:

| Function | Purpose |
| --- | --- |
| `GetValue()` | Returns the factor value. |
| `GetValueRef()` | Returns the factor value by const reference. |
| `SetValue(Value)` | Sets the factor value. |
| `GetForce()` | Returns the force order value. |
| `SetForce(int32)` | Sets the force order value. |

## Built-in Factors

| Factor | Value type | Behavior |
| --- | --- | --- |
| `USaberDeepIntAdd` | `float` | Adds `RoundToInt(Value)`. |
| `USaberDeepIntMul` | `float` | Multiplies and rounds with `RoundToInt`. |
| `USaberDeepIntOverride` | `float` | Replaces with `RoundToInt(Value)`. |
| `USaberDeepIntMax` | `float` | Uses max of current value and factor value, then rounds. |
| `USaberDeepIntMin` | `float` | Uses min of current value and factor value, then rounds. |
| `USaberDeepFloatAdd` | `float` | Adds value. |
| `USaberDeepFloatMul` | `float` | Multiplies by value. |
| `USaberDeepFloatOverride` | `float` | Replaces with value. |
| `USaberDeepBoolOverride` | `bool` | Replaces with value. |
| `USaberDeepBoolOverrideTrue` | `bool` | Replaces with `true`. |
| `USaberDeepBoolOverrideFalse` | `bool` | Replaces with `false`. |
| `USaberDeepBoolReverse` | `bool` | Reverses current value. |
| `USaberDeepEnumOverride` | `uint8` | Replaces with value. |
| `USaberDeepTagOverride` | `FGameplayTag` | Replaces with value. |
| `USaberDeepTagsOverride` | `FGameplayTagContainer` | Replaces with value. |
| `USaberDeepTagsAdd` | `FGameplayTagContainer` | Adds every tag from value. |
| `USaberDeepTagsRemove` | `FGameplayTagContainer` | Removes tags from value. |
| `USaberDeepTagsFilter` | `FGameplayTagContainer` | Filters by value, using exact or non-exact matching. |

## Blueprint Base Factors

| Class | Fit signature |
| --- | --- |
| `USaberDeepIntFactorBlueprintBase` | `int32 Fit(int32 Attribute)` |
| `USaberDeepFloatFactorBlueprintBase` | `float Fit(float Attribute)` |
| `USaberDeepBoolFactorBlueprintBase` | `bool Fit(bool Attribute)` |
| `USaberDeepEnumFactorBlueprintBase` | `uint8 Fit(uint8 Attribute)` |
| `USaberDeepTagFactorBlueprintBase` | `FGameplayTag Fit(const FGameplayTag& Attribute)` |
| `USaberDeepTagsFactorBlueprintBase` | `FGameplayTagContainer Fit(const FGameplayTagContainer& Attribute)` |

Each Blueprint base also has an `Init` Blueprint event. `Init` is called by SaberDeep factory functions after runtime object creation.
