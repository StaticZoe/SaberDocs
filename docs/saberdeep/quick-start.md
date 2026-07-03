# Quick Start

This page shows the shortest path to using SaberDeep.

## Install

1. Download the SaberDeep plugin package.
2. Copy the plugin to your project's `Plugins` directory.
3. Restart Unreal Editor.
4. Enable **Saber Deep** if Unreal does not enable it automatically.

The plugin is a Runtime plugin and does not contain required content assets.

## Blueprint Quick Start

Use the Blueprint factory nodes:

- `Create SaberDeep Int`
- `Create SaberDeep Float`
- `Create SaberDeep Bool`
- `Create SaberDeep Enum`
- `Create SaberDeep Tag`
- `Create SaberDeep Tags`

Basic flow:

1. Create a `SaberDeep Int`.
2. Store the returned object in a Blueprint variable.
3. Call `Set Origin`, for example `100`.
4. Create an `Int Add` factor.
5. Store the factor in a Blueprint variable.
6. Set the factor value, for example `25`.
7. Set the factor force, for example `10`.
8. Insert the factor into the attribute.
9. Read `Get Final`.

If `Auto Refresh` is enabled, `Final` updates when the factor is inserted.

## C++ Quick Start

Add `SaberDeep` to your module dependencies:

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

Create and store the attribute and factor:

```cpp
#include "SaberDeepInt.h"

UPROPERTY()
TObjectPtr<USaberDeepInt> Health;

UPROPERTY()
TObjectPtr<USaberDeepIntAdd> BonusHealth;

void AMyActor::BeginPlay()
{
    Super::BeginPlay();

    Health = NewObject<USaberDeepInt>(this);
    Health->SetOrigin(100);

    BonusHealth = NewObject<USaberDeepIntAdd>(this);
    BonusHealth->SetValue(25.f);
    BonusHealth->SetForce(10);

    Health->InsertFactor(BonusHealth);

    const int32 CurrentHealth = Health->GetFinal();
}
```

Always store attributes and factors in `UPROPERTY` references or another valid Unreal ownership path.
