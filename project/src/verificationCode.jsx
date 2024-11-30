// verificationCode.jsx
import React from 'react';
import { Input as BaseInput } from '@mui/base/Input';
import { Box, styled } from '@mui/system';
import './verificationCode.css';

// OTP bileşeni
function OTP({ length, value, onChange, onSubmit }) {
    const inputRefs = React.useRef(new Array(length).fill(null));

    const focusInput = (targetIndex) => {
        const targetInput = inputRefs.current[targetIndex];
        if (targetInput) {
            targetInput.focus();
        }
    };

    const selectInput = (targetIndex) => {
        const targetInput = inputRefs.current[targetIndex];
        if (targetInput) {
            targetInput.select();
        }
    };

    const handleKeyDown = (event, currentIndex) => {
        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                if (currentIndex > 0) {
                    focusInput(currentIndex - 1);
                    selectInput(currentIndex - 1);
                }
                break;
            case 'ArrowRight':
                event.preventDefault();
                if (currentIndex < length - 1) {
                    focusInput(currentIndex + 1);
                    selectInput(currentIndex + 1);
                }
                break;
            case 'Delete':
                event.preventDefault();
                onChange((prevOtp) => prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1));
                break;
            case 'Backspace':
                event.preventDefault();
                if (currentIndex > 0) {
                    focusInput(currentIndex - 1);
                    selectInput(currentIndex - 1);
                }
                onChange((prevOtp) => prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1));
                break;
            default:
                break;
        }
    };

    const handleChange = (event, currentIndex) => {
        const currentValue = event.target.value;
        let indexToEnter = 0;

        while (indexToEnter <= currentIndex) {
            if (inputRefs.current[indexToEnter]?.value && indexToEnter < currentIndex) {
                indexToEnter += 1;
            } else {
                break;
            }
        }

        onChange((prev) => {
            const otpArray = prev.split('');
            const lastValue = currentValue[currentValue.length - 1];
            otpArray[indexToEnter] = lastValue;
            return otpArray.join('');
        });

        if (currentValue !== '' && currentIndex < length - 1) {
            focusInput(currentIndex + 1);
        }
    };

    const handleClick = (event, currentIndex) => {
        selectInput(currentIndex);
    };

    const handlePaste = (event, currentIndex) => {
        event.preventDefault();
        const clipboardData = event.clipboardData;
        if (clipboardData.types.includes('text/plain')) {
            let pastedText = clipboardData.getData('text/plain').substring(0, length).trim();
            let indexToEnter = 0;

            while (indexToEnter <= currentIndex) {
                if (inputRefs.current[indexToEnter]?.value && indexToEnter < currentIndex) {
                    indexToEnter += 1;
                } else {
                    break;
                }
            }

            const otpArray = value.split('');
            for (let i = indexToEnter; i < length; i += 1) {
                otpArray[i] = pastedText[i - indexToEnter] ?? ' ';
            }

            onChange(otpArray.join(''));
        }
    };

    React.useEffect(() => {
        if (value === '111111') {
            onSubmit(true);
        } else if (value.length === length) {
            onSubmit(false);
        }
    }, [value, length, onSubmit]);

    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', position: 'absolute', top: '130px', }}>
            {new Array(length).fill(null).map((_, index) => (
                <React.Fragment key={index}>
                    <BaseInput
                        slots={{ input: InputElement }}
                        aria-label={`Digit ${index + 1} of OTP`}
                        slotProps={{
                            input: {
                                ref: (ele) => {
                                    inputRefs.current[index] = ele;
                                },
                                onKeyDown: (event) => handleKeyDown(event, index),
                                onChange: (event) => handleChange(event, index),
                                onClick: (event) => handleClick(event, index),
                                onPaste: (event) => handlePaste(event, index),
                                value: value[index] ?? '',
                            },
                        }}
                    />
                </React.Fragment>
            ))}
        </Box>
    );
}

// VerificationCode bileşeni
function VerificationCode({ onValidation, kisiBilgileri }) {
    const [otp, setOtp] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = (isValid) => {
        if (isValid) {
            onValidation(); // Bu satırda hata oluşuyor olabilir
        } else {
            setError('Doğrulama kodu yanlış. Lütfen tekrar deneyiniz.');
        }
    };
    const formatPhoneNumber = (phoneNumber) => {
        if (phoneNumber.length < 4) return phoneNumber;
        const firstTwo = phoneNumber.slice(0, 2);
        const lastTwo = phoneNumber.slice(-2);
        return `${firstTwo}********${lastTwo}`;
    };
    const formattedPhoneNumber = formatPhoneNumber(kisiBilgileri.cep_Tel || '');
    return (
        <div>
            <div className="verificationCode-text">
                <div className="verificationCode-text-container">
                    <h1 className='verificationCode-offer-text'>
                        Lütfen cep telefonunuza gönderilen doğrulama kodunu giriniz...
                    </h1>
                </div>
            </div>

            <div className='verificationCode-offer-pade'>
                <div className='verificationCode-offer-page-form'>
                    <div className='verificationCode-form-head'>
                        <h4>
                            {formattedPhoneNumber} numaralı telefona gelen doğrulama kodunu girmenizi rica ederiz.
                        </h4>

                        <button style={{
                            backgroundColor: '#977ef9', color: 'white', width: '165px', height: '40px', border: 'none',
                            borderRadius: '8px', position: 'absolute', top: '75px', left: '188px', fontWeight: 'bold',
                        }}>
                            Numaramı Güncelle </button>
                        {/* OTP bileşenini ekledik */}
                        <div className='otp-container'>
                            <OTP value={otp} onChange={setOtp} length={6} onSubmit={handleSubmit} />
                        </div>
                        {error && <div className="error-message">{error}</div>}
                    </div>
                </div>
            </div>

            <div className='verificationCode-doganLogo'>
                <img src='https://seeklogo.com/images/D/dogan-holding-logo-C043FDA89B-seeklogo.com.png' alt='Dogan Logo' className='verificationCode-dogan-img' />
            </div>
        </div>
    );
}

export default VerificationCode;

// InputElement styled bileşeni
const InputElement = styled('input')`
  width: 100%;
  height: 45px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 10px;
  text-align: center;
  color: black;
  background: white;
  border: 1px solid #bfbfbf;

  &:focus-visible {
    outline: 0;
  }
`;
