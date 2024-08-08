export const EmailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const PasswordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
export const UserIdRegExp = /^[a-f\d]{24}$/i;
export const DateRegExp = /^\d\d\d\d-\d\d-\d\d$/i;
export const TimeRegExp = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
export const ReservationDateRegExp = /[0-9]+-(0?[1-9]|[1][0-2])-[0-9]+/i;
