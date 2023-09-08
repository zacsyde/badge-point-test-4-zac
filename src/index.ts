import { User } from './types/user.interface';
import { Icon } from './types/icon.enum';

export const getUsersBadge = ( user: User ): Icon | null => {
  let badge = null;
  switch ( true ) {
    case ( user.solutionCount >= 5 && user.solutionCount < 25 ):
      badge = Icon.BADGE_BRONZE;
      break;
    case ( user.solutionCount >= 25 && user.solutionCount < 50 ):
      badge = Icon.BADGE_SILVER;
      break;
    case ( user.solutionCount >= 50 ):
      badge = Icon.BADGE_GOLD;
      break;
  }
  return badge;
};

function calculateUsersStatistics() {
  // todo
}

calculateUsersStatistics();
