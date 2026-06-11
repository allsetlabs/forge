# Carousel

Touch-enabled, accessible carousel component built on Embla Carousel with keyboard navigation and customizable controls.

## Import

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@allsetlabs/forge/components/ui/carousel';
```

## Features

- **Touch Gestures**: Swipe support on mobile and touch devices
- **Keyboard Navigation**: Arrow keys for slide navigation
- **Flexible Orientation**: Horizontal or vertical scrolling
- **Plugin Support**: Extend with Embla Carousel plugins
- **Accessible**: ARIA roles and keyboard controls
- **Customizable Controls**: Styled previous/next navigation buttons
- **API Access**: Programmatic control via exposed API

## Basic Usage

```tsx
<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

**Visual:**

> A horizontal carousel with three slides, previous/next circular buttons positioned on left and right edges, supports swipe gestures and arrow key navigation

## Props

### Carousel

| Prop          | Type                                   | Default        | Description                          |
| ------------- | -------------------------------------- | -------------- | ------------------------------------ |
| `orientation` | `"horizontal" \| "vertical"`           | `"horizontal"` | Scroll direction                     |
| `opts`        | `CarouselOptions`                      | -              | Embla Carousel configuration options |
| `plugins`     | `CarouselPlugin[]`                     | -              | Array of Embla plugins               |
| `setApi`      | `(api: CarouselApi) => void`           | -              | Callback to access carousel API      |
| `className`   | `string`                               | -              | Additional CSS classes               |
| `...props`    | `React.HTMLAttributes<HTMLDivElement>` | -              | All standard div props               |

### CarouselContent

| Prop        | Type                                   | Default | Description            |
| ----------- | -------------------------------------- | ------- | ---------------------- |
| `className` | `string`                               | -       | Additional CSS classes |
| `...props`  | `React.HTMLAttributes<HTMLDivElement>` | -       | All standard div props |

### CarouselItem

| Prop        | Type                                   | Default | Description            |
| ----------- | -------------------------------------- | ------- | ---------------------- |
| `className` | `string`                               | -       | Additional CSS classes |
| `...props`  | `React.HTMLAttributes<HTMLDivElement>` | -       | All standard div props |

### CarouselPrevious / CarouselNext

| Prop        | Type                                  | Default     | Description                |
| ----------- | ------------------------------------- | ----------- | -------------------------- |
| `variant`   | Button variants                       | `"outline"` | Button style variant       |
| `size`      | Button sizes                          | `"icon"`    | Button size                |
| `className` | `string`                              | -           | Additional CSS classes     |
| `...props`  | `React.ComponentProps<typeof Button>` | -           | All Button component props |

## Examples

### Example 1: Multiple Items Per View

```tsx
<Carousel
  opts={{
    align: 'start',
    loop: true,
  }}
>
  <CarouselContent>
    {Array.from({ length: 10 }).map((_, index) => (
      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
        <Card>
          <CardContent>Item {index + 1}</CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

**Visual:**

> Responsive carousel showing 1 item on mobile, 2 on tablet, 3 on desktop, with smooth scrolling and looped navigation

### Example 2: Vertical Carousel

```tsx
<Carousel orientation="vertical" className="max-w-xs">
  <CarouselContent className="h-[300px]">
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

**Visual:**

> Vertical scrolling carousel with 300px height, navigation buttons positioned above and below with 90-degree rotation

### Example 3: Controlled Carousel with API

```tsx
const [api, setApi] = useState<CarouselApi>();
const [current, setCurrent] = useState(0);

useEffect(() => {
  if (!api) return;

  setCurrent(api.selectedScrollSnap() + 1);

  api.on('select', () => {
    setCurrent(api.selectedScrollSnap() + 1);
  });
}, [api]);

return (
  <>
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    <div>Slide {current} of 3</div>
  </>
);
```

**Visual:**

> Carousel with external slide counter, programmatically controllable via API for custom interactions

### Example 4: Autoplay Carousel with Plugin

```tsx
import Autoplay from 'embla-carousel-autoplay';

<Carousel
  plugins={[
    Autoplay({
      delay: 2000,
    }),
  ]}
>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>;
```

**Visual:**

> Carousel that automatically advances every 2 seconds, pauses on hover, with manual controls still available

### Example 5: Carousel Without Navigation Buttons

```tsx
<Carousel opts={{ loop: true }}>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
</Carousel>
```

**Visual:**

> Minimal carousel with only swipe/drag interaction and keyboard controls, no visible navigation buttons

## Accessibility

- Container uses `role="region"` and `aria-roledescription="carousel"`
- Each slide has `role="group"` and `aria-roledescription="slide"`
- Navigation buttons include `sr-only` labels ("Previous slide", "Next slide")
- Keyboard support: Arrow Left/Right keys navigate slides
- Disabled state on navigation buttons when at boundaries (unless loop enabled)
- Focus management maintains proper tab order

## TypeScript

```tsx
import type { UseEmblaCarouselType } from 'embla-carousel-react';

type CarouselApi = UseEmblaCarouselType[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1];

interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
}
```

## Notes

- Built on Embla Carousel for smooth, performant scrolling
- Previous/Next buttons automatically positioned based on orientation
- Navigation buttons disabled when at start/end (unless loop option enabled)
- Use `opts.align` to control slide alignment ('start', 'center', 'end')
- Use `opts.loop` for infinite scrolling
- CarouselItem uses `basis-full` by default for one slide at a time
- Customize slide width with Tailwind classes (e.g., `basis-1/2` for 2 slides)
- Supports all Embla Carousel plugins for extended functionality
- Keyboard navigation automatically prevents default browser scroll
- Touch/drag interactions work on all devices
- API provides methods like `scrollTo()`, `scrollNext()`, `scrollPrev()`
