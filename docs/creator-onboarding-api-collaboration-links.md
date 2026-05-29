# Creator onboarding API — collaboration post links

This document describes backend changes needed for **collaboration post links** added to the creator onboarding form (Step 9: *Proof of last collaboration and results*).

The frontend sends these fields on:

`POST /api/v1/web/creator-onboarding`

(No auth; same endpoint as today.)

---

## Summary

For **each selected platform** (X, Youtube, Instagram, etc.), creators must provide **two slots**. Each slot has:

1. A **post URL** (link to the branded/sponsored post)
2. A **screenshot** (image URL after upload to your storage)

---

## Payload shape

### Top-level (legacy / first platform mirror)

These duplicate the **first selected platform’s** collaboration proof for backward compatibility with older consumers:

| Field | Type | Description |
|--------|------|-------------|
| `firstCollaborationPostLink1` | `string` | Post URL for slot 1 |
| `firstCollaborationPostLink2` | `string` | Post URL for slot 2 |
| `firstCollaborationImage1` | `string` | Screenshot URL for slot 1 (unchanged) |
| `firstCollaborationImage2` | `string` | Screenshot URL for slot 2 (unchanged) |

### Per-platform (source of truth)

| Field | Type | Description |
|--------|------|-------------|
| `platformCollaborationProof` | `Record<string, PlatformCollaborationProof>` | Key = platform name (must match `platforms[]`) |

#### `PlatformCollaborationProof` object

```json
{
  "postLink1": "https://x.com/user/status/123",
  "image1": "https://cdn.example.com/.../screenshot1.png",
  "postLink2": "https://x.com/user/status/456",
  "image2": "https://cdn.example.com/.../screenshot2.png",
  "image1PublicId": "",
  "image2PublicId": ""
}
```

| Property | Type | Required | Notes |
|----------|------|----------|--------|
| `postLink1` | `string` | Yes | Valid HTTP(S) URL; collaboration post for screenshot 1 |
| `image1` | `string` | Yes | Uploaded image URL |
| `postLink2` | `string` | Yes | Valid HTTP(S) URL; collaboration post for screenshot 2 |
| `image2` | `string` | Yes | Uploaded image URL (analytics screenshot) |
| `image1PublicId` | `string` | No | Optional storage public id |
| `image2PublicId` | `string` | No | Optional storage public id |

### Example excerpt

```json
{
  "channelBrandName": "My Brand",
  "platforms": ["X", "Youtube"],
  "platformCollaborationProof": {
    "X": {
      "postLink1": "https://x.com/example/status/1",
      "image1": "https://...",
      "postLink2": "https://x.com/example/status/2",
      "image2": "https://..."
    },
    "Youtube": {
      "postLink1": "https://youtube.com/watch?v=...",
      "image1": "https://...",
      "postLink2": "https://youtube.com/...",
      "image2": "https://..."
    }
  },
  "firstCollaborationPostLink1": "https://x.com/example/status/1",
  "firstCollaborationPostLink2": "https://x.com/example/status/2",
  "firstCollaborationImage1": "https://...",
  "firstCollaborationImage2": "https://..."
}
```

---

## Validation (recommended on API)

For every key in `platforms`:

1. `platformCollaborationProof[platform]` must exist (or be creatable from legacy fields).
2. `postLink1`, `postLink2`, `image1`, `image2` must be non-empty strings.
3. `postLink1` and `postLink2` must be valid URLs (`http://` or `https://`).
4. `image1` and `image2` should be valid image URLs (same rules as existing screenshot fields).

Return `400` with a clear message if validation fails, e.g.:

```json
{
  "message": "Collaboration post link is required for Youtube (Screenshot 1)"
}
```

---

## Database / model suggestions

**Option A — JSON on influencer/platform row (minimal change)**

Extend existing JSON for collaboration proof:

```ts
collaborationProof: {
  postLink1: string;
  image1: string;
  postLink2: string;
  image2: string;
}
```

**Option B — Normalized table**

| Column | Type |
|--------|------|
| `influencer_id` | FK |
| `platform` | string |
| `slot` | `1` \| `2` |
| `post_url` | string |
| `screenshot_url` | string |

---

## Google Sheet export (Ampli5 app)

The Next.js sheet sync (`/api/creator-onboarding-sheet`) now writes **two new columns per row** (before legacy collab image 3):

| New column order (collab section) | Source |
|-----------------------------------|--------|
| Collab post link 1 | `platformCollaborationProof[platform].postLink1` |
| Collab image 1 | `...image1` |
| Collab post link 2 | `...postLink2` |
| Collab image 2 | `...image2` |

Update the sheet header row to match if you rely on fixed column positions.

---

## Frontend constants

Labels and field keys live in:

`src/constants/creatorOnboardingFilters.ts`

- `COLLABORATION_PROOF_SLOTS`
- `PlatformCollaborationProof`
- `EMPTY_PLATFORM_COLLABORATION_PROOF`

---

## Checklist for API team

- [ ] Accept `postLink1` / `postLink2` inside `platformCollaborationProof[platform]`
- [ ] Accept optional `firstCollaborationPostLink1` / `firstCollaborationPostLink2` at root
- [ ] Validate URLs + required fields per platform
- [ ] Persist links on influencer/creator records
- [ ] Expose links in admin/dashboard if influencers are reviewed there
- [ ] Update any OpenAPI/Swagger spec for `POST /web/creator-onboarding`

---

## Related frontend files (already updated)

| File | Change |
|------|--------|
| `src/app/creator-onboarding/page.tsx` | UI + validation + submit payload |
| `src/store/creatorOnboardingForm.ts` | Form state |
| `src/constants/creatorOnboardingFilters.ts` | Slot definitions |
| `src/app/api/creator-onboarding-sheet/route.ts` | Sheet columns |
