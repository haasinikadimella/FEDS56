import Counter from "./Counter"
function Home(){
  return(
    <>
    <h2> My Home Page </h2>
    </>
  )
}
function Above()
{
  return(
    <>
    <h2> My About Components</h2>
    </>
  )
}
function Haasini(){
  return(
    <>
    <h2>Name = Haasini Kadimella</h2>
    <h2 style={{color:"red"}}>Roll No = 2500031406 </h2>
    </>
  )
}
function Student(props){
  return(
    <>
    <h2>Student details </h2>
    <h2>Name = {props.name}</h2>
    <h2>Age = {props.age}</h2>
    <h2>Marks = {props.marks}</h2>
    </>
  )
}

function App(){
  let sname = "Haasini"
  let sage = "18"
  let smarks ="93"
  return(
    <> 

    <h1 style={{color:"red"}}>Welcome to react JS</h1>

    <Home/>
    <Home/>
    <Home/>
    <Above/>
    <Haasini/>
    <h1 style={{color:"red"}}>Props Demonstation</h1>
    <Student name = {sname} age={sage} marks={smarks}/>
    <h1 style={{color:"red"}}>State Demonstation</h1>
    <Counter />
    </>
  )
}
export default App;