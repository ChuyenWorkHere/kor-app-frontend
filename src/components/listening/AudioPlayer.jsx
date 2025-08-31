import React, { useEffect, useRef, useState } from 'react'
import { FaLightbulb, FaPause, FaPlayCircle } from 'react-icons/fa'

const AudioPlayer = ({ src }) => {

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [speed, setSpeed] = useState(1.0);

    // Cập nhật thời gian hiện tại khi audio phát
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        audio.addEventListener("timeupdate", updateTime);

        // Xử lý khi audio kết thúc
        const handleEnded = () => {
            setIsPlaying(false);
        };
        audio.addEventListener("ended", handleEnded);

        // Xử lý phím Ctrl để phát/tạm dừng
        const handleKeyDown = (e) => {
            if (e.ctrlKey) { // Kiểm tra phím Ctrl
                e.preventDefault(); // Ngăn hành vi mặc định (copy, paste)
                togglePlay();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("ended", handleEnded);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // Cập nhật thời lượng khi audio tải xong
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const setAudioDuration = () => {
            setDuration(audio.duration);
        };
        audio.addEventListener("loadedmetadata", setAudioDuration);

        return () => audio.removeEventListener("loadedmetadata", setAudioDuration);
    }, [src]);

    // Xử lý nút phát/tạm dừng
    const togglePlay = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Xử lý tua audio
    const handleSeek = (e) => {
        const audio = audioRef.current;
        const seekTime = parseFloat(e.target.value);
        if (duration > 0) {
            audio.currentTime = seekTime;
            setCurrentTime(seekTime);
            audio.play();
            setIsPlaying(true);
        }
    };


    // Xử lý thay đổi tốc độ (tùy chọn, bổ sung)
    const changeSpeed = (newSpeed) => {
        const audio = audioRef.current;
        audio.playbackRate = newSpeed;
        setSpeed(newSpeed);
    };

    // Format thời gian
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };


    return (
        <div className="mb-4 text-center">
            <audio ref={audioRef} src={src}></audio>
            <p className="text-primary small fw-medium">Nhấn Ctrl để phát lại audio</p>
            <div className="d-flex align-items-center justify-content-between bg-light border rounded p-2 shadow-sm mb-2">
                <div className='d-flex align-items-center w-auto gap-2' style={{ maxHeight: "40px" }}>
                    <select defaultValue={1} onChange={(e) => changeSpeed(parseFloat(e.target.value))} className="form-select h-100" style={{ maxWidth: "80px" }}>
                        <option value={0.5}>0.5</option>
                        <option value={0.75}>0.75</option>
                        <option value={1}>1</option>
                        <option value={1.5}>1.5</option>
                        <option value={2}>2</option>
                    </select>
                    <button className="btn btn-sm btn-primary d-flex align-items-center text-nowrap">
                        <FaLightbulb size={16} color='yellow' className="me-1" /> Gợi ý
                    </button>
                    <div className="small text-muted text-nowrap">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                </div>
                <div className='w-auto'>
                    <button className="bg-primary bg-opacity-10 border-0 rounded-circle p-3 d-flex justify-content-center align-items-center"
                        onClick={togglePlay}>
                        {
                            isPlaying
                                ? <FaPause className='text-white' />
                                : <FaPlayCircle className='text-white' />
                        }
                    </button>
                </div>
            </div>
            <div className="progress" style={{ height: "6px" }}>
                <input
                    type="range"
                    className="progress-bar bg-primary"
                    min="0"
                    max={duration || 1}
                    step="0.01"
                    value={currentTime || 0}
                    onChange={handleSeek}
                    style={{ width: "100%" }}
                />
            </div>
        </div>
    )
}

export default AudioPlayer