import React, { useState } from 'react';
import { styled } from '@mui/joy/styles';
import Input from '@mui/joy/Input';
import InputMask from 'react-input-mask';
import './personalInformation.css';
import { Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { format, parse } from 'date-fns';

// Styled components for FloatingLabelInput
const StyledInput = styled('input')({
    border: 'none',
    minWidth: 0,
    outline: 0,
    padding: 20,
    paddingTop: '27px',
    flex: 1,
    color: 'inherit',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontStyle: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    textOverflow: 'ellipsis',
    '&::placeholder': {
        opacity: 0,
        transition: '0.1s ease-out',
    },
    '&:focus ~ label, &:not(:placeholder-shown) ~ label, &:-webkit-autofill ~ label': {
        top: '0.5rem',
        fontSize: '0.75rem',
    },
    '&:focus ~ label': {
        color: '#424242',
    },
    '&:-webkit-autofill': {
        alignSelf: 'stretch',
    },
    '&:-webkit-autofill:not(* + &)': {
        marginInlineStart: 'calc(-1 * var(--Input-paddingInline))',
        paddingInlineStart: 'var(--Input-paddingInline)',
        borderTopLeftRadius: 'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
        borderBottomLeftRadius: 'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
    },
});

const StyledLabel = styled('label')(({ theme }) => ({
    position: 'absolute',
    lineHeight: 1,
    top: 'calc((var(--Input-minHeight) - 1em) / 2)',
    color: '#424242',
    fontWeight: 'smaller',
    fontSize: '14px',
    fontFamily: "Poppins, sans-serif",
    transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    top: '21px',
    left: '20px',
}));

const InnerInput = React.forwardRef(function InnerInput({ label, mask, maskChar, ...props }, ref) {
    const id = React.useId();
    return (
        <React.Fragment>
            {mask ? (
                <InputMask mask={mask} maskChar={maskChar} {...props}>
                    {(inputProps) => <StyledInput {...inputProps} ref={ref} id={id} />}
                </InputMask>
            ) : (
                <StyledInput {...props} ref={ref} id={id} />
            )}
            <StyledLabel htmlFor={id}>{label}</StyledLabel>
        </React.Fragment>
    );
});

const FloatingLabelInput = ({ label, placeholder, type, mask, maskChar, value, onChange, name }) => (
    <div style={{
        position: 'relative',
        margin: '20px 0',
        border: '1px solid #bfbfbf',
        width: '548px',
        height: '58px',
        borderRadius: '8px',
        position: 'absolute',
        top: '65px',

    }}>
        <InnerInput
            style={{ width: '530px' }}
            label={label}
            mask={mask}
            maskChar={maskChar}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            name={name}
        />
    </div>
);

const formatToDatabaseDate = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
};
// PersonalInformation Component
const PersonalInformation = ({ onProceed }) => {
    const [tcKimlikNo, setTcKimlikNo] = useState('');
    const [kisiBilgileri, setKisiBilgileri] = useState(null);
    const [error, setError] = useState('');

    const handleTcKimlikNoChange = (e) => {
        setTcKimlikNo(e.target.value);
        // Clear the error message when the input changes
        setErrors({ ...errors, tcKimlikNo: '' });
    };


    const [birthDate, setBirthDate] = useState(null);
    const [birthDateInput, setBirthDateInput] = useState('');
    const [formData, setFormData] = useState({
        tcKimlikNo: '',
        dogumTarihi: '',
    });
    const [errors, setErrors] = useState({
        tcKimlikNo: '',
        dogumTarihi: '',
    });
    const [isExpanded, setIsExpanded] = useState(false);
    const [validationError, setValidationError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error when input changes
        setErrors({ ...errors, [name]: '' });
    };

    const handleDateChange = (date) => {
        setBirthDate(date);
        const formattedDate = date ? format(date, 'dd/MM/yyyy') : ''; // Format the date as dd/MM/yyyy
        setBirthDateInput(formattedDate);
        setFormData({ ...formData, dogumTarihi: formattedDate });
        // Clear error when date changes
        setErrors({ ...errors, dogumTarihi: '' });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for errors
        const newErrors = {
            tcKimlikNo: formData.tcKimlikNo === '' ? 'TC Kimlik No boş bırakılamaz.' :
                formData.tcKimlikNo.length !== 11 ? 'Geçersiz TC Kimlik No girdiniz!' : '',
            dogumTarihi: formData.dogumTarihi === '' ? 'Doğum Tarihi boş bırakılamaz.' : '',
        };

        setErrors(newErrors);

        // If there are errors, stop the submission process
        if (newErrors.tcKimlikNo || newErrors.dogumTarihi) {
            return;
        }

        try {
            // Convert the date from dd/MM/yyyy to yyyy-MM-dd format
            const formattedDateForApi = format(parse(formData.dogumTarihi, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd');

            // Make the API request with the formatted date
            const response = await axios.get(`http://localhost:5017/api/Musteriler/${formData.tcKimlikNo}`);

            // Log the API response
            console.log('API Response:', response.data);

            const data = response.data;

            // Format the date from the API to match the frontend format
            const apiDate = new Date(data.dogum_Tarihi);
            const apiFormattedDate = format(apiDate, 'dd/MM/yyyy');

            if (apiFormattedDate !== formData.dogumTarihi) {
                setValidationError('Kişi bilgileri yanlış. Lütfen tekrar deneyiniz.');
                setKisiBilgileri(null);
            } else {
                setValidationError('');
                setKisiBilgileri(data); // Kişi bilgilerini ayarla
                onProceed(data); // Burada kişi bilgilerini iletiyoruz
            }
        } catch (error) {
            console.error('API Error:', error);
            setValidationError('Kişi bilgileri bulunamadı. Lütfen tekrar deneyiniz.');
            setKisiBilgileri(null);
        }
    };


    const toggleExpand = (e) => {
        e.preventDefault(); // Prevent the default anchor behavior
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <div className="text">
                <div className="text-container">
                    <h1 className='offer-text'>Seyahat Sigortası Teklifi Al!</h1>
                </div>
            </div>
            <div className='offer-pade'>
                <div className='offer-page-form'>
                    <div className='form-head'>
                        <h4>
                            Teklif Bilgileri
                        </h4>
                    </div>
                    <div className='form-under'>
                        <form>
                            <div style={{ marginBottom: '98px' }}>
                                <FloatingLabelInput
                                    label="TC Kimlik No"
                                    placeholder="TC Kimlik No"
                                    type="text"
                                    mask="99999999999"
                                    maskChar=""
                                    name="tcKimlikNo"
                                    value={formData.tcKimlikNo}
                                    onChange={handleInputChange}
                                />

                                {errors.tcKimlikNo && <span className="personalInformation-error-message"
                                    style={{
                                        display: 'flex',
                                        position: 'absolute',
                                        top: '143px',
                                    }}
                                >{errors.tcKimlikNo}</span>}
                            </div>
                            <div style={{ marginBottom: '0px' }}>
                                <DatePicker
                                    placeholderText='Doğum Tarihi'
                                    className='birthDay'
                                    dateFormat='dd/MM/yyyy'
                                    selected={birthDate}
                                    onChange={handleDateChange}
                                    customInput={
                                        <InputMask
                                            mask='99/99/9999'
                                            value={birthDateInput}
                                            onChange={(e) => setBirthDateInput(e.target.value)}
                                            placeholder='Doğum Tarihi'
                                        />
                                    }
                                />
                                {errors.dogumTarihi && <span className="personalInformation-error-message">{errors.dogumTarihi}</span>}
                            </div>

                            <p style={{ fontSize: '13px' }}>
                                İşlenen kişisel verilerinize ilişkin ayrıntılı bilgiye&nbsp;
                                <a href='https://hepiyi.com.tr/media/ypodapvu/metin_1_b11_hepiyi_sigorta_teklif_ayd%C4%B1nlatma_metni_19082022.pdf'
                                    target='_blank'
                                    className='no-underline'>
                                    Aydınlatma Metni
                                </a>
                                ’nden ulaşabilirsiniz.
                            </p>

                            {validationError && <p className="validation-error-message" style={{ color: 'red', marginTop: '10px' }}>{validationError}</p>}

                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                style={{ backgroundColor: '#fc4847', color: 'white', textTransform: 'capitalize', fontWeight: 'bolder', marginTop: '20px', top: '50px', width: '330px', height: '58px', left: '110px', borderRadius: '8px' }}
                            >
                                Fiyatı Gör
                            </Button>
                        </form>
                    </div>
                    {kisiBilgileri && (
                        <div>
                            <p>Ad: {kisiBilgileri.ad}</p>
                            <p>Soyad: {kisiBilgileri.soyad}</p>
                            <p>TC Kimlik No: {kisiBilgileri.tc_KimlikNo}</p>
                            <p>Doğum Tarihi: {kisiBilgileri.dogum_Tarihi}</p>
                            <p>Cep Telefonu: {kisiBilgileri.Cep_Tel}</p>

                        </div>
                    )}
                </div>
            </div>

            <div className='doganLogo'>
                <img src='https://seeklogo.com/images/D/dogan-holding-logo-C043FDA89B-seeklogo.com.png' alt='Dogan Logo' className='dogan-img' />
            </div>

            <div className='text-travel-health-insurance-offer' style={{ fontSize: '15.4px' }}>
                <h4>Seyahat Sağlık Sigortası Teklif Al</h4>
                <p>
                    Seyahat sağlık sigortası, yurt dışında karşılaşabileceğiniz hastalık, kaza, acil durum, valiz kaybı ve benzeri riskleri güvence altına alan bir sigorta türüdür. Sağlık sigortası yaptırarak yurt dışı seyahatlerinizde kendinizi ve sevdiklerinizi olası tatsızlıklara karşı güvence altına alabilir ve gönül rahatlığıyla seyahatinizi gerçekleştirebilirsiniz. Yurt dışı sağlık sigortası,
                    özellikle vize başvuruları söz konusu olduğunda zorunlu tutulan bir sigorta türü olup yurt dışı seyahatlerinde yolcuların güvenle yolculuklarını gerçekleştirmesini sağlar. Siz de <strong> &nbsp;seyahat sigortası teklifi</strong> nizi Hepiyi Sigorta’dan alın, tatillerinize güvenle çıkın!
                </p>
                {isExpanded && (
                    <div className="additional-info">
                        <h4>Seyahat Sağlık Sigortası Satın Almadan Önce Nelere Dikkat Etmeli?</h4>
                        <p><strong>Seyahat sağlık sigortası nasıl alınır,</strong></p>
                        <p>
                            <strong>Seyahat sağlık sigortası alırken nelere dikkate etmek gerekir</strong> &nbsp;diye baktığımızda teminatları detaylı inceleyerek bir sigorta yaptırmanın en uygunu olduğunu söyleyebiliriz. Teminatlar ihtiyacınızı karşılıyor mu, fiyat bütçenize uygun mu, vize alınacaksa poliçe konsoloslukların istediği şartları birebir karşılıyor mu… gibi soruların yanıtlarını aramakta fayda
                            var. Hepiyi Sigorta, tüm yurt dışı tatillerinizde birçok riske karşı kendinizi güvence altına alma fırsatı sunar. Ayrıca Hepiyi Sigorta'dan yaptıracağınız yurt dışı seyahat sağlık sigortası vize işlemlerinde zorunlu tutulan seyahat sağlık sigortasını tam anlamıyla karşılamaktadır.
                        </p>
                        <p>
                            Herhangi bir yurt dışı tatili ya da iş gezisi öncesi seyahat sigortası yaptırmadan önce dikkat etmeniz gereken belli başlı noktalardan bir tanesi de elbette <strong>fiyat.</strong>
                            &nbsp;Seyahat sağlık sigortası fiyatları hakkında detaylı bilgi almak için hemen <strong> &nbsp;teklif al</strong> &nbsp;butonuna tıklayarak bilgi alabilirsiniz.
                        </p>
                    </div>
                )}
                <a
                    href="#" // Keep href but prevent default behavior
                    onClick={toggleExpand}
                    className="toggle-link"
                >
                    {isExpanded ? 'Devamını Gizle' : 'Devamını Gör'}
                </a>
            </div>
        </div>
    );
};

export default PersonalInformation;
