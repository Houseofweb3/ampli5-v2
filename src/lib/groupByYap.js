export default function groupByYap({ bounties, threshold = 2500 }) {
  return bounties.reduce(
    (acc, bounty) => {
      const prize = parseFloat(bounty.prize);

      if (prize >= threshold*100) {
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
