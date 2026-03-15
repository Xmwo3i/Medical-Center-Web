import React, { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
  Button
} from '@mui/material'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)
const MotionCard = motion(Card)

// Custom SVG Illustrations for each scan type

const HeartScanIllustration = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B6B"/>
        <stop offset="100%" stopColor="#EE5A5A"/>
      </linearGradient>
    </defs>
    
    {/* Heart Shape */}
    <motion.path
      d="M60 100 C20 70 10 40 30 25 C45 15 60 30 60 30 C60 30 75 15 90 25 C110 40 100 70 60 100Z"
      fill="url(#heartGrad)"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
      style={{ transformOrigin: '60px 60px' }}
    />
    
    {/* ECG Line */}
    <motion.path
      d="M15 60 L35 60 L40 45 L50 75 L55 50 L60 65 L65 55 L70 60 L105 60"
      stroke="white"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Pulse Rings */}
    <motion.circle
      cx="60" cy="55" r="20"
      stroke="#FF6B6B"
      strokeWidth="2"
      fill="none"
      animate={{ r: [20, 35, 20], opacity: [0.8, 0, 0.8] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    
    {/* Sparkles */}
    <circle cx="25" cy="30" r="3" fill="#FFD700"/>
    <circle cx="95" cy="35" r="2" fill="#FFD700"/>
  </svg>
)

const BoneScanIllustration = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="boneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ECDC4"/>
        <stop offset="100%" stopColor="#44A08D"/>
      </linearGradient>
    </defs>
    
    {/* Spine */}
    <rect x="55" y="20" width="10" height="80" rx="5" fill="url(#boneGrad)"/>
    
    {/* Vertebrae */}
    {[25, 40, 55, 70, 85].map((y, i) => (
      <motion.rect
        key={i}
        x="45" y={y} width="30" height="8" rx="4"
        fill="#E0F7F5"
        stroke="#4ECDC4"
        strokeWidth="2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
      />
    ))}
    
    {/* Ribs */}
    <motion.path
      d="M45 35 Q25 40 20 55"
      stroke="#4ECDC4" strokeWidth="4" fill="none" strokeLinecap="round"
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path
      d="M75 35 Q95 40 100 55"
      stroke="#4ECDC4" strokeWidth="4" fill="none" strokeLinecap="round"
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
    />
    <motion.path
      d="M45 50 Q20 55 15 70"
      stroke="#4ECDC4" strokeWidth="4" fill="none" strokeLinecap="round"
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
    />
    <motion.path
      d="M75 50 Q100 55 105 70"
      stroke="#4ECDC4" strokeWidth="4" fill="none" strokeLinecap="round"
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2, delay: 0.9, repeat: Infinity }}
    />
    
    {/* Scan Effect */}
    <motion.rect
      x="10" y="20" width="100" height="5" rx="2"
      fill="rgba(78, 205, 196, 0.4)"
      animate={{ y: [20, 95, 20] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
  </svg>
)

const KidneyScanIllustration = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="kidneyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#95E1D3"/>
        <stop offset="100%" stopColor="#68C9BA"/>
      </linearGradient>
    </defs>
    
    {/* Left Kidney */}
    <motion.path
      d="M25 40 Q15 60 25 80 Q35 95 45 80 Q50 70 45 60 Q40 50 45 40 Q35 25 25 40Z"
      fill="url(#kidneyGrad)"
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{ transformOrigin: '35px 60px' }}
    />
    
    {/* Right Kidney */}
    <motion.path
      d="M95 40 Q105 60 95 80 Q85 95 75 80 Q70 70 75 60 Q80 50 75 40 Q85 25 95 40Z"
      fill="url(#kidneyGrad)"
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
      style={{ transformOrigin: '85px 60px' }}
    />
    
    {/* Connecting Tubes (Ureters) */}
    <path d="M45 75 Q50 90 60 100 Q70 90 75 75" stroke="#68C9BA" strokeWidth="4" fill="none"/>
    
    {/* Bladder */}
    <ellipse cx="60" cy="105" rx="15" ry="10" fill="#B8F0E8" stroke="#68C9BA" strokeWidth="2"/>
    
    {/* Flow Animation */}
    <motion.circle
      cx="35" cy="60" r="4"
      fill="#FFD700"
      animate={{ cy: [50, 70, 50], opacity: [1, 0.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <motion.circle
      cx="85" cy="60" r="4"
      fill="#FFD700"
      animate={{ cy: [70, 50, 70], opacity: [1, 0.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    
    {/* Detail Lines */}
    <path d="M30 50 Q35 60 30 70" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none"/>
    <path d="M90 50 Q85 60 90 70" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none"/>
  </svg>
)

const ThyroidScanIllustration = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="thyroidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F38181"/>
        <stop offset="100%" stopColor="#E86F6F"/>
      </linearGradient>
    </defs>
    
    {/* Neck Outline */}
    <path d="M40 20 L40 100 M80 20 L80 100" stroke="#FFE0E0" strokeWidth="8" strokeLinecap="round"/>
    
    {/* Thyroid Butterfly Shape */}
    <motion.path
      d="M35 50 Q20 55 25 70 Q30 85 45 80 Q55 75 60 65 Q65 75 75 80 Q90 85 95 70 Q100 55 85 50 Q75 45 60 50 Q45 45 35 50Z"
      fill="url(#thyroidGrad)"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2.5, repeat: Infinity }}
      style={{ transformOrigin: '60px 65px' }}
    />
    
    {/* Trachea */}
    <rect x="55" y="45" width="10" height="60" rx="5" fill="#FFE0E0"/>
    {[50, 60, 70, 80, 90].map((y, i) => (
      <rect key={i} x="52" y={y} width="16" height="3" rx="1" fill="#F38181" opacity="0.3"/>
    ))}
    
    {/* Hormone Particles */}
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.circle
        key={i}
        cx={40 + i * 10}
        cy={65}
        r="3"
        fill="#FFD700"
        animate={{
          y: [-10, -30, -10],
          opacity: [1, 0, 1],
          x: [0, (i - 2) * 5, 0]
        }}
        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
      />
    ))}
    
    {/* Glow Effect */}
    <motion.ellipse
      cx="60" cy="65" rx="30" ry="20"
      fill="none" stroke="#F38181" strokeWidth="2"
      animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{ transformOrigin: '60px 65px' }}
    />
  </svg>
)

const LungScanIllustration = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lungGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A8E6CF"/>
        <stop offset="100%" stopColor="#7BD4B5"/>
      </linearGradient>
    </defs>
    
    {/* Trachea */}
    <rect x="55" y="10" width="10" height="30" rx="5" fill="#7BD4B5"/>
    
    {/* Bronchi */}
    <path d="M60 40 Q45 50 35 55" stroke="#7BD4B5" strokeWidth="6" fill="none" strokeLinecap="round"/>
    <path d="M60 40 Q75 50 85 55" stroke="#7BD4B5" strokeWidth="6" fill="none" strokeLinecap="round"/>
    
    {/* Left Lung */}
    <motion.path
      d="M15 55 Q10 70 15 90 Q25 110 45 105 Q55 100 55 80 Q55 60 45 50 Q30 45 15 55Z"
      fill="url(#lungGrad)"
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
      style={{ transformOrigin: '35px 75px' }}
    />
    
    {/* Right Lung */}
    <motion.path
      d="M105 55 Q110 70 105 90 Q95 110 75 105 Q65 100 65 80 Q65 60 75 50 Q90 45 105 55Z"
      fill="url(#lungGrad)"
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 3, delay: 0.3, repeat: Infinity }}
      style={{ transformOrigin: '85px 75px' }}
    />
    
    {/* Lung Details */}
    <path d="M25 65 Q35 70 30 85" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
    <path d="M35 60 Q45 70 40 90" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
    <path d="M95 65 Q85 70 90 85" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
    <path d="M85 60 Q75 70 80 90" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
    
    {/* Air Bubbles */}
    {[0, 1, 2].map((i) => (
      <motion.circle
        key={`left-${i}`}
        cx={25 + i * 8}
        cy={80}
        r="4"
        fill="rgba(255,255,255,0.6)"
        animate={{ y: [0, -20, 0], opacity: [0.8, 0.2, 0.8] }}
        transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
      />
    ))}
    {[0, 1, 2].map((i) => (
      <motion.circle
        key={`right-${i}`}
        cx={80 + i * 8}
        cy={80}
        r="4"
        fill="rgba(255,255,255,0.6)"
        animate={{ y: [0, -20, 0], opacity: [0.8, 0.2, 0.8] }}
        transition={{ duration: 2, delay: i * 0.4 + 0.2, repeat: Infinity }}
      />
    ))}
  </svg>
)

const LiverScanIllustration = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="liverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD93D"/>
        <stop offset="100%" stopColor="#E8C534"/>
      </linearGradient>
      <linearGradient id="gallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6BCF7F"/>
        <stop offset="100%" stopColor="#4CAF50"/>
      </linearGradient>
    </defs>
    
    {/* Liver Shape */}
    <motion.path
      d="M20 45 Q15 55 20 75 Q30 95 60 95 Q95 95 105 70 Q110 55 100 45 Q85 30 60 35 Q35 30 20 45Z"
      fill="url(#liverGrad)"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
      style={{ transformOrigin: '60px 65px' }}
    />
    
    {/* Liver Lobes Divider */}
    <path d="M60 40 Q55 55 60 75 Q65 85 60 95" stroke="rgba(139,90,43,0.3)" strokeWidth="3" fill="none"/>
    
    {/* Gallbladder */}
    <motion.ellipse
      cx="75" cy="70" rx="10" ry="15"
      fill="url(#gallGrad)"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Blood Vessels */}
    <path d="M40 50 Q50 60 45 75" stroke="#D4A84B" strokeWidth="2" fill="none"/>
    <path d="M80 50 Q70 60 75 75" stroke="#D4A84B" strokeWidth="2" fill="none"/>
    <path d="M60 55 L60 80" stroke="#D4A84B" strokeWidth="2"/>
    
    {/* Bile Flow Animation */}
    <motion.circle
      cx="75" cy="65"
      r="3"
      fill="#4CAF50"
      animate={{ cy: [60, 80, 60], opacity: [1, 0.3, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Texture Dots */}
    {[35, 50, 70, 85].map((x, i) => (
      <circle key={i} cx={x} cy={60 + (i % 2) * 15} r="2" fill="rgba(139,90,43,0.2)"/>
    ))}
    
    {/* Highlight */}
    <ellipse cx="45" cy="55" rx="15" ry="8" fill="rgba(255,255,255,0.2)"/>
  </svg>
)

const BrainScanIllustration = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6BCF7F"/>
        <stop offset="100%" stopColor="#4CAF50"/>
      </linearGradient>
    </defs>
    
    {/* Brain Outline */}
    <motion.path
      d="M60 15 Q30 15 20 40 Q10 60 20 80 Q30 100 60 105 Q90 100 100 80 Q110 60 100 40 Q90 15 60 15Z"
      fill="url(#brainGrad)"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 2.5, repeat: Infinity }}
      style={{ transformOrigin: '60px 60px' }}
    />
    
    {/* Brain Folds - Left */}
    <path d="M25 45 Q35 40 40 50 Q45 60 35 65" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
    <path d="M30 55 Q40 50 45 60 Q50 70 40 80" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
    <path d="M25 70 Q35 65 45 75 Q50 85 45 95" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
    
    {/* Brain Folds - Right */}
    <path d="M95 45 Q85 40 80 50 Q75 60 85 65" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
    <path d="M90 55 Q80 50 75 60 Q70 70 80 80" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
    <path d="M95 70 Q85 65 75 75 Q70 85 75 95" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
    
    {/* Center Line */}
    <path d="M60 20 Q55 40 60 60 Q65 80 60 100" stroke="rgba(34,139,34,0.5)" strokeWidth="3" fill="none"/>
    
    {/* Neural Activity Pulses */}
    {[
      { cx: 40, cy: 45 },
      { cx: 80, cy: 50 },
      { cx: 35, cy: 75 },
      { cx: 85, cy: 70 },
      { cx: 60, cy: 55 }
    ].map((pos, i) => (
      <motion.circle
        key={i}
        cx={pos.cx}
        cy={pos.cy}
        r="5"
        fill="#FFD700"
        animate={{
          r: [3, 8, 3],
          opacity: [1, 0.3, 1]
        }}
        transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
      />
    ))}
    
    {/* Connection Lines */}
    <motion.path
      d="M40 45 L60 55 L80 50"
      stroke="#FFD700"
      strokeWidth="2"
      fill="none"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path
      d="M35 75 L60 55 L85 70"
      stroke="#FFD700"
      strokeWidth="2"
      fill="none"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
    />
  </svg>
)

const PETScanIllustration = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="petGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#B4A7D6"/>
        <stop offset="100%" stopColor="#9575CD"/>
      </linearGradient>
      <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#FFD700" stopOpacity="0"/>
      </radialGradient>
    </defs>
    
    {/* Scanner Ring - Outer */}
    <motion.circle
      cx="60" cy="60" r="50"
      stroke="url(#petGrad)"
      strokeWidth="8"
      fill="none"
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: '60px 60px' }}
    />
    
    {/* Scanner Ring - Inner */}
    <motion.circle
      cx="60" cy="60" r="38"
      stroke="#9575CD"
      strokeWidth="4"
      fill="none"
      strokeDasharray="20 10"
      animate={{ rotate: -360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: '60px 60px' }}
    />
    
    {/* Body Silhouette */}
    <ellipse cx="60" cy="60" rx="18" ry="30" fill="#E8E0F0"/>
    <circle cx="60" cy="38" r="10" fill="#E8E0F0"/>
    
    {/* PET Activity Hotspots */}
    <motion.circle
      cx="60" cy="50" r="8"
      fill="url(#glowGrad)"
      animate={{ r: [6, 10, 6], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <motion.circle
      cx="55" cy="65" r="5"
      fill="url(#glowGrad)"
      animate={{ r: [4, 7, 4], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.8, delay: 0.3, repeat: Infinity }}
    />
    <motion.circle
      cx="68" cy="70" r="4"
      fill="url(#glowGrad)"
      animate={{ r: [3, 6, 3], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 1.6, delay: 0.6, repeat: Infinity }}
    />
    
    {/* Scanner Detectors */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <motion.rect
        key={i}
        x="57"
        y="5"
        width="6"
        height="10"
        rx="2"
        fill="#7E57C2"
        style={{
          transformOrigin: '60px 60px',
          transform: `rotate(${angle}deg)`
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
      />
    ))}
    
    {/* Radiation Symbol */}
    <motion.g
      animate={{ rotate: 360, opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: '60px 60px' }}
    >
      <circle cx="60" cy="60" r="5" fill="#7E57C2"/>
      {[0, 120, 240].map((angle, i) => (
        <path
          key={i}
          d="M60 55 L55 45 A15 15 0 0 1 65 45 Z"
          fill="#7E57C2"
          style={{
            transformOrigin: '60px 60px',
            transform: `rotate(${angle}deg)`
          }}
        />
      ))}
    </motion.g>
  </svg>
)

// Scans Section Component
const ScansSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const scans = [
    {
      title: 'اسکن قلب',
      description: 'بررسی دقیق جریان خون و عملکرد قلب',
      illustration: <HeartScanIllustration />,
      color: '#FF6B6B',
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #EE5A5A 100%)'
    },
    {
      title: 'اسکن استخوان',
      description: 'تشخیص بیماری‌های استخوانی و مفاصل',
      illustration: <BoneScanIllustration />,
      color: '#4ECDC4',
      gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)'
    },
    {
      title: 'اسکن کلیه',
      description: 'ارزیابی عملکرد و سلامت کلیه‌ها',
      illustration: <KidneyScanIllustration />,
      color: '#95E1D3',
      gradient: 'linear-gradient(135deg, #95E1D3 0%, #68C9BA 100%)'
    },
    {
      title: 'اسکن تیروئید',
      description: 'بررسی غده تیروئید و متابولیسم بدن',
      illustration: <ThyroidScanIllustration />,
      color: '#F38181',
      gradient: 'linear-gradient(135deg, #F38181 0%, #E86F6F 100%)'
    },
    {
      title: 'اسکن ریه',
      description: 'بررسی پرفیوژن و عملکرد ریه‌ها',
      illustration: <LungScanIllustration />,
      color: '#A8E6CF',
      gradient: 'linear-gradient(135deg, #A8E6CF 0%, #7BD4B5 100%)'
    },
    {
      title: 'اسکن کبد',
      description: 'تشخیص بیماری‌های کبدی و صفراوی',
      illustration: <LiverScanIllustration />,
      color: '#FFD93D',
      gradient: 'linear-gradient(135deg, #FFD93D 0%, #E8C534 100%)'
    },
    {
      title: 'اسکن مغز',
      description: 'بررسی جریان خون مغزی و عملکرد نورولوژیک',
      illustration: <BrainScanIllustration />,
      color: '#6BCF7F',
      gradient: 'linear-gradient(135deg, #6BCF7F 0%, #4CAF50 100%)'
    },
    {
      title: 'پت اسکن',
      description: 'تشخیص زودهنگام سرطان و متاستاز',
      illustration: <PETScanIllustration />,
      color: '#B4A7D6',
      gradient: 'linear-gradient(135deg, #B4A7D6 0%, #9575CD 100%)'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <Box
      sx={{
        py: 12,
        background: 'linear-gradient(180deg, #fff 0%, #F0F9FF 50%, #E3F2FD 100%)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background Decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52, 168, 83, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(25, 118, 210, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          sx={{ textAlign: 'center', mb: 8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 3,
                py: 1,
                mb: 3,
                background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(52, 168, 83, 0.1) 100%)',
                borderRadius: '50px',
                border: '1px solid rgba(25, 118, 210, 0.2)'
              }}
            >
              <Box
                component="span"
                sx={{ fontSize: '1.2rem' }}
              >
                🔬
              </Box>
              <Typography
                sx={{
                  color: '#1976D2',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}
              >
                خدمات تصویربرداری پزشکی
              </Typography>
            </Box>
          </motion.div>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '3rem' },
              background: 'linear-gradient(135deg, #0B6E4F 0%, #1976D2 50%, #0B6E4F 100%)',
              backgroundSize: '200% auto',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            انواع اسکن‌ها
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: '#666',
              fontWeight: 400,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.8
            }}
          >
            تشخیص دقیق با جدیدترین تکنولوژی پزشکی هسته‌ای
          </Typography>
        </MotionBox>

        {/* Scans Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Grid container spacing={3}>
            {scans.map((scan, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={cardVariants}>
                  <MotionCard
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    whileHover={{
                      y: -15,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    sx={{
                      height: '100%',
                      minHeight: 320,
                      borderRadius: 4,
                      overflow: 'hidden',
                      background: '#fff',
                      border: '2px solid',
                      borderColor: hoveredIndex === index ? scan.color : 'transparent',
                      cursor: 'pointer',
                      position: 'relative',
                      boxShadow: hoveredIndex === index
                        ? `0 20px 40px ${scan.color}30`
                        : '0 4px 20px rgba(0,0,0,0.06)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: scan.gradient,
                        transform: hoveredIndex === index ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.4s ease'
                      }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      {/* Illustration Container */}
                      <Box
                        sx={{
                          width: 120,
                          height: 120,
                          margin: '0 auto 20px',
                          position: 'relative',
                          transition: 'transform 0.4s ease',
                          transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)'
                        }}
                      >
                        {/* Glow Effect */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80%',
                            height: '80%',
                            borderRadius: '50%',
                            background: scan.gradient,
                            filter: 'blur(25px)',
                            opacity: hoveredIndex === index ? 0.4 : 0.15,
                            transition: 'opacity 0.4s ease'
                          }}
                        />
                        {/* SVG Illustration */}
                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                          {scan.illustration}
                        </Box>
                      </Box>

                      {/* Title */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: hoveredIndex === index ? scan.color : '#1a1a2e',
                          mb: 1.5,
                          transition: 'color 0.3s ease'
                        }}
                      >
                        {scan.title}
                      </Typography>

                      {/* Decorative Line */}
                      <Box
                        sx={{
                          width: hoveredIndex === index ? 50 : 30,
                          height: 3,
                          background: scan.gradient,
                          borderRadius: 2,
                          mx: 'auto',
                          mb: 2,
                          transition: 'width 0.3s ease'
                        }}
                      />

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          lineHeight: 1.7,
                          mb: 2,
                          flex: 1
                        }}
                      >
                        {scan.description}
                      </Typography>

                      {/* CTA Chip */}
                      <Chip
                        label="اطلاعات بیشتر"
                        sx={{
                          background: hoveredIndex === index ? scan.gradient : `${scan.color}15`,
                          color: hoveredIndex === index ? '#fff' : scan.color,
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          px: 1,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: scan.gradient,
                            color: '#fff'
                          }
                        }}
                      />
                    </CardContent>

                    {/* Corner Decoration */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: -20,
                        right: -20,
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: `${scan.color}10`,
                        transition: 'all 0.4s ease',
                        ...(hoveredIndex === index && {
                          transform: 'scale(2.5)',
                          background: `${scan.color}15`
                        })
                      }}
                    />
                  </MotionCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* View All Button */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          sx={{ textAlign: 'center', mt: 8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(135deg, #34A853 0%, #1976D2 100%)',
                color: '#fff',
                px: 6,
                py: 1.8,
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 700,
                boxShadow: '0 8px 25px rgba(52, 168, 83, 0.35)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 12px 35px rgba(52, 168, 83, 0.45)'
                }
              }}
            >
              مشاهده تمام خدمات
            </Button>
          </motion.div>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default ScansSection