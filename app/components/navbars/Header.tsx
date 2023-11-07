// import node module libraries
import React, { Fragment, useState } from 'react';
import { Col, Row, Image, Container } from 'react-bootstrap';

// import bootstrap icons
import { ThreeDotsVertical } from 'react-bootstrap-icons';

export interface Club {
    name: string;
    slug: string;
    logo: string;
}

export function Header(props: any) {
    const [clubs, setClubs] = useState(props.clubs);
    const [league, setLeague] = useState(props.league);
    return (
        <div className='flex-fill overflow-y-lg-auto scrollbar bg-body'>
            <Container fluid={true} className='py-3 border-bottom'>
                <Row className='g-3 align-items-center'>
                    <Col>
                        <div className='d-flex align-items-center'>
                            <Image src={league.logo} className='h-rem-8 h-rem-md-10' alt='...'/>
                            <h1 className='ls-tight ms-3'>{league.name}</h1>
                        </div>
                    </Col>
                    <Col>
                        <div className='hstack gap-2 justify-content-md-end'>
                            {clubs.map((club: Club, index: number) => (
                                <button key={index} role='button' className='btn btn-sm btn-square btn-neutral rounded-circle'>
                                    <Image src={club.logo} className='h-rem-6' alt='...'/>
                                </button>
                            ))}
                            <button role='button' className='btn btn-sm btn-square btn-neutral rounded-circle'>
                                <ThreeDotsVertical size={16} />
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
