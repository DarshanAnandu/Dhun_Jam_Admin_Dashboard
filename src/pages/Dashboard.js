import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Amounts',
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                color: '#FFFFFF',
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false,
            },
            ticks: {
                display: false,
            },
            max: 100,
        },
    },
    elements: {
        bar: {
            borderWidth: 100,
            borderColor: '#F0C3F1',
            backgroundColor: 'rgba(240, 195, 241, 0.2)',
            hoverBackgroundColor: 'rgba(240, 195, 241, 0.4)',
            hoverBorderColor: 'rgba(240, 195, 241, 1)',
        },
    },
};

const Dashboard = () => {
    const location = useLocation();
    const token = location.state || {};
    const id = localStorage.getItem('id');
    const [chargeCustomers, setChargeCustomers] = useState(false);
    const putUrl = `https://stg.dhunjam.in/account/admin/${id}`;
    const navigate = useNavigate();
    const [isSaveButtonEnabled, setSaveButtonEnabled] = useState(false);
    const [name, setName] = useState('');
    const [Location, setLocation] = useState('');

    const [amount, setAmount] = useState({
        category_6: 0,
        category_7: 0,
        category_8: 0,
        category_9: 0,
        category_10: 0,
    });

    const [modifiedAmount, setModifiedAmount] = useState({
        category_6: 0,
        category_7: 0,
        category_8: 0,
        category_9: 0,
        category_10: 0,
    });

    const [convertingNumbers, setConvertingNumbers] = useState({
        category_6: 0,
        category_7: 0,
        category_8: 0,
        category_9: 0,
        category_10: 0,
    });
    const minValues = [79, 59, 39, 19];

    const handleSave = async () => {
        try {
            const modifiedFields = {};
            Object.keys(modifiedAmount).forEach((key) => {
                if (amount[key] !== modifiedAmount[key]) {
                    modifiedFields[key] = modifiedAmount[key];
                }
            });

            if (Object.keys(modifiedFields).length === 0) {
                return;
            }

            const response = await fetch(putUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    amount: modifiedFields,
                }),
            });

            if (!response.ok) {
                console.log('Bad Response for Put request', response);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            console.log('PUT Request Successful:', result);
            setAmount((prevAmount) => ({ ...prevAmount, ...modifiedFields }));
            fetchData();
        } catch (error) {
            console.error('PUT is not worked - Error:', error);
        }
    };

    const fetchData = async () => {
        try {
            console.log('fetch');
            const response = await fetch(putUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                console.log('Bad Response for GET request', response);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            if (result && result.data) {
                setChargeCustomers(result.data.charge_customers);
                setName(result.data.name);
                setLocation(result.data.location);
                setAmount((prevAmount) => ({
                    ...prevAmount,
                    ...result.data.amount,
                }));
                setConvertingNumbers({
                    ...result.data.amount,
                });
                setModifiedAmount({
                    category_6: 0,
                    category_7: 0,
                    category_8: 0,
                    category_9: 0,
                    category_10: 0,
                });
            }
        } catch (error) {
            console.error('GET is not worked - Error:', error);
        }
    };
    useEffect(() => {
        console.log('check');
        const newSaveButtonEnabled =
            convertingNumbers.category_6 > 99 &&
            convertingNumbers.category_7 > 79 &&
            convertingNumbers.category_8 > 59 &&
            convertingNumbers.category_9 > 39 &&
            convertingNumbers.category_10 > 19;

        setSaveButtonEnabled(newSaveButtonEnabled);
    }, [convertingNumbers]);
    useEffect(() => {
        fetchData();
    }, []);
    const calculateData = () => {
        const oldMin = 0;
        const oldMax = Math.ceil(Math.max(0, ...Object.values(convertingNumbers)) / 100) * 100;
        const newMin = 0;
        const newMax = 100;
        const convertedNumbers = {};
        for (const key in convertingNumbers) {
            if (Object.hasOwnProperty.call(convertingNumbers, key)) {
                convertedNumbers[key] =
                    ((Math.max(0, convertingNumbers[key]) - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
            }
        }
        return convertedNumbers;
    };
    const convertedNumbers = calculateData();
    const barChartData = {
        labels: ['Category 6', 'Category 7', 'Category 8', 'Category 9', 'Category 10'],
        datasets: [
            {
                label: 'Amount',
                backgroundColor: '#F0C3F1',
                borderColor: '#C08BCB',
                borderWidth: 1,
                hoverBackgroundColor: '#E0A3E8',
                hoverBorderColor: '#C08BCB',
                data: Object.values(convertedNumbers),
            },
        ],
    };
    const isEligible = (convertingNumbers) => {
        if (
            convertingNumbers.category_6 > 99 &&
            convertingNumbers.category_7 > 79 &&
            convertingNumbers.category_8 > 59 &&
            convertingNumbers.category_9 > 39 &&
            convertingNumbers.category_10 > 19
        ) {
            setSaveButtonEnabled(true);
        } else {
            setSaveButtonEnabled(false);
        }
    };
    const handleInputChange = (category, value) => {
        setModifiedAmount((prevModifiedAmount) => ({
            ...prevModifiedAmount,
            [category]: value,
        }));
        setConvertingNumbers((prevConvertingNumbers) => ({
            ...prevConvertingNumbers,
            [category]: value,
        }));
        isEligible(convertingNumbers);
    };
    return (
        <div className="dashboard-page">
            <h2 className="headings">
                {name}, {Location} on Dhun Jam
            </h2>
            <div className="cols">
                {!chargeCustomers && (
                    <div className="contents">
                        <label className="lables">
                            Do you want to charge your customers for requesting songs?
                        </label>
                    </div>
                )}
                {chargeCustomers && (
                    <div className="contents">
                        <label className="lables">
                            Do you want to charge your customers for requesting songs?
                        </label>
                        <label className="lables">Custom song request amount-</label>
                        <label className="lables">
                            Regular song request amounts, from high to low-
                        </label>
                    </div>
                )}
                <div className="inputs">
                    <div className="datas1">
                        <div className="radio">
                            <input
                                type="radio"
                                id="yes"
                                name="chargeCustomers"
                                checked={chargeCustomers}
                                onChange={() => setChargeCustomers(true)}
                                required
                            />
                            <label htmlFor="yes">Yes</label>
                        </div>
                        <div className="radio">
                            <input
                                type="radio"
                                id="no"
                                name="chargeCustomers"
                                checked={!chargeCustomers}
                                onChange={() => setChargeCustomers(false)}
                                required
                            />
                            <label htmlFor="no">No</label>
                        </div>
                    </div>
                    {chargeCustomers && (
                        <div className="datas2">
                            <input
                                type="number"
                                className={`num ${convertingNumbers.category_6 > 99 ? '' : 'ineligible'}`}
                                value={convertingNumbers.category_6}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value, 10);
                                    handleInputChange('category_6', value);
                                    console.log(value);
                                }}
                            />
                        </div>
                    )}
                    {chargeCustomers && (
                        <div className="datas3">
                            {['category_7', 'category_8', 'category_9', 'category_10'].map(
                                (category, index) => (
                                    <div key={index} className="datas">
                                        <input
                                            type="number"
                                            className={`num ${minValues[index] < convertingNumbers[category]
                                                ? ''
                                                : 'ineligible'
                                                }`}
                                            value={convertingNumbers[category]}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value, 10);
                                                handleInputChange(category, value);
                                                console.log(value);
                                            }}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
            {chargeCustomers && (
                <div className="bar-container">
                    <label>Bar Chart</label>
                    <Bar data={barChartData} className="bar-chart" options={options} />
                </div>
            )}

            <div className="btn">
                <button
                    className={`sgn-btn ${isSaveButtonEnabled ? '' : 'disabled'}`}
                    onClick={(e) => {
                        e.preventDefault();
                        if (isSaveButtonEnabled) {
                            console.log('clicked');
                            handleSave();
                        } else {
                            console.log('btn disabled 3');
                        }
                    }}
                    // onMouseOver={() => { isSaveButtonEnabled }}
                    disabled={!isSaveButtonEnabled}
                >
                    Save
                </button>

                <span
                    className="reg"
                    onClick={() => {
                        localStorage.setItem('loggedIn', 'false');
                        navigate('/');
                    }}
                >
                    Logout ?
                </span>
            </div>
        </div>
    );
};

export default Dashboard;
