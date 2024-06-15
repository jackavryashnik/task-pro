import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { enGB } from 'date-fns/locale';
import css from './Calendar.module.css';

const Calendar = ({ selectedDate, onDateChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      dateFormat="YYYY-MM-DD"
      minDate={new Date()}
      locale={enGB}
      weekStartsOn={1}
      className={css.reactDatepicker}
      calendarClassName={css.reactDatepicker}
    />
  );
};

export default Calendar;
