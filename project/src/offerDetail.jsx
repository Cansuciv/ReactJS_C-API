import React, { useState } from 'react';
import './offerDetail.css';
import { Button } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useNavigate } from 'react-router-dom';

function OfferDetail({ onViewOfferClick, onPersonalizeOfferClick, planBilgileri }) {
    const [currentOffer, setCurrentOffer] = useState(null); // State to track current offer

    if (!planBilgileri) return null;

    const handleViewOfferButtonClick = (offerType) => {
        setCurrentOffer(offerType); // Set the current offer type based on button click
        onViewOfferClick();
    };

    const handlePersonalizeOfferButtonClick = () => {
        onPersonalizeOfferClick();
    };

    const handleBackButtonClick = () => {
        setCurrentOffer(null); // Reset offer state
    };

    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const expirationDate = formatDate(addDays(new Date(), 3));

    return (
        <div>
            <div className="offerDetail-text">
                <h4 className='offerDetail-offer-text'>
                    Vade Geçerlilik Süresi Dahilinde Teklifimiz 3 gün ({expirationDate} tarihine kadar) geçerlidir.
                </h4>
                <Button
                    variant="contained" style={{
                        backgroundColor: '#977ef9', color: 'white', textTransform: 'capitalize', fontWeight: 'bolder',
                        marginTop: '20px', top: '-40px', width: '180px', height: '50px', left: '-320px', borderRadius: '8px', border: '1px solid white'
                    }}>
                    Teklifi Gönder </Button>
                {/*-----------EN UYGUN TEKLİF------SOL------------ */}
                <div className='left'>
                    <div style={{
                        backgroundColor: 'white', color: 'white', left: '285px', width: '360px', height: '815px',
                        position: 'absolute', top: '200px', borderRadius: '20px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
                    }} >
                        <div style={{
                            backgroundColor: '#f8e0b3', borderRadius: '20px 20px 20px 20px', height: '50px', width: '200px',
                            position: 'absolute', left: '80px', top: '-20px', fontSize: '14px', color: '#4a0b9b', fontWeight: 600, textAlign: 'center', justifyContent: 'center', alignItems: 'center'
                        }}> <p>En Uygun Teklif</p>
                        </div>
                        <p style={{ color: 'black', position: 'absolute', top: '95px', left: '35px', fontSize: '20px', fontWeight: 700 }}
                        >Hepiyi Seyahat Sağlık</p>
                        <p style={{ color: 'black', position: 'absolute', top: '120px', left: '35px', fontSize: '47px', fontWeight: 600, fontFamily: 'Arial, serif, sans-serif' }}>
                            {planBilgileri.en_uygun_fiyat}
                            <span style={{ color: '#4a0b9b', position: 'absolute', top: '27px', left: '123px', fontSize: '13px', fontWeight: 'bolder', fontFamily: 'Arial, serif, sans-serif' }}>
                                EUR
                            </span>
                        </p>

                        <div style={{ backgroundColor: '#f4fbfc', width: '100%', height: '175px', borderRadius: '20px 20px 20px 20px', position: 'absolute', top: '340px' }}>
                            <Button style={{
                                backgroundColor: '#4a0b9b', color: 'white', textTransform: 'capitalize', fontWeight: 'bolder', marginTop: '20px', top: '10px', width: '250px', height: '50px', left: '55px', borderRadius: '8px',
                                border: '1px solid white'
                            }} onClick={() => handleViewOfferButtonClick('en_uygun')}>Teklifi İncele</Button>
                            <Button style={{
                                backgroundColor: 'white', color: 'red', textTransform: 'capitalize', fontWeight: 'normal', marginTop: '20px', top: '10px', width: '250px', height: '50px', left: '55px', borderRadius: '8px',
                                border: '1px solid red'
                            }} onClick={handlePersonalizeOfferButtonClick}>Teklifinizi Kişiselleştirin </Button>
                        </div>
                        <h1 style={{ color: 'black', position: 'absolute', top: '550px', left: '25px', fontSize: '14px' }}> ÖNE ÇIKAN TEMİNATLAR</h1>
                        <TaskAltIcon style={{ color: '#977ef9', position: 'absolute', top: '600px', left: '30px', fontSize: '20px' }} />
                        <p style={{ color: 'black', position: 'absolute', top: '585px', left: '60px', fontSize: '13px', paddingRight: '60px' }}>
                            Tıbbi Tedavi Teminatı <strong>30,000 </strong>EURO ile teminat altında</p>
                    </div>
                </div>
                {/*-----------------ÖNERİLEN TEKLİF----------SAĞ-------*/}
                <div className='right'>
                    <div style={{ backgroundColor: 'white', color: 'white', right: '285px', width: '360px', height: '815px', position: 'absolute', top: '200px', borderRadius: '20px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }} >
                        <div style={{ backgroundColor: '#7c5cfb', color: 'white', right: '0px', width: '360px', height: '400px', position: 'absolute', top: '0px', borderRadius: '20px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
                            <div style={{ backgroundColor: '#f8e0b3', borderRadius: '20px 20px 20px 20px', height: '50px', width: '200px', position: 'absolute', left: '80px', top: '-20px', fontSize: '14px', color: '#4a0b9b', fontWeight: 600, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }} >
                                <p>Önerilen Teklif</p>
                            </div>
                            <p style={{ color: 'white', position: 'absolute', top: '95px', left: '35px', fontSize: '20px', fontWeight: 700 }}
                            >Hepiyi Premium Seyahat Sağlık</p>
                            <p style={{ color: 'white', position: 'absolute', top: '120px', left: '35px', fontSize: '50px', fontWeight: 600, fontFamily: 'Arial, serif, sans-serif' }} >
                                {planBilgileri.onerilen_teklif}
                                <span style={{ color: 'white', position: 'absolute', top: '27px', left: '130px', fontSize: '13px', fontWeight: 'bolder', fontFamily: 'Arial, serif, sans-serif' }} >
                                    EUR </span></p>
                            <div style={{ backgroundColor: '#7c5cfb', width: '100%', height: '175px', borderRadius: '20px 20px 20px 20px', position: 'absolute', top: '340px' }}  >
                                <Button style={{
                                    backgroundColor: 'white', color: '#4a0b9b', textTransform: 'capitalize', fontWeight: 'bolder',
                                    marginTop: '20px', top: '10px', width: '250px', height: '50px', left: '55px', borderRadius: '8px',
                                    border: '1px solid white'
                                }} onClick={() => handleViewOfferButtonClick('onerilen')}> Teklifi İncele </Button>
                                <Button
                                    style={{
                                        backgroundColor: 'white', color: 'red', textTransform: 'capitalize', fontWeight: 'normal',
                                        marginTop: '20px', top: '10px', width: '250px', height: '50px', left: '55px', borderRadius: '8px',
                                        border: '1px solid red'
                                    }} onClick={handlePersonalizeOfferButtonClick}> Teklifinizi Kişiselleştirin </Button>
                            </div>
                            <h1 style={{ color: 'black', position: 'absolute', top: '550px', left: '25px', fontSize: '14px' }}  >  ÖNE ÇIKAN TEMİNATLAR   </h1>
                            <TaskAltIcon style={{ color: '#977ef9', position: 'absolute', top: '600px', left: '30px', fontSize: '20px' }} />
                            <p style={{
                                color: 'black', position: 'absolute', top: '585px', left: '60px', fontSize: '13px', paddingRight: '60px'
                            }}>  Tıbbi Tedavi Teminatı <strong>30,000 </strong>EURO ile teminat altında</p>
                            <TaskAltIcon style={{ color: '#977ef9', position: 'absolute', top: '660px', left: '30px', fontSize: '20px' }} />
                            <p style={{
                                color: 'black', position: 'absolute', top: '640px', left: '60px', fontSize: '13px', paddingRight: '60px'
                            }}> Bagaj Kaybı Veya Hasarı  <strong>350 </strong>EURO ile teminat altında</p>
                            <TaskAltIcon style={{ color: '#977ef9', position: 'absolute', top: '720px', left: '30px', fontSize: '20px' }} />
                            <p style={{
                                color: 'black', position: 'absolute', top: '700px', left: '60px', fontSize: '13px', paddingRight: '60px'
                            }}> Gecikmeli Bagaj   <strong>100 </strong>EURO ile teminat altında</p>
                        </div>
                    </div>
                </div>
                <div className='offerDetail-doganLogo'>
                    <img src='https://seeklogo.com/images/D/dogan-holding-logo-C043FDA89B-seeklogo.com.png' alt='Dogan Logo' className='offerDetail-dogan-img' />
                </div>
            </div>
        </div >
    );
}

export default OfferDetail;
