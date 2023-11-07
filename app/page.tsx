// import node module libraries

// import styles
import '@/style/_index.scss'

// import sub components
import { NavbarTop, Header } from '@/app/components';

// import data
import { PremierLeagueTop6, AllLeagues } from '@/app/data';


export default function Home() {

    return (
        <div className='d-flex flex-column flex-lg-row h-lg-100 gap-1'>
            <div className='flex-lg-fill overflow-x-auto ps-lg-1 vstack vh-lg-100 position-relative'>
                <NavbarTop leagues={AllLeagues}/>
                <Header clubs={PremierLeagueTop6} league={AllLeagues[0]}/>
            </div>
        </div>
    )
}
