import format from 'date-fns/format';

const formatDate = (date: Date): string =>
  format(new Date(date.toString()), 'dd/MM/yy');

export default formatDate;
