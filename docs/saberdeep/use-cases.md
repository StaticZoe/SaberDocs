# Use Cases

SaberDeep is useful when the final gameplay value is not owned by one system.

It fits values and states that are built from many independent gameplay contributions: equipment, loadouts, buffs, debuffs, abilities, level rules, difficulty rules, UI states, scripted sequences, and designer-authored special cases.

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

## Composed Gameplay Tags

Use `USaberDeepTag` or `USaberDeepTags` when tags represent mutable gameplay state.

This is useful for ability restrictions, interaction modes, movement modes, damage states, equipment-granted tags, level rule tags, or temporary status tags.

Different systems can add, remove, filter, or override tags without sharing a single piece of fragile tag-editing code.

## Designer-Created Modifier Logic

Use SaberDeep when designers need to prototype special rules in Blueprint while programmers keep the core attribute model stable.

For example, a designer can create a factor for a low-health bonus, a weather penalty, an encounter-specific damage rule, or a one-off ability interaction. The factor can be added to the same attribute pipeline as C++ factors.

Programmers can still write reusable or performance-sensitive factors in C++, and can extend the system with new DeepAttribute value families when a project needs a custom value type.

## Reactive UI and Gameplay Feedback

Use SaberDeep when UI or gameplay listeners should react to the computed final value, not to every individual system that contributed to it.

HUD values, character panels, ability previews, debug overlays, and effect indicators can listen for value changes from the attribute. The UI does not need to know whether the change came from equipment, a buff, a level rule, or a designer-authored factor.

## When SaberDeep May Be Too Much

If a value has one clear owner, does not need stacking, does not need ordered calculation, and does not need safe factor removal, a normal variable may be simpler.

SaberDeep is designed for values and states that need composition.
