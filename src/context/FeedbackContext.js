import {createContext, useState, useEffect} from 'react'
import { v4 as uuidv4 } from "uuid";
const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState (false)
    const [feedback, setFeedback] = useState ([
        {
            id: 1,
            text: 'This item is from context 1',
            rating: 10
        },
        {
            id: 2,
            text: 'This item is from context 2',
            rating: 9
        },
        {
            id: 3,
            text: 'This item is from context 3',
            rating: 7
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    useEffect(() => {
        fetchFeedback()
      }, [])
    
      // Fetch feedback
      const fetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id&_order=desc`)
        const data = await response.json()
    
        setFeedback(data)
        setIsLoading(false)
      }
      
    //delete feedback
    const deleteFeedback = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            setFeedback(feedback.filter((item) => item.id !== id));
       }
    }

    //Update feedback item
    const updateFeedback = (id,updItem) => {
        setFeedback(
            feedback.map((item) => (item.id === id ? {...item, ...updItem} : item))
        )
    }
    //Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    //Add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
      }
    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        isLoading,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext