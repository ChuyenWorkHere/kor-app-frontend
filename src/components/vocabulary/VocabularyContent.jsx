import React, { use, useEffect, useState } from 'react'
import ModeSelector from '../vocabulary/flashcard/ModeSelector';
import Flashcard from './flashcard/Flashcard';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import api from '../../config/axiosConfig';

const modes = ["Flashcard", "Vocabulary", "Quiz", "Write"];
const VocabularyContent = () => {

    const { deckId } = useParams();

    const [deckData, setDeckData] = useState(null);

    useEffect(() => {
        const fetchDeckDetail = async () => {
            try {
                const response = await api.get(`/users/decks/${deckId}`);
                setDeckData(response.data.data);
            } catch (error) {
                toast.error("Lỗi khi tải dữ liệu từ vựng");
            }
        }
        fetchDeckDetail();
    }, [deckId]);

    const [selected, setSelected] = useState("Flashcard");

    return (
        <>
            <ModeSelector modes={modes} selected={selected} setSelected={setSelected} />
            <Flashcard deckData={deckData} />
        </>

    )
}

export default VocabularyContent