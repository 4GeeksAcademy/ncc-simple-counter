import React, { useState, useEffect } from 'react';

const SecondsCounter = ({ seconds = 0 }) => {
    const [currentSeconds, setCurrentSeconds] = useState(seconds);
    const [isRunning, setIsRunning] = useState(true);
    const [countdownTarget, setCountdownTarget] = useState('');
    const [isCountdown, setIsCountdown] = useState(false);
    
    const getDigits = (num) => {
        return num.toString().padStart(6, '0').split('');
    };
    const digits = getDigits(currentSeconds);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setCurrentSeconds(prev => {
                    if (isCountdown) {
                        if (prev <= 0) {
                            alert('¡Tiempo alcanzado!');
                            setIsRunning(false);
                            return 0;
                        }
                        return prev - 1;
                    } else {
                        return prev + 1;
                    }
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning, isCountdown]);

    const handlePause = () => setIsRunning(false);
    const handleResume = () => setIsRunning(true);
    const handleReset = () => {
        setCurrentSeconds(seconds);
        setIsRunning(false);
    };

    const handleCountdownStart = () => {
        const target = parseInt(countdownTarget);
        if (!isNaN(target) && target > 0) {
            setCurrentSeconds(target);
            setIsCountdown(true);
            setIsRunning(true);
        }
    };

return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <h1 className="mb-4">Contador de Segundos</h1>
                    
                    <div className="d-flex justify-content-center align-items-center mb-4">
                        <div className="me-3 clock-icon">
                            <i className="fas fa-clock"></i>
                        </div>
                        <div className="d-flex">
                            {digits.map((digit, index) => (
                                <div key={index} className="bg-dark text-white mx-1 d-flex align-items-center justify-content-center digit-box">
                                    {digit}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <button className="btn btn-success me-2" onClick={handleResume} disabled={isRunning}>Iniciar</button>
                        <button className="btn btn-warning me-2" onClick={handlePause} disabled={!isRunning}>Pausar</button>
                        <button className="btn btn-danger me-2" onClick={handleReset}>Reiniciar</button>
                    </div>

                    <div className="card mt-4 countdown-card">
                        <div className="card-body">
                            <h5 className="card-title">Cuenta Regresiva</h5>
                            <div className="input-group mb-3">
                                <input type="number" className="form-control" placeholder="Ingresa segundos" 
                                       value={countdownTarget} onChange={(e) => setCountdownTarget(e.target.value)} />
                                <button className="btn btn-primary" onClick={handleCountdownStart}>Iniciar Countdown</button>
                            </div>
                            {isCountdown && (
                                <button className="btn btn-secondary btn-sm" onClick={() => {
                                    setIsCountdown(false);
                                    setCurrentSeconds(seconds);
                                    setIsRunning(true);
                                }}>Volver a contador normal</button>
                            )}
                        </div>
                    </div>

                    <div className="mt-4">
                        <span className={`badge ${isRunning ? 'bg-success' : 'bg-secondary'} me-2`}>
                            {isRunning ? 'Ejecutándose' : 'Pausado'}
                        </span>
                        {isCountdown && <span className="badge bg-info">Modo Cuenta Regresiva</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecondsCounter;