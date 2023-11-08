import React, {Fragment, useEffect, useState} from 'react';
import {
    addMonths,
    differenceInMonths,
    format,
    isSameDay,
    startOfMonth
} from 'date-fns';


// Define component props
type MonthViewProps = {
    startDate: Date;
    lastDate: Date;
    selectDate: Date;
    getSelectedDay: any;
    primaryColor: any;
    labelFormat: any;
}

const MonthView: React.FC<MonthViewProps> = ({startDate, lastDate, selectDate, getSelectedDay, primaryColor, labelFormat}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const rgb = primaryColor.replace(/[^\d,]/g, '').split(',');
    const brightness = Math.round(((parseInt(rgb[0]) * 299) +
        (parseInt(rgb[1]) * 587) +
        (parseInt(rgb[2]) * 114)) / 1000);
    const textColour = (brightness > 125) ? 'black' : 'white';

    const selectedStyle = {borderRadius:'0.7rem',background:`${primaryColor}`, color: textColour};

    const getStyles = (day: Date) => {
        return isSameDay(day, selectedDate)?selectedStyle:null;
    };

    const getId = (day: Date) => {
        return isSameDay(day, selectedDate) ? 'selected' : '';
    };

    const renderDays = () => {

        const months = [];

        for (let i = 0; i <= differenceInMonths(lastDate, startDate); i++) {
            const month = startOfMonth(addMonths(startDate, i));
            months.push(
                <div id={`${getId(month)}`}
                     key={month.getDate()}
                     onClick={() => onDateClick(month)}
                >
                    <span>
                        {format(month, labelFormat || 'MMMM yyyy')}
                    </span>
                </div>
            );
        }

        return <div id={'container'}>{months}</div>;
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


export default MonthView;
