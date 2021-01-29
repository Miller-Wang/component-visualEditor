import JsonData from './edit-data.json'
import {ReactVisualEditor} from "./packages/ReactVisualEditor";
import './app.scss'
import {useState} from "react";
import {visualEditorBaseOption} from "./visual.config";
import {TestUseModelPage} from "./packages/utils/useModel";

function App() {

    const [formData, setFormData] = useState({} as any)

    return (
        <div className="app">
            <ReactVisualEditor formData={formData} option={visualEditorBaseOption} value={JsonData as any}>
                {{
                    username: () => {
                        return (
                            <div>
                                123
                            </div>
                        )
                    }
                }}
            </ReactVisualEditor>
            {/*<TestUseModelPage/>*/}
        </div>
    )
}

export default App
