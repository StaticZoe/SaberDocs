# Release Notes

## SaberDeep 1.0

Initial SaberDeep 1.0 release.

### Features

- Runtime plugin module: `SaberDeep`.
- Blueprint-compatible attribute objects.
- C++ API for direct runtime use.
- Supported values: `int32`, `float`, `bool`, `uint8`, `FGameplayTag`, and `FGameplayTagContainer`.
- Built-in numeric, boolean, enum, tag, and tag container factors.
- Ordered multi-factor calculation with `Force`.
- Automatic refresh after factor insertion and removal when `Auto Refresh` is enabled.
- Blueprint factor base classes with `Init` and `Fit` events.
- Factory nodes for Blueprint-created attributes and factors.
- Value change events for C++ and Blueprint.
- C++ extension path for custom factors and custom attribute families.

### Validation

SaberDeep 1.0 was built and packaged for release validation with Unreal Engine 5.8. Check the Fab listing for the officially supported engine versions for each release.
