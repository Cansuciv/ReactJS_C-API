import React from 'react';
import { Button, Container } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

// Tarih işlevleri
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

// Ad ve soyadı formatlama işlevi
const formatName = (name) => {
    if (name.length < 2) return name;
    return name.slice(0, 2) + '**';
};

const formatFullName = (ad, soyad) => {
    const formattedAd = formatName(ad);
    const formattedSoyad = formatName(soyad);
    return `${formattedAd} ${formattedSoyad}`;
};

// TC Kimlik No formatlama işlevi
const formatTcKimlikNo = (tcKimlikNo) => {
    if (tcKimlikNo.length < 2) return tcKimlikNo;
    const firstTwo = tcKimlikNo.slice(0, 1);
    const lastTwo = tcKimlikNo.slice(-1);
    return `${firstTwo}*********${lastTwo}`;
};

// Telefon numarasını formatlama işlevi
const formatPhoneNumber = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g, ''); // Sadece rakamları al
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
        return `(${match[1]}) ${match[2]} ${match[3]} ${match[4]}`;
    }
    return phoneNumber; // Formatlanamazsa orijinal numarayı döndür
};

function ViewOfferButton({ backOfferDetail, onProceed, kisiBilgileri, planBilgileri }) {
    if (!planBilgileri) return null;
    const handleBackOferDetail = () => {
        backOfferDetail();
    };
    const handleApprovalAndPay = () => {
        onProceed();
    };

    const formattedName = formatFullName(kisiBilgileri.ad, kisiBilgileri.soyad);
    const formattedTcKimlikNo = formatTcKimlikNo(kisiBilgileri.tc_KimlikNo);
    const formattedPhoneNumber = formatPhoneNumber(kisiBilgileri.cep_Tel);

    return (
        <>
            <div className="offerDetail-text" style={{ height: '301px' }}>
                <h4 className='offerDetail-offer-text'>
                    Vade Geçerlilik Süresi Dahilinde Teklifimiz 3 gün ({expirationDate} tarihine kadar) geçerlidir.
                </h4>
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: '#977ef9', color: 'white', textTransform: 'capitalize', fontWeight: 'bolder',
                        marginTop: '20px', top: '-40px', width: '180px', height: '50px', left: '-320px', borderRadius: '8px',
                        border: '1px solid white'
                    }}
                >
                    Teklifi Gönder
                </Button>
                <Container style={{
                    backgroundColor: 'white', width: '650px', height: '105px', display: 'flex',
                    position: 'absolute', top: '240px', left: '283px', borderRadius: '10px'
                }}>
                    <p style={{ color: 'rgb(252 72 71)', display: 'flex', position: 'absolute', top: '29px', left: '50px', fontWeight: 'bolder', fontSize: '15px' }}>
                        Olası fiyat artışlarından etkilenmemek için poliçenizi hemen satın alın!</p>
                </Container>

                <div>
                    <Container style={{
                        backgroundColor: 'white', width: '270px', height: '315px', display: 'flex',
                        position: 'absolute', top: '240px', left: '967px', borderRadius: '10px'
                    }}>
                        <h1 style={{
                            fontSize: '20px', textAlign: 'center', display: 'flex', position: 'absolute',
                            top: '20px', left: '10px', fontWeight: 'bolder', padding: '3px',
                        }}>Hepiyi Seyahat Sağlık -{planBilgileri.plan_tipi}</h1>
                        <p
                            style={{
                                position: 'absolute', top: '90px', left: '75px', fontSize: '35px', fontWeight: 600
                            }}
                        >
                            {planBilgileri.en_uygun_fiyat}
                            <span
                                style={{
                                    position: 'absolute', top: '20px', left: '95px', fontSize: '16px', fontWeight: 700
                                }}
                            >
                                EUR
                            </span>
                        </p>
                        <button
                            style={{
                                backgroundColor: '#fc4847', width: '230px', height: '50px', display: 'flex', border: 'none', color: 'white',
                                position: 'absolute', top: '205px', left: '20px', borderRadius: '10px', fontSize: '14px', fontWeight: 'bolder',
                                alignItems: 'center', justifyContent: 'center'
                            }}
                            onClick={handleApprovalAndPay}
                        >Satın Al</button>

                        <p
                            style={{
                                color: '#6a6a6a', position: 'absolute',
                                top: '270px', fontSize: '13px', left: '70px', textDecoration: 'underline',
                                cursor: 'pointer'
                            }}
                            onClick={handleBackOferDetail}
                        >
                            Tüm Tekliflere Geri Dön
                        </p>

                    </Container>
                </div>
            </div>
            <div>
                <Container style={{
                    backgroundColor: 'white', width: '650px', height: '405px', display: 'flex',
                    position: 'absolute', top: '615px', left: '305px', borderRadius: '10px'
                }}>
                    <h1
                        style={{ fontSize: '14px', fontFamily: 'Arial, serif, sans-serif', position: 'absolute', top: '50px', left: '70px', color: '#6a6a6a' }}
                    >Teklif Bilgileri</h1>
                    <p style={{ fontSize: '15px', fontFamily: 'Arial, serif, sans-serif', position: 'absolute', top: '80px', left: '70px', color: '#6a6a6a' }}
                    >Teklif no: <span style={{ paddingLeft: '150px' }} >6000000008665{planBilgileri.id}</span>   </p>
                    <p style={{ fontSize: '15px', fontFamily: 'Arial, serif, sans-serif', position: 'absolute', top: '110px', left: '70px', color: '#6a6a6a' }}
                    >Poliçe başlangıç tarihi: <span style={{ paddingLeft: '110px' }} >12.08.2024</span> </p>
                    <p style={{ fontSize: '15px', fontFamily: 'Arial, serif, sans-serif', position: 'absolute', top: '140px', left: '70px', color: '#6a6a6a' }}
                    >Poliçe bitiş tarihi: <span style={{ paddingLeft: '150px' }} >10.02.2025</span> </p>
                    <Container style={{ border: '1px solid #d5cece', borderRadius: '10px', display: 'flex', width: '550px', height: '150px', position: 'absolute', top: '215px', left: '50px', fontFamily: 'Arial, serif, sans-serif' }}>
                        <p style={{ fontSize: '14px', position: 'absolute', top: '10px', left: '20px' }} > <stop style={{ color: 'black', fontSize: '14px', fontWeight: 'bold' }}>{formattedName}</stop> </p>
                        <p style={{ fontSize: '14px', position: 'absolute', top: '40px', color: '#6a6a6a', left: '20px' }} >TC Kimlik No: <strong style={{ color: 'black' }}>{formattedTcKimlikNo} </strong></p>
                        <p style={{ fontSize: '14px', position: 'absolute', top: '70px', color: '#6a6a6a', left: '20px' }} >Telefon: <strong style={{ color: 'black' }} >{formattedPhoneNumber}</strong></p>
                        <p style={{ fontSize: '14px', position: 'absolute', top: '100px', color: '#6a6a6a', left: '20px' }} >E-posta: <strong style={{ color: 'black' }} >{kisiBilgileri.eposta}</strong> </p>
                    </Container>
                </Container>

            </div>
            <div>
                <Container style={{
                    backgroundColor: 'white', width: '650px', height: '295px', display: 'flex',
                    position: 'absolute', top: '1050px', left: '305px', borderRadius: '10px'
                }}>
                    <h1
                        style={{ fontSize: '14px', fontFamily: 'Arial, serif, sans-serif', position: 'absolute', top: '50px', left: '50px' }}
                    >Ürün Bilgileri</h1>
                    <p
                        style={{ fontSize: '13px', fontFamily: 'Arial, serif, sans-serif', position: 'absolute', top: '70px', left: '50px', color: '#6a6a6a' }}>
                        Hepiyi Seyahat Sağlık - {planBilgileri.plan_tipi}
                    </p>
                    <TaskAltIcon
                        style={{
                            color: '#977ef9', position: 'absolute', top: '120px', left: '50px', fontSize: '20px'
                        }}
                    />
                    <p
                        style={{
                            color: 'black', position: 'absolute', top: '110px', left: '80px', fontSize: '13px', paddingRight: '60px', color: '#6a6a6a', fontFamily: 'Arial, serif, sans-serif'
                        }}>
                        Tıbbi Tedavi Teminatı <strong>30,000 </strong>EURO ile teminat altında</p>
                    <TaskAltIcon
                        style={{
                            color: '#977ef9', position: 'absolute', top: '160px', left: '50px', fontSize: '20px'
                        }}
                    />
                    <p
                        style={{
                            color: 'black', position: 'absolute', top: '150px', left: '80px', fontSize: '13px', paddingRight: '60px', color: '#6a6a6a', fontFamily: 'Arial, serif, sans-serif'
                        }}>
                        Bagaj Kaybı Veya Hasarı <strong>350 </strong>EURO ile teminat altında</p>

                    <TaskAltIcon
                        style={{
                            color: '#977ef9', position: 'absolute', top: '200px', left: '50px', fontSize: '20px'
                        }}
                    />
                    <p
                        style={{
                            color: 'black', position: 'absolute', top: '190px', left: '80px', fontSize: '13px', paddingRight: '60px', color: '#6a6a6a', fontFamily: 'Arial, serif, sans-serif'
                        }}>
                        Gecikmeli Bagaj <strong>100 </strong>EURO ile teminat altında</p>

                </Container>
            </div>

            <div className='offer-doganLogo' style={{ position: 'absolute', bottom: '-1030px', left: '185px', paddingBottom: '50px' }}>
                <img src='https://seeklogo.com/images/D/dogan-holding-logo-C043FDA89B-seeklogo.com.png' alt='Dogan Logo' className='offer-dogan-img' style={{ width: '50px', height: '50px' }} />
            </div>
        </>
    );
}

export default ViewOfferButton;
