
const staticCommands = [
  // Relay Control
  'RELAY_1_ON', 'RELAY_1_OFF', 'RELAY_1_TEST', 'RELAY_2_ON', 'RELAY_2_OFF', 'RELAY_2_TEST',
  'RELAY_3_ON', 'RELAY_3_OFF', 'RELAY_3_TEST', 'RELAY_4_ON', 'RELAY_4_OFF', 'RELAY_4_TEST',
  'RELAY_5_ON', 'RELAY_5_OFF', 'RELAY_5_TEST', 'RELAY_6_ON', 'RELAY_6_OFF', 'RELAY_6_TEST',
  'RELAY_7_ON', 'RELAY_7_OFF', 'RELAY_7_TEST', 'RELAY_8_ON', 'RELAY_8_OFF', 'RELAY_8_TEST',
  // Emergency & Global
  'STOP_ALL', 'ALL_ON', 'ALL_OFF', 'EMERGENCY_STOP',
  // Fire Effects
  'FIRE_ON', 'FIRE_OFF', 'FIRE_BURST', 'FIRE_LOW', 'FIRE_HIGH',
  // Fog/Atmosphere
  'FOG_ON', 'FOG_OFF', 'FOG_BURST', 'FOG_LOW', 'HAZE', 'SMOKE_ON', 'SMOKE_OFF', 'SMOKE_BURST', 'SMOKE_BILLOW',
  // Lightning/Electrical
  'LIGHTNING_ON', 'LIGHTNING_OFF', 'LIGHTNING_FLASH', 'LIGHTNING_SEQUENCE',
  // Strobe/Lighting
  'STROBE_ON', 'STROBE_OFF', 'STROBE_FLASH', 'STROBE_FAST', 'STROBE_SLOW', 'STROBE', 'FLICKER', 'GLOW', 'PULSE', 'HELLFIRE',
  // Laser
  'LASER_ON', 'LASER_OFF', 'LASER_PATTERN',
  // Pyrotechnic
  'PYRO_ON', 'PYRO_OFF', 'PYRO_SEQUENCE', 'PYRO_FIRE',
  // Wind/Mechanical
  'WIND_ON', 'WIND_OFF', 'WIND_BURST', 'WIND', 'AIR_BLAST', 'VIBRATION', 'DROP_PANEL',
  // Audio
  'THUNDER', 'SCREAM', 'CRASH', 'WHISPER',
  // Test
  'TEST_FIRE', 'TEST_FOG', 'TEST_LIGHTNING', 'TEST_STROBE', 'TEST_LASER', 'TEST_SMOKE', 'TEST_PYRO', 'TEST_WIND',
  // System
  'STATUS', 'RESET', 'CUSTOM_COMMAND',
];

export const isValidCommand = (command: string): boolean => {
  if (staticCommands.includes(command)) return true;

  const parts = command.split(':');
  if (parts.length !== 2) return false;

  const [prefix, valueStr] = parts;
  
  if (prefix === 'TRIGGER') {
    return /^[A-Z_]+$/.test(valueStr);
  }
  
  const value = parseInt(valueStr, 10);
  if (isNaN(value)) {
    return false;
  }

  switch (prefix) {
    case 'FIRE':
    case 'FOG':
    case 'LIGHTNING':
    case 'Neopixels':
      return value >= 0 && value <= 255;
    case 'AUDIO_VOLUME':
      return value >= 0 && value <= 30;
    case 'PLAY_AUDIO':
      return value >= 0;
    default:
      return false;
  }
};
