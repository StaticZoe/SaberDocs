# Support

This page is the stable support entry for SaberDeep and may route to the current support channel for each release.

Public technical reports should use GitHub Issues after issue creation is enabled for the documentation repository:

[SaberDocs Issues](https://github.com/StaticZoe/SaberDocs/issues)

Use public issues for bug reports, documentation problems, compatibility reports, and feature requests. If issue creation is restricted, use the private contact method shown on the Fab listing.

For private cases, use the private contact method shown on the Fab listing if one is available.

When reporting an issue, include:

- Unreal Engine version
- SaberDeep version
- Whether the issue happens in Blueprint, C++, or both
- Minimal reproduction steps
- Relevant log output

## Before Reporting

Check these common cases first:

- Keep factor references alive. Inserted factors are stored as weak references.
- Set `Force` before insertion, or remove and reinsert after changing `Force`.
- Call `Refresh` manually when `Auto Refresh` is disabled.
- Store attributes and factors in `UPROPERTY` references in C++.
