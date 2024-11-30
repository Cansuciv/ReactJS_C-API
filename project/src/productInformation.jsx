import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { Popper } from '@mui/base/Popper';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TextField from '@mui/material/TextField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './productInformation.css';
import OfferDetail from './offerDetail.jsx';
import ApprovalAndPay from './approvalAndPay.jsx';
// combobox düzenlemeleri
const StyledAutocompleteRoot = styled('div')`
  font-family: "Poppins", sans-serif;  font-weight: 400;  border-radius: 8px;  color: black;  background: white;
  border: 1px solid #bfbfbf; display: flex; gap: 5px;  padding-right: 5px;  overflow: hidden;
  width: 545px;  height: 57px; position: relative; `;

// options düzenlemeleri
const StyledInput = styled('input')`
  font-size: 0.8705rem;  font-family: inherit;  font-weight: 400; line-height: 1.5; color: black;  background: inherit;
  border: none; border-radius: inherit;  padding: 8px 12px; outline: 0; flex: 1 0 auto; position: relative;
  z-index: 1; box-sizing: border-box;  &:focus + label,
  &.focused + label { top: -8px;  left: 12px;  font-size: 0.75rem;  color: #977ef9; }
  &:not(:placeholder-shown) + label { top: -8px; left: 12px;  font-size: 0.75rem;  color: #977ef9;  }`;

const StyledPopper = styled('div')`
  position: relative;  z-index: 1300; width: 545px; `;

const StyledListbox = styled('ul')`
  font-family: "Poppins", sans-serif;  font-size: 0.875rem; box-sizing: border-box;  padding: 6px; margin: 12px 0;  min-width: 545px;  border-radius: 12px;
  overflow: auto;  outline: 0;  max-height: 300px;  z-index: 1;  background: white; border: 1px solid #bfbfbf;  color: black;`;

const StyledOption = styled('li')`
  list-style: none;  padding: 8px;   cursor: default;  &.Mui-focused,
  &.Mui-focusVisible { background-color: #977ef9;  color: white; }`;

const StyledPopupIndicator = styled('div')`
  color: black; outline: 0; border: 0;  background-color: transparent;
  align-self: center;  padding: 0 8px;  display: flex;  align-items: center; justify-content: center;  cursor: pointer;
  &.popupOpen > svg { transform: translateY(2px) rotate(180deg);  }`;

const StyledNoOptions = styled('li')`
  list-style: none;  padding: 10px;`;

// Autocomplete Component
const Autocomplete = React.forwardRef(function Autocomplete(props, ref) {
    const { disableClearable = false, disabled = false, readOnly = false,
        options = [], ...other } = props;
    const { getRootProps, getInputProps, getPopupIndicatorProps, getListboxProps, getOptionProps, popupOpen,
        focused, anchorEl, setAnchorEl, groupedOptions, } = useAutocomplete({
            ...props, componentName: 'BaseAutocompleteIntroduction',
        });
    const rootRef = useForkRef(ref, setAnchorEl);

    return (
        <React.Fragment>
            <StyledAutocompleteRoot {...getRootProps(other)} ref={rootRef} className={focused ? 'focused' : undefined}  >
                <StyledInput id={props.id} disabled={disabled} readOnly={readOnly}  {...getInputProps()}
                    placeholder={props.placeholder} className={focused ? 'focused' : undefined} />
                <StyledPopupIndicator  {...getPopupIndicatorProps()} className={popupOpen ? 'popupOpen' : undefined} > <ArrowDropDownIcon />
                </StyledPopupIndicator> </StyledAutocompleteRoot>
            {anchorEl && (
                <Popper open={popupOpen} anchorEl={anchorEl} style={{ zIndex: 1300 }}  >
                    <StyledListbox {...getListboxProps()}>
                        {groupedOptions.map((option, index) => {
                            const optionProps = getOptionProps({ option, index });
                            return <StyledOption key={index} {...optionProps}>{option.label}</StyledOption>;
                        })}
                        {groupedOptions.length === 0 && (
                            <StyledNoOptions>No results</StyledNoOptions>)}
                    </StyledListbox>
                </Popper>
            )}
        </React.Fragment>
    );
});

Autocomplete.propTypes = {
    options: PropTypes.array.isRequired, disableClearable: PropTypes.bool,
    disabled: PropTypes.bool, readOnly: PropTypes.bool, placeholder: PropTypes.string.isRequired,
};

// FloatingLabelInput Component
const FloatingLabelInput = ({ label, placeholder, type, options, onChange, value, error }) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleChange = (event) => {
        onChange(event.target.value);
        if (event.target.value) {
            setIsFocused(true);
        } else {
            setIsFocused(false);
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            {options ? (
                <Autocomplete options={options}
                    onChange={(event, value) => onChange(value)} placeholder={placeholder} />
            ) : (
                <TextField placeholder={placeholder} type={type} value={value} onChange={handleChange} variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: isFocused || value, }}
                    error={!!error} helperText={error}
                    sx={{
                        marginTop: '10px',
                        '& label.Mui-focused': { color: '#977ef9', },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#bfbfbf', },
                            '&:hover fieldset': { borderColor: '#bfbfbf' },
                            '&.Mui-focused fieldset': { borderColor: '#bfbfbf', },
                            '& input': { color: 'black', fontSize: '14px', height: '24px', },
                            width: '100%', borderRadius: '10px',
                        },
                    }} />)}
            <label style={{
                position: 'absolute', top: isFocused || value ? '-8px' : '50%', left: '12px', transform: 'translateY(-50%)',
                fontSize: isFocused || value ? '0.75rem' : '1rem', color: isFocused || value ? '#977ef9' : 'rgba(0, 0, 0, 0.54)', transition: '0.2s',
            }}>{label}
            </label>
        </div>
    );
};

// ProductInformation Component
const ProductInformation = ({ onProceed }) => {
    const [geographicArea, setGeographicArea] = React.useState('');
    const [policyStartDate, setPolicyStartDate] = React.useState(null);
    const [policyDuration, setPolicyDuration] = React.useState('');
    const [policyEndDate, setPolicyEndDate] = React.useState(null);
    const [error, setError] = React.useState('');
    const [startDateError, setStartDateError] = React.useState('');
    const [durationError, setDurationError] = React.useState('');
    const [endDateError, setEndDateError] = React.useState('');
    const [planBilgileri, setPlanBilgileri] = useState(null);
    const [validationError, setValidationError] = React.useState('');

    React.useEffect(() => {
        if (geographicArea) {
            const today = new Date();
            setPolicyStartDate(today);
            setStartDateError('');
        }
    }, [geographicArea]);

    React.useEffect(() => {
        if (policyStartDate && policyDuration) {
            setPolicyEndDate(calculateEndDate(policyStartDate, policyDuration));
        }
    }, [policyStartDate, policyDuration]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;

        if (!geographicArea) {
            setError('Devam etmek için seçmeniz gerekmektedir.');
            valid = false;
        } else {
            setError('');
        }

        if (valid) {
            if (!policyEndDate) {
                setEndDateError('Poliçe bitiş tarihi boş bırakılamaz!');
                valid = false;
            } else {
                setEndDateError('');
            }
        }

        if (valid) {
            const planType = geographicArea?.value || geographicArea;
            const duration = policyDuration?.value || policyDuration;

            try {
                const response = await fetch(`http://localhost:5017/api/SigortaPlan/GetSigortaPlanByTypeAndDuration?plan_tipi=${encodeURIComponent(planType)}&sure_gun=${encodeURIComponent(duration)}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('API Response:', data); // Log the entire API response data

                onProceed(data); // Pass data to the next component
            } catch (error) {
                console.error('Error fetching plan details:', error);
                setError('Hata oluştu, lütfen tekrar deneyin.');
            }
        }
    };

    const handleGeographicAreaChange = (value) => {
        setGeographicArea(value);
        setError('');
    };

    const handlePolicyDurationChange = (value) => {
        setPolicyDuration(value);
        setDurationError('');
        setEndDateError(''); // Clear end date error when duration changes
    };

    const handlePolicyStartDateChange = (date) => {
        setPolicyStartDate(date);
        setStartDateError('');
    };

    const handlePolicyEndDateChange = (date) => {
        setPolicyEndDate(date);
        setEndDateError('');
    };

    return (
        <div>
            <div className='product-text'>
                <div className='product-text-container'>
                    <h1 className='product-offer-text'>Devam edebilmemiz için ürün bilgilerine ihtiyacımız var.</h1>
                </div>
            </div>
            <div className='product-offer-pade'>
                <div className='product-offer-page-form'>
                    <div className='product-form-head'>
                        <h4>Teklif Bilgileri</h4>
                    </div>

                    <div className='product-form-under'>
                        <form onSubmit={handleSubmit}>
                            <FloatingLabelInput
                                placeholder="Coğrafi Alan Seçiniz"
                                options={[
                                    { label: 'Yurt Dışı Seyahat Sigortası Vize - Tüm Dünya', value: 'Yurt Dışı Seyahat Sigortası Vize - Tüm Dünya' },
                                    { label: 'Yurt Dışı Seyahat Sigortası Vize - SCHENGEN', value: 'Yurt Dışı Seyahat Sigortası Vize - SCHENGEN' },
                                    { label: 'Yurt Dışı Eğitim Seyahat Sigortası', value: 'Yurt Dışı Eğitim Seyahat Sigortası' }
                                ]}
                                onChange={handleGeographicAreaChange}
                                value={geographicArea}
                            />
                            {error && <p style={{ color: 'red', position: 'absolute', top: '130px' }} >{error}</p>}
                            <DatePicker
                                selected={policyStartDate}
                                onChange={handlePolicyStartDateChange}
                                dateFormat='dd/MM/yyyy'
                                placeholderText='Poliçe Başlangıç Tarihi'
                                className='custom-datepicker'
                                popperPlacement='bottom'
                                shouldCloseOnSelect={true}
                                popperProps={{ positionFixed: true }} />
                            <FloatingLabelInput
                                placeholder='Poliçe Süresi Seçiniz'
                                type='text'
                                options={[
                                    { label: '3 Gün', value: 3 },
                                    { label: '8 Gün', value: 8 },
                                    { label: '15 Gün', value: 15 },
                                    { label: '31 Gün', value: 31 },
                                    { label: '91 Gün', value: 91 },
                                    { label: '182 Gün', value: 182 },
                                    { label: '365 Gün', value: 365 }
                                ]}
                                onChange={handlePolicyDurationChange}
                                value={policyDuration}
                            />
                            <DatePicker
                                selected={policyEndDate}
                                onChange={handlePolicyEndDateChange}
                                dateFormat='dd/MM/yyyy'
                                placeholderText='Poliçe Bitiş Tarihi'
                                className='custom-datepicker'
                                popperPlacement='bottom'
                                shouldCloseOnSelect={true}
                                popperProps={{
                                    positionFixed: true
                                }}
                            />
                            {endDateError && <p style={{ color: 'red', position: 'absolute', top: '370px' }} >{endDateError}</p>}
                            <Button
                                onClick={handleSubmit}
                                type="submit"
                                style={{
                                    backgroundColor: '#fc4847', color: 'white', textTransform: 'capitalize', fontWeight: 'bolder',
                                    marginTop: '20px', top: '50px', width: '330px', height: '58px', left: '110px', borderRadius: '8px'
                                }} >  Devam </Button>
                        </form>
                    </div>
                </div>
            </div>
            <div className='product-doganLogo'>
                <img src='https://seeklogo.com/images/D/dogan-holding-logo-C043FDA89B-seeklogo.com.png' alt='Dogan Logo' className='product-dogan-img' />
            </div>
        </div>
    );
};


// poliçe Başlangıç Tarihi + Poliçe Süresi Seçiniz
const calculateEndDate = (startDate, duration) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration.value);
    return endDate;
};

export default ProductInformation;
