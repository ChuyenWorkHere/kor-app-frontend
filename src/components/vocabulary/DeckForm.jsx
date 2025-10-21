import { ChevronsLeft, CirclePlus, RefreshCcwDot, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createDeck, updateDeck } from "../../features/vocabularySlice";
import api from "../../config/axiosConfig";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useBreadCrumb } from "../../hook/useBreadCrumb";

export default function DeckForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useBreadCrumb();
    const { deckId } = useParams();
    const [currentDeck, setCurrentDeck] = useState(null);
    const [isPublic, setIsPublic] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [cards, setCards] = useState([{ id: null, word: "", definition: "" }]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!deckId)
            return;
        setLoading(true);
        api.get(`/users/decks/${deckId}`)
            .then(response => {
                console.log(response.data.data);
                setCurrentDeck(response.data.data);
            })
            .catch(error => {
                console.log(error);
                toast.error(error.response?.data || "Lỗi khi lấy dữ liệu từ vựng");
            })
            .finally(() => setLoading(false));
    }, [deckId]);

    useEffect(() => {
        if (currentDeck) {
            setIsPublic(!currentDeck.hide);
            setName(currentDeck.name);
            setDescription(currentDeck.description);
            setCards(currentDeck.flashcards || [{ id: null, word: "", definition: "" }]);
        }
    }, [currentDeck]);


    const handleAddCard = () => {
        setCards([...cards, { id: null, word: "", definition: "" }]);
    };

    const handleRemoveCard = (index) => {
        if (cards.length === 1) {
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

    const handleCreate = async () => {
        try {
            setLoading(true);
            await dispatch(createDeck({
                name,
                description,
                hide: !isPublic,
                flashcards: cards
            })).unwrap();

            toast.success("Tạo bộ từ vựng thành công!");
            navigate("/vocabulary");
        } catch (error) {
            toast.error(error.message || "Có lỗi xảy ra khi tạo bộ từ vựng!");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);
            
            await dispatch(updateDeck({
                id: deckId,
                name,
                description,
                hide: !isPublic,
                flashcards: cards
            })).unwrap();

            toast.success("Cập nhật bộ từ vựng thành công!");
            navigate("/vocabulary");
        } catch (error) {
            toast.error(error.message || "Có lỗi xảy ra khi cập nhật bộ từ vựng!");
        } finally {
            setLoading(false);
        }
    };

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
                                    onClick={handleUpdate}
                                >
                                    <RefreshCcwDot size={18} /> Cập Nhật
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleCreate}
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

                        <button type="button" className="btn btn-success d-flex align-items-center">
                            <CirclePlus className="me-2" size={18} />
                            <span>Excel</span>
                        </button>
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
