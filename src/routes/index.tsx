import { onMount, createSignal } from 'solid-js'
// import {EditorView} from "@codemirror/view"
// import {EditorState} from "@codemirror/state"
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup"
import { sql } from "@codemirror/lang-sql"


const CodeMirror: Component<{
  onViewUpdate: (v: ViewUpdate) => void;
}> = (props) => {
  let divRef;
  
  onMount(() => {
    let myView = new EditorView({
      state: EditorState.create({
        doc: `select * from users;


select 
  * 
from posts;   ok\n`,
        extensions: [
          basicSetup,
          sql(),
          EditorView.updateListener.of(props?.onViewUpdate)
        ]
      }),
      parent: divRef,
    })

    console.log(myView.on)
  })
  return <div ref={divRef} />
}

export default function Home() {
  const [currentCodeBlock, setCurrentCodeBlock] = createSignal("foo");

  function getEnd(doc, i) {
    const textIter = doc.iterRange(i)
    while (!textIter.done) {  
      const value = textIter.value;
      for (let i = 0; i < value.length; ++i) {
        const ch = value[i];
        if (ch === ";") {
          return textIter.from + i;
        }
      }
      textIter.next()
    }
    return textIter.to;
  }

  function getStart(doc, i) {
    const textIter = doc.iterRange(i, 0)
    while (!textIter.done) {  
      const value = textIter.value;
      for (let i = value.length - 1; i > 0; --i) {
        const ch = value[i];
        if (ch === ";") {
          console.log(value)
          return textIter.from + i;
        }
      }
      textIter.next()
    }
    return 0;
  }

  function handleViewUpdate(v: ViewUpdate) {
    console.log(v.state)
    const doc = v.state.doc;
    const range = v.state.selection.ranges[0];
    const cursorIndex = range.from;
    console.log(range, range.pos)
    const start = getStart(doc, cursorIndex)
    const end = getEnd(doc, cursorIndex)
    const codeBlock = doc.slice(start, end + 1).toJSON().filter((v) => v !== ";" && v.length > 0);
    
    setCurrentCodeBlock(codeBlock)
  }
  return (
    <div class="h-full">
      <CodeMirror onViewUpdate={handleViewUpdate} />
      <pre>
        {currentCodeBlock()}
      </pre>
    </div>
  );
}
