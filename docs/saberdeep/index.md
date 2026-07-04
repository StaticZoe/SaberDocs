<div class="saber-hero" markdown>

# SaberDeep

**SaberDeep** is a Runtime Unreal Engine plugin for building factor-based attributes.

It is designed for gameplay values that start from an origin value, accept ordered modifier objects called factors, and expose a computed final value.

[Quick Start](quick-start.md){ .md-button .md-button--primary }
[Use Cases](use-cases.md){ .md-button }
[API Reference](api.md){ .md-button }

</div>

## Why Use SaberDeep

Gameplay values become difficult to maintain when many systems write directly into the same final value.

SaberDeep keeps each contribution as a separate factor, then recomputes `Final` from `Origin` and the active factor set.

This gives you:

- reversible modifiers that can be added and removed safely
- explicit calculation order through `Force`
- the same factor model in Blueprint and C++
- extension points for custom gameplay rules

!!! tip "Designed for modifier-heavy gameplay"

    For practical gameplay scenarios where multiple systems affect the same value or state, see [Use Cases](use-cases.md).

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
| `USaberDeepEnum` | `uint8` enum-like state |
| `USaberDeepTag` | `FGameplayTag` |
| `USaberDeepTags` | `FGameplayTagContainer` |

`USaberDeepEnum` stores enum-like values as `uint8`. In C++, it provides helper templates for casting to and from enum classes. In Blueprint, it appears as byte-based state.

## Blueprint and C++

SaberDeep exposes Blueprint creation functions through `USaberDeepBlueprintLibrary`.

C++ users can create and store SaberDeep objects with standard Unreal UObject ownership patterns, then call the public C++ API directly.

Blueprint users can create custom factor behavior for supported attribute types by deriving from the Blueprint factor base classes. C++ users can define new factor classes, and can also build new DeepAttribute value families with the public `FDeepAttribute` template.

## Current Compatibility

SaberDeep 1.0 was built and packaged for release validation with Unreal Engine 5.8. Check the Fab listing for the officially supported engine versions for each release.
