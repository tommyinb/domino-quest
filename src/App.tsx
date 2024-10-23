import { Suspense } from "react";
import "./App.css";
import { Controller } from "./controllers/Controller";
import { ControllerProvider } from "./controllers/ControllerProvider";
import { Footer } from "./footers/Footer";
import { FooterProvider } from "./footers/FooterProvider";
import { Failure } from "./headers/Failure";
import { Success } from "./headers/Success";
import { Title } from "./headers/Title";
import { Scene } from "./scenes/Scene";
import { SceneProvider } from "./scenes/SceneProvider";

function App() {
  return (
    <div className="App">
      <SceneProvider>
        <ControllerProvider>
          <FooterProvider>
            <Suspense>
              <Scene>
                <Controller />
              </Scene>
            </Suspense>

            <Title />
            <Success />
            <Failure />

            <Footer />
          </FooterProvider>
        </ControllerProvider>
      </SceneProvider>
    </div>
  );
}

export default App;
