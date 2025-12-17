import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface District {
  id: string;
  name: string;
  area: string;
  path: string;
}

const districts: District[] = [
  { 
    id: 'district1', 
    name: 'Калачевский район', 
    area: '18 500 га',
    path: 'M 150 100 L 200 90 L 220 120 L 190 140 Z' 
  },
  { 
    id: 'district2', 
    name: 'Суровикинский район', 
    area: '22 300 га',
    path: 'M 220 120 L 270 110 L 290 150 L 250 170 L 220 150 Z' 
  },
  { 
    id: 'district3', 
    name: 'Чернышковский район', 
    area: '19 800 га',
    path: 'M 150 180 L 200 170 L 220 200 L 180 220 Z' 
  },
  { 
    id: 'district4', 
    name: 'Клетский район', 
    area: '16 700 га',
    path: 'M 250 170 L 300 160 L 320 200 L 280 220 Z' 
  },
  { 
    id: 'district5', 
    name: 'Серафимовичский район', 
    area: '28 700 га',
    path: 'M 180 240 L 240 230 L 260 270 L 210 290 Z' 
  }
];

const VolgoградMap = () => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const getDistrictInfo = (id: string) => districts.find(d => d.id === id);

  return (
    <div className="w-full">
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="absolute top-6 right-6 px-4 py-2 bg-primary/10 rounded-full">
          <span className="text-sm font-semibold text-primary">Интерактивная карта</span>
        </div>

        <svg 
          viewBox="0 0 500 400" 
          className="w-full h-auto"
          style={{ maxHeight: '500px' }}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <rect width="500" height="400" fill="#f8f9fa" rx="20"/>
          
          <path
            d="M 100 50 L 400 50 L 420 80 L 430 150 L 420 220 L 400 280 L 350 330 L 280 350 L 200 340 L 130 310 L 90 250 L 80 180 L 90 110 Z"
            fill="#e8f5e9"
            stroke="#22c55e"
            strokeWidth="2"
            opacity="0.3"
          />

          {districts.map((district, index) => {
            const isHovered = hoveredDistrict === district.id;
            const isSelected = selectedDistrict === district.id;
            const baseX = 120 + (index % 2) * 150;
            const baseY = 120 + Math.floor(index / 2) * 90;

            return (
              <g key={district.id}>
                <circle
                  cx={baseX}
                  cy={baseY}
                  r={isHovered || isSelected ? 45 : 35}
                  fill={isSelected ? '#22c55e' : isHovered ? '#fbbf24' : '#16a34a'}
                  opacity={isHovered || isSelected ? 0.9 : 0.7}
                  className="transition-all duration-300 cursor-pointer animate-scale-in"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both',
                    filter: isHovered || isSelected ? 'url(#glow)' : 'none'
                  }}
                  onMouseEnter={() => setHoveredDistrict(district.id)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  onClick={() => setSelectedDistrict(selectedDistrict === district.id ? null : district.id)}
                />
                
                <circle
                  cx={baseX}
                  cy={baseY}
                  r={isHovered || isSelected ? 50 : 40}
                  fill="none"
                  stroke={isSelected ? '#22c55e' : isHovered ? '#fbbf24' : '#16a34a'}
                  strokeWidth="2"
                  opacity={isHovered || isSelected ? 0.5 : 0}
                  className="transition-all duration-300"
                  style={{ 
                    animation: isHovered || isSelected ? 'pulse 2s infinite' : 'none'
                  }}
                />

                <text
                  x={baseX}
                  y={baseY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {index + 1}
                </text>

                {(isHovered || isSelected) && (
                  <g className="animate-fade-in">
                    <rect
                      x={baseX - 60}
                      y={baseY - 80}
                      width="120"
                      height="50"
                      fill="white"
                      stroke="#22c55e"
                      strokeWidth="2"
                      rx="8"
                      filter="url(#glow)"
                    />
                    <text
                      x={baseX}
                      y={baseY - 65}
                      textAnchor="middle"
                      fill="#262626"
                      fontSize="10"
                      fontWeight="600"
                    >
                      {district.name.split(' ')[0]}
                    </text>
                    <text
                      x={baseX}
                      y={baseY - 52}
                      textAnchor="middle"
                      fill="#737373"
                      fontSize="9"
                    >
                      {district.area}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          <g className="animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            <rect x="20" y="20" width="160" height="80" fill="white" rx="12" opacity="0.95" />
            <text x="35" y="45" fill="#262626" fontSize="14" fontWeight="bold">Волгоградская</text>
            <text x="35" y="62" fill="#262626" fontSize="14" fontWeight="bold">область</text>
            <text x="35" y="85" fill="#16a34a" fontSize="18" fontWeight="bold">106 000+ га</text>
          </g>
        </svg>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
          {districts.map((district, index) => (
            <Card
              key={district.id}
              className={`p-4 cursor-pointer transition-all duration-300 ${
                selectedDistrict === district.id 
                  ? 'border-2 border-primary bg-primary/5 shadow-lg' 
                  : hoveredDistrict === district.id
                  ? 'border-2 border-secondary bg-secondary/5'
                  : 'border hover:border-primary/50'
              }`}
              onMouseEnter={() => setHoveredDistrict(district.id)}
              onMouseLeave={() => setHoveredDistrict(null)}
              onClick={() => setSelectedDistrict(selectedDistrict === district.id ? null : district.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  selectedDistrict === district.id ? 'bg-primary' : 'bg-accent'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground leading-tight">{district.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{district.area}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">5</div>
              <div className="text-sm text-muted-foreground">районов присутствия</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-1">106 000+</div>
              <div className="text-sm text-muted-foreground">гектаров земель</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">100%</div>
              <div className="text-sm text-muted-foreground">контроль качества</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Наведите или нажмите на район для подробной информации
      </div>
    </div>
  );
};

export default VolgoградMap;
