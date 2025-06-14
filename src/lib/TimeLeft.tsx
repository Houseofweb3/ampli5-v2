import moment from 'moment';
import React from 'react';

interface TimeLeftProps {
  date: string | Date;
  title?: boolean;
}

export function TimeLeft({ date, title }: TimeLeftProps): React.ReactElement {
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
    display = `${diffInDays.toFixed(0)} ${title ? 'Day' : ''}`;
  } else if (diffInHours >= 1) {
    display = `${diffInHours.toFixed(0)} ${title ? 'Hour' : ''}`;
  } else {
    display = `${diffInMinutes} ${title ? 'Minute' : ''}`;
  }

  return <div>{display}</div>;
} 