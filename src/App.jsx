import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./screens/Main";
import About from "./screens/About";
import PostDetail from "./screens/PostDetail";
import NotFound from "./screens/NotFound";

import { store } from "./store/store";
import "./index.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
