import { Colors, Config } from "./enums";

export const evaluateColor = (total: number): string => {
  if (total < 0) return Colors.Red;
  if (total < Config.Threshold) return Colors.Yellow;
  return Colors.Green;
};
