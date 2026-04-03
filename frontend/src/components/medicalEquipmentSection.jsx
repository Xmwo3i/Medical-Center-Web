import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper
} from '@mui/material'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

// CT Scanner Illustration
const CTScannerIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ctGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1976D2"/>
        <stop offset="100%" stopColor="#0D47A1"/>
      </linearGradient>
      <linearGradient id="ctRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#42A5F5"/>
        <stop offset="50%" stopColor="#1976D2"/>
        <stop offset="100%" stopColor="#42A5F5"/>
      </linearGradient>
    </defs>
    
    {/* Machine Base */}
    <rect x="20" y="120" width="160" height="20" rx="5" fill="#E0E0E0"/>
    <rect x="30" y="125" width="140" height="10" rx="3" fill="#BDBDBD"/>
    
    {/* Patient Bed */}
    <motion.g
      animate={{ x: [0, 20, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <rect x="100" y="85" width="90" height="8" rx="2" fill="#90CAF9"/>
      <rect x="100" y="93" width="90" height="4" rx="1" fill="#64B5F6"/>
      {/* Patient Silhouette */}
      <ellipse cx="140" cy="82" rx="12" ry="5" fill="#BBDEFB"/>
      <circle cx="160" cy="80" r="6" fill="#BBDEFB"/>
    </motion.g>
    
    {/* Scanner Ring - Outer */}
    <ellipse cx="70" cy="75" rx="50" ry="55" fill="url(#ctGrad)"/>
    <ellipse cx="70" cy="75" rx="42" ry="47" fill="#E3F2FD"/>
    
    {/* Scanner Opening */}
    <ellipse cx="70" cy="75" rx="32" ry="36" fill="#0D47A1"/>
    <ellipse cx="70" cy="75" rx="28" ry="32" fill="#1A237E"/>
    
    {/* Rotating Scanner Elements */}
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: '70px 75px' }}
    >
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <rect
          key={i}
          x="68"
          y="30"
          width="4"
          height="12"
          rx="2"
          fill="#4FC3F7"
          style={{
            transformOrigin: '70px 75px',
            transform: `rotate(${angle}deg)`
          }}
        />
      ))}
    </motion.g>
    
    {/* Scan Beam */}
    <motion.line
      x1="70" y1="45"
      x2="70" y2="105"
      stroke="#4FC3F7"
      strokeWidth="2"
      animate={{ opacity: [0.3, 1, 0.3], rotate: [0, 180, 360] }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{ transformOrigin: '70px 75px' }}
    />
    
    {/* Control Panel */}
    <rect x="25" y="40" width="15" height="30" rx="3" fill="#37474F"/>
    <circle cx="32" cy="50" r="3" fill="#4CAF50"/>
    <circle cx="32" cy="60" r="3" fill="#FFC107"/>
    
    {/* Status Lights */}
    <motion.circle
      cx="32" cy="50" r="3"
      fill="#4CAF50"
      animate={{ opacity: [1, 0.4, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  </svg>
)

// Gamma Camera Illustration
const GammaCameraIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gammaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0B6E4F"/>
        <stop offset="100%" stopColor="#004D40"/>
      </linearGradient>
      <radialGradient id="glowGrad2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#69F0AE" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#69F0AE" stopOpacity="0"/>
      </radialGradient>
    </defs>
    
    {/* Base Stand */}
    <rect x="90" y="130" width="20" height="20" rx="3" fill="#455A64"/>
    <rect x="70" y="145" width="60" height="10" rx="2" fill="#37474F"/>
    
    {/* Rotating Arm */}
    <motion.g
      animate={{ rotate: [-15, 15, -15] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: '100px 130px' }}
    >
      {/* Vertical Arm */}
      <rect x="95" y="50" width="10" height="80" rx="3" fill="#546E7A"/>
      
      {/* Horizontal Arm */}
      <rect x="50" y="45" width="100" height="12" rx="4" fill="#607D8B"/>
      
      {/* Detector Head - Top */}
      <rect x="35" y="20" width="50" height="35" rx="5" fill="url(#gammaGrad)"/>
      <rect x="40" y="25" width="40" height="25" rx="3" fill="#00695C"/>
      
      {/* Detector Grid */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <motion.rect
            key={`${row}-${col}`}
            x={44 + col * 9}
            y={28 + row * 6}
            width="6"
            height="4"
            rx="1"
            fill="#A5D6A7"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 0.5,
              delay: (row + col) * 0.1,
              repeat: Infinity
            }}
          />
        ))
      )}
      
      {/* Detector Head - Bottom */}
      <rect x="115" y="20" width="50" height="35" rx="5" fill="url(#gammaGrad)"/>
      <rect x="120" y="25" width="40" height="25" rx="3" fill="#00695C"/>
      
      {/* Detector Grid - Bottom */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <motion.rect
            key={`b-${row}-${col}`}
            x={124 + col * 9}
            y={28 + row * 6}
            width="6"
            height="4"
            rx="1"
            fill="#A5D6A7"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 0.5,
              delay: (row + col) * 0.1 + 0.25,
              repeat: Infinity
            }}
          />
        ))
      )}
    </motion.g>
    
    {/* Patient Bed */}
    <rect x="45" y="100" width="110" height="12" rx="3" fill="#90A4AE"/>
    <rect x="50" y="95" width="100" height="8" rx="2" fill="#B0BEC5"/>
    
    {/* Patient */}
    <ellipse cx="100" cy="92" rx="25" ry="6" fill="#FFCCBC"/>
    <circle cx="130" cy="90" r="8" fill="#FFCCBC"/>
    
    {/* Radiation Particles */}
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.circle
        key={i}
        cx={70 + i * 15}
        cy={70}
        r="3"
        fill="#69F0AE"
        animate={{
          y: [0, -30, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 1.5,
          delay: i * 0.3,
          repeat: Infinity
        }}
      />
    ))}
  </svg>
)

// SPECT Machine Illustration
const SPECTMachineIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="spectGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7B1FA2"/>
        <stop offset="100%" stopColor="#4A148C"/>
      </linearGradient>
    </defs>
    
    {/* Main Body */}
    <rect x="40" y="30" width="120" height="90" rx="10" fill="url(#spectGrad)"/>
    <rect x="50" y="40" width="100" height="70" rx="8" fill="#6A1B9A"/>
    
    {/* Scanner Opening */}
    <ellipse cx="100" cy="75" rx="35" ry="28" fill="#4A148C"/>
    <ellipse cx="100" cy="75" rx="28" ry="22" fill="#38006b"/>
    
    {/* Rotating Detector Array */}
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: '100px 75px' }}
    >
      {[0, 90, 180, 270].map((angle, i) => (
        <g key={i} style={{ transformOrigin: '100px 75px', transform: `rotate(${angle}deg)` }}>
          <rect x="96" y="38" width="8" height="15" rx="2" fill="#CE93D8"/>
          <motion.rect
            x="97" y="40" width="6" height="11" rx="1"
            fill="#E1BEE7"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.5, delay: i * 0.2, repeat: Infinity }}
          />
        </g>
      ))}
    </motion.g>
    
    {/* Scan Lines */}
    <motion.g
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: '100px 75px' }}
    >
      <line x1="100" y1="55" x2="100" y2="95" stroke="#E040FB" strokeWidth="1" opacity="0.6"/>
      <line x1="80" y1="75" x2="120" y2="75" stroke="#E040FB" strokeWidth="1" opacity="0.6"/>
    </motion.g>
    
    {/* Patient Table */}
    <motion.g
      animate={{ x: [0, 10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <rect x="130" y="68" width="60" height="14" rx="3" fill="#CE93D8"/>
      <ellipse cx="170" cy="66" rx="15" ry="5" fill="#F3E5F5"/>
      <circle cx="182" cy="64" r="5" fill="#F3E5F5"/>
    </motion.g>
    
    {/* Control Panel */}
    <rect x="45" y="125" width="110" height="20" rx="5" fill="#E1BEE7"/>
    <rect x="50" y="128" width="30" height="14" rx="3" fill="#4A148C"/>
    
    {/* Display Screen */}
    <rect x="52" y="130" width="26" height="10" rx="2" fill="#1A237E"/>
    <motion.text
      x="55"
      y="138"
      fill="#4FC3F7"
      fontSize="6"
      fontFamily="monospace"
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      SCAN
    </motion.text>
    
    {/* Status LEDs */}
    {[0, 1, 2].map((i) => (
      <motion.circle
        key={i}
        cx={95 + i * 15}
        cy={135}
        r="4"
        fill={i === 0 ? '#4CAF50' : i === 1 ? '#FFC107' : '#2196F3'}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
      />
    ))}
    
    {/* Base */}
    <rect x="60" y="145" width="80" height="10" rx="3" fill="#9575CD"/>
  </svg>
)

// PET-CT Scanner Illustration
const PETCTScannerIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="petctGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6F00"/>
        <stop offset="100%" stopColor="#E65100"/>
      </linearGradient>
      <linearGradient id="petctGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1976D2"/>
        <stop offset="100%" stopColor="#0D47A1"/>
      </linearGradient>
    </defs>
    
    {/* Combined Machine Body */}
    <rect x="15" y="35" width="80" height="85" rx="8" fill="url(#petctGrad)"/>
    <rect x="95" y="35" width="80" height="85" rx="8" fill="url(#petctGrad2)"/>
    
    {/* PET Opening */}
    <ellipse cx="55" cy="77" rx="28" ry="32" fill="#BF360C"/>
    <ellipse cx="55" cy="77" rx="22" ry="26" fill="#3E2723"/>
    
    {/* CT Opening */}
    <ellipse cx="135" cy="77" rx="28" ry="32" fill="#0D47A1"/>
    <ellipse cx="135" cy="77" rx="22" ry="26" fill="#1A237E"/>
    
    {/* PET Detector Ring */}
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: '55px 77px' }}
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.rect
          key={i}
          x="53"
          y="48"
          width="4"
          height="8"
          rx="1"
          fill="#FFAB00"
          style={{
            transformOrigin: '55px 77px',
            transform: `rotate(${angle}deg)`
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.3, delay: i * 0.1, repeat: Infinity }}
        />
      ))}
    </motion.g>
    
    {/* CT X-ray Beam */}
    <motion.g
      animate={{ rotate: -360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: '135px 77px' }}
    >
      <line x1="135" y1="55" x2="135" y2="99" stroke="#4FC3F7" strokeWidth="2"/>
      <polygon points="135,52 130,62 140,62" fill="#4FC3F7"/>
    </motion.g>
    
    {/* Patient Bed */}
    <motion.g
      animate={{ x: [-30, 30, -30] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <rect x="70" y="70" width="120" height="14" rx="3" fill="#FFCC80"/>
      <ellipse cx="160" cy="67" rx="18" ry="6" fill="#FFE0B2"/>
      <circle cx="175" cy="65" r="6" fill="#FFE0B2"/>
    </motion.g>
    
    {/* Radioactive Tracer Particles */}
    {[0, 1, 2, 3].map((i) => (
      <motion.circle
        key={i}
        cx={40 + i * 10}
        cy={77}
        r="2"
        fill="#FFEB3B"
        animate={{
          scale: [1, 2, 1],
          opacity: [1, 0, 1]
        }}
        transition={{
          duration: 1,
          delay: i * 0.25,
          repeat: Infinity
        }}
      />
    ))}
    
    {/* Connection Bridge */}
    <rect x="90" y="50" width="10" height="55" fill="#455A64"/>
    
    {/* Labels */}
    <text x="45" y="130" fill="#FF6F00" fontSize="10" fontWeight="bold">PET</text>
    <text x="125" y="130" fill="#1976D2" fontSize="10" fontWeight="bold">CT</text>
    
    {/* Base */}
    <rect x="25" y="140" width="150" height="12" rx="4" fill="#78909C"/>
    <rect x="35" y="148" width="130" height="8" rx="3" fill="#546E7A"/>
  </svg>
)

// Radiopharmacy Lab Illustration
const RadiopharmacyIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="flaskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4CAF50"/>
        <stop offset="100%" stopColor="#2E7D32"/>
      </linearGradient>
      <linearGradient id="flask2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2196F3"/>
        <stop offset="100%" stopColor="#1565C0"/>
      </linearGradient>
    </defs>
    
    {/* Lab Table */}
    <rect x="10" y="120" width="180" height="15" rx="3" fill="#5D4037"/>
    <rect x="15" y="135" width="10" height="20" rx="2" fill="#4E342E"/>
    <rect x="175" y="135" width="10" height="20" rx="2" fill="#4E342E"/>
    
    {/* Lead Shield Box */}
    <rect x="20" y="60" width="50" height="60" rx="5" fill="#455A64"/>
    <rect x="25" y="65" width="40" height="50" rx="3" fill="#37474F"/>
    
    {/* Radioactive Vial inside shield */}
    <rect x="38" y="80" width="14" height="25" rx="3" fill="#263238"/>
    <motion.rect
      x="40" y="90" width="10" height="12" rx="2"
      fill="#FFEB3B"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
    
    {/* Radiation Symbol on Shield */}
    <circle cx="45" cy="72" r="5" fill="#FFC107"/>
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: '45px 72px' }}
    >
      {[0, 120, 240].map((angle, i) => (
        <path
          key={i}
          d="M45 69 L43 64 A5 5 0 0 1 47 64 Z"
          fill="#FFC107"
          style={{
            transformOrigin: '45px 72px',
            transform: `rotate(${angle}deg)`
          }}
        />
      ))}
    </motion.g>
    
    {/* Erlenmeyer Flask */}
    <path d="M95 70 L90 70 L85 115 Q85 120 95 120 L105 120 Q115 120 115 115 L110 70 L105 70" fill="none" stroke="#90A4AE" strokeWidth="3"/>
    <motion.path
      d="M87 100 Q100 95 113 100 L113 115 Q113 118 105 118 L95 118 Q87 118 87 115 Z"
      fill="url(#flaskGrad)"
      animate={{ d: ["M87 100 Q100 95 113 100 L113 115 Q113 118 105 118 L95 118 Q87 118 87 115 Z", "M87 105 Q100 100 113 105 L113 115 Q113 118 105 118 L95 118 Q87 118 87 115 Z", "M87 100 Q100 95 113 100 L113 115 Q113 118 105 118 L95 118 Q87 118 87 115 Z"] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Bubbles in Flask */}
    {[0, 1, 2].map((i) => (
      <motion.circle
        key={i}
        cx={95 + i * 5}
        cy={110}
        r="2"
        fill="rgba(255,255,255,0.6)"
        animate={{ y: [0, -15, -15], opacity: [1, 1, 0] }}
        transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
      />
    ))}
    
    {/* Test Tube Rack */}
    <rect x="135" y="85" width="50" height="35" rx="3" fill="#8D6E63"/>
    
    {/* Test Tubes */}
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x={143 + i * 10} y="70" width="6" height="30" rx="3" fill="#E3F2FD" stroke="#90A4AE" strokeWidth="1"/>
        <motion.rect
          x={144 + i * 10}
          y={85 - i * 3}
          width="4"
          height={12 + i * 3}
          rx="2"
          fill={['#F44336', '#4CAF50', '#2196F3', '#FF9800'][i]}
          animate={{ height: [12 + i * 3, 15 + i * 3, 12 + i * 3] }}
          transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
        />
      </g>
    ))}
    
    {/* Syringe */}
    <g transform="translate(130, 40) rotate(-30)">
      <rect x="0" y="8" width="40" height="8" rx="2" fill="#E0E0E0"/>
      <rect x="40" y="10" width="15" height="4" rx="1" fill="#BDBDBD"/>
      <motion.rect
        x="5" y="10" width="30" height="4" rx="1"
        fill="#81D4FA"
        animate={{ width: [30, 20, 30] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <rect x="-5" y="9" width="8" height="6" rx="1" fill="#90A4AE"/>
    </g>
    
    {/* Dose Calibrator Display */}
    <rect x="80" y="35" width="45" height="30" rx="4" fill="#263238"/>
    <rect x="83" y="38" width="39" height="18" rx="2" fill="#1B5E20"/>
    <motion.text
      x="87"
      y="52"
      fill="#69F0AE"
      fontSize="10"
      fontFamily="monospace"
      animate={{ opacity: [1, 0.7, 1] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    >
      37.5
    </motion.text>
    <text x="86" y="62" fill="#A5D6A7" fontSize="6">mCi</text>
  </svg>
)

// Quality Control Station Illustration
const QualityControlIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="monitorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1A237E"/>
        <stop offset="100%" stopColor="#0D47A1"/>
      </linearGradient>
    </defs>
    
    {/* Monitor */}
    <rect x="40" y="20" width="120" height="80" rx="5" fill="#37474F"/>
    <rect x="45" y="25" width="110" height="65" rx="3" fill="url(#monitorGrad)"/>
    
    {/* Screen Content - Brain Scan */}
    <ellipse cx="80" cy="57" rx="25" ry="22" fill="#1E88E5" opacity="0.3"/>
    <motion.ellipse
      cx="80" cy="57" rx="25" ry="22"
      fill="none"
      stroke="#4FC3F7"
      strokeWidth="2"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Brain Scan Details */}
    <motion.path
      d="M65 50 Q75 45 85 50 Q90 55 85 65 Q75 70 65 65 Q60 55 65 50"
      fill="#4FC3F7"
      opacity="0.6"
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    
    {/* Hotspot */}
    <motion.circle
      cx="78" cy="55" r="5"
      fill="#FF5252"
      animate={{ r: [4, 7, 4], opacity: [1, 0.5, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
    
    {/* Data Panel */}
    <rect x="115" y="30" width="35" height="55" fill="#0D47A1"/>
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.rect
        key={i}
        x="118"
        y={35 + i * 10}
        width={20 + Math.random() * 10}
        height="6"
        rx="1"
        fill="#4FC3F7"
        animate={{ width: [15 + i * 3, 25 + i * 2, 15 + i * 3] }}
        transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
      />
    ))}
    
    {/* Monitor Stand */}
    <rect x="90" y="100" width="20" height="15" rx="2" fill="#455A64"/>
    <rect x="70" y="115" width="60" height="8" rx="2" fill="#546E7A"/>
    
    {/* Keyboard */}
    <rect x="50" y="130" width="100" height="20" rx="3" fill="#37474F"/>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <rect key={i} x={55 + i * 10} y="135" width="7" height="5" rx="1" fill="#546E7A"/>
    ))}
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <rect key={i} x={60 + i * 10} y="142" width="7" height="5" rx="1" fill="#546E7A"/>
    ))}
    
    {/* Mouse */}
    <ellipse cx="170" cy="140" rx="12" ry="15" fill="#37474F"/>
    <rect x="168" y="130" width="4" height="8" rx="2" fill="#546E7A"/>
    
    {/* Checkmark Badge */}
    <circle cx="170" cy="40" r="15" fill="#4CAF50"/>
    <motion.path
      d="M162 40 L168 46 L178 34"
      stroke="white"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
    />
  </svg>
)

// Main Medical Equipment Section Component
const MedicalEquipmentSection = () => {
  const { t } = useTranslation()
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const equipment = [
    {
      title: t('equipment.ct.title'),
      description: t('equipment.ct.desc'),
      illustration: <CTScannerIllustration />,
      color: '#1976D2'
    },
    {
      title: t('equipment.gamma.title'),
      description: t('equipment.gamma.desc'),
      illustration: <GammaCameraIllustration />,
      color: '#0B6E4F'
    },
    {
      title: t('equipment.spect.title'),
      description: t('equipment.spect.desc'),
      illustration: <SPECTMachineIllustration />,
      color: '#7B1FA2'
    },
    {
      title: t('equipment.pet.title'),
      description: t('equipment.pet.desc'),
      illustration: <PETCTScannerIllustration />,
      color: '#FF6F00'
    },
    {
      title: t('equipment.lab.title'),
      description: t('equipment.lab.desc'),
      illustration: <RadiopharmacyIllustration />,
      color: '#4CAF50'
    },
    {
      title: t('equipment.qc.title'),
      description: t('equipment.qc.desc'),
      illustration: <QualityControlIllustration />,
      color: '#1A237E'
    }
  ]

  return (
    <Box
      sx={{
        py: 12,
        background: 'linear-gradient(180deg, #FAFAFA 0%, #F5F5F5 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(25, 118, 210, 0.03) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(11, 110, 79, 0.03) 0%, transparent 50%)`,
          pointerEvents: 'none'
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          sx={{ textAlign: 'center', mb: 8 }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 1,
              mb: 3,
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(11, 110, 79, 0.1) 100%)',
              borderRadius: '50px',
              border: '1px solid rgba(25, 118, 210, 0.2)'
            }}
          >
            <span>🏥</span>
            <Typography sx={{ color: '#1976D2', fontSize: '0.9rem', fontWeight: 600 }}>
              {t('equipment.sectionBadge')}
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '3rem' },
              background: 'linear-gradient(135deg, #0B6E4F 0%, #1976D2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            {t('equipment.sectionTitle')}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: '#666',
              fontWeight: 400,
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.8
            }}
          >
            {t('equipment.sectionSubtitle')}
          </Typography>
        </MotionBox>

        {/* Equipment Grid */}
        <Grid container spacing={4}>
          {equipment.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MotionBox
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ y: -10 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background: '#fff',
                    border: '2px solid',
                    borderColor: hoveredIndex === index ? item.color : 'transparent',
                    boxShadow: hoveredIndex === index
                      ? `0 20px 40px ${item.color}25`
                      : '0 4px 20px rgba(0,0,0,0.05)',
                    transition: 'all 0.4s ease',
                    overflow: 'hidden',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: item.color,
                      transform: hoveredIndex === index ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 0.4s ease'
                    }
                  }}
                >
                  {/* Illustration */}
                  <Box
                    sx={{
                      width: '100%',
                      height: 160,
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `${item.color}08`,
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      transform: hoveredIndex === index ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    {item.illustration}
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: hoveredIndex === index ? item.color : '#1a1a2e',
                      mb: 1,
                      textAlign: 'center',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666',
                      textAlign: 'center',
                      lineHeight: 1.7
                    }}
                  >
                    {item.description}
                  </Typography>
                </Paper>
              </MotionBox>
            </Grid>
          ))}
        </Grid>

        {/* Features Bar */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          sx={{ mt: 8 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #0B6E4F 0%, #1976D2 100%)',
              color: '#fff'
            }}
          >
            <Grid container spacing={3} alignItems="center">
              {[
                { icon: '🔬', title: t('equipment.title'), desc: t('equipment.subtitle') },
                { icon: '✅', title: t('equipment.internationalStd'), desc: t('equipment.isoDesc') },
                { icon: '👨‍⚕️', title: t('equipment.expertTeam'), desc: t('equipment.expDesc') },
                { icon: '🛡️', title: t('equipment.safety'), desc: t('equipment.safetyDesc') }
              ].map((item, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>{item.icon}</Typography>
                      <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{item.title}</Typography>
                      <Typography sx={{ fontSize: '0.85rem', opacity: 0.8 }}>{item.desc}</Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </MotionBox>

        {/* CTA Buttons */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          sx={{ textAlign: 'center', mt: 6 }}
        >
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(135deg, #34A853 0%, #1976D2 100%)',
                  color: '#fff',
                  px: 5,
                  py: 1.5,
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  boxShadow: '0 8px 25px rgba(52, 168, 83, 0.35)'
                }}
              >
                {t('equipment.visitCenter')}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: '#34A853',
                  borderWidth: 2,
                  color: '#34A853',
                  px: 5,
                  py: 1.5,
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  '&:hover': {
                    borderWidth: 2,
                    background: 'rgba(52, 168, 83, 0.08)'
                  }
                }}
              >
                {t('equipment.contactUs')}
              </Button>
            </motion.div>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default MedicalEquipmentSection