# SaberDeep

**SaberDeep** is a Runtime Unreal Engine plugin for building factor-based attributes.

It is designed for gameplay values that start from an origin value, accept ordered modifier objects called factors, and expose a computed final value.

Typical examples include:

- health, damage, armor, speed, or other numeric stats
- boolean states affected by temporary overrides
- enum-like states stored as `uint8`
- single `FGameplayTag` values
- `FGameplayTagContainer` values that can be added, removed, filtered, or overridden

## Core Concepts

| Concept | Meaning |
| --- | --- |
| Origin | The base value stored by an attribute. |
| Factor | A UObject that transforms the value during refresh. |
| Force | The integer sort key used to decide factor execution order. |
| Final | The computed value after all valid factors are applied. |
| Refresh | Recomputes `Final` from `Origin` and current factors. |
| Auto Refresh | When enabled, common mutations refresh automatically. |
| Auto Broadcast | When enabled, value changes broadcast events after refresh. |

## Supported Attribute Types

| Attribute | Value type |
| --- | --- |
| `USaberDeepInt` | `int32` |
| `USaberDeepFloat` | `float` |
| `USaberDeepBool` | `bool` |
| `USaberDeepEnum` | `uint8` |
| `USaberDeepTag` | `FGameplayTag` |
| `USaberDeepTags` | `FGameplayTagContainer` |

## Blueprint and C++

SaberDeep exposes Blueprint creation functions through `USaberDeepBlueprintLibrary`.

C++ users can create and store SaberDeep objects with standard Unreal UObject ownership patterns, then call the public C++ API directly.

## Current Compatibility

SaberDeep 1.0 is prepared and validated in an Unreal Engine 5.8 development project.
