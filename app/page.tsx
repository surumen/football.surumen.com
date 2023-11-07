'use client';
// import node module libraries

// Styles
import '@/style/_index.scss'

import { NavbarTop, Header } from '@/app/components';
import { Club } from '@/app/components/navbars/Header';

export interface League {
    name: string;
    slug: string;
    logo?: string;
}

export default function Home() {

    const leagues: League[] = [
        {name: 'Premier League', slug: 'premier-league', logo: 'https://www.premierleague.com/resources/rebrand/v7.131.3/i/elements/pl-main-logo.png'},
        {name: 'UEFA Champions League', slug: 'uefa-champions-league', logo: ''},
        {name: 'UEFA Europa League', slug: 'uefa-europa-league', logo: ''},
        {name: 'LaLiga', slug: 'la-liga', logo: ''},
        {name: 'Bundesliga', slug: 'bundesliga', logo: ''},
        {name: 'Ligue1', slug: 'ligue-1', logo: ''},
        {name: 'Serie A', slug: 'serie-a', logo: ''}
    ]

    const clubs: Club[] = [
        {name: 'Manchester United', logo: 'https://resources.premierleague.com/premierleague/badges/rb/t1.png', slug: 'manchester-united'},
        {name: 'Arsenal', logo: 'https://resources.premierleague.com/premierleague/badges/rb/t3.svg', slug: 'arsenal'},
        {name: 'Liverpool', logo: 'https://resources.premierleague.com/premierleague/badges/rb/t14.svg', slug: 'liverpool'},
        {name: 'Chelsea', logo: 'https://resources.premierleague.com/premierleague/badges/rb/t8.svg', slug: 'chelsea'},
        {name: 'Manchester City', logo: 'https://resources.premierleague.com/premierleague/badges/rb/t43.svg', slug: 'manchester-city'},
        {name: 'Tottenham Hotspurs', logo: 'https://resources.premierleague.com/premierleague/badges/rb/t6.svg', slug: 'tottenham'},
    ]

    return (
        <div className='d-flex flex-column flex-lg-row h-lg-100 gap-1'>
            <div className='flex-lg-fill overflow-x-auto ps-lg-1 vstack vh-lg-100 position-relative'>
                <NavbarTop leagues={leagues}/>
                <Header clubs={clubs} league={leagues[0]}/>
            </div>
        </div>
    )
}
