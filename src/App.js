import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackData from "./data/FeedbackData";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink"
import {FeedbackProvider} from './context/FeedbackContext'

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

  //transforming it into contxt
  // const deleteFeedback = (id) => {
  //   if (window.confirm("Are you sure you want to delete?"))
  //     setFeedback(feedback.filter((item) => item.id !== id));
  // };

  // const addFeedback = (newFeedback) => {
  //   newFeedback.id = uuidv4();
  //   setFeedback([newFeedback, ...feedback]);
  // };
  return (
    //  calling the component
  <FeedbackProvider>
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <FeedbackForm />
                <FeedbackStats />
                <FeedbackList
                />
              </>
            }
          ></Route>
        </Routes>

        <Routes>
          <Route path="/about" element={<AboutPage />} />
        </Routes>

        <AboutIconLink />
      </div>
    </Router>
  </FeedbackProvider>
  );
}

export default App;