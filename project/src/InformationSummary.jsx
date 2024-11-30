import React, { useState, useEffect } from 'react';
import { Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import jsPDF from 'jspdf';

function InformationSummary() {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        // Replace with your API endpoint
        const fetchInformation = async () => {
            try {
                const response = await axios.get('http://localhost:5017/api/PersonalInformation'); // Adjust the URL
                setInfo(response.data);
            } catch (error) {
                console.error('API isteği sırasında bir hata oluştu:', error);
            }
        };

        fetchInformation();
    }, []);

    const generatePDF = () => {
        if (!info) return;

        const doc = new jsPDF();

        // Title
        doc.text('Teklif Bilgileri', 20, 20);

        // Add information to the PDF
        doc.text(`Ad Soyad: ${info.adSoyad}`, 20, 30);
        doc.text(`TC Kimlik No: ${info.tcKimlikNo}`, 20, 40);
        doc.text(`Doğum Tarihi: ${info.dogumTarihi}`, 20, 50);
        doc.text(`Cep Telefonu: ${info.cepTelefonu}`, 20, 60);
        doc.text(`E-Posta: ${info.eposta}`, 20, 70);
        doc.text(`Poliçe Plan Tipi: ${info.planTipi}`, 20, 80);
        doc.text(`Süre Gün: ${info.sureGun}`, 20, 90);

        // Save the PDF
        doc.save('teklif_bilgileri.pdf');
    };

    return (
        <>
            <div className="pay-text" style={{ backgroundColor: '#977ef9', height: '225px', borderBottomRightRadius: '30px', borderBottomLeftRadius: '30px' }}>
                <h1 style={{ color: 'white', fontFamily: 'Arial, serif, sans-serif', position: 'absolute', left: '350px', padding: '150px', textAlign: 'center', top: '110px' }}>
                    Ödemeniz başarı ile tamamlanmıştır.
                </h1>

                <Container style={{ backgroundColor: 'white', width: '650px', height: '550px', display: 'flex', flexDirection: 'column', position: 'absolute', top: '408px', left: '480px', borderRadius: '10px', padding: '20px' }}>
                    <Typography variant="h6" style={{ fontWeight: 'bolder', fontSize: '18px', fontFamily: 'Arial, serif, sans-serif' }}>
                        Teklif Bilgileri
                    </Typography>
                    {info ? (
                        <div style={{ marginTop: '20px' }}>
                            <Typography><strong>Ad Soyad:</strong> {info.adSoyad}</Typography>
                            <Typography><strong>TC Kimlik No:</strong> {info.tcKimlikNo}</Typography>
                            <Typography><strong>Doğum Tarihi:</strong> {info.dogumTarihi}</Typography>
                            <Typography><strong>Cep Telefonu:</strong> {info.cepTelefonu}</Typography>
                            <Typography><strong>E-Posta:</strong> {info.eposta}</Typography>
                            <Typography><strong>Poliçe Plan Tipi:</strong> {info.planTipi}</Typography>
                            <Typography><strong>Süre Gün:</strong> {info.sureGun}</Typography>
                        </div>
                    ) : (
                        <Typography>Bilgiler yükleniyor...</Typography>
                    )}
                    <Button
                        onClick={generatePDF}
                        variant="contained"
                        style={{
                            backgroundColor: '#fc4847',
                            width: '220px',
                            height: '60px',
                            fontWeight: 'bolder',
                            fontFamily: 'Arial, serif, sans-serif',
                            marginTop: '20px',
                            borderRadius: '20px',
                            color: 'white'
                        }}
                    >
                        PDF İndir
                    </Button>
                </Container>

                <div className='pay-doganLogo' style={{ position: 'absolute', bottom: '-590px', left: '185px', paddingBottom: '50px' }}>
                    <img src='https://seeklogo.com/images/D/dogan-holding-logo-C043FDA89B-seeklogo.com.png' alt='Dogan Logo' className='pay-dogan-img' style={{ width: '50px', height: '50px' }} />
                </div>
            </div>
        </>
    );
}

export default InformationSummary;
