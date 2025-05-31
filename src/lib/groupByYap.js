export default function groupByYap({ bounties, threshold }) {
  return bounties.reduce(
    (acc, bounty) => {
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
