import moment from 'moment';

export function TimeLeft({ date, title }) {
  const now = moment();
  const end = moment(date);

  const diffInMinutes = end.diff(now, 'minutes');
  const diffInHours = end.diff(now, 'hours', true);
  const diffInDays = end.diff(now, 'days', true);

  if (diffInMinutes <= 0) {
    return <div>Closed</div>;
  }

  let display = 'Closed';

  if (diffInDays >= 1) {
    display = `${diffInDays.toFixed(0)} ${title && 'Day(s) left'}`;
  } else if (diffInHours >= 1) {
    display = `${diffInHours.toFixed(0)} ${title && 'Hour(s) left'}`;
  } else {
    display = `${diffInMinutes}  ${title && 'Minute(s) left'}`;
  }

  return <div>{display}</div>;
}
