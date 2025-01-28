export const isMobileDevice = () => {
  const agent = navigator.userAgent || navigator.vendor || window.opera;
  const isMobile = /android|iphone|ipad|ipod|blackberry|windows phone|webos|opera mini|iemobile/i.test(agent);
  const isSmallScreen = window.innerWidth <= 768; // Umbral para pantallas pequeñas
  return isMobile || isSmallScreen;
}
