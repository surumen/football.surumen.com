import React, {createRef, forwardRef, useEffect, useRef, useMemo} from 'react';
import {
    addDays,
    addMonths,
    eachDayOfInterval,
    eachMonthOfInterval,
    format,
    isSameMonth,
    lastDayOfMonth,
    startOfDay,
} from 'date-fns';
import {curry2} from 'ts-curry';

// import bootstrap icons
import {ChevronLeft, ChevronRight} from 'react-bootstrap-icons';


export type DatepickerEvent = [Date | null, Date | null, Date | null];
export type DatepickerProps = {
    selectedDate: Date | null;
    startDate: Date;
    endDate: Date;
    offSetX?: number;
    onSelect: (d: DatepickerEvent) => void;
    onChangeStart: (d: DatepickerEvent) => void;
    onChangeEnd: (d: DatepickerEvent) => void;
    locale: Locale;
};

const getTime = (d: Date) => startOfDay(d).getTime();
const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);
const isEqualDate = curry2((d1: Date, d2: Date) => getTime(d1) === getTime(d2));
const eachDay = (start: Date, end: Date) => eachDayOfInterval({ start, end });
const eachMonth = (start: Date, end: Date) => eachMonthOfInterval({ start, end });


export const Datepicker = forwardRef<HTMLDivElement, DatepickerProps>(
    ({
         selectedDate,
         locale,
         startDate,
         endDate,
         offSetX,
         onSelect,
         onChangeStart,
         onChangeEnd
     },ref) => {
        const DATES = useMemo(() => {
            const months = eachMonth(startDate, endDate);

            return months.map((month, idx) => {
                const last =
                    endDate && isSameMonth(month, endDate) ? endDate ? endDate : month : lastDayOfMonth(month);
                const startDay = !idx ? startDate : month;
                const days = eachDay(startOfDay(startDay), startOfDay(last));

                return {
                    month,
                    days,
                };
            });
        }, [startDate, endDate]);

        const containerRef = useRef<HTMLDivElement | null>(null);
        useEffect(() => {
            if (containerRef.current) {
                containerRef.current.scrollBy({
                    left: +(offSetX ? offSetX : 0),
                    behavior: 'smooth',
                });
            }
        }, [offSetX]);

        const nextScroll = () => {
            if (containerRef.current) {
                containerRef.current.scrollBy({
                    left: +500,
                    behavior: 'smooth',
                });
                onChangeEnd([null, null, addDays(endDate, 12)])
            }
        };

        const prevScroll = () => {
            if (containerRef.current) {
                containerRef.current.scrollBy({
                    left: -500,
                    behavior: 'smooth',
                });
                onChangeStart([null, addDays(startDate, -12), null])
            }
        };

        const onDateClick = (selectedDate: Date) => {
            onSelect([selectedDate, null, null]);
        };

        const isToday = (d: Date) => {
            return  isEqualDate(new Date(), d);
        }

        const isYesterday = (d: Date) => {
            return isEqualDate(addDays(new Date(), -1), d);
        }

        const isTomorrow = (d: Date) => {
            return isEqualDate(addDays(new Date(), 1), d);
        }

        return (
            <div ref={ref} className='overflow-hidden row g-3'>
                <div className='col-md-1 align-items-end justify-content-start d-flex'>
                    <button onClick={prevScroll} className='btn btn-sm btn-square btn-neutral rounded'>
                        <ChevronLeft size={12} />
                    </button>
                </div>
                <div className='col-md-10'>
                    <div ref={containerRef} className='d-flex justify-content-between align-items-center scrollable-x gap-3'>
                        {DATES.map(({ month, days }, idx) => {
                            const _month = format(month, 'LLLL', { locale });
                            const _monthCapitalizeFirstLetter = capitalizeFirstLetter(_month);

                            return (
                                <div key={_month + idx} className='row gap-3'>
                                    <h5>{_monthCapitalizeFirstLetter}</h5>
                                    <div className='d-flex flex-nowrap gap-2'>
                                        {days.map((d, idx) => {
                                            const dayLabel = format(d, 'EEEEEE', { locale });
                                            const dateLabel = format(d, 'dd', { locale });
                                            const isDaySelected = selectedDate && isEqualDate(selectedDate, d);

                                            const label = isToday(d) ? 'Today' : isYesterday(d) ? 'Yesterday' : isTomorrow(d) ? 'Tomorrow' : `${dateLabel} ${dayLabel}`
                                            return (
                                                <div
                                                    data-testid='DAY_ITEM'
                                                    key={dayLabel + idx + _month}
                                                    className='flex-none'
                                                    onClick={() => onDateClick(d)}
                                                >
                                                    <button className={`btn btn-sm border w-rem-24 ${isDaySelected ? 'btn-primary' : 'btn-dark'}`}>
                                                        {label}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='col-md-1 align-items-end justify-content-end d-flex'>
                    <button onClick={nextScroll} className='btn btn-sm btn-square btn-neutral rounded'>
                        <ChevronRight size={12} />
                    </button>
                </div>
            </div>
        );
    },
);

Datepicker.displayName = 'Datepicker';
