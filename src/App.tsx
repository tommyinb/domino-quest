import { Suspense } from "react";
import "./App.css";
import { Controller } from "./controllers/Controller";
import { ControllerProvider } from "./controllers/ControllerProvider";
import { Footer } from "./footers/Footer";
import { Failure } from "./headers/Failure";
import { Success } from "./headers/Success";
import { Title } from "./headers/Title";
import { Scene } from "./scenes/Scene";
import { SceneProvider } from "./scenes/SceneProvider";

function App() {
  return (
    <div className="App">
      <h1>Domino Quest</h1>

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
        </ControllerProvider>
      </SceneProvider>
    </div>
  );
}

export default App;
