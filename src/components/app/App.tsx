import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppHeader } from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import {PageMain, PageFavorites, Page404} from "../../components/pages"

function App() {
  const Links: { link: string; label: string }[] = [
    { link: "/", label: "Поиск Вакансий" },
    { link: "/favorites", label: "Избранное" },
  ];
  return (
    <Router>
      <div className="app">
        <AppHeader links={Links} />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<PageMain />} />
              <Route path="/favorites" element={<PageFavorites/>} />
              {/* 
                        <Route path="/vacancy/:id" element={ <SinglePage Component={SingleCharacterLayout} dataType='character'/>} /> */}
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
