import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { enGB } from 'date-fns/locale';
import css from './Calendar.module.css';

const Calendar = ({ selectedDate, onChange }) => {
  return (
    <DatePicker
      className={css.reactDatepicker}
      calendarClassName={css.reactDatepicker}
      selected={selectedDate}
      onChange={onChange}
      dateFormat="yyyy-MM-dd"
      minDate={new Date()}
      locale={enGB}
      weekStartsOn={1}
    />
  );
};

export default Calendar;
