# SchemaDisplay

Display API schemas with HTTP methods, parameters, request/response bodies in an interactive format.

## Import

```tsx
import {
  SchemaDisplay,
  SchemaDisplayHeader,
  SchemaDisplayMethod,
  SchemaDisplayPath,
  SchemaDisplayDescription,
  SchemaDisplayContent,
  SchemaDisplayParameters,
  SchemaDisplayParameter,
  SchemaDisplayRequest,
  SchemaDisplayResponse,
  SchemaDisplayProperty,
  SchemaDisplayExample,
} from '@allsetlabs/forge/components/ai-elements/schema-display';
```

## Features

- **HTTP Methods**: Color-coded badges for GET, POST, PUT, PATCH, DELETE
- **Path Parameters**: Automatically highlights parameters in paths (e.g., `{id}`)
- **Nested Properties**: Collapsible nested object/array properties
- **Required Indicators**: Red badges for required parameters/properties
- **Dark Mode**: Full support with semantic colors

## Basic Usage

```tsx
<SchemaDisplay
  method="GET"
  path="/api/users/{id}"
  description="Retrieve a user by ID"
  parameters={[
    { name: 'id', type: 'string', required: true, location: 'path', description: 'User ID' },
  ]}
  responseBody={[
    { name: 'id', type: 'string', required: true },
    { name: 'name', type: 'string', required: true },
    { name: 'email', type: 'string', required: true },
  ]}
/>
```

**Visual:**

> A bordered card showing "GET /api/users/{id}" with green method badge. Expandable sections for parameters and response body with type badges and required indicators.

## Props

### SchemaDisplay

| Prop         | Type                                            | Default | Description                  |
| ------------ | ----------------------------------------------- | ------- | ---------------------------- |
| method       | 'GET' \| 'POST' \| 'PUT' \| 'PATCH' \| 'DELETE' | -       | HTTP method (required)       |
| path         | string                                          | -       | API endpoint path (required) |
| description  | string                                          | -       | Endpoint description         |
| parameters   | SchemaParameter[]                               | -       | Query/path/header parameters |
| requestBody  | SchemaProperty[]                                | -       | Request body schema          |
| responseBody | SchemaProperty[]                                | -       | Response body schema         |
| className    | string                                          | -       | Additional CSS classes       |

### SchemaParameter

| Prop        | Type                          | Default | Description                          |
| ----------- | ----------------------------- | ------- | ------------------------------------ |
| name        | string                        | -       | Parameter name                       |
| type        | string                        | -       | Data type (e.g., 'string', 'number') |
| required    | boolean                       | false   | Whether parameter is required        |
| description | string                        | -       | Parameter description                |
| location    | 'path' \| 'query' \| 'header' | -       | Parameter location                   |

### SchemaProperty

| Prop        | Type             | Default | Description                          |
| ----------- | ---------------- | ------- | ------------------------------------ |
| name        | string           | -       | Property name                        |
| type        | string           | -       | Data type (e.g., 'string', 'object') |
| required    | boolean          | false   | Whether property is required         |
| description | string           | -       | Property description                 |
| properties  | SchemaProperty[] | -       | Nested properties (for objects)      |
| items       | SchemaProperty   | -       | Array item schema (for arrays)       |

## Examples

### Example 1: POST Endpoint with Request Body

```tsx
<SchemaDisplay
  method="POST"
  path="/api/users"
  description="Create a new user"
  requestBody={[
    { name: 'name', type: 'string', required: true, description: 'User full name' },
    { name: 'email', type: 'string', required: true, description: 'User email address' },
    { name: 'age', type: 'number', description: 'User age (optional)' },
  ]}
  responseBody={[
    { name: 'id', type: 'string', required: true },
    { name: 'createdAt', type: 'string', required: true },
  ]}
/>
```

**Visual:**

> POST endpoint with blue badge, showing collapsible request body (name, email, age) and response body (id, createdAt).

### Example 2: Nested Object Properties

```tsx
<SchemaDisplay
  method="GET"
  path="/api/users/{id}/profile"
  responseBody={[
    {
      name: 'user',
      type: 'object',
      required: true,
      properties: [
        { name: 'id', type: 'string', required: true },
        { name: 'name', type: 'string', required: true },
        {
          name: 'address',
          type: 'object',
          properties: [
            { name: 'street', type: 'string' },
            { name: 'city', type: 'string' },
            { name: 'country', type: 'string' },
          ],
        },
      ],
    },
    { name: 'lastLogin', type: 'string' },
  ]}
/>
```

**Visual:**

> GET endpoint with nested collapsible objects showing user → address hierarchy with indentation.

### Example 3: Query Parameters

```tsx
<SchemaDisplay
  method="GET"
  path="/api/users"
  description="List all users with pagination"
  parameters={[
    { name: 'page', type: 'number', location: 'query', description: 'Page number' },
    { name: 'limit', type: 'number', location: 'query', description: 'Items per page' },
    { name: 'sort', type: 'string', location: 'query', description: 'Sort field' },
  ]}
  responseBody={[
    {
      name: 'users',
      type: 'array',
      items: {
        name: 'user',
        type: 'object',
        properties: [
          { name: 'id', type: 'string' },
          { name: 'name', type: 'string' },
        ],
      },
    },
    { name: 'total', type: 'number' },
  ]}
/>
```

**Visual:**

> GET endpoint with expandable parameters section showing 3 query params with location badges.

### Example 4: Custom Layout

```tsx
<SchemaDisplay method="DELETE" path="/api/users/{id}">
  <SchemaDisplayHeader>
    <SchemaDisplayMethod />
    <SchemaDisplayPath />
    <span className="text-muted-foreground ml-auto text-xs">v2.0</span>
  </SchemaDisplayHeader>
  <SchemaDisplayDescription>Permanently delete a user account</SchemaDisplayDescription>
  <SchemaDisplayContent>
    <SchemaDisplayParameters />
    <SchemaDisplayResponse />
  </SchemaDisplayContent>
</SchemaDisplay>
```

**Visual:**

> Custom layout with version badge, red DELETE method badge, and manual component composition.

## Notes

- Method badges use semantic colors (green=GET, blue=POST, orange=PUT, yellow=PATCH, red=DELETE)
- Path parameters (e.g., `{id}`) are automatically highlighted in blue
- Properties auto-indent based on nesting depth
- Collapsible sections default to open
- Required fields show red "required" badge
- Dark mode uses adjusted opacity for colors
