# MicSelector

Select audio input devices (microphones) with automatic permission handling and device detection.

## Import

```tsx
import {
  MicSelector,
  MicSelectorTrigger,
  MicSelectorContent,
  MicSelectorInput,
  MicSelectorList,
  MicSelectorEmpty,
  MicSelectorItem,
  MicSelectorLabel,
  MicSelectorValue,
  useAudioDevices,
} from '@allsetlabs/forge/components/ai-elements/mic-selector';
```

## Features

- **Auto-Detection**: Automatically detects available microphones
- **Permission Handling**: Requests microphone permission when needed
- **Device Monitoring**: Watches for device changes (plug/unplug)
- **Search**: Filter devices by name
- **Device ID Display**: Shows device IDs in format (XXXX:XXXX)
- **Responsive Width**: Dropdown matches trigger width

## Basic Usage

```tsx
const [selectedMic, setSelectedMic] = useState<string>();

<MicSelector value={selectedMic} onValueChange={setSelectedMic}>
  <MicSelectorTrigger>
    <MicSelectorValue />
  </MicSelectorTrigger>
  <MicSelectorContent>
    <MicSelectorInput />
    <MicSelectorList>
      {(devices) =>
        devices.map((device) => (
          <MicSelectorItem key={device.deviceId} value={device.deviceId}>
            <MicSelectorLabel device={device} />
          </MicSelectorItem>
        ))
      }
    </MicSelectorList>
    <MicSelectorEmpty />
  </MicSelectorContent>
</MicSelector>;
```

**Visual:**

> Button showing "Select microphone..." that opens a searchable dropdown list of available microphones.

## Props

### MicSelector

| Prop          | Type                                   | Default | Description                   |
| ------------- | -------------------------------------- | ------- | ----------------------------- |
| value         | `string`                               | -       | Controlled selected device ID |
| defaultValue  | `string`                               | -       | Default selected device ID    |
| onValueChange | `(value: string \| undefined) => void` | -       | Selection change callback     |
| open          | `boolean`                              | -       | Controlled open state         |
| defaultOpen   | `boolean`                              | `false` | Default open state            |
| onOpenChange  | `(open: boolean) => void`              | -       | Open state change callback    |

### MicSelectorLabel

| Prop   | Type              | Default | Description                 |
| ------ | ----------------- | ------- | --------------------------- |
| device | `MediaDeviceInfo` | -       | Device to display label for |

### MicSelectorList

| Prop     | Type                                        | Default | Description                     |
| -------- | ------------------------------------------- | ------- | ------------------------------- |
| children | `(devices: MediaDeviceInfo[]) => ReactNode` | -       | Render function for device list |

## Examples

### Example 1: With Custom Empty State

```tsx
<MicSelector value={selectedMic} onValueChange={setSelectedMic}>
  <MicSelectorTrigger>
    <MicSelectorValue />
  </MicSelectorTrigger>
  <MicSelectorContent>
    <MicSelectorInput />
    <MicSelectorList>
      {(devices) =>
        devices.map((device) => (
          <MicSelectorItem key={device.deviceId} value={device.deviceId}>
            <MicSelectorLabel device={device} />
          </MicSelectorItem>
        ))
      }
    </MicSelectorList>
    <MicSelectorEmpty>No microphones found. Please check your device settings.</MicSelectorEmpty>
  </MicSelectorContent>
</MicSelector>
```

**Visual:**

> Shows custom message when no microphones are detected.

### Example 2: Using useAudioDevices Hook

```tsx
const AudioDeviceInfo = () => {
  const { devices, loading, error, hasPermission } = useAudioDevices();

  if (loading) return <p>Loading devices...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <p>Permission granted: {hasPermission ? 'Yes' : 'No'}</p>
      <p>Devices found: {devices.length}</p>
      <ul>
        {devices.map((device) => (
          <li key={device.deviceId}>{device.label}</li>
        ))}
      </ul>
    </div>
  );
};
```

**Visual:**

> Displays device information and permission status.

### Example 3: Controlled Open State

```tsx
const [open, setOpen] = useState(false);
const [selectedMic, setSelectedMic] = useState<string>();

<>
  <Button onClick={() => setOpen(true)}>Select Microphone</Button>
  <MicSelector
    value={selectedMic}
    onValueChange={setSelectedMic}
    open={open}
    onOpenChange={setOpen}
  >
    <MicSelectorTrigger>
      <MicSelectorValue />
    </MicSelectorTrigger>
    <MicSelectorContent>
      <MicSelectorInput />
      <MicSelectorList>
        {(devices) =>
          devices.map((device) => (
            <MicSelectorItem key={device.deviceId} value={device.deviceId}>
              <MicSelectorLabel device={device} />
            </MicSelectorItem>
          ))
        }
      </MicSelectorList>
      <MicSelectorEmpty />
    </MicSelectorContent>
  </MicSelector>
</>;
```

**Visual:**

> External button controls when the microphone selector opens.

### Example 4: Custom Search Placeholder

```tsx
<MicSelector value={selectedMic} onValueChange={setSelectedMic}>
  <MicSelectorTrigger>
    <MicSelectorValue />
  </MicSelectorTrigger>
  <MicSelectorContent>
    <MicSelectorInput placeholder="Find your microphone..." />
    <MicSelectorList>
      {(devices) =>
        devices.map((device) => (
          <MicSelectorItem key={device.deviceId} value={device.deviceId}>
            <MicSelectorLabel device={device} />
          </MicSelectorItem>
        ))
      }
    </MicSelectorList>
    <MicSelectorEmpty />
  </MicSelectorContent>
</MicSelector>
```

**Visual:**

> Search input with custom placeholder text.

## Notes

- Automatically requests microphone permission when dropdown opens (if not already granted)
- Device labels may show as generic strings (e.g., "Microphone (1234:5678)") until permission is granted
- After permission is granted, device labels show full names
- Device IDs are extracted from labels using regex pattern `(XXXX:XXXX)`
- Automatically watches for device changes (plug/unplug events)
- Trigger button width is tracked and applied to dropdown for consistent sizing
- Value placeholder shows "Select microphone..." when no device is selected
- Closes dropdown automatically when a device is selected
- Uses Command component for searchable list interface
