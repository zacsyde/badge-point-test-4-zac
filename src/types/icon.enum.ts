export enum Icon {
  BADGE_BADASS = 'badge_badass',
  BADGE_STARTER = 'badge_starter',
  BADGE_BRONZE = 'badge_bronze',
  BADGE_SILVER = 'badge_silver',
  BADGE_GOLD = 'badge_gold',
  BADGE_PLATINUM = 'badge_platinum',
  BADGE_GODLIKE = 'badge_godlike',
}

export type IconType = Icon | null;
export const DEFAULT_ICON: IconType = null;
