import React, { useState, useEffect } from 'react';
import { Button, Container, FormControl, FormControlLabel, Radio } from '@mui/material';
import GppGoodIcon from '@mui/icons-material/GppGood';
import Input from '@mui/joy/Input';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios'; // axios kullanarak API isteği yapıyoruz
import InformationSummary from './InformationSummary.jsx';

function ApprovalAndPay({ planBilgileri }) {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [planDetails, setPlanDetails] = useState(null); // API verilerini burada saklayacağız
    const [showSummary, setShowSummary] = useState(false);

    useEffect(() => {
        const fetchPlanDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5017/api/SigortaPlan/GetSigortaPlanByTypeAndDuration`, {
                    params: {
                        plan_tipi: planBilgileri.plan_tipi,
                        sure_gun: planBilgileri.sure_gun
                    }
                });
                setPlanDetails(response.data);
            } catch (error) {
                console.error('API isteği sırasında bir hata oluştu:', error);
            }
        };

        fetchPlanDetails();
    }, [planBilgileri]);

    const handleCardNumberChange = (e) => {
        const formattedValue = e.target.value.replace(/\D/g, '').slice(0, 16);
        setCardNumber(formattedValue.replace(/(.{4})/g, '$1 ').trim());
    };

    const handleExpiryMonthChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 2);
        setExpiryMonth(value);
    };

    const handleExpiryYearChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
        setExpiryYear(value);
    };

    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 3);
        setCvv(value);
    };

    const handleCheckboxChange = (e) => {
        setIsCheckboxChecked(e.target.checked);
    };

    const handleCompletePayment = () => {
        setShowSummary(true); // Show InformationSummary when payment is completed
    };

    const isFormValid = cardNumber && expiryMonth && expiryYear && cvv && isCheckboxChecked;
    if (showSummary) {
        return <InformationSummary />; // Render InformationSummary if showSummary is true
    }

    // Euro to TL conversion rate
    const conversionRate = 36.64;
    // Calculate the price in TL
    const priceInEuro = parseFloat(planBilgileri.en_uygun_fiyat) || 0;
    const priceInTL = priceInEuro * conversionRate;

    return (
        <>
            <div className="pay-text" style={{ backgroundColor: '#977ef9', height: '225px', borderBottomRightRadius: '30px', borderBottomLeftRadius: '30px' }}>
                <h1 style={{ color: 'white', fontFamily: 'Arial, serif, sans-serif', position: 'absolute', left: '90px', padding: '150px', textAlign: 'center', top: '110px' }}>
                    Hepiyi Sigortalı olmanıza tek bir adım kaldı. Lütfen ödeme işlemini tamamlayınız.
                </h1>

                <Container style={{ backgroundColor: 'white', width: '650px', height: '498px', display: 'flex', position: 'absolute', top: '408px', left: '303px', borderRadius: '10px' }}>
                    <p style={{ display: 'flex', position: 'absolute', top: '29px', left: '50px', fontWeight: 'bolder', fontSize: '15px', fontFamily: 'Arial, serif, sans-serif' }}>
                        Ödeme Seçenekleri
                    </p>
                    <FormControl style={{ border: '1px solid black', borderRadius: '10px', display: 'flex', width: '550px', height: '60px', position: 'absolute', top: '85px', left: '50px', fontFamily: 'Arial, serif, sans-serif' }}>
                        <FormControlLabel style={{ color: 'black', paddingLeft: '20px', paddingTop: '10px', fontWeight: 'bolder' }}
                            value="male" control={<Radio checked={true} style={{ color: '#4a0b9b' }} />} label="Kredi kartı" />
                    </FormControl>

                    <form style={{ display: 'flex', width: '550px', height: '60px', color: 'black', fontSize: '14px', position: 'absolute', top: '170px', left: '75px', fontFamily: 'Arial, serif, sans-serif' }}>
                        <p>Kredi Kartı Bilgileri</p>
                        <div style={{ width: '90px', height: '36px ', border: '1px solid #977ef9', borderRadius: '8px', position: 'absolute', left: '390px' }}>
                            <p style={{ fontSize: '13px', position: 'absolute', left: '8px', top: '-10px' }}>Güvenli Ödeme</p>
                            <GppGoodIcon style={{ color: '#2d9837', position: 'absolute', left: '45px', width: '50px', height: '30px', top: '3px' }} />
                        </div>
                    </form>

                    {/* Kredi Kartı Bilgileri Formu */}
                    <Card
                        variant="outlined"
                        sx={{ border: 'none', maxHeight: 'max-content', maxWidth: '100%', mx: 'auto', resize: 'horizontal', position: 'absolute', top: '230px', left: '50px', height: '100px' }}
                    >
                        <CardContent sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))', gap: 1.5 }}>
                            <FormControl sx={{ gridColumn: '1/-1' }}>
                                <Input
                                    placeholder="Kart Üzerindeki İsim"
                                    sx={{ position: 'absolute', left: '30px', top: '-21px', width: '462px', height: '58px' }}
                                    onKeyDown={(e) => { if (/\d/.test(e.key)) e.preventDefault(); }}
                                />
                            </FormControl>

                            <FormControl sx={{ gridColumn: '1/-1' }}>
                                <Input
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    placeholder="Kredi Kartı Numarası"
                                    inputProps={{ maxLength: 19 }} // 16 rakam + 3 boşluk
                                    sx={{ position: 'absolute', left: '30px', top: '28px', width: '462px', height: '58px' }}
                                />
                            </FormControl>

                            <FormControl>
                                <Input
                                    value={expiryMonth}
                                    onChange={handleExpiryMonthChange}
                                    placeholder="Ay"
                                    inputProps={{ maxLength: 2 }}
                                    sx={{ position: 'absolute', left: '30px', top: '78px', width: '147px', height: '58px' }}
                                />
                            </FormControl>

                            <FormControl>
                                <Input
                                    value={expiryYear}
                                    onChange={handleExpiryYearChange}
                                    placeholder="Yıl"
                                    inputProps={{ maxLength: 4 }}
                                    sx={{ position: 'absolute', left: '93px', top: '78px', width: '147px', height: '58px' }}
                                />
                            </FormControl>

                            <FormControl>
                                <Input
                                    value={cvv}
                                    onChange={handleCvvChange}
                                    endDecorator={<HelpOutlineIcon />}
                                    placeholder="CVV"
                                    inputProps={{ maxLength: 3 }}
                                    sx={{ position: 'absolute', left: '350px', top: '50px', width: '147px', height: '58px' }}
                                />
                            </FormControl>

                        </CardContent>
                    </Card>
                </Container>

                <div>
                    <Container style={{ backgroundColor: 'white', width: '270px', height: '370px', display: 'flex', position: 'absolute', top: '408px', left: '990px', borderRadius: '10px', fontFamily: 'Arial, serif, sans-serif' }}>
                        <h1 style={{ fontSize: '20px', textAlign: 'center', display: 'flex', position: 'absolute', top: '20px', left: '10px', fontWeight: 'bolder', padding: '5px' }}>
                            Hepiyi Seyahat Sağlık -{planBilgileri.plan_tipi}
                        </h1>
                        <p style={{ position: 'absolute', top: '120px', left: '65px', fontSize: '35px', fontWeight: 600, color: 'black' }}>
                            {planBilgileri.en_uygun_fiyat}
                            <span style={{ position: 'absolute', top: '20px', left: '95px', fontSize: '16px', fontWeight: 700 }}>
                                EUR
                            </span>
                        </p>
                        <p style={{ position: 'absolute', top: '175px', left: '85px', fontSize: '20px', fontWeight: 600, color: '#6a6a6a' }}>
                            {priceInTL.toFixed(2)}
                            <span style={{ position: 'absolute', top: '10px', left: '75px', fontSize: '12px', fontWeight: 700 }}>
                                TL
                            </span>
                        </p>
                        <div>
                            <Checkbox
                                style={{ position: 'absolute', top: '240px', left: '10px' }}
                                checked={isCheckboxChecked}
                                onChange={handleCheckboxChange}
                            />
                            <p style={{ position: 'absolute', top: '235px', left: '60px', fontSize: '13px', paddingRight: '50px' }}>
                                <span style={{ textDecoration: 'underline' }}>Mesafeli satış</span> sözleşmesini okudum, onay veriyorum
                            </p>
                        </div>

                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: isFormValid ? '#fc4847' : '#fc4847b3', // Soluk renk
                                width: '220px',
                                height: '60px',
                                fontWeight: 'bolder',
                                fontFamily: 'Arial, serif, sans-serif',
                                position: 'absolute',
                                top: '290px',
                                left: '30px',
                                borderRadius: '20px',
                                color: 'white'
                            }}
                            disabled={!isFormValid} // Butonu devre dışı bırak
                        // onClick={handleCompletePayment}
                        >
                            Ödemeyi Tamamla
                        </Button>
                    </Container>
                </div>
                <div className='pay-doganLogo' style={{ position: 'absolute', bottom: '-590px', left: '185px', paddingBottom: '50px' }}>
                    <img src='https://seeklogo.com/images/D/dogan-holding-logo-C043FDA89B-seeklogo.com.png' alt='Dogan Logo' className='pay-dogan-img' style={{ width: '50px', height: '50px' }} />
                </div>
            </div>
        </>
    );
}

export default ApprovalAndPay;
