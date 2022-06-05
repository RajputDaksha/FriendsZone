import React, { useState, useEffect } from 'react'
import PostCard from './PostCard';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

import InfiniteScroll from "react-infinite-scroll-component"
import Spinner from 'react-spinkit'
import { useParams } from 'react-router-dom';
// MATERIAL UI
function PublicPostCard({ data, socket, threeDot }) {
  const [PostData, setPostdata] = useState([])
  const checkParams = useParams()

  const _id = localStorage.getItem("uuid")
  const dispatch = useDispatch()
  const GetAllPosts = useSelector((state) => {
    // console.log("all comment load here", state)
    // setPostArray(state.GetAllPosts)
    return state.GetAllPosts
  })
  const Notification = useSelector((state) => {
    // console.log("all comment load here", state)
    // setPostArray(state.GetAllPosts)
    return state.Notification
  })
  // GetAllComments
  const GetAllComments = useSelector((state) => {
    // setPostArray(state.GetAllPosts)
    return state.GetAllComments
  })
  //filter the data before delete
  function PostFilter(post_id) {
    //filter the posts
    const filterData = GetAllPosts.filter(post => {
      return post.post_id !== post_id
    })

    console.log({ GetAllComments })
    //filter the comments
    // const filterComments = GetAllComments.filter(comment => {
    //   return comment.post_id !== post_id
    // })
    //filter the notification
    const filterNotification = Notification.filter(notification => {
      return notification.post_id !== post_id
    })

    console.log({
      filterData,
      // filterComments
    })
    dispatch({ type: "Send_Notification", payload: filterNotification })
    return {
      filterData,
      // filterComments
    }
  }
  //now load all the notification
  useEffect(async () => {
    const allNoti = await axios.get(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/notification/${_id}`)
    console.log("all notification", allNoti)
    const { data } = allNoti.data
    dispatch({ type: "Send_Notification", payload: data })
  }, [])




  //load all the total comment for the post
  //set the all post to the state hooks
  useEffect(() => {
    setPostdata(GetAllPosts)


  }, [GetAllPosts])


  //LOAD ALL THE posts for users
  useEffect(() => {
    // const id = setInterval(() => {
    // /blob/users/public/posts/${_id}
    async function loadPosts() {

      try {
        // ${process.env.REACT_APP_API_BACKENDURL}
        const loadPostResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/all/post/${3}`, {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        })
        const loadPostData = await loadPostResponse.json()
        // console.log("load post data", loadPostData.data, loadPostResponse)
        if (loadPostResponse.status === 200) {
          dispatch({
            type: "LOAD_POSTS",
            payload: loadPostData.data
          })
        }

      } catch (err) {
        console.log(err)

      }

    }
    loadPosts()
    // }, 1000);
    // return (() => clearInterval(id))
  }, [])

  console.log("hello")
  //load all the total comment for the post
  //load all total comment of user
  useEffect(() => {
    async function totalComment() {
      try {
        // ${process.env.REACT_APP_API_BACKENDURL}
        const totalCommentResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/all/comment/user/${_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        })
        const totalCommentData = await totalCommentResponse.json()
        // console.log("total comment data", totalCommentData.data)
        if (totalCommentResponse.status === 200) {
          // console.log({ totalCommentData })
          dispatch({ type: "SET_TOTAL_COMMENT", payload: totalCommentData.data })
          dispatch({ type: "Get_All_Comments", payload: totalCommentData.data })
        }
      } catch (error) {
        console.warn(error)

      }

    }
    totalComment()
  }, [])



  //load the all notification 
  useEffect(() => {
    async function loadNotification() {
      try {

        // ${process.env.REACT_APP_API_BACKENDURL}
        const loadNotificationResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/all/notification/${_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        })
        const loadNotificationData = await loadNotificationResponse.json()
        // console.log({loadNotificationData})

        if (loadNotificationResponse.status === 200) {
          dispatch({ type: "Send_Notification", payload: loadNotificationData.data })
        }


      } catch (err) {
        console.warn(err)

      }

    }
    loadNotification()
  }, [])



  //===================LOAD THE USER INFORMATION FROM THE SERVER============
  useEffect(() => {

    async function userInfoLoad() {
      try {
        // ${process.env.REACT_APP_API_BACKENDURL}
        const userInfo = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/user/083525p7ljhwmxifts31/l66cbrsuytmj1wujuauz/nqoye5ozdqj89b4s4qoq/ua1iztaxjo4bbmzvd391/3mzqeygnoszlknp90h51/t28uf00khscofxgjwj20/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        })
        const res = await userInfo.json()
        // console.log("userinformation load", res)
        if (userInfo.status === 200) {
          dispatch({ type: "USERINFO_LOAD", payload: res.message })
        }
      } catch (err) {
        console.warn(err)

      }

    }
    userInfoLoad()

  }, [])




  //=====================LOAD THE BACKGROUND IMAGES=============
  useEffect(() => {
    // const id = setInterval(() => {
    // console.log("id is ", _id)
    async function BackgroundImage() {
      try {
        dispatch({ type: "LOADER", payload: true })
        // setLoader(true)
        // ${process.env.REACT_APP_API_BACKENDURL}
        const res1 = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/bg/image/mwQgga2z5KfChXjuF1s0/r6dg0LqqWmCG4W5UQOTa/ftFhzft7YNwT6jb9EVoX/ogvnbpOcPnjgMatu3mtb/JSC2PQZQVlK19QXDbSl1/`, {
          method: "GET",
          credentials: 'same-origin',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        })
        const data1 = await res1.json()
        if (res1.status === 200) {
          // setuploadImageDataFromServer(parseValue.resources)
          dispatch({ type: "LOADER", payload: false })
          dispatch({ type: "uploadImageDataFromServerBackground", payload: data1 })
          // setShowImage(parseValue.resources[0].url)
          dispatch({ type: "ShowImageBackground", payload: data1.url })
          // setLoader(false)
          dispatch({ type: "LOADER", payload: false })
        }
        else {
          // console.log("Image is not load")
        }

      } catch (err) {
        console.warn(err)

      }

    }
    BackgroundImage()
  }, [])


  //====================LOAD PROFILE IMAGES=============
  useEffect(() => {
    // const id = setInterval(() => {
    async function ProfileImages() {
      try {

        dispatch({ type: "LOADER", payload: true })
        // setLoader(true)
        const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/profile/image/e9thhvkKqJpnTlYo1sQl/QVbghZqhoSr2Rt5qvNYJ/iKj3RoJojFWmcDo4wTlm/9Olk5vTenhdkjHrdYEWl/`, {
          method: "GET",
          credentials: 'same-origin',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        })
        const data = await res.json()
        // console.log({ data })
        // const parseValue = data.parseData
        if (res.status === 200) {
          // setuploadImageDataFromServer(parseValue.resources)
          // if (parseValue.resources.length === 0) {
          // }
          dispatch({ type: "LOADER", payload: false })
          dispatch({ type: "uploadImageDataFromServer", payload: data })
          // setShowImage(parseValue.resources[0].url)
          dispatch({ type: "ShowImage", payload: data.url })
          // setLoader(false)
          dispatch({ type: "LOADER", payload: false })
        }
        else {
          dispatch({ type: "LOADER", payload: false })
          // console.log("Image is not load")
        }

      } catch (err) {
        console.warn(err)

      }

    }
    ProfileImages()
    // }, 2000);
    // return () => clearInterval(id)
  }, [])







  async function fetchData() {
    try {
      // ${process.env.REACT_APP_API_BACKENDURL}
      const loadPostResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/all/post/${3 + PostData.length}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("uuid")
        }
      })
      const loadPostData = await loadPostResponse.json()
      // console.log("load post data", loadPostData.data, loadPostResponse)
      if (loadPostResponse.status === 200) {
        dispatch({
          type: "LOAD_POSTS",
          payload: loadPostData.data.reverse()
        })
        // setPostdata([loadPostData.data])
      }

    } catch (err) {
      console.warn(err)

    }

  }




  return (
    <>
      {


        Object.keys(checkParams).length === 0 ? (PostData.length > 0) && PostData.map((item, index) => {
          // console.log("item", item)
          return (<>

            <PostCard key={index} item={item} index={index} filterPost={PostFilter} socket={socket} />

          </>
          )
        })
          : (data.length > 0) && data.map((item, index) => {
            // console.log("item", item)
            return (<>

              <PostCard key={index} item={item} index={index} filterPost={PostFilter} socket={socket} threeDot={threeDot} />

            </>
            )
          })




      }

      <div className="infinite_scroll  text-center md:ml-[5rem] ml-[2rem] mt-[6rem]">

        <InfiniteScroll
          dataLength={PostData.length}

          next={fetchData}
          hasMore={true}
          loader={<Spinner name="three-bounce" />}
          className="md:ml-[8rem] ml-[0rem]"
        />
      </div>




    </>
  )
}
export default PublicPostCard