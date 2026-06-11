# Tabs

A tabs component built on Radix UI for organizing content into separate views with keyboard navigation.

## Import

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@allsetlabs/forge/components/ui/tabs';
```

## Features

- **Keyboard Navigation**: Full keyboard support with arrow keys
- **Accessibility**: ARIA compliant with proper roles and attributes
- **Active Indicator**: Visual styling shows active tab with shadow and background
- **Smooth Transitions**: Animated state changes with transition-all
- **Flexible Layout**: Supports horizontal tab lists with responsive content

## Basic Usage

```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content for Tab 1</TabsContent>
  <TabsContent value="tab2">Content for Tab 2</TabsContent>
</Tabs>
```

## Props

### Tabs (Root)

| Prop          | Type                       | Default      | Description                              |
| ------------- | -------------------------- | ------------ | ---------------------------------------- |
| value         | string                     | -            | Controlled active tab value              |
| defaultValue  | string                     | -            | Default active tab for uncontrolled mode |
| onValueChange | (value: string) => void    | -            | Callback when active tab changes         |
| orientation   | 'horizontal' \| 'vertical' | 'horizontal' | Tab list orientation                     |
| className     | string                     | -            | Additional CSS classes                   |

### TabsList

| Prop      | Type      | Default | Description            |
| --------- | --------- | ------- | ---------------------- |
| className | string    | -       | Additional CSS classes |
| children  | ReactNode | -       | TabsTrigger components |

> Displays as a rounded container with muted background, typically horizontal layout

### TabsTrigger

| Prop      | Type      | Default  | Description                        |
| --------- | --------- | -------- | ---------------------------------- |
| value     | string    | required | The value that identifies this tab |
| disabled  | boolean   | false    | Disables the trigger               |
| className | string    | -        | Additional CSS classes             |
| children  | ReactNode | -        | Trigger content (label)            |

> Active trigger has white background with shadow, inactive triggers are transparent

### TabsContent

| Prop      | Type      | Default  | Description                                  |
| --------- | --------- | -------- | -------------------------------------------- |
| value     | string    | required | Matches TabsTrigger value to display content |
| className | string    | -        | Additional CSS classes                       |
| children  | ReactNode | -        | Content to display when tab is active        |

> Content area appears below the tab list with 8px margin-top

## Examples

### Basic Tabs

```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <p>Overview content goes here</p>
  </TabsContent>
  <TabsContent value="details">
    <p>Details content goes here</p>
  </TabsContent>
  <TabsContent value="settings">
    <p>Settings content goes here</p>
  </TabsContent>
</Tabs>
```

### Controlled Tabs

```tsx
const [activeTab, setActiveTab] = useState('account');

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <h3>Account Settings</h3>
    {/* Account form */}
  </TabsContent>
  <TabsContent value="password">
    <h3>Change Password</h3>
    {/* Password form */}
  </TabsContent>
</Tabs>;
```

### With Disabled Tab

```tsx
<Tabs defaultValue="public">
  <TabsList>
    <TabsTrigger value="public">Public</TabsTrigger>
    <TabsTrigger value="private">Private</TabsTrigger>
    <TabsTrigger value="enterprise" disabled>
      Enterprise (Coming Soon)
    </TabsTrigger>
  </TabsList>
  <TabsContent value="public">Public content</TabsContent>
  <TabsContent value="private">Private content</TabsContent>
</Tabs>
```

### Tabs with Cards

```tsx
<Tabs defaultValue="card1" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="card1">Card 1</TabsTrigger>
    <TabsTrigger value="card2">Card 2</TabsTrigger>
    <TabsTrigger value="card3">Card 3</TabsTrigger>
  </TabsList>
  <TabsContent value="card1">
    <Card>
      <CardHeader>
        <CardTitle>Card 1 Title</CardTitle>
      </CardHeader>
      <CardContent>Card 1 content</CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="card2">
    <Card>
      <CardHeader>
        <CardTitle>Card 2 Title</CardTitle>
      </CardHeader>
      <CardContent>Card 2 content</CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="card3">
    <Card>
      <CardHeader>
        <CardTitle>Card 3 Title</CardTitle>
      </CardHeader>
      <CardContent>Card 3 content</CardContent>
    </Card>
  </TabsContent>
</Tabs>
```

### With Icons

```tsx
<Tabs defaultValue="home">
  <TabsList>
    <TabsTrigger value="home">
      <Home className="mr-2 h-4 w-4" />
      Home
    </TabsTrigger>
    <TabsTrigger value="profile">
      <User className="mr-2 h-4 w-4" />
      Profile
    </TabsTrigger>
    <TabsTrigger value="settings">
      <Settings className="mr-2 h-4 w-4" />
      Settings
    </TabsTrigger>
  </TabsList>
  <TabsContent value="home">Home content</TabsContent>
  <TabsContent value="profile">Profile content</TabsContent>
  <TabsContent value="settings">Settings content</TabsContent>
</Tabs>
```

## Accessibility

- Root has `role="tablist"` and proper ARIA attributes
- Triggers have `role="tab"` and proper ARIA attributes
- Content has `role="tabpanel"` and proper ARIA attributes
- Keyboard navigation with left/right arrow keys (horizontal)
- Press Tab to move focus into/out of tab list
- Press Space or Enter to activate focused tab
- Active tab is announced to screen readers
- Disabled tabs are marked with `aria-disabled`

## Notes

- TabsList uses `inline-flex` for horizontal layout
- Active tab indicated by `data-[state=active]` attribute
- Smooth transitions on all state changes
- Focus ring visible for keyboard navigation with offset
- TabsContent has margin-top spacing from list
- Uses muted background for tab list container
- Full dark mode support built-in
- Can be styled with grid layout for equal-width tabs
