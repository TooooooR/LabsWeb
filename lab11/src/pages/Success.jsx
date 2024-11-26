import React from 'react'
import SuccessMark from '../images/greenmark.png'
import '../css/main.css'
import { useNavigate } from 'react-router-dom'
import TemplateButtons from '../components/Buttons/TemplateButtons/TemplateButtons'

function Success() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/catalog');
    }

  return (
    <div className='successpagecomp'>
        <img src={SuccessMark} alt='dd'/>
        <h2>Success!</h2>
        <p>Your order was sent to processing</p>
        <TemplateButtons id = 'sort_by_of_pricee' type = 'Back to catalog' onClick={handleNavigate} />
    </div>
  )
}

export default Success