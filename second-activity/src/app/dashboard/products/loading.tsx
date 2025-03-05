import { TextShimmer } from '@/components/ui/text-shimmer';

export default function TextShimmerWaveColor() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
    <TextShimmer className='font-mono text-sm' duration={1}>
      Getting Products...
    </TextShimmer>
    </div>
  );
}
