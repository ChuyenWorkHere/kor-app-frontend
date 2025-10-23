import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { ChevronsLeft, CirclePlus, RefreshCcwDot, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DeckCard from "./DeckCard";
import { createFolder, fetchMyDecks, updateFolder } from "../../features/vocabularySlice";
import toast from "react-hot-toast";
import api from "../../config/axiosConfig";

const FolderForm = () => {

    const { folderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { myDeck } = useSelector((state) => state.vocabulary);
    const [folderName, setFolderName] = useState("");
    const [currentFolder, setCurrentFolder] = useState(null);
    const [selectedDecks, setSelectedDecks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchMyDecks());
        if (!folderId)
            return;
        setLoading(true);
        api.get(`/users/me/folders/${folderId}`)
            .then(response => {
                setCurrentFolder(response.data.data);
            })
            .catch(error => {
                toast.error(error.response?.data || "Lỗi khi lấy dữ liệu thư mục");
            })
            .finally(() => setLoading(false));
    }, [folderId, dispatch]);

    useEffect(() => {
        if (currentFolder) {
            setFolderName(currentFolder.name);
            setSelectedDecks(currentFolder.decks);
        }
    }, [currentFolder]);

    const toggleCheck = (deck, e) => {
        const checked = e.target.checked;
        setSelectedDecks((prev) => {
            if (checked) {
                return [...prev, deck];
            } else {
                return prev.filter((d) => d.id !== deck.id);
            }
        });
    };

    const validateForm = () => {
        if (!folderName || folderName.trim() === "") {
            toast.error("Tên thư mục không được để trống");
            return false;
        }
        if (selectedDecks.length === 0) {
            toast.error("Bạn cần chọn ít nhất 1 bộ từ vựng");
            return false;
        }
        return true;
    };

    const handleCreate = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);
            await dispatch(createFolder({
                name: folderName,
                decks: selectedDecks
            })).unwrap();

            toast.success("Tạo thư mục thành công!");
            navigate("/vocabulary");
        } catch (error) {
            toast.error(error || "Tạo thư mục thất bại!");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!validateForm()) return;
        
        try {
            setLoading(true);
            console.log("Before update", folderName);
            await dispatch(updateFolder({
                id: folderId,
                name: folderName,
                decks: selectedDecks
            })).unwrap();

            toast.success("Cập nhật thư mục thành công!");
            navigate("/vocabulary");
        } catch (error) {
            toast.error(error.message || "Có lỗi xảy ra khi cập nhật thư mục!");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await api.delete(`/users/me/folders/${folderId}`);
            toast.success("Xóa thư mục thành công!");
            navigate("/vocabulary");
        } catch (error) {
            toast.error(error.message || "Có lỗi xảy ra khi xóa thư mục!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="p-3 bg-light rounded shadow-sm">
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
            <h3 className="m-0 p-3">📁 Tạo thư mục</h3>
            <div className="mb-2 p-3">
                <input
                    type="text"
                    placeholder="Nhập tên thư mục"
                    className="form-control"
                    maxLength="500"
                    required
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                />
            </div>

            <div className="text-center d-flex gap-2 justify-content-between w-100 p-3">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/vocabulary")}
                >
                    <ChevronsLeft size={18} /> Quay lại
                </button>
                {
                    folderId ? (
                        <div className="d-flex gap-2">
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleDelete()}
                            >
                                <Trash2 size={18} /> Xóa
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => handleUpdate()}
                            >
                                <RefreshCcwDot size={18} /> Cập Nhật
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleCreate()}
                        >
                            <CirclePlus size={18} /> Tạo
                        </button>
                    )
                }

            </div>

            <div className="w-100 p-3">
                {/* Danh sách deck */}
                <div className="row g-3 p-3">
                    {myDeck.map((deck) => {
                        return (
                            <TermCard
                                key={deck.id}
                                deck={deck}
                                toggleCheck={toggleCheck}
                                mode={"myFolder"}
                                checked={selectedDecks.some(d => d.id === deck.id)}
                            />
                        );
                    })}
                </div>

            </div>


        </form>
    );
};
export default FolderForm;

