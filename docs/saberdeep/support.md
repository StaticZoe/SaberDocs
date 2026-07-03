# Support

For product support, use the support channel linked from the Fab listing.

For the initial release, the recommended setup is a stable product support address or support form rather than a personal mailbox. This keeps support separate from personal email and makes it easier to change maintainers or route issues later.

When reporting an issue, include:

- Unreal Engine version
- SaberDeep version
- Whether the issue happens in Blueprint, C++, or both
- Minimal reproduction steps
- Relevant log output

Do not include private project files, marketplace downloads, access tokens, or proprietary source code in public reports.

## Support URL

The Fab listing should provide a stable support URL. Good options include:

| Option | Notes |
| --- | --- |
| Dedicated support email | Simple and private. Use a product-facing address such as a support mailbox, not a personal inbox. |
| Support form | Good for collecting Unreal version, plugin version, reproduction steps, and logs. |
| Public issue tracker | Good for transparent known issues, but not ideal for private project details. |

The public documentation should point users to the Fab support link, so the actual support channel can change without editing every documentation page.

## Before Reporting

Check these common cases first:

- Keep factor references alive. Inserted factors are stored as weak references.
- Set `Force` before insertion, or remove and reinsert after changing `Force`.
- Call `Refresh` manually when `Auto Refresh` is disabled.
- Store attributes and factors in `UPROPERTY` references in C++.
