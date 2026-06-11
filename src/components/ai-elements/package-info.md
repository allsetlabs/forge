# PackageInfo

Display package information with version changes, dependencies, and change type badges.

## Import

```tsx
import {
  PackageInfo,
  PackageInfoHeader,
  PackageInfoName,
  PackageInfoChangeType,
  PackageInfoVersion,
  PackageInfoDescription,
  PackageInfoContent,
  PackageInfoDependencies,
  PackageInfoDependency,
} from '@allsetlabs/forge/components/ai-elements/package-info';
```

## Features

- **Change Type Badges**: Visual indicators for major, minor, patch, added, removed
- **Version Display**: Show current and new versions with arrow
- **Dependencies List**: Display package dependencies with versions
- **Flexible Layout**: Compose your own package info structure
- **Color-Coded**: Semantic colors for different change types

## Basic Usage

```tsx
<PackageInfo name="react" currentVersion="18.2.0" newVersion="18.3.0" changeType="minor" />
```

**Visual:**

> Card showing package icon, "react" name, yellow "minor" badge, and version change "18.2.0 → 18.3.0".

## Props

### PackageInfo

| Prop           | Type                                                    | Default | Description     |
| -------------- | ------------------------------------------------------- | ------- | --------------- |
| name           | `string`                                                | -       | Package name    |
| currentVersion | `string`                                                | -       | Current version |
| newVersion     | `string`                                                | -       | New version     |
| changeType     | `'major' \| 'minor' \| 'patch' \| 'added' \| 'removed'` | -       | Type of change  |

### PackageInfoDependency

| Prop    | Type     | Default | Description        |
| ------- | -------- | ------- | ------------------ |
| name    | `string` | -       | Dependency name    |
| version | `string` | -       | Dependency version |

## Examples

### Example 1: Major Version Upgrade

```tsx
<PackageInfo name="typescript" currentVersion="4.9.5" newVersion="5.0.0" changeType="major" />
```

**Visual:**

> Package card with red "major" badge indicating breaking changes.

### Example 2: New Package Addition

```tsx
<PackageInfo name="zustand" newVersion="4.5.0" changeType="added" />
```

**Visual:**

> Package card with blue "added" badge and only new version shown.

### Example 3: Package Removal

```tsx
<PackageInfo name="redux" currentVersion="4.2.0" changeType="removed" />
```

**Visual:**

> Package card with grey "removed" badge and only current version shown.

### Example 4: With Description and Dependencies

```tsx
<PackageInfo name="next" currentVersion="14.0.0" newVersion="14.1.0" changeType="minor">
  <PackageInfoHeader>
    <PackageInfoName />
    <PackageInfoChangeType />
  </PackageInfoHeader>
  <PackageInfoVersion />
  <PackageInfoDescription>The React Framework for Production</PackageInfoDescription>
  <PackageInfoContent>
    <PackageInfoDependencies>
      <PackageInfoDependency name="react" version="^18.2.0" />
      <PackageInfoDependency name="react-dom" version="^18.2.0" />
    </PackageInfoDependencies>
  </PackageInfoContent>
</PackageInfo>
```

**Visual:**

> Full package card with description and dependencies section showing required packages.

### Example 5: Patch Update

```tsx
<PackageInfo name="eslint" currentVersion="8.56.0" newVersion="8.56.1" changeType="patch" />
```

**Visual:**

> Package card with green "patch" badge for bug fix release.

## Notes

- **Change Type Colors**:
  - `major`: Red (breaking changes)
  - `minor`: Yellow (new features)
  - `patch`: Green (bug fixes)
  - `added`: Blue (new package)
  - `removed`: Grey (deleted package)
- Default layout shows name, change type badge, and version change
- Version display only appears if at least one version is provided
- Arrow icon (`→`) separates current and new versions
- Package icon uses `PackageIcon` from lucide-react
- Header uses flexbox with space-between for name and badge
- Dependencies section has uppercase label and smaller text
- Content section has top border separator
- All sections use muted foreground color for secondary text
