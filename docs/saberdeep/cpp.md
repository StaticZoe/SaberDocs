# C++

SaberDeep can be used directly from C++.

## Module Dependency

Add `SaberDeep` to the module that uses the plugin:

```csharp
PublicDependencyModuleNames.AddRange(
    new string[]
    {
        "Core",
        "CoreUObject",
        "Engine",
        "SaberDeep",
    }
);
```

SaberDeep itself depends on `GameplayTags`.

## Include Headers

```cpp
#include "SaberDeepInt.h"
#include "SaberDeepFloat.h"
#include "SaberDeepBool.h"
#include "SaberDeepEnum.h"
#include "SaberDeepTag.h"
#include "SaberDeepTags.h"
#include "SaberDeepBlueprintLibrary.h"
```

Include only what you use.

## Numeric Example

```cpp
#include "SaberDeepInt.h"

UPROPERTY()
TObjectPtr<USaberDeepInt> Damage;

UPROPERTY()
TObjectPtr<USaberDeepIntMul> CriticalMultiplier;

void AMyActor::BeginPlay()
{
    Super::BeginPlay();

    Damage = NewObject<USaberDeepInt>(this);
    Damage->SetOrigin(50);

    CriticalMultiplier = NewObject<USaberDeepIntMul>(this);
    CriticalMultiplier->SetValue(2.f);
    CriticalMultiplier->SetForce(100);

    Damage->InsertFactor(CriticalMultiplier);

    check(Damage->GetFinal() == 100);
}
```

## Listen for Changes

```cpp
void AMyActor::BeginPlay()
{
    Super::BeginPlay();

    Health = NewObject<USaberDeepInt>(this);
    Health->ValueChangedEvent.AddUObject(this, &AMyActor::OnHealthChanged);
}

void AMyActor::OnHealthChanged(USaberDeepInt* ChangedHealth)
{
    const int32 CurrentValue = ChangedHealth->GetFinal();
}
```

`ValueChangedEvent` broadcasts only when `Refresh()` changes `Final` and `Auto Broadcast` is enabled.

## Custom C++ Factor

```cpp
#include "SaberDeepFloat.h"

UCLASS()
class UMyFloatClampFactor : public USaberDeepFloatFactor
{
    GENERATED_BODY()

protected:
    virtual void Fit(float& Attribute) const override
    {
        Attribute = FMath::Min(Attribute, GetValue());
    }
};
```

Store custom factor instances in `UPROPERTY` references if they must stay alive.

## Custom Attribute Family

C++ can define a new DeepAttribute family by combining a UObject attribute class with the public `FDeepAttribute` template and a matching factor base.

```cpp
#include "SaberDeepAttribute.h"

UCLASS(Abstract, BlueprintType)
class UMyVectorFactor : public UObject, public FDeepAttributeFactor<FVector>
{
    GENERATED_BODY()

public:
    virtual void Fit(FVector& Attribute) const PURE_VIRTUAL(UMyVectorFactor::Fit)
};

UCLASS(BlueprintType)
class UMyVectorAttribute : public UObject, public FDeepAttribute<FVector, UMyVectorFactor>
{
    GENERATED_BODY()

public:
    UMyVectorAttribute()
    {
        Origin = Final = FVector::ZeroVector;
    }

    virtual void Refresh() override
    {
        RefreshInternal();
    }
};
```

This is useful when your project needs the same factor-based model for a value type that is not included in SaberDeep's built-in attribute set.

## UObject Ownership

Use a meaningful `Outer` such as an actor, component, subsystem, or game instance. Keep `UPROPERTY` references to attributes and factors.

SaberDeep stores inserted factors as weak references, so factor lifetime belongs to the caller.
