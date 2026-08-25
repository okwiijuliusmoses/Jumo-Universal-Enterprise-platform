import { JUMOSixProductCompletenessValidator } from "./JUMOSixProductCompletenessValidator";

export function validateSixProducts(): boolean {
  const report = JUMOSixProductCompletenessValidator.validateAll();
  return report.status === "COMPLETE_AND_VERIFIED";
}

export default validateSixProducts;
