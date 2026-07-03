# Use Cases

SaberDeep is most useful when a value is affected by multiple systems over time.

It is not just a stat container. It is a small composition model for gameplay values.

## Stacked Stats and Buffs

Use SaberDeep for values such as max health, damage, movement speed, armor, cooldown speed, or critical chance.

Each equipment piece, loadout item, perk, buff, debuff, difficulty rule, or temporary gameplay effect can own its own factor.

When a factor is added or removed, SaberDeep recomputes the final value from `Origin` and the remaining factors.

This avoids the common problem of trying to manually undo a previous calculation.

## Independent System Overrides

Use SaberDeep when several systems need to affect the same boolean state without knowing about each other.

Example: player input.

Dialogue, cutscenes, stun effects, UI modals, and scripted interactions may all need to disable input. If each system directly enables or disables input, one system can accidentally enable input while another system still requires it to stay disabled.

With a `USaberDeepBool` attribute, each system inserts its own factor that returns `false`. When the system finishes, it removes only its own factor.

Input becomes enabled only when all disabling factors are gone.

## Gameplay Tags as Composable State

Use `USaberDeepTag` or `USaberDeepTags` when tags represent mutable gameplay state.

Examples:

- add and remove ability restriction tags
- filter available interaction tags
- override a single current mode tag
- combine tags from equipment, status effects, and level rules

SaberDeep provides built-in tag container factors for add, remove, filter, and override workflows.

## Designer-Owned Rules

Blueprint factor base classes let designers author custom modifier behavior without waiting for a new C++ factor class.

Use this when a project needs fast iteration on special-case gameplay rules.

Programmers can still provide C++ factors for performance-critical or reusable rules.

## Event-Driven UI Updates

Attributes expose value changed events.

Use this when UI, HUD, ability panels, or debug views should update only after the computed final value changes.

`Auto Broadcast` can be disabled when you need manual control over when value change events are sent.

## When SaberDeep May Be Too Much

If a value is only written by one system and does not need stacking, ordering, removal, or custom factors, a normal variable may be simpler.

SaberDeep is designed for values that need composition.
