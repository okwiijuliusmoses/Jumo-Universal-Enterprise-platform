# JUMO UEOS Product Route Matrix

| Route Path | Targeted Product | Component Rendered | Navigation Type | Access Control |
| :--- | :--- | :--- | :--- | :--- |
| `/finance` | JUMO Fintech | `<PlatformShell platformId="fintech" />` | Sovereign Product | Authenticated Tenant / User |
| `/finpay` | JUMO Fintech | `<PlatformShell platformId="fintech" />` | Path Alias | Authenticated Tenant / User |
| `/faap` | JUMO Fintech | `<PlatformShell platformId="fintech" />` | Path Alias | Authenticated Tenant / User |
| `/treasury` | JUMO Fintech | `<PlatformShell platformId="fintech" />` | Path Alias | Authenticated Tenant / User |
| `/education` | JUMO Universal School ERP | `<PlatformShell platformId="education" />` | Sovereign Product | Authenticated Tenant / User |
| `/edu` | JUMO Universal School ERP | `<PlatformShell platformId="education" />` | Path Alias | Authenticated Tenant / User |
| `/alumni` | JUMO Universal School ERP | `<PlatformShell platformId="education" />` | Pruned Redirect | Authenticated Tenant / User |
| `/edu-alumni` | JUMO Universal School ERP | `<PlatformShell platformId="education" />` | Pruned Redirect | Authenticated Tenant / User |
| `/church` | JUMO Church ERP | `<PlatformShell platformId="church" />` | Sovereign Product | Authenticated Tenant / User |
| `/diocese` | JUMO Church ERP | `<PlatformShell platformId="church" />` | Path Alias | Authenticated Tenant / User |
| `/public` | JUMO Portal Welcome | `<PublicPortalView />` | Public Gateway | Unauthenticated Public Access |
| `/owner` | Owner Control Center | `<OwnerControlCenterLaunchpad />` | Secure Operations | Authenticated Owner-Only MFA |

*Note: All legacy or unmapped router paths default to the active default workspace shell or the unified identity gateway, preventing application crashes or route leakage.*
