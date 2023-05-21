import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppHeader } from "../components/header/Header";
import Spinner from "../components/spinner/Spinner";
import { MainPage, FavoritesPage, VacancyPage, Error404Page } from "../pages";

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
          <Suspense fallback={<Spinner/>}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/:vacancyID" element={<VacancyPage />} />
              <Route path="*" element={<Error404Page />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
