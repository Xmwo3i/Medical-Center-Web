// Professional medical SVG icons — one per scan type
// Each accepts size and color props

export const HeartIcon = ({ size = 80, color = '#e53e3e' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="38" fill={`${color}15`} stroke={`${color}30`} strokeWidth="1.5"/>
    <path d="M40 58C40 58 18 45 18 30C18 23.4 23.4 18 30 18C34.2 18 37.9 20.2 40 23.5C42.1 20.2 45.8 18 50 18C56.6 18 62 23.4 62 30C62 45 40 58 40 58Z"
      fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M24 35H31L35 27L40 43L44 35H56" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const BoneIcon = ({ size = 80, color = '#38b2ac' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="38" fill={`${color}15`} stroke={`${color}30`} strokeWidth="1.5"/>
    <rect x="36" y="16" width="8" height="48" rx="4" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
    <circle cx="40" cy="20" r="7" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2"/>
    <circle cx="40" cy="60" r="7" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2"/>
    <line x1="28" y1="30" x2="52" y2="30" stroke={color} strokeWidth="2" strokeDasharray="3 3"/>
    <line x1="28" y1="40" x2="52" y2="40" stroke={color} strokeWidth="2" strokeDasharray="3 3"/>
    <line x1="28" y1="50" x2="52" y2="50" stroke={color} strokeWidth="2" strokeDasharray="3 3"/>
  </svg>
)

export const KidneyIcon = ({ size = 80, color = '#68b2a0' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="38" fill={`${color}15`} stroke={`${color}30`} strokeWidth="1.5"/>
    <path d="M28 22C20 26 17 36 20 46C23 56 32 60 38 56C41 54 41 50 38 48C35 46 34 42 36 38C38 34 37 28 32 24C31 23 29 22 28 22Z"
      fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2.2" strokeLinejoin="round"/>
    <path d="M52 22C60 26 63 36 60 46C57 56 48 60 42 56C39 54 39 50 42 48C45 46 46 42 44 38C42 34 43 28 48 24C49 23 51 22 52 22Z"
      fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2.2" strokeLinejoin="round"/>
    <path d="M38 56C38 60 40 64 40 64C40 64 42 60 42 56" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="40" cy="66" r="4" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5"/>
  </svg>
)

export const ThyroidIcon = ({ size = 80, color = '#ed8936' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="38" fill={`${color}15`} stroke={`${color}30`} strokeWidth="1.5"/>
    <path d="M20 38C20 30 27 24 35 26C38 27 40 30 40 30C40 30 42 27 45 26C53 24 60 30 60 38C60 48 52 54 40 54C28 54 20 48 20 38Z"
      fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2.2"/>
    <line x1="40" y1="30" x2="40" y2="54" stroke={color} strokeWidth="1.5" strokeDasharray="3 2"/>
    <line x1="40" y1="20" x2="40" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="40" cy="18" r="4" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5"/>
    <circle cx="29" cy="38" r="4" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1.5"/>
    <circle cx="51" cy="38" r="4" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1.5"/>
  </svg>
)

export const BrainIcon = ({ size = 80, color = '#667eea' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="38" fill={`${color}15`} stroke={`${color}30`} strokeWidth="1.5"/>
    <path d="M40 16C28 16 20 24 20 34C20 40 22 44 26 47C26 52 29 56 33 57C35 58 37 57 38 55V42M40 16C52 16 60 24 60 34C60 40 58 44 54 47C54 52 51 56 47 57C45 58 43 57 42 55V42"
      fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="40" y1="18" x2="40" y2="55" stroke={color} strokeWidth="1.5" strokeDasharray="3 2"/>
    <path d="M26 32C29 30 32 31 34 34" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M26 40C30 38 33 39 35 42" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M54 32C51 30 48 31 46 34" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M54 40C50 38 47 39 45 42" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="30" cy="35" r="2.5" fill={color} fillOpacity="0.7"/>
    <circle cx="50" cy="35" r="2.5" fill={color} fillOpacity="0.7"/>
    <circle cx="40" cy="30" r="2" fill={color} fillOpacity="0.7"/>
  </svg>
)

export const LungIcon = ({ size = 80, color = '#48bb78' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="38" fill={`${color}15`} stroke={`${color}30`} strokeWidth="1.5"/>
    <line x1="40" y1="15" x2="40" y2="32" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    <path d="M40 25C36 28 30 28 26 32C20 38 18 46 20 52C22 58 28 62 34 60C37 59 38 56 38 53V40"
      fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2.2" strokeLinejoin="round"/>
    <path d="M40 25C44 28 50 28 54 32C60 38 62 46 60 52C58 58 52 62 46 60C43 59 42 56 42 53V40"
      fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2.2" strokeLinejoin="round"/>
    <circle cx="26" cy="50" r="4" fill={color} fillOpacity="0.4"/>
    <circle cx="54" cy="50" r="4" fill={color} fillOpacity="0.4"/>
    <circle cx="30" cy="44" r="3" fill={color} fillOpacity="0.3"/>
    <circle cx="50" cy="44" r="3" fill={color} fillOpacity="0.3"/>
  </svg>
)

export const LiverIcon = ({ size = 80, color = '#ecc94b' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="38" fill={`${color}15`} stroke={`${color}30`} strokeWidth="1.5"/>
    <path d="M16 36C16 26 24 20 34 22C38 23 40 26 40 26C40 26 46 18 54 20C64 23 66 34 62 44C58 54 48 60 40 60C28 60 16 50 16 36Z"
      fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2.2"/>
    <path d="M40 26C40 26 38 40 40 60" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round"/>
    <ellipse cx="52" cy="46" rx="7" ry="9" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5"/>
    <path d="M30 32C34 30 38 31 40 34" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M26 42C30 40 35 41 38 44" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

export const ParathyroidIcon = ({ size = 80, color = '#f687b3' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="38" fill={`${color}15`} stroke={`${color}30`} strokeWidth="1.5"/>
    <rect x="32" y="18" width="16" height="44" rx="8" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
    <ellipse cx="30" cy="28" rx="7" ry="5" fill={color} fillOpacity="0.35" stroke={color} strokeWidth="1.8"/>
    <ellipse cx="50" cy="28" rx="7" ry="5" fill={color} fillOpacity="0.35" stroke={color} strokeWidth="1.8"/>
    <ellipse cx="30" cy="44" rx="7" ry="5" fill={color} fillOpacity="0.35" stroke={color} strokeWidth="1.8"/>
    <ellipse cx="50" cy="44" rx="7" ry="5" fill={color} fillOpacity="0.35" stroke={color} strokeWidth="1.8"/>
    <line x1="40" y1="18" x2="40" y2="62" stroke={color} strokeWidth="1.5"/>
  </svg>
)

export const GIIcon = ({ size = 80, color = '#fc8181' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="38" fill={`${color}15`} stroke={`${color}30`} strokeWidth="1.5"/>
    <path d="M30 18C30 18 22 22 22 30C22 38 30 40 30 48C30 56 24 60 24 60"
      fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M50 18C50 18 58 22 58 30C58 38 50 40 50 48C50 56 56 60 56 60"
      fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M30 18C34 16 46 16 50 18" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 60C28 62 52 62 56 60" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <ellipse cx="40" cy="40" rx="10" ry="12" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
    <path d="M34 36C36 34 44 34 46 36" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M34 44C36 46 44 46 46 44" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

export const CystographyIcon = ({ size = 80, color = '#9f7aea' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="38" fill={`${color}15`} stroke={`${color}30`} strokeWidth="1.5"/>
    <ellipse cx="40" cy="50" rx="18" ry="14" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2.2"/>
    <path d="M34 36C34 30 30 24 30 24M46 36C46 30 50 24 50 24" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M30 24C32 20 36 18 40 18C44 18 48 20 50 24" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="40" cy="50" r="5" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1.5"/>
    <path d="M40 64L40 70" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M36 70L44 70" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

export const RBCIcon = ({ size = 80, color = '#e53e3e' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="38" fill={`${color}15`} stroke={`${color}30`} strokeWidth="1.5"/>
    <ellipse cx="40" cy="40" rx="18" ry="12" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="2"/>
    <ellipse cx="40" cy="40" rx="10" ry="5" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeDasharray="3 2"/>
    <circle cx="24" cy="32" r="6" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5"/>
    <circle cx="56" cy="32" r="6" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5"/>
    <circle cx="24" cy="48" r="6" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5"/>
    <circle cx="56" cy="48" r="6" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5"/>
    <path d="M22 32C22 28 26 26 26 32" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M54 32C54 28 58 26 58 32" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

export const MeckelIcon = ({ size = 80, color = '#ed8936' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="38" fill={`${color}15`} stroke={`${color}30`} strokeWidth="1.5"/>
    <path d="M20 30C20 30 24 26 32 28C36 29 38 32 40 32C42 32 44 29 48 28C56 26 60 30 60 30"
      fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M20 30C18 36 18 46 20 52C24 62 36 64 40 64C44 64 56 62 60 52C62 46 62 36 60 30"
      fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
    <path d="M40 32L40 48" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="40" cy="52" r="7" fill={color} fillOpacity="0.35" stroke={color} strokeWidth="2"/>
    <text x="36" y="56" fill={color} fontSize="9" fontWeight="bold">M</text>
  </svg>
)
