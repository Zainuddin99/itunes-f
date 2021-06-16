import React,{useState,useEffect,useRef} from 'react'
import Result from './Result'
import Intro from './Intro'
import Load from './Load'
import Firstanime from './firstanim'

function App() {
  const [start,setStart]=useState(true)
  const [firstLoad,setFirstLoad] = useState(true)
  const [search,setSearch] = useState("")
  const [loader,setLoader] = useState(false)
  const [searchItems,setSearchItems]=useState([])
  const [isSearch,setIsSearch]=useState(true)
  const [isFailed,setIsFailed] = useState(false)
  const [numbers,setNumbers]=useState(0)
  const [firstanime,setFirstanime] = useState(true)
  const [isFocus,setIsFocus] = useState(false)

  const formm = useRef(null)

  useEffect(() => {
    setTimeout(()=>setFirstanime(false),1800)
  }, [])

  async function fetchsearch(){
    try{
    const apiURL = 'https://itunes.apple.com/search?media=music&term=';
    const query = apiURL + search;
    const response = await fetch(query);
    if(response.status>=200 && response.status<=300){
      setFirstLoad(false)
      setSearchItems([])
      setLoader(false)
      setIsFailed(false)
      setStart(false)
    const json = await response.json();
    setSearchItems(json.results)
    setNumbers(json.resultCount)
    }else{
setIsFailed(true)
setLoader(false)
    }
  }catch{
setIsFailed(true)
setLoader(false)
  }
}

  const handleFocus = () =>{
    setIsFocus(true)
    
  }

  function handlesearch(e){
    setStart(true)
    setLoader(true)
    setIsFailed(false)
    setSearch("")
    e.preventDefault();
    if(search===null || search===""){
      setLoader(false)
      setIsSearch(false);
      setStart(true)
    }else{
      setIsSearch(true)
      fetchsearch();
    }
  }
  if(firstanime){
    return <Firstanime/>
  }
  return (
<>
{ !isFocus && <h1 className="heading">Search songs from <span>iTunes</span></h1>}
<form className="form-container" ref={formm}>
  <input placeholder="Search by name, artist, albums, etc." className="inputField" type="text" value={search} onFocus={handleFocus} onBlur={()=>setIsFocus(false)} onChange={(e)=>{
    setIsSearch(true);
    return setSearch(e.target.value)}}></input>
  <button type="submit" className="submit-btn" onClick={handlesearch}>Submit</button>
</form>
{loader?<><div class="lds-roller"><Load/></div></>:<></>}
{isFailed?<h1 className="failstatus">Ooops! Something went wrong</h1>:<></>}
{isSearch?<></>:<div className="warning">Please enter something to search</div>}
{firstLoad?<Intro/>:<></>}
{start?<></>:<h1 className="results-count">Found {numbers} results</h1>}
<div className="items-container">
{
  searchItems.map((items)=>{
    return(
    <Result key={items.artistId} {...items}/>
    )
  })
}
 </div>
</>
  )
  }
export default App;
