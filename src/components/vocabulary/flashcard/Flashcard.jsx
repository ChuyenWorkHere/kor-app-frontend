import React, { useEffect, useRef, useState } from 'react';
import './Flashcard.css';
import { Check, ChevronLeft, ChevronRight, Copy, Volume2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../../config/axiosConfig';
import axios from 'axios';

const TTS_CONFIG = {
    LANG: 'ko',
    PROXY: 'https://api.codetabs.com/v1/proxy',
    GTTS: 'https://translate.google.com/translate_tts',
    DELAY: 300,
    MIME_TYPE: 'audio/mp3'
};

const createTTSUrl = (text) => {
    const encodedText = encodeURIComponent(text);
    const gttsUrl = `${TTS_CONFIG.GTTS}?ie=UTF-8&tl=${TTS_CONFIG.LANG}&client=tw-ob&q=${encodedText}`;
    return `${TTS_CONFIG.PROXY}?quest=${encodeURIComponent(gttsUrl)}`;
};

function Flashcard({ deckData }) {

    const [isFlipped, setIsFlipped] = useState(false);
    const [transitioning, setTransitioning] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const [audioUrl, setAudioUrl] = useState(null);
    const audioRef = useRef(null);
    const flashcards = deckData ? deckData.flashcards : [];

    useEffect(() => {
        let isMounted = true;
        const currentWord = flashcards[wordIndex]?.word;
        
        setAudioUrl(null);

        const fetchAudio = async () => {

            try {

                const response = await axios.get(createTTSUrl(currentWord), {
                    responseType: 'blob'
                });

                const audioBlob = new Blob([response.data], {
                    type: TTS_CONFIG.MIME_TYPE
                });
                const audioObjectUrl = URL.createObjectURL(audioBlob);

                if (isMounted) {
                    setAudioUrl(audioObjectUrl);
                    setTimeout(() => isMounted && audioRef.current?.play(), TTS_CONFIG.DELAY);
                } else {
                    URL.revokeObjectURL(audioObjectUrl);
                }

            } catch (error) {
                toast.error('Lỗi khi tải âm thanh');
            }
        };
        fetchAudio();

        return () => {
            isMounted = false;
        };
    }, [flashcards, wordIndex]);

    const playAudio = (e) => {
        e.stopPropagation();
        audioRef.current?.play();
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        if (transitioning) return;

        setIsFlipped(false);
        setTransitioning(true);

        setTimeout(() => {
            setWordIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
            setTransitioning(false);
        }, 300);
    };

    const handlePrev = () => {
        if (transitioning) return;

        setIsFlipped(false);
        setTransitioning(true);

        setTimeout(() => {
            setWordIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
            setTransitioning(false);
        }, 300);
    };

    return (
        <div className="container d-flex flex-column align-items-center py-4">
            <div className='d-flex align-items-center gap-4'>
                <button
                    className='border-0 rounded py-1'
                    style={{ backgroundColor: "#b8d5faff" }}
                    onClick={handlePrev}>
                    <ChevronLeft size={40} />
                </button>
                {/* Flashcard */}
                <div className={`flashcard-wrapper ${transitioning ? 'is-transitioning' : ''}`}>
                    <div className="flashcard-container my-4">
                        <div
                            className={`flashcard-flipper ${isFlipped ? 'is-flipped' : ''}`}
                            onClick={handleFlip}
                        >
                            {/* Front of Card */}
                            <div className="card-face card-front border border-4 border-primary rounded-5 shadow-lg bg-white d-flex flex-column align-items-center justify-content-center text-center">
                                <div className="position-absolute top-0 end-0 p-3 d-flex gap-1">
                                    <audio src={audioUrl} ref={audioRef}></audio>
                                    <button
                                        type="button"
                                        className="btn btn-light rounded-circle p-2 lh-1"
                                        onClick={(e) => playAudio(e)}
                                    >
                                        <Volume2 size={16} />
                                    </button>
                                    <button type="button" className="btn btn-light rounded-circle p-2 lh-1"><Copy size={16} /></button>
                                </div>
                                <div className="w-75 text-center">
                                    <p className="fs-3 fw-bold text-dark m-0 pt-3">{flashcards[wordIndex]?.word}</p>
                                </div>
                            </div>

                            {/* Back of Card */}
                            <div className="card-face card-back border border-4 border-primary rounded-5 shadow-lg bg-white d-flex flex-column align-items-center justify-content-center text-center">
                                <div className="w-75 text-center">
                                    <p className="fs-3 fw-bold text-dark m-0 pt-3">{flashcards[wordIndex]?.definition}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    className='border-0 rounded py-1'
                    style={{ backgroundColor: "#b8d5faff" }}
                    onClick={handleNext}
                >
                    <ChevronRight size={40} />
                </button>
            </div>


            <div className="d-flex justify-content-between align-items-center w-100" style={{ maxWidth: "384px" }}>
                <button
                    type="button"
                    className="btn d-flex align-items-center rounded-5"
                    style={{ backgroundColor: "#fab8b8ff" }}
                >
                    <X className='text-danger' size={16} /> <span className="ms-2 text-danger fw-medium">Chưa biết</span>
                </button>
                <button
                    type="button"
                    className="btn d-flex align-items-center rounded-5"
                    style={{ backgroundColor: "#c8f0df" }}

                >
                    <Check className='text-success' size={16} /> <span className="ms-2 text-success fw-medium">Đã biết</span>
                </button>
            </div>
        </div>
    );
}

export default Flashcard;