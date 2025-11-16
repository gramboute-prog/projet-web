// src/utils/flags.ts
export const getTeamFlag = (teamCode: string): string => {
  return `/flags/${teamCode.toLowerCase()}.png`;
};

// Fallback si le drapeau n'existe pas
export const getFlagWithFallback = (teamCode: string): string => {
  const flagPath = `/flags/${teamCode.toLowerCase()}.png`;
  
  return flagPath;
};