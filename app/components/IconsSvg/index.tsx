
import React from 'react';
import Svg, { Path, Polyline, SvgProps } from 'react-native-svg';

// FIX: Explicitly add 'style' to IconProps to resolve TypeScript error.
// While SvgProps has a 'style' property, sometimes TypeScript needs it to be
// explicitly defined in the extending interface.
interface IconProps extends SvgProps {
  size?: number;
  color?: string;
  style?: SvgProps['style'];
}

export const PillboxIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <Path d="M18 6h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2"/>
      <Path d="M8 9.975V11a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V9"/>
      <Path d="M11 6.025V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v1"/>
      <Path d="M12 2v2"/>
      <Path d="M12 14v-2"/>
      <Path d="M4 8v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8"/>
      <Path d="M4 8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2"/>
    </Svg>
);

export const PillIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
    <Path d="m8.5 8.5 7 7"/>
  </Svg>
);

export const DropletIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
  </Svg>
);

export const SyringeIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <Path d="m18 2 4 4"/><Path d="m17 7 3-3"/><Path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 4"/><Path d="m9 11 4 4"/><Path d="m5 19-3 3"/>
    </Svg>
);

export const MinusIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M5 12h14"/>
  </Svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M5 12h14"/>
    <Path d="M12 5v14"/>
  </Svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="m6 9 6 6 6-6"/>
  </Svg>
);

export const XIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M18 6 6 18"/>
    <Path d="m6 6 12 12"/>
  </Svg>
);

export const AlarmClockPlusIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <Path d="M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/><Path d="M5 3 2 6"/><Path d="m22 6-3-3"/><Path d="M6 19.5 4 22"/><Path d="M18 19.5 20 22"/><Path d="M12 13h-2"/><Path d="M12 8v5"/><Path d="M16 12h-4"/>
    </Svg>
);

export const BellIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
    <Path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
  </Svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <Polyline points="22 4 12 14.01 9 11.01"/>
  </Svg>
);
