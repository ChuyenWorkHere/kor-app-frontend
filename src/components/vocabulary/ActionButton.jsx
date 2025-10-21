import React from 'react'
import { useNavigate } from 'react-router-dom'

const ActionButton = ({ icon: Icon, label, bgColor, link }) => {

  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(link)}
      className="d-flex align-items-center gap-1 rounded px-2 py-1 border-0"
      style={{ backgroundColor: bgColor, cursor: 'pointer' }}
    >
      <Icon size={24} className="me-1 text-white" />
      <span className="text-white">{label}</span>
    </button>
  )
}

export default ActionButton