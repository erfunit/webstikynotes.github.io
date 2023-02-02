//declaring datas:
const container=document.querySelector('#app');
const addNoteBtn=document.querySelector('.add-note');
let notes=[];

//functions:
//get notes from localStorage:
const getNotes=()=>{
  try {
    const JSONnotes=localStorage.getItem('notes');
    return JSONnotes!==null ? JSON.parse(JSONnotes) : [];
  } catch (error) {
    return []
  }
}

//storing notes in localStorage:
const saveNotes=(notesArray)=>{
  localStorage.setItem('notes',JSON.stringify(notesArray))
}

//assingment declared notes array:

//render notes elements:
const renderNotes=(notesArray)=>{

  container.innerHTML=""
  container.appendChild(addNoteBtn)
  notesArray.forEach(element => {
    container.insertBefore(renderNote(element),addNoteBtn)
  });
}

//render each note:
const renderNote=(element)=>{
  const noteElement=document.createElement('textarea');
  noteElement.classList.add('note');
  noteElement.value=element.content;

  noteElement.addEventListener('focus',event=>{
    event.target.placeholder='اینجا بنویسید...'
  })
  noteElement.addEventListener('focusout',event=>{
    noteElement.removeAttribute('placeholder')
  })

  noteElement.addEventListener('dblclick',()=>{
    removeNote(element.id,noteElement)
  })



  noteElement.addEventListener('change',()=>{
    updateNote(noteElement.value,element.id)
  })

  return noteElement
}

addNoteBtn.addEventListener('click',event=>{
  event.preventDefault()
  // notes.push({
  //   content:'',
  //   id:Math.floor(Math.random()*100000)
  // })
  notes=[...notes,{
        content:'',
    id:Math.floor(Math.random()*100000)
  }]

  saveNotes(notes)
  notes=getNotes()
  renderNotes(notes)
})


const removeNote=(id,element)=>{

  let removeConfirm=confirm('remove this note?')
  if(removeConfirm){
    const targetNoteIndex=notes.findIndex(item=>{
      return item.id===id
    })
    notes.splice(targetNoteIndex,1)
    container.removeChild(element)
  
    saveNotes(notes)
    notes=getNotes()
    renderNotes(notes)
  }
}

const updateNote=(content,id)=>{
  const targetNoteElement=notes.find(item=>{
    return item.id === id
  })
  targetNoteElement.content=content
  saveNotes(notes)
  notes=getNotes()
  renderNotes(notes)
}

notes = getNotes()
saveNotes(notes)
renderNotes(notes)


