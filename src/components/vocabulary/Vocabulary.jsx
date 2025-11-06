import { CirclePlus, Inbox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ActionButton from './ActionButton'
import DeckCard from './DeckCard'
import FolderCard from './FolderCard'
import Empty from './Empty'
import Skeleton from '@mui/material/Skeleton';
import api from '../../config/axiosConfig'
import toast from 'react-hot-toast'
import { useInView } from "react-intersection-observer";
import Typography from '@mui/material/Typography'

const ITEM_PER_PAGE = 8;

const SECTION = {
  MY_DECK: "myCourse",
  PUBLIC_DECK: "publicCourse",
  MY_FOLDER: "myFolder"
};

const Vocabulary = () => {

  const [tab, setTab] = useState(SECTION.MY_DECK);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  const [myDeck, setMyDeck] = useState([]);
  const [publicDeck, setPublicDeck] = useState([]);
  const [myFolder, setMyFolder] = useState([]);


  const fetchData = async () => {

    setLoading(true);
    try {
      if (tab === SECTION.MY_DECK) {
        const response = await api.get("/users/me/decks", {
          params: {
            pageNumber: page,
            pageSize: ITEM_PER_PAGE
          }
        });
        const data = response.data.data;
        setMyDeck(prev => page === 0 ? data : [...prev, ...data]);
        if (data.length < ITEM_PER_PAGE) {
          setHasMore(false);
        }
      } else if (tab === SECTION.PUBLIC_DECK) {
        const response = await api.get("/users/decks/public", {
          params: {
            pageNumber: page,
            pageSize: ITEM_PER_PAGE
          }
        });
        const data = response.data.data;
        setPublicDeck(prev => page === 0 ? data : [...prev, ...data]);
        if (data.length < ITEM_PER_PAGE) setHasMore(false);
      } else if (tab === SECTION.MY_FOLDER) {
        const response = await api.get("/users/me/folders", {
          params: {
            pageNumber: page,
            pageSize: ITEM_PER_PAGE
          }
        });
        const data = response.data.data;
        setMyFolder(prev => page === 0 ? data : [...prev, ...data]);
        if (data.length < ITEM_PER_PAGE) setHasMore(false);
      }

    } catch (error) {
      toast.error("Lỗi khi load dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page, tab]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, loading]);

  const handleChangeTab = (newTab) => {
    if (newTab !== tab) {
      setTab(newTab);
      setPage(0);
      setHasMore(true);
      setLoading(false);
    }
  };

  return (
    <>
      <ul className="nav nav-tabs nav-line nav-color-secondary">
        <li className="nav-item submenu">
          <button
            className={`nav-link py-0 ${tab === SECTION.MY_DECK ? "active" : ""}`}
            onClick={() => handleChangeTab(SECTION.MY_DECK)}>Học phần của bạn</button>
        </li>
        <li className="nav-item submenu">
          <button
            className={`nav-link py-0 ${tab === SECTION.PUBLIC_DECK ? "active" : ""}`}
            onClick={() => handleChangeTab(SECTION.PUBLIC_DECK)}
          >Học phần public</button>
        </li>
        <li className="nav-item submenu">
          <button
            className={`nav-link py-0 ${tab === SECTION.MY_FOLDER ? "active" : ""}`}
            onClick={() => handleChangeTab(SECTION.MY_FOLDER)}
          >Nhóm học phần</button>
        </li>
      </ul>
      <div className="tab-content my-3">
        <div className="tab-pane fade active show">
          {
            (tab === SECTION.MY_DECK || tab === SECTION.MY_FOLDER) && (
              <ActionButton
                icon={CirclePlus}
                label={tab === SECTION.MY_DECK ? "Tạo học phần" : (tab === SECTION.MY_FOLDER ? "Tạo thư mục" : "")}
                bgColor="#7d8ca3"
                link={tab === SECTION.MY_DECK ? "/vocabulary/new" : (tab === SECTION.MY_FOLDER ? "/vocabulary/folder/new" : "")}
              />
            )
          }

          {
            (tab === SECTION.MY_DECK || tab === SECTION.PUBLIC_DECK) && (
              (tab === SECTION.MY_DECK ? myDeck : publicDeck).length === 0 ? (
                <Empty />
              ) : (
                <div className='row gy-3 ms-auto my-2'>
                  {
                    (tab === SECTION.MY_DECK ? myDeck : publicDeck).map(deck => (<DeckCard key={deck.id} deck={deck} mode={tab} />))
                  }
                </div>
              )
            )
          }

          {
            tab === SECTION.MY_FOLDER && (
              (myFolder.length === 0) ? (
                <Empty />
              ) : (
                <div className='row gy-3 ms-auto my-2'>
                  {
                    myFolder.map(folder => (<FolderCard key={folder.id} folder={folder} />))
                  }
                </div>
              )
            )
          }

          {
            loading && (
              <div className='row gy-3 ms-auto my-2'>
                {
                  Array.from(new Array(8)).map((item, index) => (
                    <div key={index} className='col-lg-3 col-sm-6 ps-0 pe-2'>
                      <Skeleton
                        sx={{ bgcolor: 'grey.400' }}
                        variant="rounded"
                        className='col-3'
                        width={"100%"}
                        height={150}
                      />
                    </div>
                  ))
                }
              </div>
            )
          }

          <div ref={ref} style={{ height: 1 }} />
        </div>
      </div>
    </>

  )
}

export default Vocabulary