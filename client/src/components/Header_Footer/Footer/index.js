import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';


const Footer = () => {
    return (
        <footer className="bck_b_dark">
            <div className="container">
                <div className="logo">
                    Waves
                </div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Contact information</h2>
                        <div className="business_nfo">
                            <div className="tag">
                                <FontAwesomeIcon 
                                    icon={faCompass}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Address</div>
                                    <div>Jamshedpur 2345</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon 
                                    icon={faPhone}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Phone</div>
                                    <div>+91983571122</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon 
                                    icon={faClock}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Working hours</div>
                                    <div>Mon-Sun / 9am-8pm</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon 
                                    icon={faEnvelope}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Email</div>
                                    <div>nfo2gmail.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="left">
                        <h2>Be the first to know</h2>
                        <div>
                            <div>
                                Amet et sit mollit nisi deserunt. Et dolore labore anim eu dolore elit pariatur commodo do nulla ad. Et cillum ipsum non sit ad irure aliquip aute velit ullamco veniam. Enim do sit incididunt nostrud aute culpa sunt aliqua. Magna consequat pariatur ea commodo cillum. Proident proident ullamco ullamco eu reprehenderit quis do officia labore cillum tempor.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
