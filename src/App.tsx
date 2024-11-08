import { Suspense, useEffect } from "react";
import "./App.css";
import { Controller } from "./controllers/Controller";
import { ControllerProvider } from "./controllers/ControllerProvider";
import { Footer } from "./footers/Footer";
import { Failure } from "./headers/Failure";
import { Success } from "./headers/Success";
import { Title } from "./headers/Title";
import { Fonts } from "./languages/Fonts";
import { LanguageProvider } from "./languages/LanguageProvider";
import { Scene } from "./scenes/Scene";
import { SceneProvider } from "./scenes/SceneProvider";
import { Button } from "./settings/Button";
import { Form } from "./settings/Form";
import { SettingProvider } from "./settings/SettingProvider";
import ReactGa4 from "react-ga4";

function App() {
  useEffect(() => {
    ReactGa4.initialize("G-5BSL0D6LZ1");
    ReactGa4.send({ hitType: "pageview", page: "/" });
  }, []);

  return (
    <div className="App">
      <SettingProvider>
        <LanguageProvider>
          <SceneProvider>
            <ControllerProvider>
              <Suspense>
                <Scene>
                  <Controller />
                </Scene>
              </Suspense>

              <Title />
              <Success />
              <Failure />

              <Footer />

              <Button />
              <Form />

              <Fonts />
            </ControllerProvider>
          </SceneProvider>
        </LanguageProvider>
      </SettingProvider>
    </div>
  );
}

export default App;
