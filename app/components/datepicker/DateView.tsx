import React, {useEffect, useState, Fragment } from 'react';
import {
    addDays,
    addMonths,
    differenceInMonths,
    format,
    isSameDay,
    lastDayOfMonth,
    startOfMonth
} from 'date-fns';

// Define component props
type DateViewProps = {
    startDate: Date;
    lastDate: Date;
    selectDate: Date;
    getSelectedDay: any;
    primaryColor: any;
    labelFormat: any;
    marked: any;
}


const DateView: React.FC<DateViewProps> = ({startDate, lastDate, selectDate, getSelectedDay, primaryColor, labelFormat, marked}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const firstSection = {marginLeft: '40px'};
    const selectedStyle = {fontWeight:'bold',width:'45px',height:'45px',borderRadius:'50%',border:`2px solid ${primaryColor}`,color:primaryColor};
    const labelColor = {color: primaryColor};
    const markedStyle = {color: '#8c3737', padding: '2px', fontSize: 12};

    const getStyles = (day: Date) => {
        return isSameDay(day, selectedDate) ? selectedStyle :null;
    };

    const getId = (day: Date) => {
        return isSameDay(day, selectedDate) ? 'selected' : '';
    };

    const getMarked = (day: Date | number) => {
        let markedRes = marked?.find((i: any) => isSameDay(i.date, day));
        if (markedRes) {
            if (!markedRes?.marked) {
                return;
            }

            return (
                <div>
                    {markedRes.text}
                </div>
            );
        }
        return '';
    };

    const renderDays = () => {
        const dayFormat = 'E';
        const dateFormat = 'd';

        const months = [];
        let days = [];


        for (let i = 0; i <= differenceInMonths(lastDate, startDate); i++) {
            let start, end;
            const month = startOfMonth(addMonths(startDate, i));

            start = i === 0 ? Number(format(startDate, dateFormat)) - 1 : 0;
            end = i === differenceInMonths(lastDate, startDate) ? Number(format(lastDate, 'd')) : Number(format(lastDayOfMonth(month), 'd'));

            for (let j = start; j < end; j++) {
                let currentDay = addDays(month, j);

                days.push(
                    <div id={`${getId(currentDay)}`}
                         key={currentDay.getDate()}
                         onClick={() => onDateClick(currentDay)}
                    >
                        <div>{format(currentDay, dayFormat)}</div>
                        <div>{format(currentDay, dateFormat)}</div>
                        {getMarked(currentDay)}
                    </div>
                );
            }
            months.push(
                <div
                     key={month.getDate()}
                >
                    <span>
                        {format(month, labelFormat || 'MMMM yyyy')}
                    </span>
                    <div>
                        {days}
                    </div>
                </div>
            );
            days = [];

        }

        return <div id={'date-picker-container'}>{months}</div>;
    }

    const onDateClick = (day: Date) => {
        setSelectedDate(day);
        if (getSelectedDay) {
            getSelectedDay(day);
        }
    };

    useEffect(() => {
        if (getSelectedDay) {
            if (selectDate) {
                getSelectedDay(selectDate);
            } else {
                getSelectedDay(startDate);
            }
        }
    }, []);

    useEffect(() => {
        if (selectDate) {
            if (!isSameDay(selectedDate, selectDate)) {
                setSelectedDate(selectDate);
                setTimeout(() => {
                    let view = document.getElementById('selected');
                    if (view) {
                        view.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'nearest'});
                    }
                }, 20);
            }
        }
    }, [selectDate]);

    return <Fragment>{renderDays()}</Fragment>
}




export default DateView;
