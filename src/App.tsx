import { Suspense } from "react";
import "./App.css";
import { Scene } from "./scenes/Scene";
import { SceneProvider } from "./scenes/SceneProvider";
import { Stage } from "./stages/Stage";

function App() {
  return (
    <div className="App">
      <h1>Domino Quest</h1>

      <Suspense>
        <SceneProvider>
          <Scene>
            <Stage />
          </Scene>
        </SceneProvider>
      </Suspense>
    </div>
  );
}

export default App;
