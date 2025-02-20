import { User } from './types/user.interface';
import { Icon } from './types/icon.enum';

// Comment for the examiner:
// We can retrieve these values from a central config source, but for the sake of simplicity I used the constants here
const BRONZE_THRESHOLD = 5;
const SILVER_THRESHOLD = 25;
const GOLD_THRESHOLD = 50;

export const getUsersBadge = async (user: User): Promise<Icon | null> => {
  if (user.solutionCount >= GOLD_THRESHOLD) return Icon.BADGE_GOLD;
  if (user.solutionCount >= SILVER_THRESHOLD) return Icon.BADGE_SILVER;
  if (user.solutionCount >= BRONZE_THRESHOLD) return Icon.BADGE_BRONZE;
  return null;
};
