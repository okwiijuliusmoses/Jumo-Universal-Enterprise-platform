import JUMOLogo from "./JUMOLogo";
import jumoLogo from "./JUMO NEW LOGO.png";

export const JUMO_BRAND = {
  logo: jumoLogo,
  Logo: JUMOLogo,
  name: "JUMO",
  systemName: "JUMO UEOS",
  platformName: "Universal Enterprise Platform",
} as const;

export { JUMOLogo };

export default JUMO_BRAND;
