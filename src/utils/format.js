import moment from "moment";
import 'moment/locale/id';

export const formatDate = (date) => moment(date).format("dddd, DD MMMM YYYY HH:mm")

export const formatNumber = (number = 0) => 'Rp ' + number.toLocaleString('id', { style: 'decimal' })