# Support

This page is the stable support entry for SaberDeep.

Use GitHub Issues for public technical reports:

[SaberDocs Issues](https://github.com/StaticZoe/SaberDocs/issues)

Use public issues for bug reports, documentation problems, compatibility reports, and feature requests.

If you do not have a GitHub account, or need to discuss private project details, contact:

[starskiss.works@outlook.com](mailto:starskiss.works@outlook.com)

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
