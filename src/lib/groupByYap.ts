interface Bounty {
  id: string;
  bountyName: string;
  prize: number;
  bountyType: string;
  yaps: number;
  status: string;
  endDate: string;
  metadata: any;
  [key: string]: any;
}

interface GroupedBounties {
  greaterThen: Bounty[];
  lessThan: Bounty[];
}

interface GroupByYapParams {
  bounties: Bounty[];
  threshold: number;
}

export default function groupByYap({ bounties, threshold }: GroupByYapParams): GroupedBounties {
  return bounties.reduce(
    (acc: GroupedBounties, bounty: Bounty) => {
      if (bounty?.yaps <= threshold) {
        acc.greaterThen.push(bounty);
      } else {
        acc.lessThan.push(bounty);
      }

      return acc;
    },
    {
      greaterThen: [],
      lessThan: [],
    }
  );
} 