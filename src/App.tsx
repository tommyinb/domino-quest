import { Suspense } from "react";
import "./App.css";
import { Controller } from "./controllers/Controller";
import { Scene } from "./scenes/Scene";
import { SceneProvider } from "./scenes/SceneProvider";

function App() {
  return (
    <div className="App">
      <h1>Domino Quest</h1>

      <Suspense>
        <SceneProvider>
          <Scene>
            <Controller />
          </Scene>
        </SceneProvider>
      </Suspense>
    </div>
  );
}

export default App;
