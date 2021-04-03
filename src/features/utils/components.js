// TODO -- CUSTOM DROPDOWN STYLING

import { useMemo, useCallback, useEffect, useState } from 'react';

const Select = (props) => {
  return (
    <select
      className={props.className}
      onChange={(e) => props.onChange(e.target.value)}
      value={props.value}>
      {props.list.map((element) => (
        <option key={element.value} value={element.value}>
          {element.value}
        </option>
      ))}
    </select>
  );
};

const RAD = Math.PI / 180;
const START_ANGLE = Math.PI * 1.5 - (RAD * 45) / 2;
const END_ANGLE = Math.PI * -0.5 + (RAD * 45) / 2;

function getPointPair(r, angle, distance) {
  return [r + distance * Math.cos(angle), r - distance * Math.sin(angle)];
}

function DialMask({ id, size, startAngle, endAngle }) {
  const r = size / 2;

  const intermediatePoints = [0, 0.25, 0.5, 0.75, 1]
    .map((fraction) =>
      getPointPair(
        r,
        startAngle - (startAngle - endAngle) * fraction,
        r * 4
      ).join(',')
    )
    .join(' ');

  return (
    <mask id={id}>
      <polygon
        style={{ fill: '#fff' }}
        points={`${r},${r} ${intermediatePoints} ${r},${r}`}
      />
    </mask>
  );
}

function getKnobValue(dragStart, currentY, bipolar) {
  const { y, value } = dragStart;
  const deltaY = y - currentY;
  const slope = 0.01;
  let newValue = value + deltaY * slope;
  if (bipolar) {
    const zeroCrossingResistance = 0.3;
    if (value >= 0 && newValue < 0) {
      newValue += Math.min(zeroCrossingResistance, -newValue);
    } else if (value < 0 && newValue > 0) {
      newValue -= Math.min(zeroCrossingResistance, newValue);
    }
  }
  // Clamp
  return Math.max(bipolar ? -1 : 0, Math.min(1, newValue));
}

let knob_id = 0;

function Knob({
  maxValue = 127,
  dual = false,
  size = 42,
  value = 0,
  fillWidth = 4,
  onChange,
}) {
  value = value / maxValue;
  const uid = useMemo(() => knob_id++, []);
  const radius = size / 2;
  const dial_zero = dual ? Math.PI / 2 : START_ANGLE;
  const dial_range = dual
    ? (START_ANGLE - END_ANGLE) / 2
    : START_ANGLE - END_ANGLE;
  const valueAngle = dual
    ? Math.PI / 2 - value * dial_range
    : START_ANGLE - value * dial_range;

  const [lineX1, lineY1] = getPointPair(
    size / 2,
    valueAngle,
    radius - fillWidth + 2
  );

  const [dragStart, setDragStart] = useState(null);
  const isDragging = Boolean(dragStart);

  const onMouseMove = useCallback(
    (e) => {
      if (!dragStart) return;

      const newValue = getKnobValue(dragStart, e.clientY, dual);
      onChange(Math.round(newValue * maxValue));
    },
    [dragStart, onChange, dual, maxValue]
  );
  const onMouseDown = useCallback(
    (e) => {
      if (e.nativeEvent.button !== 0) return;
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      setDragStart({ value, y: e.nativeEvent.clientY });
      window.addEventListener('mousemove', onMouseMove);
    },
    [setDragStart, onMouseMove, value]
  );
  const onMouseUp = useCallback(() => {
    setDragStart(null);
  }, [setDragStart]);

  useEffect(() => {
    if (!isDragging) {
      window.removeEventListener('mousemove', onMouseMove);
    }
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [isDragging, onMouseMove]);

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseUp]);

  useEffect(() => {
    if (!onMouseMove) return;
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  return (
    <div
      style={{
        position: 'relative',
        cursor: 'pointer',
        height: size,
        width: size,
        overflow: 'hidden',
        flexShrink: 0,
      }}
      onMouseDown={onMouseDown}>
      <svg className='absolute top-0 left-0' width={size} height={size}>
        <defs>
          <DialMask
            size={size}
            startAngle={START_ANGLE}
            endAngle={END_ANGLE}
            id={`value-track-mask-${uid}`}
          />
          <DialMask
            size={size}
            startAngle={dial_zero}
            endAngle={valueAngle}
            id={`value-mask-${uid}`}
          />
        </defs>
        {/* Track outer */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2}
          className='opacity-50'
          style={{ mask: `url(#value-track-mask-${uid})`, fill: 'black' }}
        />
        {/* Value fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2}
          className='fill-current text-indigo-500'
          style={{ mask: `url(#value-mask-${uid})` }}
        />
      </svg>
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}>
        {/* Knob */}
        <circle
          cx={radius}
          cy={radius}
          r={radius - fillWidth}
          style={{
            fill: 'white',
          }}
        />
        {/* Highlight */}
        <circle
          cx={radius}
          cy={radius}
          r={radius - fillWidth}
          style={{
            fill: 'transparent',
          }}
        />
        <svg
          width={size}
          height={size}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}>
          {
            <line
              x1={lineX1}
              y1={lineY1}
              x2={size / 2}
              y2={size / 2}
              strokeLinecap='round'
              className='stroke-current text-indigo-900 stroke-2'></line>
          }
        </svg>
      </svg>
    </div>
  );
}
export { Select, Knob };
