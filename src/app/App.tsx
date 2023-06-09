import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Header } from "../components/header";
import { Spinner } from "../components/spinner";
import { MainPage, FavoritesPage, VacancyPage, Error404Page } from "../pages";

function App() {
  const Links: { link: string; label: string }[] = [
    { link: "/", label: "Поиск Вакансий" },
    { link: "/favorites", label: "Избранное" },
  ];

  return (
    <Router>
      <div className="app">
        <Header links={Links} />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/:vacancyID" element={<VacancyPage />} />
              <Route path="/404" element={<Error404Page />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
