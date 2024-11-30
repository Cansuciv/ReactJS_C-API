import React from 'react';
import { Button } from '@mui/material';
import './product_personalInformation.css';
import { format, parse } from 'date-fns';

const formatDate = (dateString) => {
    try {
        const date = parse(dateString, 'yyyy.MM.dd', new Date()); // API'den gelen tarih formatı
        return format(date, 'dd/MM/yyyy'); // İstediğiniz formatta dönüştür
    } catch (error) {
        console.error('Tarih formatlama hatası:', error);
        return ''; // Hata durumunda boş bir değer döndür
    }
};

const maskName = (name) => {
    if (name.length <= 2) return name;
    return name.slice(0, 2) + '*'.repeat(name.length - 2);
};

const maskTcKimlikNo = (tcKimlikNo) => {
    if (tcKimlikNo.length < 4) return tcKimlikNo;
    const firstThree = tcKimlikNo.slice(0, 2);
    const lastOne = tcKimlikNo.slice(-1);
    const maskedPart = '*'.repeat(tcKimlikNo.length - 4);
    return `${firstThree}${maskedPart}${lastOne}`;
};

const Product_PersonalInformation = ({ kisiBilgileri, onOfferCreate }) => {
    if (!kisiBilgileri) return null;

    // Tarihi formatla
    const formattedDate = formatDate(kisiBilgileri.dogum_Tarihi);
    // Ad ve soyadı maskele
    const maskedAd = maskName(kisiBilgileri.ad);
    const maskedSoyad = maskName(kisiBilgileri.soyad);
    // TC Kimlik No'yu maskele
    const maskedTcKimlikNo = maskTcKimlikNo(kisiBilgileri.tc_KimlikNo);

    const handleAddPassenger = () => {
        // Bu fonksiyonun amacı belirsiz, eğer ek bir işlevsellik varsa burada tanımlayın
    };

    return (
        <div>
            <div className="product-personalInformation-text">
                <div className="product-personalInformation-text-container">
                    <h1 className='product-personalInformationt-offer-text'>
                        Sigorta yaptırmak istediğiniz kişilerin bilgilerini ekleyin
                    </h1>
                </div>
            </div>
            <div className='product-personalInformation-offer-pade'>
                <div className='product-personalInformation-offer-page-form'>
                    <div className='product-personalInformation-form-head'>
                        <h4>1. Kişi Bilgileri</h4>
                        <div className='product-personalInformation-form-inside' style={{
                            position: 'absolute', top: '70px', left: '50px', border: '1px solid #d5cece', borderRadius: '10px', display: 'flex',
                            width: '510px', height: '43px', padding: '15px'
                        }}>
                            <p style={{ position: 'absolute', top: '10px', left: '50px', fontSize: '12px' }}>Adı Soyadı
                                <strong style={{ position: 'absolute', top: '25px', left: '-2px', width: '100px' }}>{maskedAd} {maskedSoyad} </strong></p>
                            <p style={{ position: 'absolute', top: '10px', left: '210px', fontSize: '12px' }}>TC Kimlik No
                                <strong style={{ position: 'absolute', top: '25px', left: '0px', width: '70px' }}>{maskedTcKimlikNo}</strong> </p>
                            <p style={{ position: 'absolute', top: '10px', left: '380px', fontSize: '12px' }}>Doğum Tarihi
                                <strong style={{ position: 'absolute', top: '25px', left: '0px', width: '70px' }}>{formattedDate} </strong></p>
                        </div>
                        <Button
                            onClick={handleAddPassenger}
                            variant="contained"
                            color="primary"
                            style={{
                                backgroundColor: '#977ef9',
                                width: '250px',
                                marginTop: '20px',
                                height: '48px',
                                borderRadius: '10px',
                                position: 'absolute',
                                top: '250px',
                                left: '48px'
                            }}
                        >
                            + Yeni Yolcu Ekle
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            onClick={onOfferCreate}
                            style={{
                                backgroundColor: '#fc4847',
                                marginTop: '20px',
                                width: '250px',
                                height: '48px',
                                borderRadius: '10px',
                                position: 'absolute',
                                top: '250px',
                                left: '355px'
                            }}
                        >
                            Teklif Oluştur
                        </Button>
                    </div>
                </div>
            </div>

            <div className='product-personalInformationt-doganLogo'>
                <img src='https://seeklogo.com/images/D/dogan-holding-logo-C043FDA89B-seeklogo.com.png' alt='Dogan Logo' className='product-personalInformation-dogan-img' />
            </div>
        </div>
    );
}

export default Product_PersonalInformation;
