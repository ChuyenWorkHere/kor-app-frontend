import { ChevronsLeft, CirclePlus, RefreshCcwDot, Trash2 } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createDeck, updateDeck } from "../../../features/vocabularySlice";
import api from "../../../config/axiosConfig";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { parseExcelFile } from "../../../utils/fileUtils";


const FORM_CONFIG = {
    MAX_NAME_LENGTH: 100,
    MAX_DESC_LENGTH: 500,
    MIN_CARDS: 1,
    DEFAULT_CARD: { id: null, word: '', definition: '' },
};

export default function DeckForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { deckId } = useParams();
    const [currentDeck, setCurrentDeck] = useState(null);
    const [isPublic, setIsPublic] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [cards, setCards] = useState([FORM_CONFIG.DEFAULT_CARD]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!deckId)
            return;
        setLoading(true);
        api.get(`/users/decks/${deckId}`)
            .then(response => { setCurrentDeck(response.data.data) })
            .catch(error => { toast.error(error.response?.data || "Lỗi khi lấy dữ liệu từ vựng") })
            .finally(() => setLoading(false));
    }, [deckId]);

    useEffect(() => {
        if (currentDeck) {
            setIsPublic(!currentDeck.hide);
            setName(currentDeck.name);
            setDescription(currentDeck.description);
            setCards(currentDeck.flashcards || [FORM_CONFIG.DEFAULT_CARD]);
        }
    }, [currentDeck]);


    const handleAddCard = () => {
        setCards([...cards, FORM_CONFIG.DEFAULT_CARD]);
    };

    const handleRemoveCard = (index) => {
        if (cards.length === FORM_CONFIG.MIN_CARDS) {
            toast.error("Bộ thẻ cần chứa ít nhất 1 từ vựng");
            return;
        }
        const newCards = cards.filter((_, i) => i !== index);
        setCards(newCards);
    };

    const handleChange = (index, field, value) => {
        const updated = [...cards];
        updated[index][field] = value;
        setCards(updated);
    };

    const handleSubmit = useCallback(async () => {
        if (!name || !description || !cards.some(card => card.word && card.definition)) {
            toast.error('Vui lòng điền đầy đủ thông tin');
            return;
        }

        setLoading(true);
        try {
            const deckData = { name, description, hide: !isPublic, flashcards: cards };
            if (deckId) {
                await dispatch(updateDeck({ id: deckId, ...deckData })).unwrap();
                toast.success('Cập nhật bộ từ vựng thành công!');
            } else {
                await dispatch(createDeck(deckData)).unwrap();
                toast.success('Tạo bộ từ vựng thành công!');
            }
            navigate('/vocabulary');
        } catch (error) {
            toast.error(error.message || `Lỗi khi ${deckId ? 'cập nhật' : 'tạo'} bộ từ vựng`);
        } finally {
            setLoading(false);
        }
    }, [name, description, isPublic, cards, deckId, dispatch, navigate]);

    const handleDelete = async () => {
        try {
            setLoading(true);
            await api.delete(`/users/me/decks/${deckId}`);
            toast.success("Xóa bộ từ vựng thành công!");
            navigate("/vocabulary");
        } catch (error) {
            toast.error(error.message || "Có lỗi xảy ra khi xóa bộ từ vựng!");
        } finally {
            setLoading(false);
        }
    };

    const handleExcelUpload = useCallback(async (event) => {
        const file = event.target.files[0];
        if (!file || !file.name.endsWith('.xlsx')) {
            toast.error('Vui lòng chọn file .xlsx');
            return;
        }

        setLoading(true);
        try {
            const newCards = await parseExcelFile(file);
            if (newCards.length === 0) {
                toast.error('File Excel không chứa từ vựng hợp lệ');
                return;
            }
            setCards(newCards);
            toast.success(`Đã thêm ${newCards.length} từ vựng từ file Excel`);
        } catch (error) {
            toast.error('Lỗi đọc file Excel');
            console.error(error);
        } finally {
            setLoading(false);
            event.target.value = '';
        }
    }, [cards]);

    return (
        <form className="container my-4 border rounded bg-light shadow-sm p-3">
            {
                loading && (
                    <Backdrop
                        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                        open={true}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                )
            }
            <h3 className="m-0 p-3">📚 Tạo bộ thẻ</h3>

            {/* Nhập tiêu đề và mô tả*/}
            <div className="d-flex flex-column gap-3 mb-3 p-3">
                <div className="form-check form-switch p-0">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="publicSwitch"
                        checked={isPublic}
                        onChange={() => setIsPublic(!isPublic)}
                    />
                    <label className="form-check-label" htmlFor="publicSwitch">
                        Chế độ public (Tất cả mọi người có thể xem)
                    </label>
                </div>
                <input
                    type="text"
                    className="form-control border-3 border-bottom border-primary"
                    placeholder="Nhập tiêu đề"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                />
                <textarea
                    type="text"
                    className="form-control border-3 border-bottom border-primary"
                    placeholder="Nhập mô tả"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={500}
                    style={{ minHeight: "80px" }}
                />
            </div>


            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center my-2 p-3">
                <div className="text-center d-flex gap-2 justify-content-between w-100">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate("/vocabulary")}
                    >
                        <ChevronsLeft size={18} /> Quay lại
                    </button>
                    {
                        deckId ? (
                            <div className="d-flex gap-2">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                >
                                    <Trash2 size={18} /> Xóa
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleSubmit}
                                >
                                    <RefreshCcwDot size={18} /> Cập Nhật
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                <CirclePlus size={18} /> Tạo
                            </button>
                        )
                    }
                </div>
            </div>


            <div className="p-3">
                {/* Khu vực thẻ */}
                <div className="card bg-white p-3">
                    <div className="d-flex flex-wrap gap-2 mb-3">
                        <label className="btn btn-success d-flex align-items-center text-white">
                            <CirclePlus className="me-2" size={18} />
                            <span>Excel</span>
                            <input
                                type="file"
                                accept=".xlsx"
                                onChange={handleExcelUpload}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>

                    <ul className="list-unstyled">
                        {cards.map((card, index) => (
                            <li key={index} className="card mb-3 p-3">
                                <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                                    <h5 className="m-0">{index + 1}</h5>
                                    <button
                                        type="button"
                                        className="btn btn-sm"
                                        onClick={() => handleRemoveCard(index)}
                                    >
                                        <Trash2 size={18} color="red" />
                                    </button>
                                </div>

                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <textarea
                                            className="form-control border-2 border-success"
                                            rows="1"
                                            placeholder="Thuật ngữ"
                                            value={card.word}
                                            onChange={(e) => handleChange(index, "word", e.target.value)}
                                        ></textarea>
                                        <label className="form-text text-uppercase">Thuật ngữ</label>
                                    </div>

                                    <div className="col-md-6">
                                        <textarea
                                            className="form-control border-2 border-success"
                                            rows="1"
                                            placeholder="Định nghĩa"
                                            value={card.definition}
                                            onChange={(e) => handleChange(index, "definition", e.target.value)}
                                        ></textarea>
                                        <label className="form-text text-uppercase">Định nghĩa</label>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Thêm thẻ */}
                    <div className="text-center mt-3">
                        <button
                            type="button"
                            onClick={handleAddCard}
                            className="btn btn-outline-success"
                        >
                            + Thêm thẻ
                        </button>
                    </div>
                </div>
            </div>
        </form >
    );
}
