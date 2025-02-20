import {User} from './types/user.interface.js';
import {Icon} from './types/icon.enum.js';
import {getAllUser} from './user-store.js';
import {emulateLongProcess} from "./emulate-long-process.js";

// Comment for the examiner:
// We can retrieve these values from a central config source, but for the sake of simplicity I used the constants here
const BAD_ASS_THRESHOLD = 0;
const STARTER_THRESHOLD = 1;
const BRONZE_THRESHOLD = 5;
const SILVER_THRESHOLD = 25;
const GOLD_THRESHOLD = 50;
const PLATINUM_THRESHOLD = 100;
const GOD_LIKE_THRESHOLD = 2000;

const MAX_RETRY_TIME = 2000; // 2 seconds
const RETRY_INTERVAL = 100; // 0.1 seconds

// Comment for the examiner:
// This function encapulates the emulateLongProcess() and keeps trying with it for a certain time, and if still not successfull, it throws an Error
// to abort the whole execution, because the statitic calcuations will be wrong if we just ignore the error and continue
async function performeLongProcess(): Promise<void> {
    const startTime = Date.now();
    while (Date.now() - startTime < MAX_RETRY_TIME) {
        try {
            return await emulateLongProcess();
        } catch (error) {
            console.error("emulateLongProcess failed, retrying...", error);
            await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
        }
    }
    throw new Error("emulateLongProcess() failed after multiple attempts. Aborting execution.");
}

export const getUsersBadge = async (user: User): Promise<Icon | null> => {

    await performeLongProcess();

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
    try {
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
        let topUsers: { user: User; badge: Icon | null }[] = [];

        const userBadgePromises = users.map(async (user) => {
            const badge = await getUsersBadge(user);

            if (badge) {
                badgeCounts.set(badge, (badgeCounts.get(badge) || 0) + 1);
            }

            totalSolutionCount += user.solutionCount;
            topUsers.push({ user, badge });
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
    } catch (error) {
        console.error("Statistics calculation aborted due to a critical error:", error);
    }
}

calculateUsersStatistics();
