import moment from 'moment';

export function deadlineCounter({ date }) {
  const now = moment();
  const end = moment(date);
  const duration = moment.duration(end.diff(now));

  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();

  return (
    <>
      <li className="flex flex-col justify-center items-center h-full max-w-147px w-full">
        <span className="text-20 lg:text-24 leading-loose">{days}</span>
        <small className="text-black/45">Day</small>
      </li>
      <li className="flex flex-col justify-center items-center h-full max-w-147px w-full">
        <span className="text-20 lg:text-24 leading-loose">{hours}</span>
        <small className="text-black/45">Hours</small>
      </li>
      <li className="flex flex-col justify-center items-center h-full max-w-147px w-full">
        <span className="text-20 lg:text-24 leading-loose">{minutes}</span>
        <small className="text-black/45">Minutes</small>
      </li>
    </>
  );
}
