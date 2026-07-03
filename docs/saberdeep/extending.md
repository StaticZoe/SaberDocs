# Extending

SaberDeep is designed to be extended instead of patched into one large project-specific attribute system.

There are two extension levels:

| Extension type | Best for | Supported in |
| --- | --- | --- |
| Custom factor behavior for built-in value types | Designers and gameplay scripting | Blueprint and C++ |
| New attribute value families | Project-specific C++ systems | C++ |

## Blueprint Extensions

Blueprint users can create custom factors for the built-in attribute families:

- `USaberDeepIntFactorBlueprintBase`
- `USaberDeepFloatFactorBlueprintBase`
- `USaberDeepBoolFactorBlueprintBase`
- `USaberDeepEnumFactorBlueprintBase`
- `USaberDeepTagFactorBlueprintBase`
- `USaberDeepTagsFactorBlueprintBase`

Each Blueprint factor class implements:

| Event | Purpose |
| --- | --- |
| `Init` | Runs after SaberDeep factory creation. Use it for default factor setup. |
| `Fit` | Receives the current value and returns the transformed value. |

Create Blueprint factor classes with the SaberDeep factory nodes so `Init` runs at the expected time.

## C++ Factor Extensions

C++ users can derive from any built-in factor base class and override `Fit`.

```cpp
#include "SaberDeepInt.h"

UCLASS()
class UMyIntClampMaxFactor : public USaberDeepIntFactor
{
    GENERATED_BODY()

public:
    virtual void Fit(int32& Attribute) const override
    {
        Attribute = FMath::Min(Attribute, FMath::RoundToInt(GetValue()));
    }
};
```

## C++ Attribute Extensions

For new value families, use `FDeepAttribute<ValueType, FactorType>` and `FDeepAttributeFactor<ValueType>`.

```cpp
#include "SaberDeepAttribute.h"

UCLASS(Abstract, BlueprintType)
class UMyRotatorFactor : public UObject, public FDeepAttributeFactor<FRotator>
{
    GENERATED_BODY()

public:
    virtual void Fit(FRotator& Attribute) const PURE_VIRTUAL(UMyRotatorFactor::Fit)
};

UCLASS(BlueprintType)
class UMyRotatorAttribute : public UObject, public FDeepAttribute<FRotator, UMyRotatorFactor>
{
    GENERATED_BODY()

public:
    UMyRotatorAttribute()
    {
        Origin = Final = FRotator::ZeroRotator;
    }

    virtual void Refresh() override
    {
        RefreshInternal();
    }
};
```

This minimal example recomputes the final value. Add events or Blueprint-facing methods as needed for your own attribute family.

Custom attribute families let projects reuse the SaberDeep factor model for domain-specific value types without changing the plugin source.

## Design Guidelines

- Keep factor classes small and composable.
- Use `Force` bands to make calculation order predictable.
- Store attributes and factors with Unreal ownership rules, usually through `UPROPERTY`.
- Remove and reinsert a factor if its `Force` changes after insertion.
- Prefer custom factors over direct writes to final values.
