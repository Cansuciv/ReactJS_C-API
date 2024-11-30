import React, { useState, useEffect } from 'react';
import { Button, Container, FormControl, FormGroup, FormControlLabel, Radio, RadioGroup, Checkbox } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { styled } from '@mui/material/styles';
import FormLabel from '@mui/material/FormLabel';
import ApprovalAndPay from './approvalAndPay.jsx';

const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: theme.palette.mode === 'dark'
        ? '0 0 0 1px rgb(16 22 26 / 40%)'
        : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage: theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
        : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
    },
    'input:hover ~ &': {
        backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&::before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
    },
    'input:hover ~ &': {
        backgroundColor: '#106ba3',
    },
});

function BpRadio(props) {
    return (
        <Radio
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            {...props}
        />
    );
}

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


function PersonalizeOffer({ backOfferDetail, onProceed, planBilgileri }) {
    const [totalPrice, setTotalPrice] = useState(parseFloat(planBilgileri.onerilen_teklif));
    const [isScrolled, setIsScrolled] = useState(false);

    if (!planBilgileri) return null;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 240) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const handleBackOferDetail = () => {
        backOfferDetail();
    };

    const handleApprovalAndPay = () => {
        onProceed();
    };
    const handleCheckboxChange = (e) => {
        const value = parseFloat(e.target.value);
        if (e.target.checked) {
            setTotalPrice(prevPrice => prevPrice + value);
        } else {
            setTotalPrice(prevPrice => prevPrice - value);
        }
    };

    const handleRadioChange = (e) => {
        const value = parseFloat(e.target.value);
        setTotalPrice(parseFloat(planBilgileri.onerilen_teklif) + value);
    };

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
                    backgroundColor: 'white', width: '650px', height: '220px', display: 'flex',
                    position: 'absolute', top: '240px', left: '283px', borderRadius: '10px'
                }}>
                    <ErrorOutlineIcon
                        style={{
                            color: '#4a0b9b', position: 'absolute', top: '60px', left: '47px',
                        }}
                    />
                    <p style={{ display: 'flex', position: 'absolute', top: '55px', left: '80px', fontWeight: 'bold', fontSize: '14px', color: '#424242', fontFamily: 'Arial, serif, sans-serif' }}>
                        Extreme Spor Teminatı</p>
                </Container>
                <FormControl component="fieldset" style={{ position: 'absolute', top: '350px', left: '330px', border: '1px solid #d5cece', borderRadius: '10px', display: 'flex', width: '550px', height: '60px', lineHeight: '0.8' }}>
                    <FormGroup aria-label="position" row>
                        <p style={{ color: '#424242', position: 'absolute', top: '-10px', left: '20px', fontSize: '13px' }}>Extreme Spor Teminatı</p>
                        <FormControlLabel
                            style={{ position: 'absolute', top: '13px', }}
                            value={20}
                            control={<Checkbox onChange={handleCheckboxChange} style={{ position: 'absolute', top: '-3px', right: '-100px' }} />}
                            label={
                                <span style={{ fontSize: '10px', letterSpacing: '0.4px', fontFamily: 'Arial, serif, sans-serif', fontWeight: 'normal', color: '#8c8585', }}>
                                    Kapsam dahilinde olan sporlar ve bu sporlardan doğacak olan tüm giderler bu teminat ile <br />  güvence altına alınmıştır.
                                </span>
                            }
                            labelPlacement="start"
                        />
                    </FormGroup>
                </FormControl>

                <Container style={{
                    backgroundColor: 'white', width: '650px', height: '213px', display: 'flex',
                    position: 'absolute', top: '488px', left: '283px', borderRadius: '10px'
                }}>
                    <p style={{ display: 'flex', position: 'absolute', top: '45px', left: '55px', fontWeight: 'bold', fontSize: '14px', color: '#424242', fontFamily: 'Arial, serif, sans-serif' }}>
                        Covid</p>
                </Container>
                <FormControl component="fieldset" style={{ position: 'absolute', top: '590px', left: '330px', border: '1px solid #d5cece', borderRadius: '10px', display: 'flex', width: '550px', height: '60px', lineHeight: '0.8' }}>
                    <FormGroup aria-label="position" row>
                        <p style={{ color: '#424242', position: 'absolute', top: '-10px', left: '20px', fontSize: '13px' }}>Covid</p>
                        <FormControlLabel
                            style={{ position: 'absolute', top: '13px', }}
                            value={0.50}
                            control={<Checkbox onChange={handleCheckboxChange} style={{ position: 'absolute', top: '-3px', right: '-100px' }} />}
                            label={
                                <span style={{ fontSize: '10px', letterSpacing: '0.4px', fontFamily: 'Arial, serif, sans-serif', fontWeight: 'normal', color: '#8c8585', }}>
                                    Covid-19 nedeni ilekonaklama süresinin uzatılması, tedavi giderleri ve pozitif çıkan test <br />  masrafları kapsam dahilindedir.
                                </span>
                            }
                            labelPlacement="start"
                        />
                    </FormGroup>
                </FormControl>

                <Container style={{
                    backgroundColor: 'white', width: '650px', height: '213px', display: 'flex',
                    position: 'absolute', top: '730px', left: '283px', borderRadius: '10px'
                }}>
                    <p style={{ display: 'flex', position: 'absolute', top: '48px', left: '55px', fontWeight: 'bold', fontSize: '14px', color: '#424242', fontFamily: 'Arial, serif, sans-serif' }}>
                        Vize Reddi</p>
                </Container>
                <FormControl component="fieldset" style={{ position: 'absolute', top: '830px', left: '330px', border: '1px solid #d5cece', borderRadius: '10px', display: 'flex', width: '550px', height: '60px', lineHeight: '0.8' }}>
                    <FormGroup aria-label="position" row>
                        <p style={{ color: '#424242', position: 'absolute', top: '-10px', left: '20px', fontSize: '13px' }}>Vize Reddi</p>
                        <FormControlLabel
                            style={{ position: 'absolute', top: '13px', }}
                            value={20}
                            control={<Checkbox onChange={handleCheckboxChange} style={{ position: 'absolute', top: '-3px', right: '-100px' }} />}
                            label={
                                <span style={{ fontSize: '10px', letterSpacing: '0.4px', fontFamily: 'Arial, serif, sans-serif', fontWeight: 'normal', color: '#8c8585', }}>
                                    Eksik evrak ve hukuki engeller dışında vize talebinin konsolosluk tarafından reddedilmesi <br />  durumlarında vize için ödenmiş ücretin sigortalıya iade edilmesidir.
                                </span>
                            }
                            labelPlacement="start"
                        />
                    </FormGroup>
                </FormControl>


                <Container style={{
                    backgroundColor: 'white', width: '650px', height: '483px', display: 'flex',
                    position: 'absolute', top: '973px', left: '283px', borderRadius: '10px'
                }}>
                    <p style={{ display: 'flex', position: 'absolute', top: '48px', left: '55px', fontWeight: 'bold', fontSize: '14px', color: '#424242', fontFamily: 'Arial, serif, sans-serif' }}>
                        Kişisel Sorumluluk</p>

                    <p style={{ display: 'flex', position: 'absolute', top: '80px', left: '55px', fontWeight: 'normal', fontSize: '13px', color: '#424242', fontFamily: 'Arial, serif, sans-serif' }}>
                        Yurt dışı seyahatlerinde 3. şahıslara verilen zararlar nedeniyle oluşabilecek tazminat<br /> talepleri, seçilecek bedel doğrultusunda kapsama dahil edilir.</p>

                    <FormControl style={{ display: 'flex', position: 'absolute', top: '160px', left: '65px' }}>
                        <RadioGroup
                            onChange={handleRadioChange}
                            defaultValue="0eur"
                            aria-labelledby="demo-customized-radios"
                            name="customized-radios"
                        >

                            <FormControlLabel style={{ border: '1px solid #d5cece', borderRadius: '10px', width: '263px', marginBottom: '9px', height: '60px' }} value={0} control={<BpRadio />} label="0 EUR" />
                            <FormControlLabel style={{ border: '1px solid #d5cece', borderRadius: '10px', width: '263px', marginBottom: '9px', height: '60px' }} value={2.10} control={<BpRadio />} label="1.000 EUR" />
                            <FormControlLabel style={{ border: '1px solid #d5cece', borderRadius: '10px', width: '263px', marginBottom: '9px', height: '60px' }} value={4.20} control={<BpRadio />} label="2.000 EUR" />
                            <FormControlLabel style={{ border: '1px solid #d5cece', borderRadius: '10px', width: '263px', height: '60px' }} value={6.30} control={<BpRadio />} label="3.000 EUR" />
                            <FormControlLabel style={{ border: '1px solid #d5cece', borderRadius: '10px', width: '263px', marginBottom: '9px', height: '60px', position: 'absolute', left: '275px' }} value={1.05} control={<BpRadio />} label="500 EUR" />
                            <FormControlLabel style={{ border: '1px solid #d5cece', borderRadius: '10px', width: '263px', marginBottom: '9px', height: '60px', position: 'absolute', left: '275px', top: '69px' }} value={3.15} control={<BpRadio />} label="1.500 EUR" />
                            <FormControlLabel style={{ border: '1px solid #d5cece', borderRadius: '10px', width: '263px', marginBottom: '9px', height: '60px', position: 'absolute', left: '275px', top: '139px' }} value={5.25} control={<BpRadio />} label="2.500 EUR" />
                            <FormControlLabel style={{ border: '1px solid #d5cece', borderRadius: '10px', width: '263px', height: '60px', position: 'absolute', left: '275px', top: '209px' }} value={13.33} control={<BpRadio />} label="3.500 EUR" />
                        </RadioGroup>
                    </FormControl>
                </Container>

                <div className='odeme' style={{
                    position: isScrolled ? 'fixed' : 'absolute',
                    top: isScrolled ? '20px' : '240px',
                    left: '967px',
                    backgroundColor: 'white',
                    width: '270px',
                    height: '315px',
                    borderRadius: '10px',
                }}>
                    <Container style={{
                        width: '270px', height: '315px', display: 'flex',
                        top: '240px', left: '967px', borderRadius: '10px'
                    }}>
                        <h1 style={{
                            fontSize: '20px', textAlign: 'center', display: 'flex', position: 'absolute',
                            top: '20px', left: '10px', fontWeight: 'bolder', padding: '3px',
                        }}>Hepiyi Seyahat Sağlık - {planBilgileri.plan_tipi}</h1>
                        <p
                            style={{
                                position: 'absolute', top: '90px', left: '65px', fontSize: '35px', fontWeight: 600
                            }}
                        >
                            {totalPrice.toFixed(2)}
                            <span
                                style={{
                                    position: 'absolute', top: '18px', left: '90px', fontSize: '16px', fontWeight: 700
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
            </div >


            <div className='offer-doganLogo' style={{ position: 'absolute', bottom: '-1380px', left: '185px', paddingBottom: '50px' }}>
                <img src='https://seeklogo.com/images/D/dogan-holding-logo-C043FDA89B-seeklogo.com.png' alt='Dogan Logo' className='offer-dogan-img' style={{ width: '50px', height: '50px' }} />
            </div>
        </>
    );
}

export default PersonalizeOffer;
