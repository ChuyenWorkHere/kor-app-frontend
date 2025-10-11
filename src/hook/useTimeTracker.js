import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import api from '../config/axiosConfig';
import { useSelector } from 'react-redux';

const STUDY_SESSION_KEY = "activeStudySession";
const PING_INTERVAL = 60 * 1000; // 1 phút
const IDLE_TIMEOUT = 30 * 1000; // 30 giây

export const useTimeTracker = () => {

  const userInfo = useSelector(state => state.user.info);
  const [sessionId, setSessionId] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const startOrResume = async () => {
    try {
      const response = await api.get('/users/session/start-or-resume');
      console.log(response);
      const { sessionId } = response.data.data;
      setSessionId(sessionId);
      localStorage.setItem(STUDY_SESSION_KEY, JSON.stringify({ sessionId: sessionId, userId: userInfo?.userId }));

    } catch (error) {
      toast.error('Lỗi khởi tạo phiên học tập:', error);
    }
  };

  const sendPing = async (id) => {
    try {
      await api.post(`/users/session/ping/${id}`);
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 404) {
        localStorage.removeItem(STUDY_SESSION_KEY);
        setSessionId(null);
        await startOrResume();
      }
    }
  };

  useEffect(() => {
    if (!userInfo?.userId)
      return;

    const storedSession = localStorage.getItem(STUDY_SESSION_KEY);
    if (storedSession) {

      const { sessionId, userId } = JSON.parse(storedSession);
      if (userId === userInfo?.userId) {
        setSessionId(sessionId);
        sendPing(sessionId);
      } else {
        localStorage.removeItem(STUDY_SESSION_KEY);
        startOrResume();
      }
    } else {
      startOrResume();
    }

    let idleTimeout;
    const handleVisibility = () => {
      setIsActive(document.visibilityState === 'visible');
    };
    const handleInteraction = () => {
      setIsActive(true);
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => setIsActive(false), IDLE_TIMEOUT);
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('scroll', handleInteraction);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      clearTimeout(idleTimeout);
    };
  }, [userInfo?.userId]);

  useEffect(() => {
    let pingInterval;
    if (isActive && sessionId) {
      pingInterval = setInterval(() => {
        sendPing(sessionId);
      }, PING_INTERVAL);
    }
    return () => clearInterval(pingInterval);
  }, [isActive, sessionId]);

}
