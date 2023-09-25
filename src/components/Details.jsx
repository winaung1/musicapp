import React, { useContext, useEffect, useState } from 'react'
import { AiOutlinePlayCircle,AiOutlineLike } from 'react-icons/ai'
import { BsArrowLeftCircleFill, BsEye } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import Data from '../data.json'
import Sub from '../sub.json'
import Likes from '../likes.json'
import { ApiContext } from '../App'

function Details() {
    const { id } = useParams()
    const {api, intToString, show, ratingRappers} = useContext(ApiContext)
    const [data, setData] = useState(null)
    const [subCount, setSubCount] = useState(null)
    const [likes, setLikes] = useState(null)
    const [img, setImg] = useState(null)
    const channelId = id.split("&")[1];

    const endpointSubs = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${api}`
    const endPointLikes = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${api}&part=statistics`

    useEffect(() => {

      fetch(endpointSubs)
          .then(response => response.json())
          .then(json => setSubCount(json))
      fetch(endPointLikes)
          .then(response => response.json())
          .then(json => setLikes(json))
      fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${id.split('&')[0]}&type=video&key=${api}`)
          .then(response => response.json())
          .then(json => setData(json))

          ratingRappers.filter((obj) => {
            if(JSON.stringify(obj).toLowerCase().includes(id.split('&')[0].toLowerCase())){
              setImg(obj.pic)
            }
          }
          )
          
        }, [])
     

  return (
    <>
    <button className='fixed left-5 top-2 z-10 text-2xl my-5'><a href='/'><BsArrowLeftCircleFill className='bg-transparent'/></a></button>
    <div className='my-16'>
    {subCount?.items?.map(sub => {
        return <div className='rounded-xl mb-4 flex items-center space-x-4 w-fit mx-auto lg:fixed top-32 left-10 tracking-widest z-[80000]'>
        <div className='relative drop-shadow-2xl'> 
        {/* <div className=' rounded-xl w-full h-full absolute top-0 left-0 details-img'></div>  */}
        <img alt='' className='w-20 h-20 rounded-xl object-cover' src={img}/>
        </div> 
        <div>

        <p className='pt-4'>{id.split('&')[0]}</p>
        <p>Listeners: {intToString(sub.statistics.subscriberCount)}</p>
        <p>Total Listens: {intToString(sub.statistics.viewCount)}</p>
        </div>
      </div>
      })} 
      <h1 className='text-2xl text-center font-bold'>Latest Songs</h1>
      {show ?
      <div className='w-full mx-auto h-screen bg-transparent'>
        <img className='bg-transparent mix-blend-multiply w-full h-full object-contain' src='/play.gif' alt="" />
      </div> :
    <div className="lg:pl-[240px] grid md:grid-cols-2 lg:justify-end xl:grid-cols-3 gap-4 p-4">
    {data?.items?.map((item, index) => { 
      return <div className='rounded-2xl relative drop-shadow-2xl w-80 mx-auto' key={item.id.videoId}>
          {/* <img className='w-full h-60 object-cover rounded-2xl z-50 gradient' src={item.snippet.thumbnails.medium.url} alt=''/> */}

          {/* <div className='absolute top-0 left-0 inset-0 w-full h-full gradient rounded-2xl'></div> */}
          <iframe className='rounded-2xl w-full h-80' title='hello' 
              src={`https://www.youtube.com/embed/${item.id.videoId}`}>
          </iframe>
          {likes?.items.map(like => {
            return <div className='flex justify-between items-center py-2'>
              <div className='flex items-center gap-2'><BsEye/> {intToString(like.statistics.viewCount)}</div>
              <div className='flex items-center gap-2'><AiOutlineLike/> {intToString(like.statistics.likeCount)}</div>
            </div>
          })

          }
        
        </div>
      })}
</div>
      }
    </div>
</>
  )
}

export default Details