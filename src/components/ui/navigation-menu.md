# Navigation Menu

A collection of links for site navigation with dropdown menus and keyboard support.

## Import

```tsx
import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from '@allsetlabs/forge/components/ui/navigation-menu';
```

## Features

- **Radix UI Powered**: Built on `@radix-ui/react-navigation-menu` for accessibility
- **Keyboard Navigation**: Full keyboard support with arrow keys and escape
- **Animated Dropdowns**: Smooth slide and fade animations for content
- **Auto Viewport**: Automatic content sizing and positioning
- **Indicator Animation**: Visual indicator for active menu item
- **Trigger Style Helper**: CVA-based style function for consistent triggers

## Basic Usage

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="p-4">
          <a href="/product1">Product 1</a>
          <a href="/product2">Product 2</a>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/about" className={navigationMenuTriggerStyle()}>
        About
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## Props

### NavigationMenu

| Prop          | Type                         | Default        | Description                        |
| ------------- | ---------------------------- | -------------- | ---------------------------------- |
| value         | `string`                     | -              | Controlled active value            |
| defaultValue  | `string`                     | -              | Default uncontrolled value         |
| onValueChange | `(value: string) => void`    | -              | Callback when active value changes |
| dir           | `'ltr' \| 'rtl'`             | `'ltr'`        | Reading direction                  |
| orientation   | `'horizontal' \| 'vertical'` | `'horizontal'` | Menu orientation                   |
| className     | `string`                     | -              | Additional CSS classes             |

> Automatically includes `NavigationMenuViewport` as a child

### NavigationMenuList

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| className | `string` | -       | Additional CSS classes |

> Renders as `<ul>` with flex layout and horizontal spacing

### NavigationMenuItem

Extends `NavigationMenuPrimitive.Item` with no custom props.

> Container for menu items (triggers, links, or content)

### NavigationMenuTrigger

| Prop      | Type              | Default | Description            |
| --------- | ----------------- | ------- | ---------------------- |
| children  | `React.ReactNode` | -       | Trigger content        |
| className | `string`          | -       | Additional CSS classes |

> Automatically includes chevron icon that rotates when open

### NavigationMenuContent

| Prop      | Type              | Default | Description            |
| --------- | ----------------- | ------- | ---------------------- |
| children  | `React.ReactNode` | -       | Dropdown content       |
| className | `string`          | -       | Additional CSS classes |

> Dropdown panel with slide and fade animations

### NavigationMenuLink

Extends `NavigationMenuPrimitive.Link` with no custom props.

> Standard navigation link, style with `navigationMenuTriggerStyle()`

### NavigationMenuViewport

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| className | `string` | -       | Additional CSS classes |

> Portal container for dropdown content (auto-included in NavigationMenu)

### NavigationMenuIndicator

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| className | `string` | -       | Additional CSS classes |

> Visual indicator (arrow) for active menu item

## navigationMenuTriggerStyle

A CVA-based style function for consistent trigger/link styling.

```tsx
const triggerStyles = navigationMenuTriggerStyle();
<NavigationMenuLink className={triggerStyles}>Link</NavigationMenuLink>;
```

## Examples

### With Dropdown Content

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Features</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid w-[400px] gap-3 p-6">
          <div>
            <h4 className="font-medium">Feature 1</h4>
            <p className="text-muted-foreground text-sm">Description</p>
          </div>
          <div>
            <h4 className="font-medium">Feature 2</h4>
            <p className="text-muted-foreground text-sm">Description</p>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### Mixed Links and Dropdowns

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4">
          <li>
            <a href="/product1">Product 1</a>
          </li>
          <li>
            <a href="/product2">Product 2</a>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuLink href="/pricing" className={navigationMenuTriggerStyle()}>
        Pricing
      </NavigationMenuLink>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuLink href="/about" className={navigationMenuTriggerStyle()}>
        About
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### With Grid Layout

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
          <div className="rounded border p-4">
            <h4 className="mb-2 font-medium">Documentation</h4>
            <p className="text-muted-foreground text-sm">Get started with guides and tutorials</p>
          </div>
          <div className="rounded border p-4">
            <h4 className="mb-2 font-medium">API Reference</h4>
            <p className="text-muted-foreground text-sm">Complete API documentation</p>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### Controlled State

```tsx
const [activeItem, setActiveItem] = React.useState('');

<NavigationMenu value={activeItem} onValueChange={setActiveItem}>
  <NavigationMenuList>
    <NavigationMenuItem value="products">
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="p-4">Content</div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>;
```

### With Custom Indicator

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="p-4">Content</div>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuIndicator />
  </NavigationMenuList>
</NavigationMenu>
```

## Accessibility

- Full keyboard navigation with arrow keys, Enter, and Escape
- Focus management moves between trigger and content
- `aria-expanded` state on triggers
- Screen reader announcements for expanded state
- Focus trap within dropdown content
- Escape key closes dropdowns
- Tab key moves to next menu item

## Notes

- Viewport is auto-positioned below the menu with `absolute left-0 top-full`
- Content slides in from left/right with fade animation
- Trigger chevron rotates 180° when menu opens (300ms transition)
- Viewport uses CSS variables for dynamic width and height from Radix
- Indicator is a small rotated square positioned at the top of viewport
- Trigger has hover (`hover:bg-accent`), focus (`focus:bg-accent`), and data states
- `data-[active]` and `data-[state=open]` add `bg-accent/50` to triggers
- Content is responsive: full width on mobile, auto width on md screens
