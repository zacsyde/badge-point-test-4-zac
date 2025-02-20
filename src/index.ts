import { User } from './types/user.interface';
import { Icon } from './types/icon.enum';

// Comment for the examiner:
// We can retrieve these values from a central config source, but for the sake of simplicity I used the constants here
const BAD_ASS_THRESHOLD = 0;
const STARTER_THRESHOLD = 1;
const BRONZE_THRESHOLD = 5;
const SILVER_THRESHOLD = 25;
const GOLD_THRESHOLD = 50;
const PLATINUM_THRESHOLD = 100;
const GOD_LIKE_THRESHOLD = 2000;

export const getUsersBadge = async (user: User): Promise<Icon | null> => {
  if (user.solutionCount >= GOD_LIKE_THRESHOLD) return Icon.BADGE_GODLIKE;
  if (user.solutionCount >= PLATINUM_THRESHOLD) return Icon.BADGE_PLATINUM;
  if (user.solutionCount >= GOLD_THRESHOLD) return Icon.BADGE_GOLD;
  if (user.solutionCount >= SILVER_THRESHOLD) return Icon.BADGE_SILVER;
  if (user.solutionCount >= BRONZE_THRESHOLD) return Icon.BADGE_BRONZE;
  if (user.solutionCount >= STARTER_THRESHOLD) return Icon.BADGE_STARTER;
  if (user.solutionCount < BAD_ASS_THRESHOLD) return Icon.BADGE_BADASS;
  return null;
};
