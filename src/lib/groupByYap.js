export default function groupByYap({ bounties, threshold }) {
    console.log(bounties, 'bounties');
    
  return bounties.reduce(
    (acc, bounty) => {
      const prize = parseFloat(bounty.prize);

      if (prize >= threshold) {
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
