import {User} from './types/user.interface';
import {Icon} from './types/icon.enum';
import {getAllUser} from './user-store';
import {emulateLongProcess} from "./emulate-long-process";

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

    // Comment for the examiner:
    // Adding the slowing factor will make fetching the badge for each user much slower, which will increase the execution time dramatically because we were calling the users sequentially.
    await emulateLongProcess();

    if (user.solutionCount >= GOD_LIKE_THRESHOLD) return Icon.BADGE_GODLIKE;
    if (user.solutionCount >= PLATINUM_THRESHOLD) return Icon.BADGE_PLATINUM;
    if (user.solutionCount >= GOLD_THRESHOLD) return Icon.BADGE_GOLD;
    if (user.solutionCount >= SILVER_THRESHOLD) return Icon.BADGE_SILVER;
    if (user.solutionCount >= BRONZE_THRESHOLD) return Icon.BADGE_BRONZE;
    if (user.solutionCount >= STARTER_THRESHOLD) return Icon.BADGE_STARTER;
    if (user.solutionCount < BAD_ASS_THRESHOLD) return Icon.BADGE_BADASS;
    return null;
};

async function calculateUsersStatistics() {
    const users = await getAllUser();

    const badgeCounts = new Map<Icon, number>([
        [Icon.BADGE_BADASS, 0],
        [Icon.BADGE_STARTER, 0],
        [Icon.BADGE_BRONZE, 0],
        [Icon.BADGE_SILVER, 0],
        [Icon.BADGE_GOLD, 0],
        [Icon.BADGE_PLATINUM, 0],
        [Icon.BADGE_GODLIKE, 0]
    ]);

    let totalSolutionCount = 0;
    let topUsers = [];

    const userBadgePromises = users.map(async (user) => {
        for (const user of users) {
            const badge = await getUsersBadge(user);

            if (badge) {
                badgeCounts.set(badge, (badgeCounts.get(badge) || 0) + 1);
            }

            totalSolutionCount += user.solutionCount;
            topUsers.push({user, badge});
        }
    });
    // Comment for the examiner:
    // Without Promise.all(), if you have X users and each badge calculation takes around 2 seconds for example, resulting in 2 * X seconds of execution time
    // With Promise.all(), the badge calculations for all users happen in parallel, reducing the execution time drastically, to a maximum of around 2 seconds
    await Promise.all(userBadgePromises);

    const totalNumberOfUsers = users.length;
    const averageSolutionCount = totalSolutionCount / totalNumberOfUsers;

    const fiveTopUsers = topUsers.sort((a, b) => b.user.solutionCount - a.user.solutionCount).slice(0, 5);

    let mostGivenBadge = {badge: Icon.BADGE_BADASS, count: 0};

    for (const [badge, count] of badgeCounts) {
        if (count > mostGivenBadge.count) {
            mostGivenBadge = {badge, count};
        }
    }

    console.log(`Total number of users is: ${totalNumberOfUsers}`);
    console.log(`Average solution count is: ${averageSolutionCount}`);
    console.log('Top 5 users by solution count are:');
    fiveTopUsers.forEach((entry, index) => {
        console.log(`${index + 1}. ${entry.user.username} with ${entry.user.solutionCount} solutions and Badge: ${entry.badge || 'None'}`);
    });
    console.log(`Most awarded badge: ${mostGivenBadge.badge} with ${mostGivenBadge.count} awards`);
}

calculateUsersStatistics();
