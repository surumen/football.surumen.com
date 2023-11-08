'use client';
// import node module libraries
import {useState} from 'react';
import {enUS} from 'date-fns/locale';
import {Image, Card} from 'react-bootstrap';

// import bootstrap icons
import {ArrowRepeat} from 'react-bootstrap-icons';

// import styles
import '@/style/_index.scss'

// import sub components
import { NavbarTop, Header } from '@/app/components';
import { Fixtures } from '@/app/widgets';

// import data
import { PremierLeagueTop6, AllLeagues } from '@/app/data';


export default function Home() {

    return (
        <div className='d-flex flex-column flex-lg-row h-lg-100 gap-1'>
            <div className='flex-lg-fill overflow-x-auto ps-lg-1 vstack position-relative'>
                <NavbarTop leagues={AllLeagues}/>
                <Header clubs={PremierLeagueTop6} league={AllLeagues[0]}/>
                <main className='container-fluid px-6 py-4'>
                    <div className='row align-items-center'>
                        <div className='col-md-8 col-xl-5'>
                            <Fixtures />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
