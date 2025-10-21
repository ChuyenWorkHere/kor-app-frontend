import { CirclePlus, Inbox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ActionButton from './ActionButton'
import TermCard from './TermCard'
import FolderCard from './FolderCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyDecks, fetchMyFolders, fetchPublicDecks } from '../../features/vocabularySlice'

const VocabularyContent = () => {

  const dispatch = useDispatch();
  const { myDeck, publicDeck, myFolder, loading, error } = useSelector(state => state.vocabulary);
  const [tab, setTab] = useState("myCourse");

  useEffect(() => {
    dispatch(fetchMyDecks());
  }, []);

  const handleChangeTab = (tabName) => {
    setTab(tabName);

    if (tabName === "publicCourse" && publicDeck) {
      dispatch(fetchPublicDecks());
    }

    if (tabName === "myFolder") {
      dispatch(fetchMyFolders());
    }
  }

  return (
    <>
      <ul className="nav nav-tabs nav-line nav-color-secondary">
        <li className="nav-item submenu">
          <button
            className={`nav-link py-0 ${tab === "myCourse" ? "active" : ""}`}
            onClick={() => handleChangeTab("myCourse")}>Học phần của bạn</button>
        </li>
        <li className="nav-item submenu">
          <button
            className={`nav-link py-0 ${tab === "publicCourse" ? "active" : ""}`}
            onClick={() => handleChangeTab("publicCourse")}
          >Học phần public</button>
        </li>
        <li className="nav-item submenu">
          <button
            className={`nav-link py-0 ${tab === "myFolder" ? "active" : ""}`}
            onClick={() => handleChangeTab("myFolder")}
          >Nhóm học phần</button>
        </li>
      </ul>
      <div className="tab-content my-3">
        <div className="tab-pane fade active show">
          {
            (tab === "myCourse" || tab === "myFolder") && (
              <ActionButton
                icon={CirclePlus}
                label={tab === "myCourse" ? "Tạo học phần" : (tab === "myFolder" ? "Tạo thư mục" : "")}
                bgColor="#7d8ca3"
                link={tab === "myCourse" ? "/vocabulary/new" : (tab === "myFolder" ? "/vocabulary/folder/new" : "")}
              />
            )
          }

          {
            tab === "myCourse" && (
              (myDeck.length === 0) ? (
                <div
                  className='d-flex flex-column justify-content-center align-items-center gap-2'
                  style={{ minHeight: "350px" }}
                >
                  <Inbox size={50} color='blue' />
                  <h5 className='ms-2'> Bạn hiện tại chưa có bộ từ vựng nào</h5>
                </div>
              ) : (
                <div className='row gy-3 ms-auto my-2'>
                  {
                    myDeck.map(deck => (<TermCard key={deck.id} deck={deck} mode={"myCourse"} />))
                  }
                </div>
              )
            )
          }

          {
            tab === "publicCourse" && (
              (publicDeck.length === 0) ? (
                <div
                  className='d-flex flex-column justify-content-center align-items-center gap-2'
                  style={{ minHeight: "350px" }}
                >
                  <Inbox size={50} color='blue' />
                  <h5 className='ms-2'> Hiện tại chưa có bộ từ vựng công khai</h5>
                </div>
              ) : (
                <div className='row gy-3 ms-auto my-2'>
                  {
                    publicDeck.map(deck => (<TermCard key={deck.id} deck={deck} mode={"publicCourse"} />))
                  }
                </div>
              )
            )
          }

          {
            tab === "myFolder" && (
              (myFolder.length === 0) ? (
                <div
                  className='d-flex flex-column justify-content-center align-items-center gap-2'
                  style={{ minHeight: "350px" }}
                >
                  <Inbox size={50} color='blue' />
                  <h5 className='ms-2'> Bạn hiện tại chưa có học phần nào</h5>
                </div>
              ) : (
                <div className='row gy-3 ms-auto my-2'>
                  {
                    myFolder.map(folder => (<FolderCard key={folder.id} folder={folder} />))
                  }
                </div>
              )
            )
          }

        </div>
      </div>
    </>

  )
}

export default VocabularyContent