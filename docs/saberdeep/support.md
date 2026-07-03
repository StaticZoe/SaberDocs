# Support

For product support, use the support link provided on the Fab listing.

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
