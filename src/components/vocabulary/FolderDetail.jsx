import React, { useEffect, useState } from 'react'
import api from '../../config/axiosConfig';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import DeckCard from '../vocabulary/DeckCard';

const FolderDetail = () => {

    const { folderId } = useParams();
    const [decks, setDecks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get(`/users/me/folders/${folderId}`)
            .then((response) => {
                setDecks(response.data.data.decks);
            })
            .catch((error) => {
                toast.error("Lỗi khi lấy dữ liệu thư mục");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [folderId]);

    return (
        <div className="w-100">
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
            {/* Danh sách deck */}
            <div className="row g-3 p-3">
                {decks.map((deck) => {
                    return (
                        <DeckCard
                            key={deck.id}
                            deck={deck}
                        />
                    );
                })}
            </div>

        </div>
    )
}

export default FolderDetail