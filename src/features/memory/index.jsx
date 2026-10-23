import React from 'react';

export default function MemoryPage() {
  const programs = Array.from({ length: 128 }, (_, i) => ({
    index: i,
    name: `Patch ${String(i + 1).padStart(3, '0')}`,
  }));

  const columns = [
    programs.slice(0, 32),
    programs.slice(32, 64),
    programs.slice(64, 96),
    programs.slice(96, 128),
  ];

  return (
    <div className="h-full overflow-hidden p-2 text-xs bg-gray-100">
      <div className="grid grid-cols-5 gap-2 h-full">

        <div className="col-span-4 grid grid-cols-4 gap-2 overflow-y-auto">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="space-y-1">
              {column.map((program) => (
                <div
                  key={program.index}
                  className="bg-white border border-gray-300 rounded px-2 py-1"
                >
                  <span className="font-semibold mr-2">
                    {program.index + 1}
                  </span>
                  {program.name}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="col-span-1 bg-white border border-gray-300 rounded p-2 overflow-y-auto">
          <h2 className="font-semibold mb-2">
            Global
          </h2>

          <div className="space-y-1">
            <div>MIDI Channel</div>
            <div>Clock</div>
            <div>Local Control</div>
            <div>Velocity Curve</div>
            <div>Audio In</div>
            <div>Transpose</div>
          </div>
        </div>

      </div>
    </div>
  );
}