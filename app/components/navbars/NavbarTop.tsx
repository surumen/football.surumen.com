// import node module libraries
import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import {League} from '@/app/page';


export function NavbarTop(props: any) {
    const [leagues, setLeagues] = useState(props.leagues);
    return (
        <div
            className='border-bottom d-flex py-4'>
            <div className='hstack align-items-center gap-4 px-4 scrollable-x'>
                {leagues.map((league: League, index: number) => (
                    <div key={index} className='d-flex gap-1 text-xs'>
                        <Link href={`/league/${league.slug}`} className='text-heading fw-semibold'>{league.name}</Link>
                        {(index < leagues.length - 1 ? (
                            <span className='text-muted ms-2'>•</span>
                        ) : (<span className='text-muted'></span>))}
                    </div>
                ))}
            </div>
        </div>
    );
}
