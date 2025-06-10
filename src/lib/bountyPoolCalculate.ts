import { BountiesPollPrizeDistribution } from '../data/data';

interface PrizeDistribution {
  percentage: number;
  amount: string;
  [key: string]: any;
}

export function calculatePrizes(totalPrize: number): PrizeDistribution[] {
  return BountiesPollPrizeDistribution.map((entry) => {
    const amount = (totalPrize * entry.percentage) / 100;
    return {
      ...entry,
      amount: amount.toFixed(0),
    };
  });
} 