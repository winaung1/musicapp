import React, { useContext, useEffect, useState } from 'react'
import {AiOutlinePlayCircle} from 'react-icons/ai'
import {BsSearch, BsHeart} from 'react-icons/bs'
import Data from '../data.json'
import Svg from '../data.svg'
import { ApiContext } from '../App'
function Home() {

    const {api, show, ratingRappers} = useContext(ApiContext)
    const [data, setData] = useState(null)
    const [userSearch, setUserSearch] = useState('')

    const endPointArtis = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=taetae&type=video&key=${api}`

    useEffect(() => {
     fetch(endPointArtis)
      .then(res => res.json())
      .then(json => setData(json))

    }, [])

    const handleSearch = (search) => {
      fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${search || userSearch}&type=video&key=${api}`)
      .then(res => res.json())
      .then(data => setData(data))

    }

  

  return (
    <>
    {/* <div className='sticky z-[4000] top-0'>

      <h1 className=' font-bold uppercase text-xl text-center py-5'>Listen to your favorite Artist</h1>
      <div className='px-6 flex items-center bg-white text-black rounded-full w-[40%] mx-auto h-14 mb-14 active:border-green-300'>
      <input onChange={(e) => setUserSearch(e.target.value)} className='w-full outline-none bg-transparent text-black' type="text" name="" id="" placeholder='Search Artist/any videos' />
      <BsSearch className='' onClick={() => handleSearch()}/>
      </div>
    </div>
    <div className='fixed overflow-scroll top-10 left-4 flex flex-col gap-4 justify-center items-center'> 
    <h1 className='flex'>Top 5 Artists</h1>
    {ratingRappers.map((rapper, index) => {
      return <div onClick={() => handleSearch(rapper.name)} className='relative cursor-pointer'>
      <img alt='' className='w-20 h-20 rounded-full border border-green-300 object-cover mx-auto' src={rapper.pic}/>
      <p className='text-center truncate'>{rapper.name}</p>
      <p className='absolute -top-2 left-4 text-red-100 font-bold bg-red-500 rounded-full w-5 h-5 flex items-center justify-center'>{index + 1}</p>
    </div>
    })}
 

    </div>
    <div className='pl-40 overflow-scroll'>
    <h1 className='sticky top-0 z-[5000] text-green-200 font-bold tracking-widest'>Songs May Like</h1>
    {show ?
      <div className='w-full mx-auto h-screen bg-transparent'>
        <img className='bg-transparent mix-blend-multiply w-full h-full object-contain' src='/play.gif' alt="" />
      </div>
      :
      <>
        <div className="grid grid-cols-2 justify-center items-center lg:grid-cols-3 gap-4 p-4">
    {Data?.items?.map((item, index) => { 
      return <a href={`/components/Details/${item.snippet.channelTitle}&${item.snippet.channelId}`} className='rounded-2xl relative hover:scale-105 transition-all duration-200 ease-linear group' key={item.id.videoId}>
            <img className='w-full h-60 object-cover rounded-2xl z-50 gradient' src={item.snippet.thumbnails.medium.url} alt=''/>
            <div className='absolute top-0 left-0 inset-0 w-full h-full gradient rounded-2xl'></div>
            <AiOutlinePlayCircle className='bg-transparent absolute top-4 left-4 text-4xl z-[5000]'/>
            <p className='absolute bottom-4 left-4 text-white font-bold'>{item.snippet.channelTitle}</p> 
            {/* <button onClick={() => handleDownload(item.id.videoId)}>Download</button> */}
          {/* </a> */} 

{/* // })}
//   </div> */}
{/* // </> */}
{/* // } */}
{/* //   </div> */}
    </>
    
  )
}

export default Home