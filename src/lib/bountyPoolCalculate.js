import { BountiesPollPrizeDistribution } from '@/data/data';

export function calculatePrizes(totalPrize) {
  return BountiesPollPrizeDistribution.map((entry) => {
    const amount = (totalPrize * entry.percentage) / 100;
    return {
      ...entry,
      amount: amount.toFixed(0),
    };
  });
}
