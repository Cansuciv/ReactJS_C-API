import React, { useState, useEffect } from 'react';
import { Container, Stepper, Step, StepLabel, StepConnector, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/system';
import { useNavigate, useLocation } from 'react-router-dom';
import { stepConnectorClasses } from '@mui/material/StepConnector';
import './App.css';
import PersonalInformation from './personalInformation.jsx';
import ProductInformation from './productInformation.jsx';
import Product_PersonalInformation from './product_personalInformation.jsx';
import VerificationCode from './verificationCode.jsx';
import OfferDetail from './offerDetail.jsx';
import PersonalizeOffer from './personalizeOffer.jsx';
import ApprovalAndPay from './approvalAndPay.jsx';
import ViewOfferButton from './viewOfferButton.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InformationSummary from './InformationSummary.jsx';

const steps = [
  { label: 'Kişi Bilgileri', path: '/kisi-bilgileri' },
  { label: 'Ürün Bilgileri', path: '/urun-bilgileri' },
  { label: 'Sigortalı Seçme', path: '/sigortali-secimi' },
  { label: 'Doğrulama Kodu', path: '/sms-dogrulama' },
  { label: 'Teklif Detayı', path: '/teklifler' },
  { label: 'Onay ve Ödeme', path: '/onay-odeme' },
];

const CustomStepIcon = styled('div')(({ active, completed }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 47,
  height: 47,
  borderRadius: '50%',
  backgroundColor: active ? '#ff6c44' : completed ? '#4a0b9b' : 'white',
  color: active || completed ? 'white' : '#977ef9',
  border: `1px solid ${active ? '#ff6c44' : completed ? '#4a0b9b' : '#977ef9'}`,
  fontSize: '16px',
  fontWeight: 'bolder',
  '& .MuiStepIcon-text': {
    fill: active || completed ? 'white' : 'black',
  },
}));

const CustomStepLabel = styled(StepLabel)(({ active, completed }) => ({
  color: active ? '#201f24' : '#dacece',
  textAlign: 'center',
  fontFamily: 'Poppins, sans-serif',
  ...(completed && {
    color: 'rgba(32, 31, 36, .4)',
    fontWeight: '400',
  }),
}));

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 27,
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderTopWidth: 6,
    borderRadius: 1,
    borderColor: 'transparent',
    backgroundColor: 'rgba(197, 181, 254, .4)',
    height: 'auto',
    position: 'relative',
    margin: '0 3.8px',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#977ef9',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#977ef9',
    },
  },
}));

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProductPersonalInfo, setShowProductPersonalInfo] = useState(false);
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [showOfferDetail, setShowOfferDetail] = useState(false);
  const [showPersonalizeOffer, setShowPersonalizeOffer] = useState(false);
  const [showViewOfferButton, setShowViewOfferButton] = useState(false);
  const [showApprovalAndPay, setShowApprovalAndPay] = useState(false);
  const [showPersonalInformation, setShowPersonalInformation] = useState(true); // Set initial visibility
  const [showProductInformation, setShowProductInformation] = useState(false);
  const [kisiBilgileri, setKisiBilgileri] = useState(null);
  const [planBilgileri, setPlanBilgileri] = useState(null);

  const handleProceed = (data) => {
    setKisiBilgileri(data);
    setShowPersonalInformation(false);
    setShowProductInformation(true);
    navigate(steps[1].path);
  };

  const handleProcedProduct = (data) => {
    setPlanBilgileri(data);
    setShowProductInformation(false);
    setShowProductPersonalInfo(true);
    navigate(steps[2].path);
  };

  // Additional handler to transition to next step
  const handleProductPersonalInfo = () => {
    setShowProductPersonalInfo(true);
    navigate(steps[2].path);
  };

  const activeStep = steps.findIndex(step => step.path === location.pathname);

  useEffect(() => {
    if (activeStep === -1) {
      navigate(steps[0].path); // Uygulama başladığında ilk adıma yönlendir
    }
  }, [activeStep, navigate]);

  const handleBack = () => {
    if (activeStep === 0) return;

    const stepActions = {
      1: () => setShowProductPersonalInfo(false),
      2: () => {
        setShowVerificationCode(false);
        setShowOfferDetail(false);
        setShowPersonalizeOffer(false);
        setShowViewOfferButton(false);
      },
      3: () => {
        setShowProductPersonalInfo(true);
        setShowVerificationCode(false);
        setShowOfferDetail(false);
      },
      4: () => {
        setShowProductPersonalInfo(false);
        setShowVerificationCode(true);
        setShowOfferDetail(false);
      },
      5: () => {
        setShowProductPersonalInfo(false);
        setShowVerificationCode(false);
        setShowOfferDetail(false);
      }
    };

    stepActions[activeStep]?.();
    navigate(steps[activeStep - 1].path);
  };

  const handleOfferCreation = () => {
    setShowProductPersonalInfo(false);
    setShowVerificationCode(true);
    navigate(steps[3].path);
  };

  const handleValidation = () => {
    setShowVerificationCode(false);
    setShowOfferDetail(true);
    navigate(steps[4].path);
  };

  const handleApprovalAndPay = () => {
    setShowApprovalAndPay(true);
    setShowPersonalizeOffer(false);
    setShowViewOfferButton(false);
    navigate(steps[5].path);
  };

  const handleViewOffer = () => {
    setShowViewOfferButton(true);
    setShowPersonalizeOffer(false);
  };

  const handleBackOferDetail = () => {
    setShowOfferDetail(true);
    setShowPersonalizeOffer(false);
    setShowViewOfferButton(false);
  }

  const handlePersonalizeOffer = () => {
    setShowPersonalizeOffer(true);
    setShowViewOfferButton(false);
  };

  const getStepContent = (step) => {
    if (showPersonalizeOffer) {
      return <PersonalizeOffer backOfferDetail={handleBackOferDetail} onProceed={handleApprovalAndPay} planBilgileri={planBilgileri} />;
    }

    if (showViewOfferButton) {
      return <ViewOfferButton backOfferDetail={handleBackOferDetail} onProceed={handleApprovalAndPay} kisiBilgileri={kisiBilgileri} planBilgileri={planBilgileri} />;
    }

    const stepComponents = {
      0: <PersonalInformation onProceed={handleProceed} />,
      1: <ProductInformation onProceed={handleProcedProduct} />,
      2: <Product_PersonalInformation kisiBilgileri={kisiBilgileri} onOfferCreate={handleOfferCreation} />,
      3: <VerificationCode onValidation={handleValidation} kisiBilgileri={kisiBilgileri} />,
      4: <OfferDetail onViewOfferClick={handleViewOffer} onPersonalizeOfferClick={handlePersonalizeOffer} planBilgileri={planBilgileri} />,
      5: <ApprovalAndPay planBilgileri={planBilgileri} />,
    };

    return stepComponents[activeStep] || null;
  };

  return (
    <div className="App">
      <div className="container">
        <div className="white-frame">
          <Container maxWidth="lg" className="form-container">
            <div className="inner-container">
              <div className="button">
                <Tooltip title="Geri" arrow>
                  <button className="back-button" type="button" title="back-button" onClick={handleBack}>
                    <ArrowBackIcon />
                  </button>
                </Tooltip>
              </div>
              <div className="progress">
                <Stepper activeStep={activeStep} alternativeLabel className="stepper-container" connector={<CustomConnector />}>
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <CustomStepLabel
                        active={activeStep === index}
                        completed={activeStep > index}
                        StepIconComponent={() => (
                          <CustomStepIcon active={activeStep === index} completed={activeStep > index}>
                            {index + 1}
                          </CustomStepIcon>
                        )}
                      >
                        {step.label}
                      </CustomStepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
            </div>
            <div className="logo-container">
              <img src="https://seeklogo.com/images/H/hepiyi-logo-34B2A1E680-seeklogo.com.png" alt="Hepı̇ yı̇ Sigorta Logo" className="logo" />
            </div>
          </Container>
        </div>
        <div className="step-content">
          {getStepContent(activeStep)}
        </div>
      </div>
    </div>
  );
};

export default App;
