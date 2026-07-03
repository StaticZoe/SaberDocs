# Use Cases

SaberDeep is useful when the final gameplay value is not owned by one system.

It fits values and states that are built from many independent gameplay contributions: equipment, loadouts, buffs, debuffs, abilities, level rules, difficulty rules, UI states, and scripted sequences.

Instead of asking one system to know every other system that may be changing the same value, each system owns its own factor. When that system starts, it adds the factor. When it ends, it removes the factor. SaberDeep rebuilds the final value from the factors that still exist.

## Layered Stats and Progression

Use SaberDeep for combat and progression values such as max health, damage, armor, movement speed, cooldown speed, stamina cost, critical chance, or resource regeneration.

A common example is max health:

- the base character has `100` max health
- an equipment item adds `+50`
- a temporary buff multiplies the result by `1.2`

If the additive factor runs before the multiplier, the final value is `(100 + 50) * 1.2 = 180`. If the multiplier runs first, the final value is `(100 * 1.2) + 50 = 170`.

SaberDeep keeps that order explicit through `Force`, and removal stays safe. If either the equipment factor or the buff factor is removed later, the final value is rebuilt from the remaining factors instead of relying on hand-written undo logic.

## Independent Gameplay Locks

Use SaberDeep when several systems need to block or override the same gameplay state without knowing about each other.

Player input is a typical case. Dialogue, cutscenes, stun effects, UI modals, scripted interactions, and loading transitions may all need to disable input. If each system directly enables or disables input, one system can accidentally re-enable input while another system still needs it disabled.

With a `USaberDeepBool` attribute, each blocking system inserts its own factor that resolves to `false`. When that system finishes, it removes only its own factor.

Input becomes enabled only after every blocking system has removed its factor.

## Shared Gameplay Tag State

Use `USaberDeepTag` or `USaberDeepTags` when a tag value or tag container is shared mutable state affected by multiple systems.

This is useful for ability restrictions, interaction modes, movement modes, damage states, equipment-granted tags, level rule tags, or temporary status tags.

SaberDeep does not replace `FGameplayTag` or `FGameplayTagContainer`. It uses them as the stored value type, then adds factor ownership, ordered composition, safe removal, and value changed events around them.

If one system owns the tags and only needs normal tag queries, use a normal `FGameplayTagContainer`. If several systems need to add, remove, filter, or override the same tag state independently, SaberDeep keeps those contributions separate and rebuilds the final tag state from the active factors.

## Reactive UI and Gameplay Feedback

Use SaberDeep when UI or gameplay listeners should react to the computed final value, not to every individual system that contributed to it.

HUD values, character panels, ability previews, debug overlays, and effect indicators can listen for value changes from the attribute. The UI does not need to know whether the change came from equipment, a buff, a level rule, or a custom factor.

## When SaberDeep May Be Too Much

If a value has one clear owner, does not need stacking, does not need ordered calculation, and does not need safe factor removal, a normal variable may be simpler.

SaberDeep is designed for values and states that need composition.
