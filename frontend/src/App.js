import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import FormPage from './components/FormPage';
import Mainpage from './components/Mainpage';
import ThemePage from './components/ThemePage';
import PreviewPage from './components/PreviewPage';
import { validateForm } from './actions/forms';
import ReviewPage from './components/ReviewPage';
import FormPageForMobile from './components/FormPageForMobile';
import AboutPage from './components/AboutPage';

const App = () => {
  // we store user data in state as global variable
  // const state = require("./constants/defaultInfo.json");
  const [state, setState] = React.useState(require("./constants/default.json"));
  // const [themeState, setThemeState] = React.useState(require("./constants/defaultTheme.json"));
  const [sectionComplete, setSectionComplete] = React.useState(require("./constants/completion.json"));

  const [isFormValid, setIsFormValid] = React.useState(false);

  const [uploading, setUploading] = React.useState(false);

  const onUpdateChange = (sectionTitle, index = 0, fieldName, value) => {

    if(fieldName === 'highlights') {
      // convert value to array
      value = value.split('\n');
    }
    console.log(value)
    if (sectionTitle === 'basics') {
      // update state
      setState((prevState) => ({
        ...prevState,
        [sectionTitle]: {
          ...prevState[sectionTitle],
          [fieldName]: value
        }
      }));
    }
    else {
      // update state
      setState((prevState) => ({
        ...prevState,
        [sectionTitle]: [
          ...prevState[sectionTitle].slice(0, index),
          {
            ...prevState[sectionTitle][index],
            [fieldName]: value
          },
          ...prevState[sectionTitle].slice(index + 1)

        ]
      }));
    }
    console.log(state)
  }

  const onAddEntry = (sectionTitle) => {
    // update state
    setState((prevState) => ({
      ...prevState,
      [sectionTitle]: [
        ...prevState[sectionTitle],
        require("./constants/default.json")[sectionTitle][0]
      ]
    }));
  }

  const onDeleteEntry = (sectionTitle, index) => {
    // update state
    setState((prevState) => ({
      ...prevState,

      [sectionTitle]: (prevState[sectionTitle].length == 1) ?
        [
          require("./constants/default.json")[sectionTitle][0]
        ] : [
          ...prevState[sectionTitle].slice(0, index),
          ...prevState[sectionTitle].slice(index + 1)
        ]
    }));
  }

  const onAddKeyword = (sectionTitle, index, key, keyword) => {
    // update state
    setState((prevState) => ({
      ...prevState,
      [sectionTitle]: [
        ...prevState[sectionTitle].slice(0, index),
        {
          ...prevState[sectionTitle][index],
          [key]: [
            ...prevState[sectionTitle][index][key],
            keyword
          ]
        },
        ...prevState[sectionTitle].slice(index + 1)
      ]
    }));
  }

  const onDeleteKeyword = (sectionTitle, index, key, keywordIndex) => {
    // update state
    setState((prevState) => ({
      ...prevState,
      [sectionTitle]: [
        ...prevState[sectionTitle].slice(0, index),
        {
          ...prevState[sectionTitle][index],
          keywords: [
            ...prevState[sectionTitle][index].keywords.slice(0, keywordIndex),
            ...prevState[sectionTitle][index].keywords.slice(keywordIndex + 1)
          ]
        },
        ...prevState[sectionTitle].slice(index + 1)
      ]
    }));
  }

  const onUpdateSectionComplete = (sectionTitle, value) => {
    setSectionComplete((prevState) => ({
      ...prevState,
      [sectionTitle]: value
    }));
  }

  const onLoadingLocalStorage = () => {
    // load from local storage
    const localState = JSON.parse(localStorage.getItem("state"));
    const localSectionComplete = JSON.parse(localStorage.getItem("sectionComplete"));
    if (localState) {
      setState(localState);
    }
    if (localSectionComplete) {
      setSectionComplete(localSectionComplete);
    }
  }

  const onSavingLocalStorage = () => {
    // save to local storage
    localStorage.setItem("state", JSON.stringify(state));
    localStorage.setItem("sectionComplete", JSON.stringify(sectionComplete));
  }

  const cleanLocalStorage = () => {
    localStorage.removeItem("state");
    localStorage.removeItem("sectionComplete");
  }

  React.useEffect(() => {
    onLoadingLocalStorage();
  }, []);

  return (
    <div>
      {uploading ? (
        <div className="App">
          {/* TODO: design uploading */}
          <h1>Uploading...</h1>
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainpage setUploading={setUploading} setState={setState} onSavingLocalStorage={onSavingLocalStorage} />} />
            <Route path="/form" element={<FormPage
              userData={state}
              sectionComplete={sectionComplete}
              onUpdateChange={onUpdateChange}
              onAddEntry={onAddEntry}
              onDeleteEntry={onDeleteEntry}
              onAddKeyword={onAddKeyword}
              onDeleteKeyword={onDeleteKeyword}
              setUploading={setUploading}
              onUpdateSectionComplete={onUpdateSectionComplete}
              onLoadingLocalStorage={onLoadingLocalStorage}
              onSavingLocalStorage={onSavingLocalStorage}
              cleanLocalStorage={cleanLocalStorage} />}
            />
            <Route path="/form-mobile" element={<FormPageForMobile
              userData={state}
              sectionComplete={sectionComplete}
              onUpdateChange={onUpdateChange}
              onAddEntry={onAddEntry}
              onDeleteEntry={onDeleteEntry}
              onAddKeyword={onAddKeyword}
              onDeleteKeyword={onDeleteKeyword}
              setUploading={setUploading}
              onUpdateSectionComplete={onUpdateSectionComplete}
              onLoadingLocalStorage={onLoadingLocalStorage}
              onSavingLocalStorage={onSavingLocalStorage}
              cleanLocalStorage={cleanLocalStorage} />}
            />
            <Route path="/review" element={<ReviewPage userData={state} setUploading={setUploading} onLoadingLocalStorage={onLoadingLocalStorage} />} />
            <Route path="/theme" element={<ThemePage userData={state} setUploading={setUploading} onSavingLocalStorage={onSavingLocalStorage} />} />
            <Route path="/preview" element={<PreviewPage userData={state} />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
