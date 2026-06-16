/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { VideoRangeSlider } from './video-range-slider';

const meta = {
  title: 'UI/VideoRangeSlider',
  component: VideoRangeSlider,
  tags: ['autodocs'],
} satisfies Meta<typeof VideoRangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [startTime, setStartTime] = useState(5);
    const [endTime, setEndTime] = useState(25);
    const [thumbnailTime, setThumbnailTime] = useState(15);

    return (
      <VideoRangeSlider
        duration={30}
        startTime={startTime}
        endTime={endTime}
        thumbnailTime={thumbnailTime}
        onStartChange={setStartTime}
        onEndChange={setEndTime}
        onThumbnailChange={setThumbnailTime}
      />
    );
  },
  args: {} as any,
};

export const LongDuration: Story = {
  render: () => {
    const [startTime, setStartTime] = useState(30);
    const [endTime, setEndTime] = useState(90);
    const [thumbnailTime, setThumbnailTime] = useState(60);

    return (
      <VideoRangeSlider
        duration={120}
        startTime={startTime}
        endTime={endTime}
        thumbnailTime={thumbnailTime}
        onStartChange={setStartTime}
        onEndChange={setEndTime}
        onThumbnailChange={setThumbnailTime}
      />
    );
  },
  args: {} as any,
};

export const ShortDuration: Story = {
  render: () => {
    const [startTime, setStartTime] = useState(1);
    const [endTime, setEndTime] = useState(8);
    const [thumbnailTime, setThumbnailTime] = useState(4.5);

    return (
      <VideoRangeSlider
        duration={10}
        startTime={startTime}
        endTime={endTime}
        thumbnailTime={thumbnailTime}
        onStartChange={setStartTime}
        onEndChange={setEndTime}
        onThumbnailChange={setThumbnailTime}
      />
    );
  },
  args: {} as any,
};

export const CustomMinDuration: Story = {
  render: () => {
    const [startTime, setStartTime] = useState(10);
    const [endTime, setEndTime] = useState(20);
    const [thumbnailTime, setThumbnailTime] = useState(15);

    return (
      <VideoRangeSlider
        duration={60}
        startTime={startTime}
        endTime={endTime}
        thumbnailTime={thumbnailTime}
        minDuration={5}
        onStartChange={setStartTime}
        onEndChange={setEndTime}
        onThumbnailChange={setThumbnailTime}
      />
    );
  },
  args: {} as any,
};

export const WithSeekCallback: Story = {
  render: () => {
    const [startTime, setStartTime] = useState(5);
    const [endTime, setEndTime] = useState(25);
    const [thumbnailTime, setThumbnailTime] = useState(15);
    const [seekTime, setSeekTime] = useState<number | null>(null);

    return (
      <div className="space-y-4">
        <VideoRangeSlider
          duration={30}
          startTime={startTime}
          endTime={endTime}
          thumbnailTime={thumbnailTime}
          onStartChange={setStartTime}
          onEndChange={setEndTime}
          onThumbnailChange={setThumbnailTime}
          onSeek={(time) => setSeekTime(time)}
        />
        {seekTime !== null && (
          <div className="bg-muted rounded-md p-4 text-center text-sm">
            Seeking to: {seekTime.toFixed(2)}s
          </div>
        )}
      </div>
    );
  },
  args: {} as any,
};

export const Disabled: Story = {
  render: () => {
    const [startTime] = useState(5);
    const [endTime] = useState(25);
    const [thumbnailTime] = useState(15);

    return (
      <VideoRangeSlider
        duration={30}
        startTime={startTime}
        endTime={endTime}
        thumbnailTime={thumbnailTime}
        onStartChange={() => {}}
        onEndChange={() => {}}
        onThumbnailChange={() => {}}
        disabled
      />
    );
  },
  args: {} as any,
};

export const FullRange: Story = {
  render: () => {
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(60);
    const [thumbnailTime, setThumbnailTime] = useState(30);

    return (
      <VideoRangeSlider
        duration={60}
        startTime={startTime}
        endTime={endTime}
        thumbnailTime={thumbnailTime}
        onStartChange={setStartTime}
        onEndChange={setEndTime}
        onThumbnailChange={setThumbnailTime}
      />
    );
  },
  args: {} as any,
};
