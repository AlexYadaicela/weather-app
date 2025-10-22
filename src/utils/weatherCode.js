export const weatherCode = (code) => {
  switch (code) {
    case 0:
      console.log("i was here");
      return "iconSunny.webp";
    case 2:
      return "iconPartlyCloudy.webp";
    case 3:
      return "iconOvercast.webp";
    case 45:
    case 48:
      return "iconFog.webp";
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return "iconDrizzle.webp";
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return "iconRain.webp";
    case 71:
    case 73:
    case 75:
    case 77:
      return "iconSnow.webp";
    case 80:
    case 81:
    case 82:
    case 85:
    case 86:
      return "iconRain.webp";
    case 95:
    case 96:
    case 99:
      return "iconStorm.webp";
    default:
      return "iconSunny.webp";
  }
};
