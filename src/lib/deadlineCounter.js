import moment from 'moment';
import { cn } from './utils';

export function deadlineCounter({ date }) {
  const now = moment();
  const end = moment(date);
  const duration = moment.duration(end.diff(now));

  const isExpired = duration.asSeconds() <= 0;

  const days = isExpired ? '00' : String(Math.floor(duration.asDays())).padStart(2, '0');
  const hours = isExpired ? '00' : String(duration.hours()).padStart(2, '0');
  const minutes = isExpired ? '00' : String(duration.minutes()).padStart(2, '0');

  return (
    <ul className=" m-0 grid grid-cols-3 text-center border border-solid border-black p-6 rounded-2xl max-w-554px w-full">
      <li className={`flex flex-col justify-center items-center h-full max-w-147px w-full`}>
        <span
          className={cn(
            'text-20 lg:text-24 leading-loose',
            isExpired ? 'text-dark-orange-bg' : 'text-black'
          )}
        >
          {days}
        </span>

        <small className="text-black/45">Day</small>
      </li>
      <li className={`flex flex-col justify-center items-center h-full max-w-147px w-full`}>
        <span
          className={cn(
            'text-20 lg:text-24 leading-loose',
            isExpired ? 'text-dark-orange-bg' : 'text-black'
          )}
        >
          {hours}
        </span>
        <small className="text-black/45">Hours</small>
      </li>
      <li className={`flex flex-col justify-center items-center h-full max-w-147px w-full`}>
        <span
          className={cn(
            'text-20 lg:text-24 leading-loose',
            isExpired ? 'text-dark-orange-bg' : 'text-black'
          )}
        >
          {minutes}
        </span>
        <small className="text-black/45">Minutes</small>
      </li>
    </ul>
  );
}
