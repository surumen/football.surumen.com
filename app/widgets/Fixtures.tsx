// import node module libraries
import React, {useState} from 'react';
import {Image, Card} from 'react-bootstrap';

// import bootstrap icons
import {ArrowRepeat} from 'react-bootstrap-icons';

// import models
import {Datepicker} from "@/app/components";
import {da, enUS} from "date-fns/locale";
import {addDays} from "date-fns";
import {PremierLeagueTop6} from "@/app/data";
import {DatepickerEvent} from "@/app/components/datepicker/DataPicker";


// Define component props
type FixturesProps = {
    // add if needed
}

const Fixtures: React.FC<FixturesProps> = ({}) => {
    const [date, setDate] = useState<{
        selectedDate: Date | null; }>({selectedDate: new Date()});
    const [start, setStartDate] = useState<{
        startDate: Date | null; }>({startDate: addDays(new Date(), -12)});
    const [end, setEndDate] = useState<{
        endDate: Date | null; }>({endDate: addDays(new Date(), 12)});
    const [offset, setOffset] = useState<{
        offsetX: number; }>({offsetX: 1200});

    const handleChange = (d: DatepickerEvent) => {
        const [selectedDate, startDate, endDate] = d;
        setDate({selectedDate: selectedDate})
    };

    const handleChangeStart = (d: DatepickerEvent) => {
        const [selectedDate, currentStart, end] = d;
        setStartDate({startDate: currentStart})
    };

    const handleChangeEnd = (d: DatepickerEvent) => {
        const [selectedDate, currentStart, currentEnd] = d;
        setEndDate({endDate: currentEnd})
    };

    const resetDates = () => {
        const isAfter = date.selectedDate && date.selectedDate.toLocaleString() > new Date().toLocaleDateString();
        setDate({selectedDate: new Date()});
        setStartDate({startDate: addDays(new Date(), -12)});
        setEndDate({endDate: addDays(new Date(), 12)})
        setOffset({offsetX: isAfter ? 1200 : -1200})
    }


    return (
        <Card className='rounded-2'>
            <Card.Body>
                <header className='pt-0 pb-4 border-bottom mb-2'>
                    <div className='row align-items-center'>
                        <div className='col'><h1 className='h4 ls-tight'>Fixtures</h1></div>
                        <div className='col-auto'><ArrowRepeat size={16} onClick={resetDates}/></div>
                    </div>
                </header>
                <div className='my-4'>
                    <Datepicker
                        onSelect={handleChange}
                        locale={enUS}
                        selectedDate={date.selectedDate}
                        startDate={ start.startDate ? start.startDate : addDays(new Date(), -12)}
                        endDate={end.endDate ? end.endDate : addDays(new Date(), 12)}
                        offSetX={offset.offsetX}
                        onChangeStart={handleChangeStart}
                        onChangeEnd={handleChangeEnd}
                    />
                </div>
                <div className='vstack gap-2 mx-n3'>
                    <div className='d-flex bg-body-secondary rounded-2 p-2 justify-content-center'>
                        <div className='hstack gap-1'>
                            <button className='btn shadow-none rounded-pill flex-none d-flex align-items-center gap-2 py-2 ps-2 pe-4 w-40'>
                                <span className='text-sm fw-semibold text-heading ms-1'>{PremierLeagueTop6[1].name}</span>
                                <Image src={PremierLeagueTop6[1].logo} alt='...' className='w-rem-6 h-rem-6' />
                            </button>
                            <button type='button' className='flex-none flex-nowrap btn btn-sm btn-dark border fw-bold'>
                                <span>0-1</span>
                            </button>
                            <button className='btn shadow-none rounded-pill flex-none d-flex align-items-center gap-2 py-2 ps-2 pe-4 w-40'>
                                <span className='text-sm fw-semibold text-heading ms-1'>{PremierLeagueTop6[4].name}</span>
                                <Image src={PremierLeagueTop6[4].logo} alt='...' className='w-rem-6 h-rem-6' />
                            </button>
                        </div>
                    </div>

                    <div className='d-flex bg-body-secondary rounded-2 p-2 justify-content-center'>
                        <div className='hstack gap-1'>
                            <button className='btn shadow-none rounded-pill flex-none d-flex align-items-center gap-2 py-2 ps-2 pe-4 w-40'>
                                <span className='text-sm fw-semibold text-heading ms-1'>{PremierLeagueTop6[1].name}</span>
                                <Image src={PremierLeagueTop6[1].logo} alt='...' className='w-rem-6 h-rem-6' />
                            </button>
                            <button type='button' className='flex-none flex-nowrap btn btn-sm btn-dark border fw-bold'>
                                <span>0-1</span>
                            </button>
                            <button className='btn shadow-none rounded-pill flex-none d-flex align-items-center gap-2 py-2 ps-2 pe-4 w-40'>
                                <span className='text-sm fw-semibold text-heading ms-1'>{PremierLeagueTop6[4].name}</span>
                                <Image src={PremierLeagueTop6[4].logo} alt='...' className='w-rem-6 h-rem-6' />
                            </button>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Fixtures;
